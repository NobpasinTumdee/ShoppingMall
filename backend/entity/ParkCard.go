package entity

import (
	"time"

	"gorm.io/gorm"
)

type Vehicle struct {
	gorm.Model
	LicensePlate string `json:"LicensePlate" valid:"required~License Plate is required"`
	Color        string `json:"Color" valid:"required~Color is required"`
	Make         string `json:"Make" valid:"required~Make is required"`
	Image        string `gorm:"type:longtext" json:"Image" valid:"required~Image is required"`

	UserID uint `json:"UserID" valid:"-"`
	User   User `gorm:"foreignKey:UserID" valid:"-"`
}

type ParkingCard struct {
	gorm.Model
	ID          string     `gorm:"primaryKey" json:"ID" valid:"required~ParkingCard ID is required"`
	ExpiryDate  *time.Time `json:"ExpiryDate"`
	IsPermanent bool       `json:"IsPermanent"`

	TypeCardID uint     `json:"TypeCardID"`
	TypeCard   TypeCard `gorm:"foreignKey:TypeCardID"`

	UserID uint `json:"UserID" valid:"-"`
	User   User `gorm:"foreignKey:UserID" valid:"-"`

	StatusCardID uint       `json:"StatusCardID"`
	StatusCard   StatusCard `gorm:"foreignKey:StatusCardID"`

	ParkingFeePolicyID uint             `json:"ParkingFeePolicyID"`
	ParkingFeePolicy   ParkingFeePolicy `gorm:"foreignKey:ParkingFeePolicyID"`

	ParkingZone        []ParkingZone        `gorm:"many2many:ParkingCardZone;"`
	ParkingUsageCard []ParkingUsageCard `gorm:"foreignKey:ParkingCardID"`
}

type ParkingCardZone struct {
	ParkingCardID string `json:"ParkingCardID"`
	ParkingZoneID uint   `json:"ParkingZoneID"`

	ParkingCard ParkingCard `gorm:"foreignKey:ParkingCardID;references:ID"`
	ParkingZone ParkingZone `gorm:"foreignKey:ParkingZoneID;references:ID"`
}

type ParkingZone struct {
	gorm.Model
	ID                  uint   `json:"ID"`
	Name                string `json:"Name"`
	Image               string `gorm:"type:longtext" json:"Image"`
	MaxCapacity         int    `json:"MaxCapacity"`
	MaxReservedCapacity int    `json:"MaxReservedCapacity"`

	TypeCardID uint     `json:"TypeCardID"`
	TypeCard   TypeCard `gorm:"foreignKey:TypeCardID"`

	ParkingCard      []ParkingCard      `gorm:"many2many:ParkingCardZone;"`
	ParkingZoneDaily []ParkingZoneDaily `gorm:"foreignKey:ParkingZoneID"`
}

type ParkingZoneDaily struct {
	gorm.Model
	Date              time.Time `json:"Date" valid:"required~Date is required"`
	TotalVisitors     int       `json:"TotalVisitors"`
	AvailableZone     int       `json:"AvailableZone"`
	ReservedAvailable int       `json:"ReservedAvailable"`

	ParkingZoneID uint        `json:"ParkingZoneID"`
	ParkingZone   ParkingZone `gorm:"foreignKey:ParkingZoneID"`

	ParkingUsageCard []ParkingUsageCard `gorm:"foreignKey:ParkingZoneDailyID"`
}

type ParkingUsageCard struct {
	gorm.Model
	ReservationDate *time.Time `json:"ReservationDate" valid:"-"` // ใช้ optional แทน valid:"-"
	EntryTime       *time.Time `json:"EntryTime" valid:"-"`
	ExitTime        *time.Time `json:"ExitTime" valid:"-"`
	TotalHourly     *float64   `json:"TotalHourly" valid:"-"`
	IsReservedPass  *bool      `json:"IsReservedPass" valid:"-"`
	LicensePlate    string     `json:"LicensePlate" valid:"required~License Plate is required"`
	Image           string     `gorm:"type:longtext" json:"Image" valid:"required~Image is required"`
	Color           string     `json:"Color" valid:"required~Color is required"`
	Make            string     `json:"Make" valid:"required~Make is required"`

	ParkingCardID string      `json:"ParkingCardID" valid:"-"` // ไม่มีการตรวจสอบ
	ParkingCard   ParkingCard `gorm:"foreignKey:ParkingCardID" valid:"-"`

	ParkingZoneDailyID uint             `json:"ParkingZoneDailyID" valid:"required~ParkingZoneDaily is required"`
	ParkingZoneDaily   ParkingZoneDaily `gorm:"foreignKey:ParkingZoneDailyID" valid:"-"`

	UserID uint `json:"UserID" valid:"-"` // ไม่มีการตรวจสอบ
	User   User `gorm:"foreignKey:UserID" valid:"-"`

	ParkingPayment *ParkingPayment `gorm:"foreignKey:ParkingUsageCardID" valid:"-"`
}

type TypeCard struct {
	gorm.Model
	Type             string             `json:"Type"`
	ExpiryYear       int                `json:"ExpiryYear"`
	ParkingCard      []ParkingCard      `gorm:"foreignKey:TypeCardID"`
	ParkingZone      []ParkingZone      `gorm:"foreignKey:TypeCardID"`
	ParkingFeePolicy []ParkingFeePolicy `gorm:"foreignKey:TypeCardID"`
}

type StatusCard struct {
	gorm.Model
	Status string `json:"Status"`

	ParkingCard []ParkingCard `gorm:"foreignKey:StatusCardID"`
}
