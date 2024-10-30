package entity

import (
	"time"
	"gorm.io/gorm"
)

type Store struct {
	gorm.Model
	PicStore  			string 		`json:"PicStore"`
	NameStore  			string 		`json:"NameStore"`
	BookingDate  		time.Time 	`json:"BookingDate"`
	LastDay  			time.Time 	`json:"LastDay"`
	DescribtionStore  	string 		`json:"DescribtionStore"`
	StatusStore  		string 		`json:"StatusStore"`

	UserID 				uint 		`json:"UserID"`
	User   				User 		`gorm:"foreignKey:UserID"`

	ProductTypeID 		uint 		`json:"ProductTypeID"`
	ProductType   		ProductType `gorm:"foreignKey:ProductTypeID"`

	ServiceRequest []ServiceRequest `gorm:"foreignKey:StoreID"`
}