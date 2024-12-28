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

	UserID uint `json:"UserID" valid:"required~User ID is required"`
	User   User `gorm:"foreignKey:UserID"`
}

type ParkingCard struct {
	gorm.Model
	ID          string    `gorm:"primaryKey" json:"ID" valid:"required~ParkingCard ID is required"`
	ExpiryDate  time.Time `json:"ExpiryDate" valid:"required~Expiry Date is required"`
	IsPermanent bool      `json:"IsPermanent"`

	TypeParkID uint     `json:"TypeParkID" valid:"required~TypePark ID is required"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	StoreID uint  `json:"StoreID" valid:"required~Store ID is required"`
	Store   Store `gorm:"foreignKey:StoreID"`

	UserID uint `json:"UserID" valid:"required~User ID is required"`
	User   User `gorm:"foreignKey:UserID"`

	StatusCardID uint       `json:"StatusCardID" valid:"required~Status Card ID is required"`
	StatusCard   StatusCard `gorm:"foreignKey:StatusCardID"`

	ParkingFeePolicyID uint             `json:"ParkingFeePolicyID" valid:"required~ParkingFeePolicy ID is required"`
	ParkingFeePolicy   ParkingFeePolicy `gorm:"foreignKey:ParkingFeePolicyID"`

	ParkingZone        []ParkingZone        `gorm:"many2many:ParkingCardZone;"`
	ParkingTransaction []ParkingTransaction `gorm:"foreignKey:ParkingCardID"`
	ParkingPayment     []ParkingPayment     `gorm:"many2many:ParkingCardZone;"`
}

type ParkingCardZone struct {
	ParkingCardID string `json:"ParkingCardID" valid:"required~ParkingCard ID is required"`
	ParkingZoneID uint   `json:"ParkingZoneID" valid:"required~ParkingZone ID is required"`

	CreatedAt time.Time      `json:"created_at"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"`

	ParkingCard ParkingCard `gorm:"foreignKey:ParkingCardID;references:ID"`
	ParkingZone ParkingZone `gorm:"foreignKey:ParkingZoneID;references:ID"`
}

type ParkingZone struct {
	gorm.Model
	Name             string `json:"Name" valid:"required~Name is required"`
	MaxCapacity          int    `json:"Capacity" valid:"required~Capacity is required"`
	AvailableZone         int       `json:"AvailableZone" valid:"required~AvailableZone is required"`
	MaxReservedCapacity int    `json:"ReservedCapacity"`
	ReservedAvailable     int       `json:"ReservedAvailable" valid:"required~ReservedAvailable is required"`
	Image            string `gorm:"type:longtext" json:"Image"`

	TypeParkID uint     `json:"TypeParkID" valid:"required~TypePark ID is required"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	ParkingTransaction []ParkingTransaction `gorm:"foreignKey:ParkingZoneID"`
	ParkingCard        []ParkingCard        `gorm:"many2many:ParkingCardZone;"`
}

type ParkingZoneDaily struct {
	gorm.Model
	Date                  time.Time `json:"Date" valid:"required~Date is required"`
	TotalVisitors         int       `json:"TotalVisitors" valid:"required~TotalVisitors is required"`
	AvailableZone         int       `json:"AvailableZone" valid:"required~AvailableZone is required"`
	ReservedAvailable     int       `json:"ReservedAvailable" valid:"required~ReservedAvailable is required"`

	ParkingZoneID uint        `json:"ParkingZoneID" valid:"required~ParkingZone ID is required"`
	ParkingZone   ParkingZone `gorm:"foreignKey:ParkingZoneID"`
}

type ParkingTransaction struct {
	gorm.Model
	ReservationDate time.Time     `json:"ReservationDate" valid:"required~Reservation Date is required"`
	EntryTime       *time.Time `json:"EntryTime"`
	ExitTime        *time.Time `json:"ExitTime"`
	Hourly_Rate     *int       `json:"Hourly_Rate"`
	IsReservedPass  *bool      `json:"IsReservedPass"`
	LicensePlate    string     `json:"LicensePlate" valid:"required~License Plate is required"`
	Image           string     `gorm:"type:longtext" json:"Image"`
	Color           string     `json:"Color" valid:"required~Color is required"`
	Make            string     `json:"Make" valid:"required~Make is required"`

	ParkingCardID string      `json:"ParkingCardID" valid:"required~ParkingCard ID is required"`
	ParkingCard   ParkingCard `gorm:"foreignKey:ParkingCardID"`

	ParkingZoneID uint        `json:"ParkingZoneID" valid:"required~ParkingZone ID is required"`
	ParkingZone   ParkingZone `gorm:"foreignKey:ParkingZoneID"`

	UserID uint `json:"UserID" valid:"required~User ID is required"`
	User   User `gorm:"foreignKey:UserID"`

	ParkingPayment *ParkingPayment `gorm:"foreignKey:ParkingTransactionID"`
}

type TypePark struct {
	gorm.Model
	Type string `json:"Type" valid:"required~Type is required"`

	ParkingCard      []ParkingCard      `gorm:"foreignKey:TypeParkID"`
	ParkingZone      []ParkingZone      `gorm:"foreignKey:TypeParkID"`
	ParkingFeePolicy []ParkingFeePolicy `gorm:"foreignKey:TypeParkID"`
}

type StatusCard struct {
	gorm.Model
	Status string `json:"Status" valid:"required~Status is required"`

	ParkingCard []ParkingCard `gorm:"foreignKey:StatusCardID"`
}

type StatusPayment struct {
	gorm.Model
	Status string `json:"Status" valid:"required~Status is required"`

	ParkingPayment []ParkingPayment `gorm:"foreignKey:StatusPaymentID"`
}

type ParkingFeePolicy struct {
	gorm.Model
	FreeHours      int       `json:"FreeHours" valid:"required~FreeHours is required"`
	AddBase_Fee    int       `json:"AddBase_Fee" valid:"required~AddBase_Fee is required"`
	Time_Increment time.Time `json:"Time_Increment" valid:"required~Time_Increment is required"`
	Discount       int       `json:"Discount" valid:"required~Discount is required"`
	IsExempt       bool      `json:"IsExempt"`

	TypeParkID uint     `json:"TypeParkID" valid:"required~TypePark ID is required"`
	TypePark   TypePark `gorm:"foreignKey:TypeParkID"`

	ParkingCard []ParkingCard `gorm:"foreignKey:ParkingFeePolicyID"`
}
