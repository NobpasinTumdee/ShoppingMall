package CarPark

import (
	//"errors" // เพิ่ม import สำหรับ package errors
	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"

	//"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
	"net/http"
)


func GetListZone(c *gin.Context) {
	var zones []entity.ParkingZone
	
	db := config.DB()

	if err := db.Preload("ParkingCard").Preload("TypePark").Find(&zones).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, zones)
}

func UpdateParkingZone(c *gin.Context) {
	var zone entity.ParkingZone
	ZoneID := c.Param("id")
	db := config.DB()
	result := db.First(&zone, ZoneID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&zone); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to mappayload"})
		return
	}
	result = db.Save(&zone)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
    c.JSON(http.StatusOK, gin.H{"message": "ParkingZone updated successfully"})
}
