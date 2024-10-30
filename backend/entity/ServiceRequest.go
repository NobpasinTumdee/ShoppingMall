package entity

import (
	"time"
	"gorm.io/gorm"
)

type ServiceRequest struct {
	gorm.Model
	Location  				string 		`json:"Location"`
	ProblemDescribtion  	string 		`json:"ProblemDescribtion"`
	RequestDate  			time.Time 	`json:"RequestDate"`
	StatusService  			string		`json:"StatusService"`

	UserID 					uint 		`json:"UserID"`
	User   					User 		`gorm:"foreignKey:UserID"`
	
	StoreID 				uint 		`json:"StoreID"`
	Store   				Store 		`gorm:"foreignKey:StoreID"`
	
	HistoryEquipment []HistoryEquipment `gorm:"foreignKey:ServiceRequestID"`
}