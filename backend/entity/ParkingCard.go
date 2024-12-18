package entity

import (
	"gorm.io/gorm"
	"time"
)

type ParkingCard struct {
	gorm.Model
	ExpiryDate time.Time `json:"ExpiryDate"`

	StoreID uint  `json:"StoreID"`
	Store   Store `gorm:"foreignKey:StoreID"`

	StatusParkingID uint          `json:"StatusParkingID"`
	StatusParking   StatusParking `gorm:"foreignKey:StatusParkingID"`

	MembershipCustomerID uint               `json:"MembershipCustomerID"`
	MembershipCustomer   MembershipCustomer `gorm:"foreignKey:MembershipCustomerID"`

	UsageCard    []UsageCard   `gorm:"foreignKey:ParkingCardID"`
	ParkingZones []ParkingZone `gorm:"many2many:ParkingCardZone;"`
}

type ParkingCardZone struct {
	ParkingCardID uint `gorm:"primaryKey"`
	ParkingZoneID uint `gorm:"primaryKey"`

	Type string `json:"Type"`

	CreatedAt time.Time
	DeletedAt gorm.DeletedAt
}

type ParkingZone struct {
	gorm.Model
	Name          string `json:"Name"`
	Capacity      uint   `json:"Capacity"`
	AvailableZone uint   `json:"AvailableZone"`

	ParkingCards []ParkingCard `gorm:"many2many:ParkingCardZone;"`
}

type StatusParking struct {
	gorm.Model
	Status string `json:"Status"`

	ParkingCards []ParkingCard `gorm:"foreignKey:StatusParkingID"`
}

type UsageCard struct {
	gorm.Model
	EntryTime   time.Time `json:"EntryTime"`
	ExitTime    time.Time `json:"ExitTime"`
	Hourly_rate time.Time `json:"Hourly_rate"`
	Fee         float64   `json:"Fee"`
	LicenseNo   string    `json:"LicenseNo"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`

	ParkingCardID uint        `json:"ParkingCardID"`
	ParkingCard   ParkingCard `gorm:"foreignKey:ParkingCardID"`

	ParkingFeePolicyID uint             `json:"ParkingFeePolicyID"`
	ParkingFeePolicy   ParkingFeePolicy `gorm:"foreignKey: ParkingFeePolicyID"`

	ParkingPayment []ParkingPayment `gorm:"foreignKey:UsageCardID"`
}

type ParkingFeePolicy struct {
	gorm.Model
	FreeHours      float64   `json:"FreeHours"`
	AddBase_Fee    float64   `json:"AddBase_Fee"`
	Time_Increment time.Time `json:"Time_Increment"`
	Discount       float64   `json:"Discount"`
	LostCard       float64   `json:"LostCard"`
	IsExempt       bool      `json:"IsExempt"`

	ParkingCardZoneID uint            `json:"ParkingCardZoneID"`
	ParkingCardZone   ParkingCardZone `gorm:"foreignKey:ParkingCardZoneID;references:ParkingCardID"`

	UsageCard []UsageCard `gorm:"foreignKey:ParkingFeePolicyID"`
}
