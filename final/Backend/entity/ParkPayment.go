package entity

import (
	"gorm.io/gorm"
	"time"
)

type ParkingPayment struct {
	gorm.Model
	ReceiptNo      string    `json:"ReceiptNo" valid:"required~ReceiptNo is required,matches(^EXT\\d{5}$)~ReceiptNo is not match"`
	PaymentDate    time.Time `json:"PaymentDate" valid:"required~PaymentDate is required"`
	Amount         int       `json:"Amount"`         // ราคา ยังไม่หักส่วนลด
	DiscountAmount int       `json:"DiscountAmount"` // ราคา ส่วนลด
	NetAmount      int       `json:"NetAmount"`      // ราคา หลังหักส่วนลด
	CashReceived   int       `json:"CashReceived"`   // เงินสด
	Change         int       `json:"Change"`         // เงินทอน
	IsCash         bool      `json:"IsCash"`

	ParkingUsageCardID uint             `json:"ParkingUsageCardID" valid:"required~ParkingUsageCardID is required"`
	ParkingUsageCard   ParkingUsageCard `gorm:"foreignKey:ParkingUsageCardID" valid:"-"`

	UserID uint `json:"UserID" valid:"required~UserID is required"`
	User   User `gorm:"foreignKey:UserID" valid:"-"`
}

type ParkingFeePolicy struct {
	gorm.Model
	InitialFee     int `json:"InitialFee"`
	AddBase_Fee    int `json:"AddBase_Fee"`
	Time_Increment int `json:"Time_Increment"`
	Discount       int `json:"Discount"`

	TypeCardID uint     `json:"TypeCardID"`
	TypeCard   TypeCard `gorm:"foreignKey:TypeCardID"`

	ParkingCard []ParkingCard `gorm:"foreignKey:ParkingFeePolicyID"`
}
