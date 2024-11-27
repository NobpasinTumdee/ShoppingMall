package Inventory

import (
	"net/http"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	
)

// GET /inventory
func ListInventory(c *gin.Context) {

	var Inventory []entity.Inventory


	db := config.DB()

	results := db.Preload("CategoryInventory").Select("id, inventory_name, quantity_inventory, category_id").Find(&Inventory)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, Inventory)
}

// GET /CategoryInventory
func ListCategoryInventory(c *gin.Context) {

	var CategoryInventory []entity.CategoryInventory


	db := config.DB()

	results := db.Select("id, category_name").Find(&CategoryInventory)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, CategoryInventory)
}