package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName  				string 		`json:"UserName"`
	Password     			string 		`json:"Password"`
	Email     				string 		`json:"Email"`
	Profile     			string 		`json:"Profile"`
	ProfileBackground     	string 		`json:"ProfileBackground"`
	FirstName     			string 		`json:"FirstName"`
	LastName     			string 		`json:"LastName"`
	Age     				int 		`json:"Age"`
	Tel     				string 		`json:"Tel"`
	Status     				string 		`json:"Status"`



	Store []Store `gorm:"foreignKey:UserID"`
	PaymentStore []PaymentStore `gorm:"foreignKey:UserID"`
	
	ServiceRequest []ServiceRequest `gorm:"foreignKey:UserID"`

	HistoryStore []HistoryStore `gorm:"foreignKey:UserID"`
	Rating []Rating `gorm:"foreignKey:UserID"`

	MessageBoard []MessageBoard `gorm:"foreignKey:UserID"`

	BackupCard []BackupCard `gorm:"foreignKey:UserID"`
	ParkingPayment []ParkingPayment `gorm:"foreignKey:UserID"`
	ParkingCard []ParkingCard `gorm:"foreignKey:UserID"`
}


type MessageBoard struct {
	gorm.Model
	PicNews					string 		`json:"PicNews"`
	TextHeader				string 		`json:"TextHeader"`
	DescribtionNews			string 		`json:"DescribtionNews"`
	
	UserID 					uint 		`json:"UserID"`
	User   					User 		`gorm:"foreignKey:UserID"`
}