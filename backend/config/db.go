package config

import (
	"example.com/ProjectSeG13/entity"
	"fmt"
	//"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("ShoppingMall.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.User{}, 

		//ระบบจองร้าน
		&entity.Store{}, 
		&entity.Receipt{}, 
		//ระบบชำระเงินจองร้าน
		&entity.ProductType{}, 
		&entity.PaymentStore{},

		//ระบบแจ้งซ่อมและอุปการณ์
		&entity.ServiceRequest{}, 
		&entity.HistoryEquipment{}, 
		&entity.Equipment{}, 
	)
	
	//User
	hashedPassword, _ := HashPassword("123456")
	User := []entity.User{
	 	{UserName: "NobpasinTumdee" ,Password: hashedPassword ,Email: "B6506407@g.sut.ac.th" ,FirstName: "Nobpasin" , LastName: "Tumdee" , Age: 21 , Profile: "https://i.pinimg.com/564x/89/1f/72/891f72ae5cad26ebab54d9d683cd7879.jpg",ProfileBackground: "" ,Status: "User" },
	 	{UserName: "PorGz" ,Password: hashedPassword ,Email: "PorGz@g.sut.ac.th" ,FirstName: "Por" , LastName: "Gz" , Age: 21 , Profile: "",ProfileBackground: "" ,Status: "User"},
	}
	for _, pkg := range User {
		db.FirstOrCreate(&pkg,entity.User{UserName: pkg.UserName})
	}



}
