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
	IsCash      bool      `json:"IsCash"`

	ParkingCardID string      `json:"ParkingCardID"`
	ParkingCard   ParkingCard `gorm:"foreignKey:ParkingCardID"`

	ParkingTransactionID uint                `json:"ParkingTransactionID"`
	ParkingTransaction   ParkingTransaction `gorm:"foreignKey:ParkingTransactionID"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`
}
