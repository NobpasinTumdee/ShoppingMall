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
	Image        string `gorm:"type:longtext" json:"Image"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`
}

type ParkingCard struct {
	gorm.Model
	ID          string     `gorm:"primaryKey" json:"ID" valid:"required~ParkingCard ID is required"`
	ExpiryDate  *time.Time `json:"ExpiryDate"`
	IsPermanent bool       `json:"IsPermanent"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	UserID uint `json:"UserID"`
	User   User `gorm:"foreignKey:UserID"`

	StatusCardID uint       `json:"StatusCardID"`
	StatusCard   StatusCard `gorm:"foreignKey:StatusCardID"`

	ParkingFeePolicyID uint             `json:"ParkingFeePolicyID"`
	ParkingFeePolicy   ParkingFeePolicy `gorm:"foreignKey:ParkingFeePolicyID"`

	ParkingZone        []ParkingZone        `gorm:"many2many:ParkingCardZone;"`
	ParkingTransaction []ParkingTransaction `gorm:"foreignKey:ParkingCardID"`
	ParkingPayment     []ParkingPayment     `gorm:"foreignKey:ParkingCardID"`
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
	ID          uint   `json:"ID"`
	Name        string `json:"Name"`
	MaxCapacity int    `json:"MaxCapacity"`
	//AvailableZone       int    `json:"AvailableZone"`
	MaxReservedCapacity int `json:"MaxReservedCapacity"`
	//ReservedAvailable   int    `json:"ReservedAvailable"`
	Image string `gorm:"type:longtext" json:"Image"`

	TypeParkID uint     `json:"TypeParkID"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

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

	ParkingTransactions []ParkingTransaction `gorm:"foreignKey:ParkingZoneDailyID"`
}

type ParkingTransaction struct {
	gorm.Model
	ReservationDate *time.Time `json:"ReservationDate" valid:"required~Reservation Date is required"`
	EntryTime       *time.Time `json:"EntryTime"`
	ExitTime        *time.Time `json:"ExitTime"`
	TotalHourly     *float64   `json:"TotalHourly"`
	IsReservedPass  *bool      `json:"IsReservedPass"`
	LicensePlate    string     `json:"LicensePlate" valid:"required~License Plate is required"`
	Image           string     `gorm:"type:longtext" json:"Image" valid:"image is not valid"`
	Color           string     `json:"Color"`
	Make            string     `json:"Make"`

	ParkingCardID string      `json:"ParkingCardID" valid:"required~ParkingCard is required"`
	ParkingCard   ParkingCard `gorm:"foreignKey:ParkingCardID"`

	/* 	ParkingZoneID uint        `json:"ParkingZoneID" valid:"required~ParkingZone is required"`
	   	ParkingZone   ParkingZone `gorm:"foreignKey:ParkingZoneID"` */

	ParkingZoneDailyID uint             `json:"ParkingZoneDailyID" valid:"required~ParkingZoneDaily is required"`
	ParkingZoneDaily   ParkingZoneDaily `gorm:"foreignKey:ParkingZoneDailyID"`

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

/*
	 type StatusPayment struct {
		gorm.Model
		Status string `json:"Status"`

		ParkingPayment []ParkingPayment `gorm:"foreignKey:StatusPaymentID"`
	}
*/
