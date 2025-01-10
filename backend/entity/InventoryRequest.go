package entity

import (
	"gorm.io/gorm"
	"time"
)

type InventoryRequest struct {
	gorm.Model
	NameItem string `json:"NameItem"` 
	DateRequest time.Time    `json:"DateRequest"` 
	QuantityRequest    int       `json:"QuantityRequest"`    

	UserID       uint      `json:"UserID"`
	User         User      `gorm:"foreignKey:UserID"`

	Inventorys      []Inventory `gorm:"many2many:RequestDetails;joinForeignKey:RequestID;joinReferences:InventoryID"` 
}