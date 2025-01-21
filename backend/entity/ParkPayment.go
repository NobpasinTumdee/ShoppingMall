package entity

import (
	"gorm.io/gorm"
	"time"
)

type ParkingPayment struct {
	gorm.Model
	PaymentDate    time.Time   `json:"PaymentDate"`
	Amount         int         `json:"Amount"` // ราคา ยังไม่หักส่วนลด
	DiscountAmount int         `json:"DiscountAmount"` // ราคา ส่วนลด
	NetAmount      int         `json:"NetAmount"` // ราคา หลังหักส่วนลด
	CashReceived   int         `json:"CashReceived"` // เงินสด
	Change         int         `json:"Change"`       // เงินทอน
	IsCash         bool        `json:"IsCash"`
	IsPaid         bool        `json:"IsPaid"`

	ParkingUsageCardID uint               `json:"ParkingUsageCardID"`
	ParkingUsageCard   ParkingUsageCard `gorm:"foreignKey:ParkingUsageCardID"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`
}

type ParkingFeePolicy struct {
	gorm.Model
	InitialFee     int       `json:"InitialFee"`
	AddBase_Fee    int       `json:"AddBase_Fee"`
	Time_Increment int `json:"Time_Increment"`
	Discount       int       `json:"Discount"`

	TypeCardID uint     `json:"TypeCardID"`
	TypeCard   TypeCard `gorm:"foreignKey:TypeCardID"`

	ParkingCard []ParkingCard `gorm:"foreignKey:ParkingFeePolicyID"`
}
