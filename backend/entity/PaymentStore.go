package entity

import (
	"gorm.io/gorm"
)

type PaymentStore struct {
	gorm.Model

	UserID 			uint 		`json:"UserID"`
	User   			User 		`gorm:"foreignKey:UserID"`
	
	StoreID 		uint 		`json:"StoreID"`
	Store   		Store 		`gorm:"foreignKey:StoreID"`

	Receipt 		[]Receipt 	`gorm:"foreignKey:PaymentStoreID"`
}