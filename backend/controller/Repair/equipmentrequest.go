package Repair

import (
	"net/http"
	"errors"
	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GET: List equipment history
func GetEquipmentHistory(c *gin.Context) {
	var histories []entity.EquipmentRequest

	db := config.DB()
	result := db.Find(&histories)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, histories)
}

// POST: Create new equipment request
func CreateEquipmentRequest(c *gin.Context) {
	var request entity.EquipmentRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	db := config.DB()
	if err := db.Create(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Equipment request created", "data": request})
}

// PUT: Update equipment return
func UpdateEquipmentReturn(c *gin.Context) {
	var history entity.EquipmentRequest
	historyID := c.Param("id")

	db := config.DB()
	if err := db.First(&history, historyID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "History record not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	if err := c.ShouldBindJSON(&history); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}

	if err := db.Save(&history).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Equipment return updated", "data": history})
}