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

	UserID          uint          `json:"UserID" valid:"required~User ID is required"`
	User            User          `gorm:"foreignKey:UserID"`

	HallID          uint          `json:"HallID" valid:"required~Hall ID is required"`
	Hall            Hall          `gorm:"foreignKey:HallID"`

	FacilitiesID    uint          `json:"FacilitiesID" valid:"required~Facilities ID is required"`
	Facilities      Facilities    `gorm:"foreignKey:FacilitiesID"`

	StartDateTime   time.Time     `json:"StartDateTime" valid:"required~StartDateTime is required"`
	EndDateTime     time.Time     `json:"EndDateTime" valid:"required~End date and time are required,endafterstart~EndDateTime must be after StartDateTime"`
	CustomerName    string        `json:"CustomerName" valid:"required~CustomerName is required"`
	CustomerEmail   string        `json:"CustomerEmail" valid:"required~CustomerEmail is required,email~Invalid email format"`
	CustomerPhone   string        `json:"CustomerPhone" valid:"optional~Invalid phone number format"`
	CustomerAddress string        `json:"CustomerAddress" valid:"optional"`
	Status          bool          `json:"Status"`

	QuantityF       int           `json:"QuantityF" valid:"required~Quantity of facilities is required,range(1|100)~Quantity must be between 1 and 100"`

	PaymentHall     []PaymentHall `gorm:"foreignKey:BookingHallID"`
}


