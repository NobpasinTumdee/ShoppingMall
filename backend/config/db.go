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
		&entity.MessageBoard{},
		&entity.TaxUser{},
		&entity.InfoUserStore{},

		//ระบบจองร้าน
		&entity.Store{}, 
		&entity.Receipt{}, 
		&entity.BackupStore{}, 
		//ระบบชำระเงินจองร้าน
		&entity.ProductType{}, 
		&entity.PaymentStore{},
		&entity.Membership{},
		&entity.Rating{},
		&entity.PaymentMethodStore{},

		//ระบบแจ้งซ่อมและอุปการณ์
		&entity.ServiceRequest{}, 
		&entity.HistoryEquipment{}, 
		&entity.Equipment{}, 

		//ระบบจองHall
		&entity.Hall{},
		&entity.BookingHall{},
		&entity.Facilities{},
		&entity.FacilityList{},
		&entity.PaymentHall{},


		//ระบบบันทึกการทำความสะอาดของแม่บ้าน
		&entity.Area{},
		&entity.Schedule{},
		&entity.CleaningRecord{},

		//ตารางอุปกรณ์ส่วนกลาง
		&entity.Inventory{},
		&entity.CategoryInventory{},

		//ระบบเบิกอุปกรณ์การทำความสะอาด
		&entity.InventoryRequest{},
	)
	
	//User
	hashedPassword, _ := HashPassword("1")
	User := []entity.User{
	 	{UserName: "NobpasinTumdee" ,Password: hashedPassword ,Email: "B6506407@g.sut.ac.th" ,FirstName: "Nobpasin" , LastName: "Tumdee" , Age: 21 , Profile: "https://cache-igetweb-v2.mt108.info/uploads/images-cache/12677/product/dd87089fb03608d6fab36fa1204ce286_full.jpg",ProfileBackground: "" ,Status: "User" },
	 	{UserName: "PorGz" ,Password: hashedPassword ,Email: "PorGz@g.sut.ac.th" ,FirstName: "Por" , LastName: "Gz" , Age: 21 , Profile: "",ProfileBackground: "" ,Status: "User"},
	 	{UserName: "Admin" ,Password: hashedPassword ,Email: "Admin@g.sut.ac.th" ,FirstName: "Admin" , LastName: "" , Age: 100 , Profile: "https://theinformalgamer.wordpress.com/wp-content/uploads/2022/02/character_yae_miko_thumb-min.png",ProfileBackground: "" ,Status: "Admin"},
	 	{UserName: "Employee" ,Password: hashedPassword ,Email: "Employee@g.sut.ac.th" ,FirstName: "employee" , LastName: "" , Age: 100 , Profile: "https://tiermaker.com/images/template_images/2022/15460683/genshin-characters-going-to-a-beach---pool-party-15460683/screenshot20221127-203037googlejpg.png",ProfileBackground: "" ,Status: "Employee"},
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

	//PaymentMethodStore
	PaymentMethod := []entity.PaymentMethodStore{
		{MethodName: "Mastercard",MethodPic: "https://cdn-icons-png.flaticon.com/512/105/105615.png"},
		{MethodName: "Promptpay",MethodPic: "https://static-00.iconduck.com/assets.00/qr-scan-icon-512x512-9bsp061y.png"},

	}
	for _, pkg := range PaymentMethod {
		db.FirstOrCreate(&pkg,entity.PaymentMethodStore{MethodName: pkg.MethodName})
	}

	//Hall
	Hall := []entity.Hall{
		{
			HallName:     "Grand Conference Room",
			Capacity:     200,
			Location:     "1st Floor, Building A",
			IsAvailable:  true,
			ImageHall:    "https://www.motorshow.in.th/wp-content/uploads/2024/10/McLaren_W1_Thumb.jpg", // Path ในเซิร์ฟเวอร์
			Description:  "A spacious hall suitable for conferences and seminars.",
			PricePerHour: 5000,
		},
		{
			HallName:     "VIP Meeting Room",
			Capacity:     50,
			Location:     "2nd Floor, Building B",
			IsAvailable:  false,
			ImageHall:    "https://www.motorshow.in.th/wp-content/uploads/2024/10/McLaren_W1_Thumb.jpg", // Path ในเซิร์ฟเวอร์
			Description:  "A premium meeting room for exclusive gatherings.",
			PricePerHour: 3000,
		},
		{
			HallName:     "Outdoor Event Space",
			Capacity:     500,
			Location:     "Garden Area",
			IsAvailable:  true,
			ImageHall:    "https://www.motorshow.in.th/wp-content/uploads/2024/10/McLaren_W1_Thumb.jpg", // Path ในเซิร์ฟเวอร์
			Description:  "An open space perfect for weddings and large events.",
			PricePerHour: 7000,
		},
	}
	
	for _, pkg := range Hall {
		db.FirstOrCreate(&pkg, entity.Hall{HallName: pkg.HallName})
	}
	



	//Store
	/*
	Store := []entity.Store{
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro1",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro2",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro3",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro4",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro5",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro6",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro7",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro8",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro9",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro10",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro11",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro12",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro13",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro14",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro15",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro16",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro17",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro18",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro19",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro20",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",UserID: 0,ProductTypeID: 1 },
		
		
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro21",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro22",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro23",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro24",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro25",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro26",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro27",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro28",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro29",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro30",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro31",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro32",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro33",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro34",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro35",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro36",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro37",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro38",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro39",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro40",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 2 },
		
		
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro41",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro42",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro43",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro44",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro45",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro46",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro47",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro48",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro49",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro50",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro51",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro52",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro53",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro54",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro55",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro56",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro57",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro58",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro59",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro60",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 3 },
		
		
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro61",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro62",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro63",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro64",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro65",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro66",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro67",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro68",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro69",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro70",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro71",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro72",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro73",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro74",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro75",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro76",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro77",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro78",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro79",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro80",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",UserID: 1,ProductTypeID: 4 },


	}
	for _, pkg := range Store {
		db.FirstOrCreate(&pkg,entity.Store{NameStore: pkg.NameStore})
	}
	*/
}
