package entity

import (
	"time"
	"gorm.io/gorm"
)

type Hall struct {
	gorm.Model
	HallName		string		`json:"HallName"`
	Capacity		int			`json:"Capacity"`
	Location		string		`json:"Location"`
	IsAvailable		bool		`json:"Available"`
	ImageHall		string		`json:"ImageHall"`
	Description		string		`json:"Description"`
	PricePerHour	int			`json:"PricePerHour"`
	BookingHall []BookingHall	`gorm:"foreignKey:HallID"`
	Facilities	[]Facilities	`gorm:"foreignKey:HallID"`


}
type FacilityList struct{
	gorm.Model
	FacilityName	string		`json:"FacilityName"`
	Description		string		`json:"Descrption"`

	Facilities	[]Facilities	`gorm:"foreignKey:FacilityListID"`
}
type Facilities struct {
	gorm.Model
	HallID			uint		`json:"HallID"`
	FacilityListID	uint		`json:"FacilityListID"`
	Quantity		int			`json:"Quantity"`
}
type BookingHall struct {
	gorm.Model
	UserID			uint		`json:"UserID"`
	HallID			uint		`json:"HallID"`
	
	StartDateTime	time.Time 	`json:"StartDate"`
	EndDateTime		time.Time 	`json:"EndDate"`
	Status			string		`json:"Status"`	
	CustomerName	string		`json:"CustomerName"`
	CustomerEmail	string		`json:"CustomerEmail"`
	CustomerPhone	string		`json:"CustomerPhone"`
	CustomerAddress	string		`json:"CustomerAddress"`
	CancelDate		time.Time	`json:"CancelDate"`
	PaymentHall []PaymentHall	`gorm:"foreignKey:BookingHallID"`
}


type PaymentHall struct {
	gorm.Model
	BookingHallID	uint		`json:"BookingHallID"`

	Amount			int			`json:"Amount"`
	PaymentDate		time.Time	`json:"PaymentDate"`
	PaymentMethod	string		`json:"PaymentMethod"`
	IssueDate		time.Time	`json:"IssueDate"`		//วันที่ออก
	TaxAmount		int			`json:"TaxAmount"`
	TotalAmount		int			`json:"TotalAmount"`
	IssueBy			string		`json:"IssuedBy"`
}