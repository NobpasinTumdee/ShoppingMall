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
		
    c.JSON(http.StatusOK, gin.H {
		"cards": cards,
		// "zones": zones,
		// "cardzone": cardzone,
	})
}

