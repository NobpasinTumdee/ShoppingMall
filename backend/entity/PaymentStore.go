package entity

import (
	"gorm.io/gorm"
	"time"
)

type PaymentStore struct {
	gorm.Model
	StatusPaymentStore 			string 		`json:"StatusPaymentStore"`
	PayStoreName 				string 		`json:"PayStoreName"`
	PayStorePackage 			string 		`json:"PayStorePackage"`
	PayStorePwa 				int 		`json:"PayStorePwa"`
	PayStorePea 				int 		`json:"PayStorePea"`
	PayStoreRental 				int 		`json:"PayStoreRental"`
	PayStoreBook  				time.Time 	`json:"PayStoreBook"`
	PayStoreLast  				time.Time 	`json:"PayStoreLast"`

	UserID 			uint 		`json:"UserID"`
	User   			User 		`gorm:"foreignKey:UserID"`
	
	StoreID 		uint 		`json:"StoreID"`
	Store   		Store 		`gorm:"foreignKey:StoreID"`

	Receipt 		[]Receipt 	`gorm:"foreignKey:PaymentStoreID"`

	PayMethodStoreID 				uint 				`json:"PayMethodStoreID"`
	PaymentMethodStore   			PaymentMethodStore 	`gorm:"foreignKey:PayMethodStoreID"`
}

type PaymentMethodStore struct {
	gorm.Model
	MethodName 			string 		`json:"MethodName"`
	MethodPic 			string 		`json:"MethodPic"`

	PaymentStore 		[]PaymentStore 	`gorm:"foreignKey:PayMethodStoreID"`
}

type Receipt struct {
	gorm.Model
	DateReceipt  			time.Time 		`json:"DateReceipt"`
	DescribtionBill  		string			`json:"DescribtionBill"`

	PaymentStoreID 			uint 			`json:"PaymentStoreID"`
	PaymentStore   			PaymentStore 	`gorm:"foreignKey:PaymentStoreID"`
	
	UserTaxID 				uint 			`json:"UserTaxID"`
	TaxUser   				TaxUser 		`gorm:"foreignKey:UserTaxID"`

}