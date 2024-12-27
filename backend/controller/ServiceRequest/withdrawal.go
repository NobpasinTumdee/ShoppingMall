package servicerequest

import (
	"errors"
	"net/http"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)
//GET Equipment BY Service id
func GetEquipmentRequest(c *gin.Context) {
	ServiceID := c.Param("id")
	var Equipment []entity.EquipmentRequest
	db := config.DB()


	results := db.Preload("Inventory").Preload("ServiceRequest").Preload("Inventory.CategoryInventory").Where("service_request_id = ?", ServiceID).Find(&Equipment)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Equipment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Equipment)
}
// POST Equipment
func CreateEquipment(c *gin.Context) {
	var Equipment entity.EquipmentRequest
	if err := c.ShouldBindJSON(&Equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()

	u := entity.EquipmentRequest{
		Quantity:        	Equipment.Quantity,
		DateEquipment:      Equipment.DateEquipment,
		ServiceRequestID:   Equipment.ServiceRequestID,
		InventoryID:   		Equipment.InventoryID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Equipment success", "data": u})
}
// PUT Inventory by id 
func UpdateInventoryByid(c *gin.Context) {
	var Inventory entity.Inventory
	InventoryID := c.Param("id")
	db := config.DB()
 
	result := db.First(&Inventory, InventoryID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id Inventory not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&Inventory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&Inventory)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}
// DELETE /EquipmentRequest/:id
func DeleteEquipment(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM equipment_requests WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// PUT service by id 
func UpdateServiceByid(c *gin.Context) {
	var Service entity.ServiceRequest
	ServiceID := c.Param("id")
	db := config.DB()
 
	result := db.First(&Service, ServiceID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id Service not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&Service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&Service)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}