package entity

import (
	"gorm.io/gorm"
	"time"
)

type ParkingPayment struct {
	gorm.Model
	PaymentDate    time.Time   `json:"PaymentDate"`
	Amount         int         `json:"Amount"`
	DiscountAmount int         `json:"DiscountAmount"`
	NetAmount      int         `json:"NetAmount"`
	CashReceived   int         `json:"CashReceived"` // เงินสด
	Change         int         `json:"Change"`       // เงินทอน
	IsCash         bool        `json:"IsCash"`
	IsPaid         bool        `json:"IsPaid"`
	ParkingCardID  string      `json:"ParkingCardID"`
	ParkingCard    ParkingCard `gorm:"foreignKey:ParkingCardID"`

	ParkingTransactionID uint               `json:"ParkingTransactionID"`
	ParkingTransaction   ParkingTransaction `gorm:"foreignKey:ParkingTransactionID"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`
}

type ParkingFeePolicy struct {
	gorm.Model
	InitialFee     int       `json:"InitialFee"`
	AddBase_Fee    int       `json:"AddBase_Fee"`
	Time_Increment time.Time `json:"Time_Increment"`
	Discount       int       `json:"Discount"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	ParkingCard []ParkingCard `gorm:"foreignKey:ParkingFeePolicyID"`
}
