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

	// ความสัมพันธ์กับ RequestDetail
	RequestDetails []RequestDetail `gorm:"foreignKey:RequestID"` 
}

type RequestDetail struct {
	gorm.Model

	InventoryID uint      `json:"InventoryID"`
	Inventory   Inventory `gorm:"foreignKey:InventoryID"`

	RequestID uint             `json:"RequestID"`
	Request   InventoryRequest `gorm:"foreignKey:RequestID"`

	StatusRequest bool `json:"StatusRequest"`
	Reason string `json:"Reason"`
}