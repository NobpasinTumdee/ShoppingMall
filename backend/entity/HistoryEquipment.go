package entity

import (
	"time"
	"gorm.io/gorm"
)

type HistoryEquipment struct {
	gorm.Model
	DateEquipment 				time.Time 			`json:"DateEquipment"`

	ServiceRequestID 			uint 				`json:"ServiceRequestID"`
	ServiceRequest   			ServiceRequest 		`gorm:"foreignKey:ServiceRequestID"`
	
	EquipmentID 				uint 				`json:"EquipmentID"`
	Equipment   				ServiceRequest 		`gorm:"foreignKey:EquipmentID"`

}