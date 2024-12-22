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
	Capacity      int    `json:"Capacity"`
	AvailableZone int    `json:"AvailableZone"`
	Image         string `gorm:"type:longtext" json:"Image"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	ParkingCard []ParkingCard `gorm:"many2many:ParkingCardZone;"`
}

type ParkingTransaction struct {
	gorm.Model
	EntryTime    time.Time `json:"EntryTime"`
	ExitTime     time.Time `json:"ExitTime"`
	Hourly_Rate int       `json:"Hourly_Rate"`
	LicensePlate string    `json:"LicensePlate"`
	Image        string    `gorm:"type:longtext" json:"Image"`
	Color        string    `json:"Color"`

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

	ParkingPayment []ParkingPayment `gorm:"foreignKey:StatusPaymentID"`
}

type ParkingFeePolicy struct {
	gorm.Model
	FreeHours      int       `json:"FreeHours"`
	AddBase_Fee    int       `json:"AddBase_Fee"`
	Time_Increment time.Time `json:"Time_Increment"`
	Discount       int       `json:"Discount"`
	IsExempt       bool      `json:"IsExempt"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	ParkingCard []ParkingCard `gorm:"foreignKey:ParkingFeePolicyID"`
}
