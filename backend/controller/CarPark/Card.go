package CarPark

import (
	//"errors" // เพิ่ม import สำหรับ package errors

	//"fmt"

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

	// เรียกใช้การ Preload สำหรับการโหลดข้อมูลอื่น ๆ และ Joins สำหรับ ParkingTransaction
	if err := db.Preload("MembershipCustomer").
		Preload("Store").Preload("ParkingFeePolicy").
		Preload("TypePark").Preload("StatusCard").
		Preload("ParkingZone").
		Preload("ParkingTransaction").
		Find(&cards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cards)
}

/*
func GetListLastTransaction(c *gin.Context) {
	var cards []entity.ParkingCard

	db := config.DB()

	// ดึงบัตรที่มีการทำธุรกรรมล่าสุด
	if err := db.
		Preload("ParkingTransaction").
		Joins("JOIN parking_transactions ON parking_transactions.parking_card_id = parking_cards.id").
		Order("parking_transactions.created_at DESC").
		Find(&cards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cards)
} */

// POST ParkingTransaction
func CreateParkingTransaction(c *gin.Context) {
	//var zone entity.ParkingZone
	var trans entity.ParkingTransaction

	// Binding JSON request to ParkingCard
	if err := c.ShouldBindJSON(&trans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get the DB connection
	db := config.DB()

	// Create a new ParkingTransaction (ParkingCard)
	newTransaction := entity.ParkingTransaction{
		EntryTime:     trans.EntryTime,
		ExitTime:      trans.ExitTime,
		Hourly_Rate:   trans.Hourly_Rate,
		Image:         trans.Image,
		LicensePlate:  trans.LicensePlate,
		Color:         trans.Color,
		UserID:        trans.UserID,
		ParkingCardID: trans.ParkingCardID, // Using ParkingCard ID
	}

	// Save ParkingTransaction
	if err := db.Create(&newTransaction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "ParkingTransaction created successfully", "data": newTransaction})
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

func UpdateParkingCardAndZone(c *gin.Context) {

	var payload struct {
		ParkingCard entity.ParkingCard `json:"parking_card"`
		ParkingZone entity.ParkingZone `json:"parking_zone"`
	}

	db := config.DB()

	// ตรวจสอบว่า payload ถูกส่งมาถูกต้องหรือไม่
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}

	fmt.Println("Payload:", payload)

	fmt.Println("ParkingCard ID:", payload.ParkingCard.ID)
	fmt.Println("ParkingCard StatusCardID:", payload.ParkingCard.StatusCardID)

	// ตรวจสอบการมีอยู่ของ ParkingCard และ ParkingZone
	if err := db.First(&payload.ParkingCard, c.Param("cid")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Parking card not found"})
		return
	}

	fmt.Println("ParkingZone ID:", payload.ParkingZone.ID)
	fmt.Println("ParkingZone AvailableZone:", payload.ParkingZone.AvailableZone)

	if err := db.First(&payload.ParkingZone, c.Param("zid")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Parking zone not found"})
		return
	}

	// อัปเดตข้อมูล
	if err := db.Save(&payload.ParkingCard).Error; err != nil {
		fmt.Println("Error saving ParkingCard:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update parking card"})
		return
	}

	if err := db.Save(&payload.ParkingZone).Error; err != nil {
		fmt.Println("Error saving ParkingZone:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update parking zone"})
		return
	}

	// ส่งข้อความตอบกลับ
	c.JSON(http.StatusOK, gin.H{"message": "Parking card and zone updated successfully"})
}

func GetParkingCardByID(c *gin.Context) {
	id := c.Param("id")
	var parkingCard entity.ParkingCard

	db := config.DB()

	if err := db.Preload("StatusCard").Preload("TypePark").Preload("ParkingTransaction").First(&parkingCard, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, parkingCard)
}

func GetParkingCardWithZoneByID(c *gin.Context) {
	id := c.Param("id")
	var parkingCard entity.ParkingCard

	db := config.DB()

	if err := db.Preload("ParkingZone").First(&parkingCard, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, parkingCard)
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

func DeleteParkingCard(c *gin.Context) {

	id := c.Param("id")
	fmt.Println("id: ", id)
	db := config.DB()

	if err := db.Where("parking_cards_id = ?", id).Delete(&entity.ParkingCardZone{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Card not found"})
		return
	}
	if tx := db.Exec("DELETE FROM parking_cards WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
