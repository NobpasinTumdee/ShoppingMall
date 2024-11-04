package Store

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

//GET ListStore by Floor
func GetStoreByFloor(c *gin.Context) {
	ID := c.Param("id")
	var Stores []entity.Store

	db := config.DB()


	// Query the user by ID
	results := db.Where("product_type_id = ?", ID).Find(&Stores)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Store not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Stores)
}

// PUT update Store by id 
func UpdateStoreByid(c *gin.Context) {
	var Store entity.Store
	StoreID := c.Param("id")
	db := config.DB()
 
	result := db.First(&Store, StoreID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id Store not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&Store); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&Store)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}