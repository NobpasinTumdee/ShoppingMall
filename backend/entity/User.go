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
	Status     				string 		`json:"Status"`



	Store []Store `gorm:"foreignKey:UserID"`
	PaymentStore []PaymentStore `gorm:"foreignKey:UserID"`
	
	ServiceRequest []ServiceRequest `gorm:"foreignKey:UserID"`




}