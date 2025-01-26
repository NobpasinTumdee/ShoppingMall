package entity

import (
	"gorm.io/gorm"
	"time"
)

type ServiceRequest struct {
	gorm.Model
	Location 				string    	`json:"Location" valid:"required~Location is required"` 
	Description 			string    	`json:"Description" valid:"required~Description is required"` 
	RequestDate 			time.Time   `json:"RequestDate" valid:"required~RequestDate is required"`
	StatusService 			string    	`json:"StatusService"` 
	

	StoreID       			uint      	`json:"StoreID" valid:"required~StoreID is required"`
	Store         			Store      	`gorm:"foreignKey:StoreID"`

	UserID       			uint      	`json:"UserID" valid:"required~UserID is required"`
	User         			User      	`gorm:"foreignKey:UserID"`

	EquipmentRequest []EquipmentRequest `gorm:"foreignKey:ServiceRequestID"`
}

type EquipmentRequest struct {
	gorm.Model
	Quantity        int       `json:"Quantity" valid:"required~Quantity is required,range(1|1000)~Quantity must be greater than 0"`
	DateEquipment   time.Time `json:"DateEquipment" valid:"required~DateEquipment is required"`
	ServiceRequestID uint     `json:"ServiceRequestID" valid:"required~ServiceRequestID is required"`
	ServiceRequest  ServiceRequest `gorm:"foreignKey:ServiceRequestID" valid:"-"`
	InventoryID uint     `json:"InventoryID" valid:"required~InventoryID is required"`
	Inventory   Inventory `gorm:"foreignKey:InventoryID" valid:"-"`
}
