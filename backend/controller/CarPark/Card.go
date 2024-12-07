package CarPark

import (
	//"errors" // เพิ่ม import สำหรับ package errors

	"fmt"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"

	//"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
	"net/http"
)

func GetListCard(c *gin.Context) {
	var cards []entity.ParkingCard

	db := config.DB()

	if err := db.Preload("MembershipCustomer").Preload("MembershipCustomer.HistoryMembership").Preload("Store").Preload("ParkingFeePolicy").Preload("TypePark").Preload("StatusCard").Preload("BackupCard").Preload("ParkingZone").Find(&cards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cards)
}

// POST UsageCard
func CreateParkingCard(c *gin.Context) {
	var card entity.ParkingCard
	var zone entity.ParkingZone

	if err := c.ShouldBindJSON(&card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Fetch TypePark from ParkingCard
	var typePark entity.TypePark
	db.Find(&typePark)
	fmt.Println("TypeParkID from request:", card.TypeParkID)

	// Fetch ParkingFeePolicy related to TypePark
	var parkingFeePolicy entity.ParkingFeePolicy
	result := db.Where("type_park_id = ?", typePark.ID).First(&parkingFeePolicy)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ParkingFeePolicy not found"})
		return
	}

	// Create ParkingCard and associate with ParkingFeePolicyID
	newCard := entity.ParkingCard{
		EntryTime:            card.EntryTime,
		ExitTime:             card.ExitTime,
		LicensePlate:         card.LicensePlate,
		UserID:               card.UserID,
		ID:                   card.ID, // Correct the ID reference
		StatusPaymentID:      card.StatusPaymentID,
		ParkingFeePolicyID:   parkingFeePolicy.ID,
		ExpiryDate:           card.ExpiryDate,
		Hourly_rate:          card.Hourly_rate,
		Fee:                  card.Fee,
		StoreID:              card.StoreID,              // Assuming StoreID is passed in the request
		MembershipCustomerID: card.MembershipCustomerID, // Assuming MembershipCustomerID is passed in the request

		StatusCardID: 1, // Example: assuming "1" represents an active status or whatever is appropriate
	}

	// Save ParkingCard
	if err := db.Create(&newCard).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update AvailableZone of ParkingZone
	zoneID := card.ParkingZone[0].ID // Assuming you pass ParkingZone as part of the request
	resultZone := db.First(&zone, zoneID)
	if resultZone.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ParkingZone not found"})
		return
	}
	zone.AvailableZone -= 1
	db.Save(&zone)

	// Update ParkingCard StatusCard to "Out" (ID 2)
	newCard.StatusCardID = 2
	db.Save(&newCard)

	c.JSON(http.StatusCreated, gin.H{"message": "UsageCard created successfully", "data": newCard})
}

func UpdateParkingCard(c *gin.Context) {
    var card entity.ParkingCard
    CardID := c.Param("id")

    db := config.DB()

	result := db.First(&card, CardID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to mappayload"})
		return
	}
	result = db.Save(&card)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
    c.JSON(http.StatusOK, gin.H{"message": "ParkingCard updated successfully"})
}

func GetIdCardZone(c *gin.Context) {
	ID := c.Param("id")
	var cards entity.ParkingCard
	// var zones entity.ParkingZone
	// var cardzone entity.ParkingCardZone

	db := config.DB()
	if err := db.Preload("ParkingZone.TypePark").Preload("ParkingZone.ParkingCard").First(&cards, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Card not found"})
		return
	}
	// if err := db.Where("id = ?", ID).Preload("ParkingZone").Find(&cards).Error; err != nil {
	// 	c.JSON(http.StatusNotFound, gin.H{"error": "Data not found"})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{
		"cards": cards,
		// "zones": zones,
		// "cardzone": cardzone,
	})
}
