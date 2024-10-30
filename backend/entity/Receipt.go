package entity

import (
	"time"
	"gorm.io/gorm"
)

type Receipt struct {
	gorm.Model
	DateReceipt  			time.Time 		`json:"DateReceipt"`
	DescribtionBill  		string			`json:"DescribtionBill"`

	PaymentStoreID 			uint 			`json:"PaymentStoreID"`
	PaymentStore   			PaymentStore 	`gorm:"foreignKey:PaymentStoreID"`

}