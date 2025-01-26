package entity

import (
	"gorm.io/gorm"
	"time"
)

type InventoryRequest struct {
	gorm.Model
	NameItem string `json:"NameItem" valid:"required~NameItem is required"` 
	DateRequest time.Time    `json:"DateRequest" valid:"required~DateRequest is required"` 
	QuantityRequest    int       `json:"QuantityRequest" valid:"required~QuantityRequest is required"`


	UserID          uint      `json:"UserID" valid:"required~User ID is required"`          
	User            User      `gorm:"foreignKey:UserID" valid:"-"`

	// ความสัมพันธ์กับ RequestDetail
	RequestDetails []RequestDetail `gorm:"foreignKey:RequestID"` 
}

type RequestDetail struct {
	gorm.Model

	InventoryID uint      `json:"InventoryID" valid:"required~Inventory ID is required"`
	Inventory   Inventory `gorm:"foreignKey:InventoryID"`

	RequestID uint             `json:"RequestID" valid:"required~Request ID is required"`
	Request   InventoryRequest `gorm:"foreignKey:RequestID" valid:"-"`

	StatusRequest bool `json:"StatusRequest"`
	Reason string `json:"Reason" valid:"required~Reason is required"`
	
}