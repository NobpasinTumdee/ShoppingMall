package entity

import (
	"time"
	"gorm.io/gorm"
)

type Hall struct {
	gorm.Model
	HallName       string          `json:"hall_name"`
	Capacity       int             `json:"capacity"`
	Location       string          `json:"location"`
	IsAvailable    bool            `json:"is_available"`
	ImageHall      string          `json:"image_hall"`
	Description    string          `json:"description"`
	PricePerHour   int             `json:"price_per_hour"`
	HallBookings   []BookingHall   `gorm:"foreignKey:HallID" json:"hall_bookings"`
	HallFacilities []Facilities    `gorm:"foreignKey:HallID" json:"hall_facilities"`
}

type FacilityList struct {
	gorm.Model
	FacilityName string        `json:"facility_name"`
	Description  string        `json:"description"`
	Facilities   []Facilities  `gorm:"foreignKey:FacilityListID" json:"facilities"`
}

type Facilities struct {
	gorm.Model
	HallID         uint   `json:"hall_id"`
	FacilityListID uint   `json:"facility_list_id"`
	Quantity       int    `json:"quantity"`
}

type BookingHall struct {
	gorm.Model
	UserID          uint            `json:"user_id"`
	HallID          uint            `json:"hall_id"`
	StartDateTime   time.Time       `json:"start_date_time"`
	EndDateTime     time.Time       `json:"end_date_time"`
	Status          string          `json:"status"`          // ใช้ enum สำหรับสถานะ
	CustomerName    string          `json:"customer_name"`
	CustomerEmail   string          `json:"customer_email"`
	CustomerPhone   string          `json:"customer_phone"`
	CustomerAddress string          `json:"customer_address"`
	CancelDate      *time.Time      `json:"cancel_date,omitempty"` // ใช้ pointer ถ้าอนุญาตให้ null
	TotalCost       int             `json:"total_cost"`     // เพิ่มฟิลด์นี้
	PaymentHall     []PaymentHall   `gorm:"foreignKey:BookingHallID" json:"payment_hall"`
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
