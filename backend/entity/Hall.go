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

	StartDateTime   time.Time       `json:"StartDateTime"`
	EndDateTime     time.Time       `json:"EndDateTime"`
	Status          string          `json:"Status"`          
	CustomerName    string          `json:"CustomerName" valid:"required~CustomerName is required"`
	CustomerEmail   string          `json:"CustomerEmail" valid:"required~CustomerEmail is required"`
	CustomerPhone   string          `json:"CustomerPhone"`
	CustomerAddress string          `json:"CustomerAddress"`
	
	FacilitiesID	uint			`json:"FacilitiesID"`
	Facilities		Facilities		`gorm:"foreignKey:FacilitiesID"`
	QuantityF		int				`json:"QuantityF"`
	PaymentHall     []PaymentHall   `gorm:"foreignKey:BookingHallID"`
}

type PaymentHall struct {
	gorm.Model
	BookingHallID  uint      `json:"booking_hall_id"`
	Amount         int       `json:"amount"`
	PaymentDate    time.Time `json:"payment_date"`
	PaymentMethod  string    `json:"payment_method"`
	TransactionID  string    `json:"transaction_id"`  // เพิ่มฟิลด์นี้
	IssueDate      time.Time `json:"issue_date"`
	TaxAmount      int       `json:"tax_amount"`
	TotalAmount    int       `json:"total_amount"`
	IssuedBy       string    `json:"issued_by"`
}