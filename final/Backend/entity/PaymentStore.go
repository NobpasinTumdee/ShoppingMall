package entity

import (
	"gorm.io/gorm"
	"time"
)

type PaymentStore struct {
	gorm.Model
	PayStoreName 				string 					`json:"PayStoreName" valid:"required~StoreName is required"`
	PayStorePackage 			string 					`json:"PayStorePackage" valid:"required~StorePackage is required"`
	PayStorePwa 				int 					`json:"PayStorePwa" valid:"required~Pwa is required"`
	PayStorePea 				int 					`json:"PayStorePea" valid:"required~Pea is required"`
	PayStoreRental 				int 					`json:"PayStoreRental" valid:"required~Rental is required"`
	PayStoreBook  				time.Time 				`json:"PayStoreBook"`
	PayStoreLast  				time.Time 				`json:"PayStoreLast"`
	Evidence  					string 					`json:"Evidence"`

	UserID 						uint 					`json:"UserID"`
	User   						User 					`gorm:"foreignKey:UserID"`
	
	StoreID 					uint 					`json:"StoreID"`
	Store   					Store 					`gorm:"foreignKey:StoreID"`

	PayMethodStoreID 			uint 					`json:"PayMethodStoreID" valid:"required~Status is required"`
	PaymentMethodStore   		PaymentMethodStore 		`gorm:"foreignKey:PayMethodStoreID"`

	StatusPaymentStoreID 		uint 					`json:"StatusPaymentStoreID" valid:"required~StatusPaymentStoreID is required"`
	PaymentStoreStatus   		PaymentStoreStatus 		`gorm:"foreignKey:StatusPaymentStoreID" valid:"-"`
	
	Receipt 					[]Receipt 				`gorm:"foreignKey:PaymentStoreID"`
	AdditionalPay 				[]AdditionalPay 		`gorm:"foreignKey:PaymentStoreID"`
}


type PaymentStoreStatus struct {
	gorm.Model
	PaymentStatusStore 			string 					`json:"PaymentStatusStore" valid:"required~PaymentStatusStore is required"`

	PaymentStore 				[]PaymentStore 			`gorm:"foreignKey:StatusPaymentStoreID"`
}


type PaymentMethodStore struct {
	gorm.Model
	MethodName 					string 					`json:"MethodName"`
	MethodPic 					string 					`json:"MethodPic"`

	PaymentStore 				[]PaymentStore 			`gorm:"foreignKey:PayMethodStoreID"`
	PaymentHall					[]PaymentHall			`gorm:"foreignKey:PayMethodStoreID"`

}



type AdditionalPackage struct {
	gorm.Model
	AdditionalPicture 			string 					`json:"AdditionalPicture" valid:"required~AdditionalPicture is required"`
	AdditionalName 				string 					`json:"AdditionalName" valid:"required~AdditionalName is required"`
	DescribtionPackage			string					`json:"DescribtionPackage" valid:"required~DescribtionPackage is required"`
	PricePackage				uint 					`json:"PricePackage" valid:"required~PricePackage is required"`

	AdditionalPay 				[]AdditionalPay 		`gorm:"foreignKey:AdditionalPackageID"`
}


type AdditionalPay struct {
	gorm.Model
	AdditionalPackageID 		uint 					`json:"AdditionalPackageID" valid:"required~AdditionalPackageID is required"`
	AdditionalPackage   		AdditionalPackage 		`gorm:"foreignKey:AdditionalPackageID" valid:"-"`

	PaymentStoreID 				uint 					`json:"PaymentStoreID" valid:"required~PaymentStoreID is required"`
	PaymentStore   				PaymentStore 			`gorm:"foreignKey:PaymentStoreID" valid:"-"`
}

type Receipt struct {
	gorm.Model
	DateReceipt  				time.Time 				`json:"DateReceipt"`
	DescribtionBill  			string					`json:"DescribtionBill" valid:"required~DescribtionBill is required"`
	Additional					uint					`json:"Additional"`
	TotalPrice					uint					`json:"TotalPrice"`

	PaymentStoreID 				uint 					`json:"PaymentStoreID" valid:"required~PaymentStoreID is required"`
	PaymentStore   				PaymentStore 			`gorm:"foreignKey:PaymentStoreID"`
	
	UserTaxID 					uint 					`json:"UserTaxID" valid:"required~UserTaxID is required"`
	TaxUser   					TaxUser 				`gorm:"foreignKey:UserTaxID"`

}