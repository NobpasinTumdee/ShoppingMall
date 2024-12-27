package entity

import (
	"time"

	"gorm.io/gorm"
)

type EquipmentRequest struct {
	gorm.Model
	DateEquipment time.Time 	`json:"DateEquipment"`
	EquipName string 			`json:"EquipName"`
	Quantity int 				`json:"Quantity"`

	InventoryID      uint      	`json:"InventoryID"`     
	Inventory        Inventory  `gorm:"foreignKey:InventoryID"`

	ServiceRequestID      uint      		`json:"ServiceRequestID"`
	ServiceRequest        ServiceRequest  	`gorm:"foreignKey:ServiceRequestID"`

}