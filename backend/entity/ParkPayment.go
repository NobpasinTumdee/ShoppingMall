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

	BackupCard *BackupCard `gorm:"foreignKey:ParkingPaymentID"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`
}
