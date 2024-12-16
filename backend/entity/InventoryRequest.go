package entity

import (
	"gorm.io/gorm"
)

type InventoryRequest struct {
	gorm.Model
	DateRequest string    `json:"DateRequest"` 
	QuantityRequest    int       `json:"QuantityRequest"`    

	UserID       uint      `json:"UserID"`
	User         User      `gorm:"foreignKey:UserID"`

	Inventorys      []Inventory `gorm:"many2many:RequestDetails;joinForeignKey:RequestID;joinReferences:InventoryID"` 
}