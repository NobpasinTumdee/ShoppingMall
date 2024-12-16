package entity

import (
	"time"

	"gorm.io/gorm"
)

type ParkingCard struct {
	gorm.Model
	ID         string    `gorm:"primaryKey" json:"ID"`
	ExpiryDate time.Time `json:"ExpiryDate"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	StoreID uint  `json:"StoreID"`
	Store   Store `gorm:"foreignKey:StoreID"`

	MembershipCustomerID uint               `json:"MembershipCustomerID"`
	MembershipCustomer   MembershipCustomer `gorm:"foreignKey:MembershipCustomerID"`

	StatusCardID uint       `json:"StatusCardID"`
	StatusCard   StatusCard `gorm:"foreignKey:StatusCardID"`

	ParkingFeePolicyID uint             `json:"ParkingFeePolicyID"`
	ParkingFeePolicy   ParkingFeePolicy `gorm:"foreignKey: ParkingFeePolicyID"`

	ParkingZone        []ParkingZone        `gorm:"many2many:ParkingCardZone;"`
	ParkingTransaction []ParkingTransaction `gorm:"foreignKey:ParkingCardID"`
	ParkingPayment     []ParkingPayment     `gorm:"many2many:ParkingCardZone;"`
}

type ParkingCardZone struct {
	ParkingCardID string `json:"ParkingCardID"`
	ParkingZoneID uint   `json:"ParkingZoneID"`

	CreatedAt time.Time      `json:"created_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"`

	ParkingCard ParkingCard `gorm:"foreignKey:ParkingCardID;references:ID"`

	ParkingZone ParkingZone `gorm:"foreignKey:ParkingZoneID;references:ID"`
}

type ParkingZone struct {
	gorm.Model
	Name          string `json:"Name"`
	Capacity      uint   `json:"Capacity"`
	AvailableZone uint   `json:"AvailableZone"`
	Image         string `gorm:"type:longtext" json:"Image"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	ParkingCard []ParkingCard `gorm:"many2many:ParkingCardZone;"`
}

type ParkingTransaction struct {
	gorm.Model
	EntryTime    time.Time `json:"EntryTime"`
	ExitTime     time.Time `json:"ExitTime"`
	Hourly_rate  float64   `json:"Hourly_rate"`
	Fee          float64   `json:"Fee"`
	LicensePlate string    `json:"LicensePlate"`
	IsLostCard   bool      `json:"IsLostCard"`
	IsCash       bool      `json:"IsCash"`

	StatusPaymentID uint          `json:"StatusPaymentID"`
	StatusPayment   StatusPayment `gorm:"foreignKey:StatusPaymentID"`

	ParkingCardID string      `json:"ParkingCardID"`
	ParkingCard   ParkingCard `gorm:"foreignKey:ParkingCardID"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`

	ParkingPayment *ParkingPayment `gorm:"foreignKey:ParkingTransactionID"`
}

type TypePark struct {
	gorm.Model
	Type string `json:"Type"`

	ParkingCard      []ParkingCard      `gorm:"foreignKey:TypeParkID"`
	ParkingZone      []ParkingZone      `gorm:"foreignKey:TypeParkID"`
	ParkingFeePolicy []ParkingFeePolicy `gorm:"foreignKey:TypeParkID"`
}

type StatusCard struct {
	gorm.Model
	Status string `json:"Status"`

	ParkingCard []ParkingCard `gorm:"foreignKey:StatusCardID"`
}

type StatusPayment struct {
	gorm.Model
	Status string `json:"Status"`

	ParkingTransaction []ParkingTransaction `gorm:"foreignKey:StatusPaymentID"`
}

type ParkingFeePolicy struct {
	gorm.Model
	FreeHours      float64   `json:"FreeHours"`
	AddBase_Fee    float64   `json:"AddBase_Fee"`
	Time_Increment time.Time `json:"Time_Increment"`
	Discount       float64   `json:"Discount"`
	LostCard       float64   `json:"LostCard"`
	IsExempt       bool      `json:"IsExempt"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	ParkingCard []ParkingCard `gorm:"foreignKey:ParkingFeePolicyID"`
}
