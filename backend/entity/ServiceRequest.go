package entity

import (
	"time"
	"gorm.io/gorm"
)

type ServiceRequest struct {
	gorm.Model
	Location string 			`json:"Location"`
	ProblemDescription string 	`json:"ProblemDescription"`
	RequestDate time.Time 		`json:"RequestDate"` 
	EquipmentName string 		`json:"EquipmentName"`
	StatusService string 		`json:"StatusService"`
	RequestforRepair string 	`json:"RequestforRepair"` 

	EquipmentRequests []EquipmentRequest `gorm:"foreignKey:ServiceRequestID"`

	StoreID      uint      	`json:"StoreID"`     
	Store        Store  	`gorm:"foreignKey:StoreID"`

	UserID       uint      	`json:"UserID"`        
	User         User      	`gorm:"foreignKey:UserID"`
}