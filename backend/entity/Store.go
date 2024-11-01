package entity

import (
	"time"
	"gorm.io/gorm"
)

type Store struct {
	gorm.Model
	PicStore  			string 		`json:"PicStore"`

	SubPicOne  			string 		`json:"SubPicOne"`
	SubPicTwo  			string 		`json:"SubPicTwo"`
	SubPicThree  		string 		`json:"SubPicThree"`

	MembershipID 		uint 		`json:"MembershipID"`
	Membership   		Membership 	`gorm:"foreignKey:MembershipID"`
	
	NameStore  			string 		`json:"NameStore"`
	BookingDate  		time.Time 	`json:"BookingDate"`
	LastDay  			time.Time 	`json:"LastDay"`
	DescribtionStore  	string 		`json:"DescribtionStore"`
	StatusStore  		string 		`json:"StatusStore"`

	UserID 				uint 		`json:"UserID"`
	User   				User 		`gorm:"foreignKey:UserID"`

	ProductTypeID 		uint 		`json:"ProductTypeID"`
	ProductType   		ProductType `gorm:"foreignKey:ProductTypeID"`

	ServiceRequest 		[]ServiceRequest `gorm:"foreignKey:StoreID"`

	HistoryStore 		[]HistoryStore 	`gorm:"foreignKey:StoreID"`
	Rating 				[]Rating 		`gorm:"foreignKey:StoreID"`
}


type Membership struct {
	gorm.Model
	PackageName			string 		`json:"PackageName"`
	Day					int 		`json:"Day"`
	Pwa					int 		`json:"Pwa"`
	Pea					int 		`json:"Pea"`
	RentalFee			int 		`json:"RentalFee"`

	Store 				[]Store 	`gorm:"foreignKey:MembershipID"`
}


type HistoryStore struct {
	gorm.Model
	DateHistory			time.Time 		`json:"DateHistory"`
	
	StoreID 			uint 		`json:"StoreID"`
	Store   			Store 		`gorm:"foreignKey:StoreID"`
	
	UserID 				uint 		`json:"UserID"`
	User   				User 		`gorm:"foreignKey:UserID"`
}



type Rating struct {
	gorm.Model
	Rating				int 		`json:"Rating"`
	Comment				string 		`json:"Comment"`
	
	StoreID 			uint 		`json:"StoreID"`
	Store   			Store 		`gorm:"foreignKey:StoreID"`
	
	UserID 				uint 		`json:"UserID"`
	User   				User 		`gorm:"foreignKey:UserID"`
}