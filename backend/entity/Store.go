package entity

import (
	"time"
	"gorm.io/gorm"
)

type Store struct {
	gorm.Model
	PicStore  			string 		`json:"PicStore" valid:"required~Photo Store is required"`

	SubPicOne  			string 		`json:"SubPicOne"`
	SubPicTwo  			string 		`json:"SubPicTwo"`
	SubPicThree  		string 		`json:"SubPicThree"`
	NameStore  			string 		`json:"NameStore" valid:"required~NameStore is required"`
	BookingDate  		time.Time 	`json:"BookingDate"`
	LastDay  			time.Time 	`json:"LastDay"`
	DescribtionStore  	string 		`json:"DescribtionStore" valid:"required~DescribtionStore is required"`
	StatusStore  		string 		`json:"StatusStore"`
	StatusService  		string 		`json:"StatusService"`
	
	MembershipID 		uint 		`json:"MembershipID" valid:"required~MembershipID is required"`
	Membership   		Membership 	`gorm:"foreignKey:MembershipID"`

	UserID 				uint 		`json:"UserID" valid:"required~User ID is required"`
	User   				User 		`gorm:"foreignKey:UserID"`

	ProductTypeID 		uint 		`json:"ProductTypeID" valid:"required~ProductTypeID is required"`
	ProductType   		ProductType `gorm:"foreignKey:ProductTypeID"`

	ServiceRequest 		[]ServiceRequest `gorm:"foreignKey:StoreID"`

	Rating 				[]Rating 		`gorm:"foreignKey:StoreID"`
	BackupStore 		[]BackupStore 	`gorm:"foreignKey:StoreID"`

	ParkingCard 		[]ParkingCard `gorm:"foreignKey:StoreID"`
}


type Membership struct {
	gorm.Model
	PackageName			string 		`json:"PackageName"`
	Day					int 		`json:"Day"`
	Pwa					int 		`json:"Pwa"`
	Pea					int 		`json:"Pea"`
	RentalFee			int 		`json:"RentalFee"`
	ParkingCardCount	int 		`json:"ParkingCardCount"`

	Store 				[]Store 	`gorm:"foreignKey:MembershipID"`
}


// type HistoryStore struct {
// 	gorm.Model
// 	DateHistory			time.Time 		`json:"DateHistory"`
	
// 	StoreID 			uint 		`json:"StoreID"`
// 	Store   			Store 		`gorm:"foreignKey:StoreID"`
	
// 	UserID 				uint 		`json:"UserID"`
// 	User   				User 		`gorm:"foreignKey:UserID"`
// }



type Rating struct {
	gorm.Model
	Rating				int 		`json:"Rating"`
	Comment				string 		`json:"Comment"`
	
	StoreID 			uint 		`json:"StoreID"`
	Store   			Store 		`gorm:"foreignKey:StoreID"`
	
	UserID 				uint 		`json:"UserID"`
	User   				User 		`gorm:"foreignKey:UserID"`
}


type BackupStore struct {
	gorm.Model
	PicStoreBackup  		string 		`json:"PicStoreBackup"`

	PicOneBackup  			string 		`json:"PicOneBackup"`
	PicTwoBackup   			string 		`json:"PicTwoBackup"`
	PicThreeBackup  		string 		`json:"PicThreeBackup"`

	MembershipBackup 		uint 		`json:"MembershipBackup"`
	
	NameBackup  			string 		`json:"NameBackup"`
	BookingBackup  			time.Time 	`json:"BookingBackup"`
	LastDayBackup  			time.Time 	`json:"LastDayBackup"`
	DescribtionStoreB  		string 		`json:"DescribtionStoreB"`

	ProductTypeIDB 			int 		`json:"ProductTypeIDB"`

	UserID 					uint 		`json:"UserID"`
	User   					User 		`gorm:"foreignKey:UserID"`

	StoreID 				uint 		`json:"StoreID"`
	Store   				Store 		`gorm:"foreignKey:StoreID"`
}
