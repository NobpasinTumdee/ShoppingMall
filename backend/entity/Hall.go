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

	StatusPaymentHallID uint 		`json:"StatusPaymentHallID"`
	StatusPaymentHall   StatusPaymentHall `gorm:"foreignKey:StatusPaymentHallID"`

	PayMethodStoreID 				uint 				`json:"PayMethodStoreID"`
	PaymentMethodStore   			PaymentMethodStore 	`gorm:"foreignKey:PayMethodStoreID"`

	Amount         int       `json:"Amount"`
	PaymentDate    time.Time `json:"PaymentDate"`
	PaymentMethod  string    `json:"PaymentMethod"`
	TotalAmount    int       `json:"total_amount"`

	Taxinvoice     []Taxinvoice   `gorm:"foreignKey:PaymentHallID"`

}
type StatusPaymentHall struct{
	gorm.Model
	StatusName		string		`json:"StatusName"`

	PaymentHall		[]PaymentHall	`gorm:"foreignkey:StatusPaymentHall"`
}
type Taxinvoice struct {
	gorm.Model
	
	UserTaxID      uint        `json:"UserTaxID" valid:"required~UserTaxID is required"`
	TaxUser        TaxUser     `gorm:"foreignKey:UserTaxID"`

	PaymentHallID  uint        `json:"PaymentHallID"`
	PaymentHall    PaymentHall `gorm:"foreignKey:PaymentHallID"`

	IssueDate      time.Time   `json:"IssueDate" valid:"required~IssueDate is required"`
	TaxAmount      int         `json:"TaxAmount" valid:"required~TaxAmount is required"`
}
