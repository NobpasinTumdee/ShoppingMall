package entity

import (
	"gorm.io/gorm"
	"time"
)

type ServiceRequest struct {
	gorm.Model
	Location 				string    	`json:"Location"` 
	Describtion 			string    	`json:"Describtion"` 
	RequestDate 			time.Time   `json:"RequestDate"` 
	StatusService 			string    	`json:"StatusService"` 
	

	StoreID       			uint      	`json:"StoreID"`
	Store         			Store      	`gorm:"foreignKey:StoreID"`

	UserID       			uint      	`json:"UserID"`
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