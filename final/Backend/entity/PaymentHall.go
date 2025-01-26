package entity

import (
	"time"
	"gorm.io/gorm"
)
type PaymentHall struct {
	gorm.Model
	PaymentDate    			time.Time 			`json:"PaymentDate"`
	TotalAmount    			int       			`json:"TotalAmount"`
	
	BookingHallID  			uint      			`json:"BookingHallID"`
	BookingHall	   			BookingHall			`gormm:"foreignKey:BookingHallID"`

	StatusPaymentHallID 	uint 				`json:"StatusPaymentHallID"`
	StatusPaymentHall   	StatusPaymentHall 	`gorm:"foreignKey:StatusPaymentHallID"`

	PayMethodStoreID 		uint 				`json:"PayMethodStoreID"`
	PaymentMethodStore   	PaymentMethodStore 	`gorm:"foreignKey:PayMethodStoreID"`
	
	ReceiptImageURL			string    			`gorm:"type:longtext"`

	Taxinvoice     			[]TaxInvoice   		`gorm:"foreignKey:PaymentHallID"`

}
type StatusPaymentHall struct{
	gorm.Model
	StatusName				string				`json:"StatusName"`

	PaymentHall				[]PaymentHall		`gorm:"foreignkey:StatusPaymentHallID"`
}
type TaxInvoice struct {
	gorm.Model
	UserTaxID     		 	uint        		`json:"UserTaxID"`
	TaxUser        			TaxUser     		`gorm:"foreignKey:UserTaxID"`

	PaymentHallID  			uint        		`json:"PaymentHallID"`
	PaymentHall    			PaymentHall 		`gorm:"foreignKey:PaymentHallID"`

	IssueDate      			time.Time   		`json:"IssueDate" valid:"required~IssueDate is required"`
}