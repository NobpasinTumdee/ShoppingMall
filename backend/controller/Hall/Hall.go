package Hall

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

func ListHall(c *gin.Context){
	var hall []entity.Hall

	db := config.DB()

	results := db.Select("id, hall_name, capacity, location, is_available, image_hall, description, price_per_hour").Find(&hall)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, hall)
}

func GetHall(c *gin.Context){
	ID := c.Param("id")
	var hall entity.Hall

	db := config.DB()

	results := db.Where("id = ?", ID).First(&hall)
	if results.Error != nil{
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Hall not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, hall)
}