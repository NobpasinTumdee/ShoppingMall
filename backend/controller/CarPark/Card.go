package CarPark

import (
	//"errors" // เพิ่ม import สำหรับ package errors

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"

	//"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
	"net/http"
)

func GetListCard(c *gin.Context) {
	var cards []entity.ParkingCard

	db := config.DB()

	if err := db.Preload("TypePark").Preload("StatusCard").Preload("UsageCard").Preload("ParkingZone").Find(&cards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cards)
}

// POST UsageCard
func CreateUsageCard(c *gin.Context) {
    var usagecard entity.UsageCard
    var zone entity.ParkingZone

    if err := c.ShouldBindJSON(&usagecard); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()

    // ดึงข้อมูล ParkingCard ที่เชื่อมกับ UsageCard
    var parkingCard entity.ParkingCard
    result := db.First(&parkingCard, usagecard.ParkingCardID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ParkingCard not found"})
        return
    }

    // ดึง TypePark จาก ParkingCard
    var typePark entity.TypePark
    result = db.First(&typePark, parkingCard.TypeParkID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "TypePark not found"})
        return
    }

    // ดึง ParkingFeePolicy ที่เชื่อมกับ TypePark
    var parkingFeePolicy entity.ParkingFeePolicy
    result = db.Where("type_park_id = ?", typePark.ID).First(&parkingFeePolicy)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ParkingFeePolicy not found"})
        return
    }

    // สร้าง UsageCard และกำหนด ParkingFeePolicyID
    usage := entity.UsageCard{
        EntryTime:         usagecard.EntryTime,
        LicensePlate:      usagecard.LicensePlate,
        UserID:            usagecard.UserID,
        ParkingCardID:     usagecard.ParkingCardID,
        StatusPaymentID:   usagecard.StatusPaymentID,
        ParkingFeePolicyID: parkingFeePolicy.ID, // กำหนด ParkingFeePolicyID จากการเชื่อมโยง
    }

    // บันทึก UsageCard
    if err := db.Create(&usage).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ลดจำนวน AvailableZone ของ ParkingZone ที่เลือก
    zoneID := usagecard.ParkingCard.ParkingZone
    resultZone := db.First(&zone, zoneID)
    if resultZone.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ParkingZone not found"})
        return
    }
    zone.AvailableZone -= 1
    db.Save(&zone)

    // อัปเดต StatusCard ของ ParkingCard ให้เป็น "2 Out"
    parkingCard.StatusCardID = 2
    db.Save(&parkingCard)

    c.JSON(http.StatusCreated, gin.H{"message": "UsageCard created successfully", "data": usage})
}



// PATCH /users
func UpdateUser(c *gin.Context) {
	var card entity.ParkingCard
	CardID := c.Param("id")

	db := config.DB()
	resultCard := db.First(&card, CardID)
	if resultCard.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	resultCard = db.Save(&card)
	if resultCard.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
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
