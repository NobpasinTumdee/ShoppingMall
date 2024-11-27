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
	IsAvailable    bool            `json:"IsAvailable"`
	ImageHall      string          `json:"ImageHall"`
	Description    string          `json:"Description"`
	PricePerHour   int             `json:"price_per_hour"`
	HallBookings   []BookingHall   `gorm:"foreignKey:HallID"`
	HallFacilities []Facilities    `gorm:"foreignKey:HallID"`
}

type FacilityList struct {
	gorm.Model
	FacilityName string        `json:"facility_name"`
	Description  string        `json:"description"`
	Facilities   []Facilities  `gorm:"foreignKey:FacilityListID"`
}

type Facilities struct {
	gorm.Model
	HallID         uint   `json:"HallID"`
	FacilityListID uint   `json:"FacilityListID"`
	Quantity       int    `json:"Quantity"`
}

type BookingHall struct {
	gorm.Model
	UserID          uint            `json:"UserID"`
	HallID          uint            `json:"HallID"`
	StartDateTime   time.Time       `json:"StartDateTime"`
	EndDateTime     time.Time       `json:"EndDateTime"`
	Status          string          `json:"Status"`          // ใช้ enum สำหรับสถานะ
	CustomerName    string          `json:"CustomerName"`
	CustomerEmail   string          `json:"CustomerEmail"`
	CustomerPhone   string          `json:"CustomerPhone"`
	CustomerAddress string          `json:"CustomerAddress"`
	CancelDate      *time.Time      `json:"CancelDate,omitempty"` // ใช้ pointer ถ้าอนุญาตให้ null
	TotalCost       int             `json:"TotalCost"`     // เพิ่มฟิลด์นี้
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
