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
	StatusService bool 			`json:"StatusService"`

	EquipmentRequests []EquipmentRequest `gorm:"foreignKey:ServiceRequstID"`

	StoreID      uint      	`json:"StoreID"`     
	Store        Store  	`gorm:"foreignKey:StoreID"`

	UserID       uint      	`json:"UserID"`        
	User         User      	`gorm:"foreignKey:UserID"`
}