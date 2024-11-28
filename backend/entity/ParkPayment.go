package entity

import (
	"gorm.io/gorm"
	"time"
)

type ParkingPayment struct {
	gorm.Model
	TaxID       string    `json:"TaxID"`
	PaymentDate time.Time `json:"PaymentDate"`
	IsLostCard  bool      `json:"IsLostCard"`
	IsPaid      bool      `json:"IsPaid"`
	IsCash      bool      `json:"IsCash"`
	
	UsageCardID uint      `json:"UsageCardID"`
	UsageCard   UsageCard `gorm:"foreignKey:UsageCardID"`
}
