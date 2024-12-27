package entity

import (
	"gorm.io/gorm"
	"time"
)

type ServiceRequest struct {
	gorm.Model
	Location 				string    	`json:"Location" valid:"required~Location is required"` 
	Describtion 			string    	`json:"Describtion" valid:"required~Describtion is required"` 
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
	Quantity 				int    		`json:"Quantity"`
	DateEquipment 			time.Time   `json:"DateEquipment"`

	ServiceRequestID       	uint      	`json:"ServiceRequestID"`
	ServiceRequest         	ServiceRequest      `gorm:"foreignKey:ServiceRequestID"`

	InventoryID       		uint      	`json:"InventoryID"`
	Inventory         		Inventory   `gorm:"foreignKey:InventoryID"`
} 