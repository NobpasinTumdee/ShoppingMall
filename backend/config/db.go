package config

import (
	"fmt"
	"time"
	"example.com/ProjectSeG13/entity"
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
		&entity.Event{},

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
	 	{UserName: "NobpasinTumdee" ,Password: hashedPassword ,Email: "B6506407@g.sut.ac.th" ,FirstName: "Nobpasin" , LastName: "Tumdee" , Age: 21 , Profile: "https://i.pinimg.com/736x/db/c0/14/dbc014d8d2229eb5e5a3e76980c137ca.jpg",ProfileBackground: "" ,Status: "User" },
	 	{UserName: "PorGz" ,Password: hashedPassword ,Email: "PorGz@g.sut.ac.th" ,FirstName: "Por" , LastName: "Gz" , Age: 21 , Profile: "",ProfileBackground: "" ,Status: "User"},
	 	{UserName: "Admin" ,Password: hashedPassword ,Email: "Admin@g.sut.ac.th" ,FirstName: "Admin" , LastName: "" , Age: 100 , Profile: "https://theinformalgamer.wordpress.com/wp-content/uploads/2022/02/character_yae_miko_thumb-min.png",ProfileBackground: "" ,Status: "Admin"},
	 	{UserName: "Employee" ,Password: hashedPassword ,Email: "Employee@g.sut.ac.th" ,FirstName: "employee" , LastName: "" , Age: 100 , Profile: "https://tiermaker.com/images/template_images/2022/15460683/genshin-characters-going-to-a-beach---pool-party-15460683/screenshot20221127-203037googlejpg.png",ProfileBackground: "" ,Status: "Employee"},
	 	{UserName: "Member" ,Password: hashedPassword ,Email: "Member@g.sut.ac.th" ,FirstName: "Member" , LastName: "" , Age: 100 , Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/keqing-edit-by-me-jpg.png",ProfileBackground: "" ,Status: "Member"},
	 	{UserName: "Cleaning" ,Password: hashedPassword ,Email: "Cleaning@g.sut.ac.th" ,FirstName: "Cleaning" , LastName: "" , Age: 100 , Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/kokomijpg.png",ProfileBackground: "" ,Status: "Cleaning"},
	 	{UserName: "Repairman" ,Password: hashedPassword ,Email: "Repairman@g.sut.ac.th" ,FirstName: "Repairman" , LastName: "" , Age: 100 , Profile: "https://i.pinimg.com/236x/a6/61/b1/a661b180316fb4559c0685a65b289ee4.jpg",ProfileBackground: "" ,Status: "Repairman"},
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

//cleaning
	// ใส่ข้อมูลเริ่มต้นในตาราง Areas
	areas := []entity.Area{
    	{AreaName: "ห้องน้ำชั้น 1", Floor: 1},
    	{AreaName: "ห้องน้ำชั้น 2", Floor: 2},
    	{AreaName: "ห้องน้ำชั้น 3", Floor: 3},
    	{AreaName: "ห้องน้ำชั้น 4", Floor: 4},
	}

	for _, area := range areas {
    	db.FirstOrCreate(&area, entity.Area{AreaName: area.AreaName})
	}

	// ดึงวันสุดท้ายจากฐานข้อมูล
	var lastSchedule entity.Schedule
	db.Order("schedule_date desc").First(&lastSchedule)

	// กำหนดวันเริ่มต้น
	var startDate time.Time
	if lastSchedule.ID == 0 {
    	// ถ้ายังไม่มีข้อมูลในฐานข้อมูล ให้เริ่มจากวันนี้
    	startDate = time.Now().UTC().Truncate(24 * time.Hour)
	} else {
    	// ถ้ามีข้อมูลแล้ว ให้เริ่มจากวันถัดไปของวันสุดท้าย
    	startDate = lastSchedule.ScheduleDate.AddDate(0, 0, 1)
	}

	// สร้างข้อมูลใหม่จนถึงวันนี้หรืออนาคต
	currentDate := time.Now().UTC().Truncate(24 * time.Hour)
	for date := startDate; !date.After(currentDate); date = date.AddDate(0, 0, 1) {
    	schedule := entity.Schedule{
        	StartTime:    time.Date(date.Year(), date.Month(), date.Day(), 8, 0, 0, 0, time.UTC),
        	EndTime:      time.Date(date.Year(), date.Month(), date.Day(), 10, 0, 0, 0, time.UTC),
        	ScheduleDate: date,
        	AreaID:       uint((date.Day() % 4) + 1), // แปลงเป็น uint // หมุนเวียน AreaID (1 ถึง 4)
    	}

    	// เพิ่มข้อมูลลงในฐานข้อมูล
    	db.FirstOrCreate(&schedule, entity.Schedule{ScheduleDate: schedule.ScheduleDate, AreaID: schedule.AreaID})
	}


	//CategoryInventory
	item := []entity.CategoryInventory{
		{CategoryName: "Cleaning equipment"},{CategoryName: "Tools"},
	}
	for _, pkg := range item {
		db.FirstOrCreate(&pkg,entity.CategoryInventory{CategoryName: pkg.CategoryName})
	}


	//Inventory
	Inventory := []entity.Inventory{
		{InventoryName: "ไม้ถูพื้น",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "ถังน้ำ",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "น้ำยาทำความสะอาดพื้น",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "ไม้กวาด",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "ที่โกยผง",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "ผ้าไมโครไฟเบอร์",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "น้ำยาเช็ดกระจก",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "ฟองน้ำล้างจาน",QuantityInventory: 15,CategoryID: 1},
		{InventoryName: "เครื่องดูดฝุ่น",QuantityInventory: 5,CategoryID: 1},
		{InventoryName: "ถุงมือยาง",QuantityInventory: 150,CategoryID: 1},
		{InventoryName: "ไขควง",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "คีม",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "ประแจ",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "เลื่อยมือ",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "ตลับเมตร",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "สว่านไฟฟ้า",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "ระดับน้ำ",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "ค้อน",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "ใบตัดเหล็ก",QuantityInventory: 15,CategoryID: 2},
		{InventoryName: "ปืนยิงซิลิโคน",QuantityInventory: 15,CategoryID: 2},
		
	}
	for _, pkg := range Inventory {
		db.FirstOrCreate(&pkg,entity.Inventory{InventoryName: pkg.InventoryName})
	}

	halls := []entity.Hall{
		{
			HallName:     "Grand Hall",
			Capacity:     500,
			Location:     "ชั้น 1 อาคาร A",
			ImageHall:    "https://example.com/images/grand_hall.jpg",
			Description:  "ห้องโถงขนาดใหญ่สำหรับจัดงานประชุมและสัมมนา",
			PricePerHour: 15000,
		},
		{
			HallName:     "Conference Room 101",
			Capacity:     50,
			Location:     "ชั้น 2 อาคาร B",
			ImageHall:    "https://example.com/images/conference_101.jpg",
			Description:  "ห้องประชุมขนาดเล็ก เหมาะสำหรับการประชุมทีมและอบรม",
			PricePerHour: 3000,
		},
		{
			HallName:     "Ballroom 202",
			Capacity:     300,
			Location:     "ชั้น 2 อาคาร C",
			ImageHall:    "https://example.com/images/ballroom_202.jpg",
			Description:  "ห้องบอลรูมสุดหรูสำหรับงานแต่งงานและงานเลี้ยงสังสรรค์",
			PricePerHour: 12000,
		},
		{
			HallName:     "Training Room 305",
			Capacity:     40,
			Location:     "ชั้น 3 อาคาร D",
			ImageHall:    "https://example.com/images/training_room_305.jpg",
			Description:  "ห้องฝึกอบรมพร้อมอุปกรณ์มัลติมีเดีย",
			PricePerHour: 2500,
		},
	}
	for _, pkg := range halls {
		db.FirstOrCreate(&pkg,entity.Hall{HallName: pkg.HallName})
	}
	
	//Event
	event := []entity.Event{
		{EventPic: "https://media.themall.co.th/media/items/9f61a880dfb5e8d2d25f897ef37bce3e4353e69f.jpg",EventTopic: "Discover the Ultimate Shopping Destination!",EventDate: time.Now(),UserID: 3,EventDescription: "Experience the perfect blend of style, convenience, and entertainment at The Mall. Explore exclusive collections, indulge in culinary delights, and enjoy events crafted for you. Whether you're shopping for fashion, electronics, or gifts, we've got everything you need—all under one roof."},
		{EventPic: "https://iconsiam-s3-prod.s3.ap-southeast-1.amazonaws.com/assets/1732785904W.jpg",EventTopic: "MIRACLE OF GIFTS 2024",EventDate: time.Now(),UserID: 3,EventDescription: "Experience the perfect blend of style, convenience, and entertainment at The Mall. Explore exclusive collections, indulge in culinary delights, and enjoy events crafted for you. Whether you're shopping for fashion, electronics, or gifts, we've got everything you need—all under one roof."},
		{EventPic: "https://media.themall.co.th/media/items/147c701366a791b830325340b154ac7d325a0e7b.jpg",EventTopic: "🎄 Celebrate the Magic of Christmas at ICONIC! 🎁",EventDate: time.Now(),UserID: 3,EventDescription: "Step into a world of festive wonder and joy! Explore dazzling holiday decorations, exclusive Christmas deals, and gifts for everyone on your list.✨ Highlights include:🎅 Meet Santa and capture magical moments🎶 Live caroling and holiday performances🎁 Limited-time offers on your favorite brandsMake this Christmas unforgettable at The Mall, where holiday dreams come true.Shop. Celebrate. Share the Joy."},
		{EventPic: "https://media.themall.co.th/media/events/34246945c3bf4efc2dfc0a642be90316896207e2.jpg",EventTopic: "Toy Giving 🎁",EventDate: time.Now(),UserID: 3,EventDescription: "Step into a world of festive wonder and joy! Explore dazzling holiday decorations, exclusive Christmas deals, and gifts for everyone on your list.✨ Highlights include:🎅 Meet Santa and capture magical moments🎶 Live caroling and holiday performances🎁 Limited-time offers on your favorite brandsMake this Christmas unforgettable at The Mall, where holiday dreams come true.Shop. Celebrate. Share the Joy."},
		{EventPic: "https://media.themall.co.th/media/items/30bed3755944fca6226d8a23c18f8abbe73a3813.jpg",EventTopic: "THE GREAT HAPPY NEW YEAR 2025",EventDate: time.Now(),UserID: 3,EventDescription: "Step into a world of festive wonder and joy! Explore dazzling holiday decorations, exclusive Christmas deals, and gifts for everyone on your list.✨ Highlights include:🎅 Meet Santa and capture magical moments🎶 Live caroling and holiday performances🎁 Limited-time offers on your favorite brandsMake this Christmas unforgettable at The Mall, where holiday dreams come true.Shop. Celebrate. Share the Joy."},
		{EventPic: "https://iconsiam-s3-prod.s3.ap-southeast-1.amazonaws.com/assets/1723177377X.jpg",EventTopic: "The Conjuring Universe Tour",EventDate: time.Now(),UserID: 3,EventDescription: "Step into a world of festive wonder and joy! Explore dazzling holiday decorations, exclusive Christmas deals, and gifts for everyone on your list.✨ Highlights include:🎅 Meet Santa and capture magical moments🎶 Live caroling and holiday performances🎁 Limited-time offers on your favorite brandsMake this Christmas unforgettable at The Mall, where holiday dreams come true.Shop. Celebrate. Share the Joy."},
		{EventPic: "https://media.themall.co.th/media/items/44e94bacd916dc3f018fdeec741f600422bb6c38.jpg",EventTopic: "CASH COUPON",EventDate: time.Now(),UserID: 3,EventDescription: "Step into a world of festive wonder and joy! Explore dazzling holiday decorations, exclusive Christmas deals, and gifts for everyone on your list.✨ Highlights include:🎅 Meet Santa and capture magical moments🎶 Live caroling and holiday performances🎁 Limited-time offers on your favorite brandsMake this Christmas unforgettable at The Mall, where holiday dreams come true.Shop. Celebrate. Share the Joy."},
	}
	for _, pkg := range event {
		db.FirstOrCreate(&pkg,entity.Event{EventTopic: pkg.EventTopic})
	}

	//Store
	/*
	Store := []entity.Store{
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro1",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "Request",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro2",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro3",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro4",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro5",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro6",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro7",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro8",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro9",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro10",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro11",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro12",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro13",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro14",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro15",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro16",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro17",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro18",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro19",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Unicro20",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is available for reservation.",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 },
		
		
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro21",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro22",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro23",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro24",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro25",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro26",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro27",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro28",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro29",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro30",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro31",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro32",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro33",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro34",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro35",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro36",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro37",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro38",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro39",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Unicro40",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 2 },
		
		
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro41",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro42",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro43",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro44",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro45",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro46",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro47",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro48",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro49",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro50",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro51",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro52",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro53",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro54",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro55",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro56",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro57",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro58",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro59",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro60",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 3 },
		
		
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro61",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro62",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro63",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro64",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro65",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro66",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro67",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro68",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro69",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro70",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro71",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro72",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro73",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro74",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro75",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro76",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro77",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro78",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro79",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Unicro80",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusStore: "This store is already taken.",StatusService: "NoRequest",UserID: 1,ProductTypeID: 4 },


	}
	for _, pkg := range Store {
		db.FirstOrCreate(&pkg,entity.Store{NameStore: pkg.NameStore})
	}
	*/
}
