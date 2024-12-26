package entity

import (
	"gorm.io/gorm"
)

type Inventory struct {
	gorm.Model
	InventoryName string    `json:"InventoryName"` 
	QuantityInventory    int       `json:"QuantityInventory"`    

	CategoryID       uint      `json:"CategoryID"`    
	CategoryInventory         CategoryInventory      `gorm:"foreignKey:CategoryID"` 
}

type CategoryInventory struct {
	gorm.Model
	CategoryName string    `json:"CategoryName"`

	Inventorys []Inventory `gorm:"foreignKey:CategoryID"`
} 