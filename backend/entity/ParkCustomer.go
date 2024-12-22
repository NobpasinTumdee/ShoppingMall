package entity

import (
	"gorm.io/gorm"
	"time"
)

type MembershipCustomer struct {
	gorm.Model
	FirstName  string    `json:"FirstName"`
	LastName   string    `json:"LastName"`
	DOB        time.Time `json:"DOB"`
	Tel        string    `json:"Tel"`
	IssueDate  time.Time `json:"IssueDate"`
	ExpiryDate time.Time `json:"ExpiryDate"`
}
