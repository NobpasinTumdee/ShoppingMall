package entity

import (
	"gorm.io/gorm"
)

type Equipment struct {
	gorm.Model
	NameEquipment  				string 		`json:"NameEquipment"`
	Category     				string 		`json:"Category"`
	Quantity     				int 		`json:"Quantity"`


	HistoryEquipment []HistoryEquipment 	`gorm:"foreignKey:EquipmentID"`

}