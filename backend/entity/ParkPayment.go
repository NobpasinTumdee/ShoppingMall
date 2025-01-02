package entity

import (
	"gorm.io/gorm"
	"time"
)

type ParkingPayment struct {
	gorm.Model
	TaxID          string    `json:"TaxID"`
	PaymentDate    time.Time `json:"PaymentDate"`
	Amount         int       `json:"Amount"`
	DiscountAmount int       `json:"DiscountAmount"`
	NetAmount      int       `json:"NetAmount"`
	IsCash         bool      `json:"IsCash"`

	ParkingCardID string      `json:"ParkingCardID"`
	ParkingCard   ParkingCard `gorm:"foreignKey:ParkingCardID"`

	ParkingTransactionID uint               `json:"ParkingTransactionID"`
	ParkingTransaction   ParkingTransaction `gorm:"foreignKey:ParkingTransactionID"`

	StatusPaymentID uint          `json:"StatusPaymentID"`
	StatusPayment   StatusPayment `gorm:"foreignKey:StatusPaymentID"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`
}
