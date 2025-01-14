package entity

import (
	"time"
	"gorm.io/gorm"
)

type Hall struct {
	gorm.Model
	HallName       string          `json:"HallName"`
	Capacity       int             `json:"Capacity"`
	Location       string          `json:"Location"`
	ImageHall      string          `json:"ImageHall"`
	Description    string          `json:"Description"`
	PricePerHour   int             `json:"price_per_hour"`
	HallBookings   []BookingHall   `gorm:"foreignKey:HallID"`
}



type Facilities struct {
	gorm.Model
	FacilitiesName string        `json:"FacilitiesName"`
	Price          float64       `json:"Price"`
	BookingHall    []BookingHall `gorm:"foreignKey:FacilitiesID"`
}


type BookingHall struct {
	gorm.Model
	UserID          uint            `json:"UserID" valid:"required~User ID is required"`
	User   			User 			`gorm:"foreignKey:UserID"`

	HallID          uint            `json:"HallID"`
	Hall   			Hall 			`gorm:"foreignKey:HallID"`

	StatusPaymentHallID uint 		`json:"StatusPaymentHallID"`
	StatusPaymentHall   StatusPaymentHall `gorm:"foreignKey:StatusPaymentHallID"`
	
	FacilitiesID	uint			`json:"FacilitiesID"`
	Facilities		Facilities		`gorm:"foreignKey:FacilitiesID"`

	StartDateTime   time.Time       `json:"StartDateTime"`
	EndDateTime     time.Time       `json:"EndDateTime"`
	    
	CustomerName    string          `json:"CustomerName" valid:"required~CustomerName is required"`
	CustomerEmail   string          `json:"CustomerEmail" valid:"required~CustomerEmail is required"`
	CustomerPhone   string          `json:"CustomerPhone"`
	CustomerAddress string          `json:"CustomerAddress"`
	
	QuantityF		int				`json:"QuantityF"`
	
	PaymentHall     []PaymentHall   `gorm:"foreignKey:BookingHallID"`
}

type PaymentHall struct {
	gorm.Model
	BookingHallID  uint      	`json:"BookingHallID"`
	BookingHall	   BookingHall	`gormm:"foreignKey:BookingHallID"`

	Amount         int       `json:"amount"`
	PaymentDate    time.Time `json:"payment_date"`
	PaymentMethod  string    `json:"payment_method"`
	IssueDate      time.Time `json:"issue_date"`
	TaxAmount      int       `json:"tax_amount"`
	TotalAmount    int       `json:"total_amount"`
	IssuedBy       string    `json:"issued_by"`

	Taxinvoice     []Taxinvoice   `gorm:"foreignKey:PaymentHallID"`

}
type StatusPaymentHall struct{
	gorm.Model
	StatusName		string	`json:"StatusName"`

	BookingHall		[]BookingHall	`gorm:"foreignkey:StatusPaymentHall"`
}
type Taxinvoice struct {
	gorm.Model
	
	UserTaxID      uint        `json:"UserTaxID" valid:"required~UserTaxID is required"`
	TaxUser        TaxUser     `gorm:"foreignKey:UserTaxID"`

	PaymentHallID  uint        `json:"PaymentHallID"`
	PaymentHall    PaymentHall `gorm:"foreignKey:PaymentHallID"`

	InvoiceNumber  string      `json:"InvoiceNumber" valid:"required~InvoiceNumber is required"`
	IssueDate      time.Time   `json:"IssueDate" valid:"required~IssueDate is required"`
	TotalAmount    int         `json:"TotalAmount" valid:"required~TotalAmount is required"`
	TaxAmount      int         `json:"TaxAmount" valid:"required~TaxAmount is required"`
}
