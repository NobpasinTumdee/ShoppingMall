package Store

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

//GET ListPaymentStore by userid
func GetPaymentStoreByid(c *gin.Context) {
	ID := c.Param("id")
	var PaymentStore []entity.PaymentStore

	db := config.DB()


	results := db.Where("user_id = ?", ID).Find(&PaymentStore)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "PaymentStore not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, PaymentStore)
}

// PUT update PaymentStore by id 
func UpdatePaymentByid(c *gin.Context) {
	var PaymentStore entity.PaymentStore
	ID := c.Param("id")
	db := config.DB()
 
	result := db.First(&PaymentStore, ID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id PaymentStore not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&PaymentStore); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&PaymentStore)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "PaymentStore successful"})
}