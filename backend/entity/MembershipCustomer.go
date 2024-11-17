package entity

import (
	"gorm.io/gorm"
	"time"
)

type MembershipCustomer struct {
	gorm.Model
	FirstName string    `json:"FirstName"`
	LastName  string    `json:"LastName"`
	DOB       time.Time `json:"DOB"`
	Tel       string    `json:"Tel"`

	HistoryMembership []HistoryMembership `gorm:"foreignKey:MembershipCustomerID"`
}

type HistoryMembership struct {
	gorm.Model
	IssueDate  time.Time `json:"IssueDate"`
	ExpiryDate time.Time `json:"ExpiryDate"`

	MembershipCustomerID uint               `json:"MembershipCustomerID"`
	MembershipCustomer   MembershipCustomer `gorm:"foreignKey:MembershipCustomerID"`
}

