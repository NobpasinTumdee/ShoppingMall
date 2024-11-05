package config

import (
	"example.com/ProjectSeG13/entity"
	"fmt"
	"time"
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
		&entity.MessageBoard{},

		//ระบบจองร้าน
		&entity.Store{}, 
		&entity.Receipt{}, 
		&entity.BackupStore{}, 
		//ระบบชำระเงินจองร้าน
		&entity.ProductType{}, 
		&entity.PaymentStore{},
		&entity.Membership{},
		&entity.HistoryStore{},
		&entity.Rating{},

		//ระบบแจ้งซ่อมและอุปการณ์
		&entity.ServiceRequest{}, 
		&entity.HistoryEquipment{}, 
		&entity.Equipment{}, 
	)
	
	//User
	hashedPassword, _ := HashPassword("123456")
	User := []entity.User{
	 	{UserName: "NobpasinTumdee" ,Password: hashedPassword ,Email: "B6506407@g.sut.ac.th" ,FirstName: "Nobpasin" , LastName: "Tumdee" , Age: 21 , Profile: "https://cache-igetweb-v2.mt108.info/uploads/images-cache/12677/product/dd87089fb03608d6fab36fa1204ce286_full.jpg",ProfileBackground: "" ,Status: "User" },
	 	{UserName: "PorGz" ,Password: hashedPassword ,Email: "PorGz@g.sut.ac.th" ,FirstName: "Por" , LastName: "Gz" , Age: 21 , Profile: "",ProfileBackground: "" ,Status: "User"},
	}
	for _, pkg := range User {
		db.FirstOrCreate(&pkg,entity.User{UserName: pkg.UserName})
	}


	//ProductType
	Floor := []entity.ProductType{
		{NameType: "A"},{NameType: "B"},{NameType: "C"},{NameType: "D"},
	}
	for _, pkg := range Floor {
		db.FirstOrCreate(&pkg,entity.ProductType{NameType: pkg.NameType})
	}



	//Membership
	Membership := []entity.Membership{
		{PackageName: "Week" ,Day: 7,Pwa: 350,Pea: 700,RentalFee: 1050},
		{PackageName: "Mount" ,Day: 30,Pwa: 1500,Pea: 3000,RentalFee: 3600},
		{PackageName: "Year" ,Day: 365,Pwa: 18250,Pea: 35600,RentalFee: 36500},

	}
	for _, pkg := range Membership {
		db.FirstOrCreate(&pkg,entity.Membership{PackageName: pkg.PackageName})
	}



	//Store
	Store := []entity.Store{
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro1",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro2",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro3",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro4",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro5",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro6",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro7",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro8",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro9",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro10",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro11",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro12",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro13",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro14",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro15",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro16",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro17",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro18",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro19",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro20",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 1 },
		
		
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro21",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro22",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro23",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro24",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro25",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro26",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro27",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro28",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro29",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro30",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro31",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro32",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro33",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro34",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro35",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro36",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro37",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro38",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro39",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro40",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 2 },
		
		
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro41",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro42",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro43",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro44",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro45",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro46",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro47",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro48",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro49",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro50",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro51",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro52",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro53",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro54",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro55",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro56",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro57",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro58",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro59",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro60",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 3 },
		
		
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro61",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro62",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro63",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro64",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro65",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro66",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro67",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro68",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro69",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro70",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro71",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro72",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro73",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro74",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro75",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro76",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro77",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro78",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro79",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro80",BookingDate: time.Now(),LastDay: time.Now(),DescribtionStore: "test Test test",StatusStore: "inuse",UserID: 1,ProductTypeID: 4 },


	}
	for _, pkg := range Store {
		db.FirstOrCreate(&pkg,entity.Store{NameStore: pkg.NameStore})
	}

}
