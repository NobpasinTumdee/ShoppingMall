package entity

import (
	"gorm.io/gorm"
)

type ProductType struct {
	gorm.Model
	NameType  		string 		`json:"NameType"`

	Store 			[]Store 	`gorm:"foreignKey:ProductTypeID"`

}