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

	RequestDetails []RequestDetail `gorm:"foreignKey:InventoryID"`

	EquipmentRequest []EquipmentRequest		`gorm:"foreignKey:InventoryID"`
}

type CategoryInventory struct {
	gorm.Model
	CategoryName string    `json:"CategoryName"`

	Inventorys []Inventory `gorm:"foreignKey:CategoryID"`
}