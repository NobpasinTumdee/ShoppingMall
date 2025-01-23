package entity

import (
	"gorm.io/gorm"
	"time"
)

type PaymentStore struct {
	gorm.Model
	StatusPaymentStore 			string 		`json:"StatusPaymentStore" valid:"required~Status is required"`
	PayStoreName 				string 		`json:"PayStoreName" valid:"required~StoreName is required"`
	PayStorePackage 			string 		`json:"PayStorePackage" valid:"required~StorePackage is required"`
	PayStorePwa 				int 		`json:"PayStorePwa" valid:"required~Pwa is required"`
	PayStorePea 				int 		`json:"PayStorePea" valid:"required~Pea is required"`
	PayStoreRental 				int 		`json:"PayStoreRental" valid:"required~Rental is required"`
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
	PaymentHall			[]PaymentHall	`gorm:"foreignKey:PayMethodStoreID"`
}

type Receipt struct {
	gorm.Model
	DateReceipt  			time.Time 		`json:"DateReceipt"`
	DescribtionBill  		string			`json:"DescribtionBill" valid:"required~DescribtionBill is required"`

	PaymentStoreID 			uint 			`json:"PaymentStoreID" valid:"required~PaymentStoreID is required"`
	PaymentStore   			PaymentStore 	`gorm:"foreignKey:PaymentStoreID"`
	
	UserTaxID 				uint 			`json:"UserTaxID" valid:"required~UserTaxID is required"`
	TaxUser   				TaxUser 		`gorm:"foreignKey:UserTaxID"`

}