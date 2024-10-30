package main

import (
	"example.com/ProjectSeG13/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	db, err := gorm.Open(sqlite.Open("testdata.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}


	// Migrate the schema
	db.AutoMigrate(
		&entity.User{}, 
		&entity.Store{}, 
		&entity.ServiceRequest{}, 
		&entity.Receipt{}, 
		&entity.ProductType{}, 
		&entity.PaymentStore{},
		&entity.HistoryEquipment{}, 
		&entity.Equipment{}, 
	)
	
}