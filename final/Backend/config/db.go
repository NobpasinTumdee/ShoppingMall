package config

import (
	"fmt"
	"strconv"
	"time"

	"example.com/ProjectSeG13/entity"

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
		&entity.Event{},

		//ระบบจองร้าน
		&entity.Store{}, 
		&entity.StoreInformation{}, 
		&entity.StatusStoreAll{}, 
		&entity.Receipt{}, 
		&entity.BackupStore{}, 
		//ระบบชำระเงินจองร้าน
		&entity.ProductType{}, 
		&entity.PaymentStore{},
		&entity.Membership{},
		&entity.Rating{},
		&entity.PaymentMethodStore{},
		&entity.AdditionalPackage{},
		&entity.AdditionalPay{},
		&entity.PaymentStoreStatus{},

		//ระบบแจ้งซ่อมและอุปการณ์
		&entity.ServiceRequest{},
		&entity.EquipmentRequest{},

		//ระบบจองHall
		&entity.Hall{},
		&entity.BookingHall{},
		&entity.Facilities{},
		&entity.PaymentHall{},
		&entity.TaxInvoice{},
		&entity.StatusPaymentHall{},



		//ระบบบันทึกการทำความสะอาดของแม่บ้าน
		&entity.Area{},
		&entity.Schedule{},
		&entity.CleaningRecord{},

		//ตารางอุปกรณ์ส่วนกลาง
		&entity.Inventory{},
		&entity.CategoryInventory{},

		//ระบบเบิกอุปกรณ์การทำความสะอาด
		&entity.InventoryRequest{},
		&entity.RequestDetail{},

		//ระบบจองที่จอดรถและชำระเงิน
		&entity.TypeCard{},
		&entity.StatusCard{},
		&entity.ParkingCard{},
		&entity.ParkingZone{},
		&entity.ParkingZoneDaily{},
		&entity.ParkingCardZone{},
		&entity.ParkingFeePolicy{},
		&entity.ParkingPayment{},
		&entity.Vehicle{},
		&entity.ParkingUsageCard{},
	)
	
	//User
	hashedPassword, _ := HashPassword("1")
	User := []entity.User{
	 	{UserName: "ICONIC" ,Password: hashedPassword ,Email: "shoppingmallse13@gmail.com" ,FirstName: "ICON" , LastName: "IC" , Age: 21 , Profile: "https://i.pinimg.com/736x/db/c0/14/dbc014d8d2229eb5e5a3e76980c137ca.jpg",ProfileBackground: "" ,Status: "Admin",Tel: "0619885247" },
	 	{UserName: "PorGz" ,Password: hashedPassword ,Email: "PorGz@g.sut.ac.th" ,FirstName: "Por" , LastName: "Gz" , Age: 21 , Profile: "",ProfileBackground: "" ,Status: "User"},
	 	{UserName: "Admin" ,Password: hashedPassword ,Email: "Admin@g.sut.ac.th" ,FirstName: "Admin" , LastName: "" , Age: 100 , Profile: "https://theinformalgamer.wordpress.com/wp-content/uploads/2022/02/character_yae_miko_thumb-min.png",ProfileBackground: "" ,Status: "Admin"},
	 	{UserName: "Employee" ,Password: hashedPassword ,Email: "Employee@g.sut.ac.th" ,FirstName: "employee" , LastName: "" , Age: 100 , Profile: "https://tiermaker.com/images/template_images/2022/15460683/genshin-characters-going-to-a-beach---pool-party-15460683/screenshot20221127-203037googlejpg.png",ProfileBackground: "" ,Status: "Employee"},
		{UserName: "Member" ,Password: hashedPassword ,Email: "Member@g.sut.ac.th" ,FirstName: "Member" , LastName: "" , Age: 100 , Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/keqing-edit-by-me-jpg.png",ProfileBackground: "" ,Status: "Member"},
	 	{UserName: "Cleaning" ,Password: hashedPassword ,Email: "Cleaning@g.sut.ac.th" ,FirstName: "Cleaning" , LastName: "" , Age: 100 , Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/kokomijpg.png",ProfileBackground: "" ,Status: "Cleaning"},
	 	{UserName: "Repairman" ,Password: hashedPassword ,Email: "Repairman@g.sut.ac.th" ,FirstName: "Repairman" , LastName: "" , Age: 100 , Profile: "https://i.pinimg.com/236x/a6/61/b1/a661b180316fb4559c0685a65b289ee4.jpg",ProfileBackground: "" ,Status: "Repairman"},
		{UserName: "User2", Password: hashedPassword, Email: "User2@g.sut.ac.th", FirstName: "User", LastName: "Two", Age: 22, Profile: "", ProfileBackground: "", Status: "User"},
		{UserName: "User3", Password: hashedPassword, Email: "User3@g.sut.ac.th", FirstName: "User", LastName: "Three", Age: 23, Profile: "", ProfileBackground: "", Status: "User"},
		{UserName: "User4", Password: hashedPassword, Email: "User4@g.sut.ac.th", FirstName: "User", LastName: "Four", Age: 20, Profile: "", ProfileBackground: "", Status: "User"},
		{UserName: "User5", Password: hashedPassword, Email: "User5@g.sut.ac.th", FirstName: "User", LastName: "Five", Age: 24, Profile: "", ProfileBackground: "", Status: "User"},
		{UserName: "Member2", Password: hashedPassword, Email: "Member2@g.sut.ac.th", FirstName: "Member", LastName: "Two", Age: 32, Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/keqing-edit-by-me-jpg.png", ProfileBackground: "", Status: "Member"},
		{UserName: "Member3", Password: hashedPassword, Email: "Member3@g.sut.ac.th", FirstName: "Member", LastName: "Three", Age: 35, Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/keqing-edit-by-me-jpg.png", ProfileBackground: "", Status: "Member"},
		{UserName: "Member4", Password: hashedPassword, Email: "Member4@g.sut.ac.th", FirstName: "Member", LastName: "Four", Age: 28, Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/keqing-edit-by-me-jpg.png", ProfileBackground: "", Status: "Member"},
		{UserName: "Member5", Password: hashedPassword, Email: "Member5@g.sut.ac.th", FirstName: "Member", LastName: "Five", Age: 27, Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/keqing-edit-by-me-jpg.png", ProfileBackground: "", Status: "Member"},
 
	}
	for _, pkg := range User {
		db.FirstOrCreate(&pkg,entity.User{UserName: pkg.UserName})
	}

	//Tax
	Tax := []entity.TaxUser{
	 	{CompanyName: "ICONIC" ,Residencee: "111, University Road, Suranaree Subdistrict, Mueang Nakhon Ratchasima District, Nakhon Ratchasima 30000" ,IdentificationNumber: 426642 ,UserID:  1},
	}
	for _, pkg := range Tax {
		db.FirstOrCreate(&pkg,entity.TaxUser{IdentificationNumber: pkg.IdentificationNumber})
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
	//AdditionalPackage
	Package := []entity.AdditionalPackage{
		{AdditionalName: "Shop Improvement Package" ,DescribtionPackage: "It will help you sell and provide you with timely service.",PricePackage: 5000,AdditionalPicture: "https://5.imimg.com/data5/SELLER/Default/2020/10/IX/MQ/XI/102254257/online-store-development-service-500x500.png"},
		{AdditionalName: "Technology support package" ,DescribtionPackage: "Help support sales in the online section.",PricePackage: 3000,AdditionalPicture: "https://5.imimg.com/data5/SELLER/Default/2024/10/459820292/BN/EX/RM/234299250/online-store-development-service-500x500.png"},
		{AdditionalName: "Logistics services" ,DescribtionPackage: "It is a logistics service provider that works on transportation and storage systems to help increase work convenience for those who do not have their own warehouses. It can be said that it is a service that helps reduce costs quite a bit.",PricePackage: 7000,AdditionalPicture: "https://i.pinimg.com/736x/03/75/8f/03758f9a674bdc18cdf2caed07f59c72.jpg"},
	}
	for _, pkg := range Package {
		db.FirstOrCreate(&pkg,entity.AdditionalPackage{AdditionalName: pkg.AdditionalName})
	}

	//PaymentMethodStore
	PaymentMethod := []entity.PaymentMethodStore{
		{MethodName: "Mastercard",MethodPic: "https://cdn-icons-png.flaticon.com/512/105/105615.png"},
		{MethodName: "Promptpay",MethodPic: "https://static-00.iconduck.com/assets.00/qr-scan-icon-512x512-9bsp061y.png"},

	}
	for _, pkg := range PaymentMethod {
		db.FirstOrCreate(&pkg,entity.PaymentMethodStore{MethodName: pkg.MethodName})
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

	//ใส่ข้อมูลเริ่มต้นของ Schedule
	// กำหนดวันเริ่มต้นและสิ้นสุดของเดือนนี้
	currentYear, currentMonth, _ := time.Now().Date()
	startDate := time.Date(currentYear, currentMonth, 1, 8, 0, 0, 0, time.UTC)
	endDate := startDate.AddDate(0, 1, -1) // วันสุดท้ายของเดือนนี้

	// ดึงข้อมูล Area ทั้งหมดจากฐานข้อมูล
	var Areas []entity.Area
	if err := db.Find(&Areas).Error; err != nil {
    	fmt.Println("Error fetching areas:", err)
    	return
	}

	if len(Areas) == 0 {
    	fmt.Println("No areas found in the database")
    	return
	}

	// วนลูปแต่ละ Area
	for _, area := range Areas {
    	// สร้างตารางทำความสะอาดสำหรับแต่ละวันในเดือนนี้
    	for day := startDate; !day.After(endDate); day = day.AddDate(0, 0, 1) {
        	schedule := entity.Schedule{
            	StartTime: time.Date(day.Year(), day.Month(), day.Day(), 8, 0, 0, 0, time.UTC),
            	EndTime:   time.Date(day.Year(), day.Month(), day.Day(), 10, 0, 0, 0, time.UTC),
            	AreaID:    area.ID,
        	}

        	// บันทึกข้อมูลลงในฐานข้อมูล
        	db.FirstOrCreate(&schedule, entity.Schedule{StartTime: schedule.StartTime, AreaID: schedule.AreaID})
    	}
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
	//Status store
	Status := []entity.StatusStoreAll{
		{StatusName: "This store is available for reservation."},
		{StatusName: "WaitingForApproval"},
		{StatusName: "Waiting for Payment."},
		{StatusName: "This store is already taken."},
	}
	for _, pkg := range Status {
		db.FirstOrCreate(&pkg,entity.StatusStoreAll{StatusName: pkg.StatusName})
	}
	
	//Status payment
	Payment := []entity.PaymentStoreStatus{
		{PaymentStatusStore: "not paid"},
		{PaymentStatusStore: "paid"},
	}
	for _, pkg := range Payment {
		db.FirstOrCreate(&pkg,entity.PaymentStoreStatus{PaymentStatusStore: pkg.PaymentStatusStore})
	}
	

	//Store
	// ตรวจสอบว่ามีข้อมูลในฐานข้อมูลหรือไม่
	var countStore int64
	db.Model(&entity.Store{}).Count(&countStore)

	if countStore < 1 {
		Store := []entity.Store{
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store1",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "Request",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store2",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store3",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store4",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store5",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store6",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store7",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store8",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store9",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store10",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store11",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store12",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store13",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store14",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store15",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store16",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store17",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store18",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store19",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 1,NameStore: "Store20",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 1 , StatusStoreID: 1 },
			
			
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store21",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store22",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store23",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store24",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store25",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store26",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store27",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store28",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store29",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store30",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store31",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store32",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store33",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store34",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store35",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store36",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store37",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store38",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store39",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 2,NameStore: "Store40",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 2 , StatusStoreID: 1 },
			
			
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store41",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store42",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store43",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store44",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store45",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store46",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store47",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store48",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store49",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store50",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store51",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store52",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store53",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store54",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store55",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store56",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store57",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store58",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store59",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store60",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 3 , StatusStoreID: 1 },
			
			
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store61",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store62",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store63",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store64",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store65",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store66",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store67",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store68",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store69",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store70",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store71",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store72",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store73",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store74",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store75",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store76",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store77",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store78",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store79",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
			{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png",SubPicOne: "",SubPicTwo: "",SubPicThree: "",MembershipID: 3,NameStore: "Store80",BookingDate: time.Now(),LastDay: time.Now().AddDate(0, 0, 365),DescribtionStore: "test Test test",StatusService: "NoRequest",UserID: 0,ProductTypeID: 4 , StatusStoreID: 1 },
		}
		for _, pkg := range Store {
			db.FirstOrCreate(&pkg,entity.Store{NameStore: pkg.NameStore})
		}
	} else {
		fmt.Println("มีร้านค้าครบ 80 รายการแล้ว ไม่จำเป็นต้องเพิ่มใหม่")
	}

	// StatusCard
	NameStatusCard := []entity.StatusCard{
		{Status: "IN"}, {Status: "OUT"}, {Status: "Expired"},
	}
	for _, pkg := range NameStatusCard {
		db.FirstOrCreate(&pkg, entity.StatusCard{Status: pkg.Status})
	}

	// TypeCard
	TypeCards := []entity.TypeCard{
		{Type: "MEMBER", ExpiryYear: 2},
		{Type: "GENERAL", ExpiryYear: 1},
	}
	for _, pkg := range TypeCards {
		db.FirstOrCreate(&pkg, entity.TypeCard{Type: pkg.Type})
	}

	// ParkingZone
	var countZone int64
	db.Model(&entity.ParkingZone{}).Count(&countZone)
	if countZone > 2 {
		fmt.Println("Cannot create more than 3 parking zones.")
	} else {
		// หากจำนวน ParkingZone ไม่เกิน 3 ก็สามารถสร้างได้
		ParkingZones := []entity.ParkingZone{
			{Name: "VIP", MaxCapacity: 150, MaxReservedCapacity: 50, Image: "https://scontent.fbkk29-5.fna.fbcdn.net/v/t1.6435-9/69634816_3284945448183041_5929657803344969728_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH7aZEh79aE3GrCMxEycVazK-Qi7lmfAMkr5CLuWZ8AyQdP4deNxQ9TxWEA_xaEXJJ1bkMeLxaK6l0IguiF1ScP&_nc_ohc=ZYUGA5wLne0Q7kNvgGHtIZF&_nc_zt=23&_nc_ht=scontent.fbkk29-5.fna&_nc_gid=A4Xlfum7gs2jCGZyyoFj2QM&oh=00_AYAhe_M_vSHOJwhOHBITf_7QB5MupJmHOY7g-4BrpdqJGQ&oe=67AC69C2", TypeCardID: 1},
			{Name: "GENERAL", MaxCapacity: 500, MaxReservedCapacity: 200, Image: "https://www.livinginsider.com/upload/topic1660/648a696420bb4_71335.jpeg", TypeCardID: 3},
		}
		for _, zone := range ParkingZones {
			db.FirstOrCreate(&zone, entity.ParkingZone{Name: zone.Name, MaxCapacity: zone.MaxCapacity, Image: zone.Image})
		}
	}

	// ParkingCard
	expiryDate := time.Now().AddDate(0, 0, 0)
	cards := []entity.ParkingCard{
		{ID: "0001", ExpiryDate: &expiryDate, IsPermanent: false, UserID: 0, StatusCardID: 1, TypeCardID: 2, ParkingFeePolicyID: 2},
		{ID: "0002", ExpiryDate: &expiryDate, IsPermanent: false, UserID: 0, StatusCardID: 1, TypeCardID: 2, ParkingFeePolicyID: 2},
	}
	for _, card := range cards {
		db.FirstOrCreate(&card, entity.ParkingCard{ID: card.ID})
	}

	// เพิ่ม ParkingCard สำหรับ GENERAL
	var generalZone entity.ParkingZone
	var existingGeneralCards int64
	db.First(&generalZone, "name = ?", "GENERAL")

	db.Model(&entity.ParkingCard{}).
		Joins("JOIN type_cards ON type_cards.id = parking_cards.type_card_id").
		Where("type_cards.type = ?", "GENERAL").
		Count(&existingGeneralCards)

	var countCard int64
	db.Model(&entity.ParkingCard{}).Count(&countCard)
	if countCard > 700 {
		fmt.Println("Cannot create more than 3 parking zones.")
	} else {
		for i := 0; i < 700; i++ {
			var lastCard entity.ParkingCard
			result := db.Last(&lastCard)

			if result.Error != nil && result.Error.Error() != "record not found" {
				fmt.Println("Error fetching last parking card:", result.Error)
				return
			}

			var newID string
			if result.RowsAffected == 0 {
				newID = "0001"
			} else {
				lastID, err := strconv.Atoi(lastCard.ID)
				if err != nil {
					fmt.Println("Error converting ID:", err)
					return
				}
				newID = fmt.Sprintf("%04d", lastID+1)
			}

			parkingCard := entity.ParkingCard{
				ID:                 newID,
				IsPermanent:        false,
				StatusCardID:       1,
				TypeCardID:         2,
				ParkingFeePolicyID: 2,
			}

			db.FirstOrCreate(&parkingCard, entity.ParkingCard{ExpiryDate: parkingCard.ExpiryDate, StatusCardID: parkingCard.StatusCardID, TypeCardID: parkingCard.TypeCardID})
		}
	}

	// ParkingCardZone
	var parkingCards []entity.ParkingCard
	var parkingZones []entity.ParkingZone
	db.Find(&parkingCards)
	db.Find(&parkingZones)

	zoneMap := make(map[string]entity.ParkingZone) // Map zone name เป็น ID เพื่อให้ค้นหาง่ายขึ้น
	for _, zone := range parkingZones {
		zoneMap[zone.Name] = zone
	}

	for _, card := range parkingCards {
		var zonesToAssign []entity.ParkingZone

		if card.TypeCardID == 1 { // 1 = MEMBER
			zonesToAssign = append(zonesToAssign, zoneMap["VIP"], zoneMap["GENERAL"])
		} else if card.TypeCardID == 2 { // 1 = GENERAL
			zonesToAssign = append(zonesToAssign, zoneMap["GENERAL"])
		} else {
		}

		// สร้าง ParkingCardZone
		for _, zone := range zonesToAssign {
			parkingCardZone := entity.ParkingCardZone{
				ParkingCardID: card.ID, // ใช้ ParkingCardID ที่ได้จากการดึงข้อมูล ParkingCard
				ParkingZoneID: zone.ID, // ใช้ ParkingZoneID ที่ได้จาก zoneMap
			}
			// ตรวจสอบและสร้างหรืออัปเดตข้อมูล ParkingCardZone
			db.FirstOrCreate(&parkingCardZone, entity.ParkingCardZone{
				ParkingCardID: parkingCardZone.ParkingCardID,
				ParkingZoneID: parkingCardZone.ParkingZoneID,
			})
		}
	}

	// ParkingFeePolicy
	feePolicy := []entity.ParkingFeePolicy{
		{InitialFee: 20.0, AddBase_Fee: 20.0, Time_Increment: 1, Discount: 20, TypeCardID: 1},
		{InitialFee: 20.0, AddBase_Fee: 20.0, Time_Increment: 1, Discount: 0, TypeCardID: 3},
	}
	for _, pkg := range feePolicy {
		db.FirstOrCreate(&pkg, entity.ParkingFeePolicy{TypeCardID: pkg.TypeCardID})
	}

	//ServiceRequest
	// สร้าง slice ของ serviceRequests
	// serviceRequests := []entity.ServiceRequest{
	// 	{
	// 		RequestDate:       parseDate("2024-07-05"),
	// 		Description: 	   "ไฟ LED ชำรุด",
	// 		Location:          "Zone A Area B105",
	// 		StatusService:     "pending",
	// 	},
	// 	{
	// 		RequestDate:       parseDate("2024-06-29"),
	// 		Description:	   "แอร์เสีย",
	// 		Location:          "Zone A Area A404",
	// 		StatusService:     "pending",
	// 	},
	// 	{
	// 		RequestDate:       parseDate("2024-06-26"),
	// 		Description: 	   "เครื่องดูดฝุ่นไม่ทำงาน",
	// 		Location:          "Zone F Area C201",
	// 		StatusService:     "pending",
	// 	},
	// 	{
	// 		RequestDate:       parseDate("2024-06-20"),
	// 		Description: 	   "ป้ายไฟโฆษณาพัง",
	// 		Location:          "Zone B Area B109",
	// 		StatusService:     "pending",
	// 	},
	// }

	// // บันทึกข้อมูลลงในฐานข้อมูล
	// for _, request := range serviceRequests {
	// 	db.FirstOrCreate(&request, entity.ServiceRequest{RequestDate: request.RequestDate})
	// }

	// // ข้อมูลตัวอย่าง
	// serviceList := []entity.ServiceRequest{
	// 	{RequestDate: parseDate("2024-07-05"), Description: "ไฟ LED ชำรุด", Location: "Zone A Area B105", StatusService: "pending", StoreID: 1, UserID: 3},
	// 	{RequestDate: parseDate("2024-06-29"), Description: "แอร์เสีย", Location: "Zone A Area A404", StatusService: "pending", StoreID: 2, UserID: 5},
	// 	{RequestDate: parseDate("2024-06-26"), Description: "เครื่องดูดฝุ่นไม่ทำงาน", Location: "Zone F Area C201", StatusService: "pending", StoreID: 3, UserID: 2},
	// 	{RequestDate: parseDate("2024-06-20"), Description: "ป้ายไฟโฆษณาพัง", Location: "Zone B Area B109", StatusService: "pending", StoreID: 4, UserID: 1},
	// 	{RequestDate: parseDate("2024-06-09"), Description: "โต๊ะชำรุด", Location: "Zone A Area A105", StatusService: "pending", StoreID: 5, UserID: 4},
	// }

	// // เพิ่มข้อมูลตัวอย่างในฐานข้อมูล
	// for _, req := range serviceList {
	// 	db.Create(&req)
	// }
	
	// ฟังก์ชันช่วยแปลงวันที่จากสตริง
	// func parseDate(s string) time.Time {
	// 	// กำหนดรูปแบบของวันที่ เช่น "2024-12-20"
	// 	const layout = "2006-01-02"

	// 	// แปลงสตริงไปเป็น time.Time
	// 	parsedDate, err := time.Parse(layout, s)
	// 	if err != nil {
	// 		// หากแปลงไม่ได้ ให้ panic พร้อมข้อความ error
	// 		panic(fmt.Sprintf("invalid date format: %s, expected format YYYY-MM-DD", s))
	// 	}

	// 	// คืนค่าที่แปลงแล้ว
	// 	return parsedDate
	// }
	halls := []entity.Hall{
		{
			HallName:     "Grand Hall",
			Capacity:     500,
			Location:     "ชั้น 1 อาคาร A",
			ImageHall:    "https://www.indianalandmarks.org/wp-content/uploads/2016/06/GrandHall_Feature.jpg",
			Description:  "ห้องโถงขนาดใหญ่สำหรับจัดงานประชุมและสัมมนา",
			PricePerHour: 15000,
		},
		{
			HallName:     "Conference Room",
			Capacity:     50,
			Location:     "ชั้น 2 อาคาร B",
			ImageHall:    "https://erstecampus.at/wp-content/uploads/sites/8/2022/06/eventery-ec-grandhall-14.jpg",
			Description:  "ห้องประชุมขนาดเล็ก เหมาะสำหรับการประชุมทีมและอบรม",
			PricePerHour: 3000,
		},
		{
			HallName:     "Ballroom",
			Capacity:     300,
			Location:     "ชั้น 2 อาคาร C",
			ImageHall:    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Catherine_Palace_ballroom.jpg",
			Description:  "ห้องบอลรูมสุดหรูสำหรับงานแต่งงานและงานเลี้ยงสังสรรค์",
			PricePerHour: 12000,
		},
		{
			HallName:     "Training Room",
			Capacity:     40,
			Location:     "ชั้น 3 อาคาร D",
			ImageHall:    "https://images.ctfassets.net/9mt55bm0937w/1yNrX37344MZG3km5jk7qX/d4dcf23ae1be603d3c30c337d0511188/Key_Visual_Training_Room_Frankfurt_Wiesenh__ttenplatz.jpg",
			Description:  "ห้องฝึกอบรมพร้อมอุปกรณ์มัลติมีเดีย",
			PricePerHour: 2500,
		},
	}
	for _, pkg := range halls {
		db.FirstOrCreate(&pkg,entity.Hall{HallName: pkg.HallName})
	}

	facilities := []entity.Facilities{
		{FacilitiesName: "Projector", Price: 500.0},
		{FacilitiesName: "Microphone", Price: 150.0},
		{FacilitiesName: "Whiteboard", Price: 200.0},
		{FacilitiesName: "Sound System", Price: 1000.0},
		{FacilitiesName: "Laptop", Price: 800.0},
		{FacilitiesName: "Chair", Price: 50.0},
		{FacilitiesName: "Table", Price: 100.0},
		{FacilitiesName: "Sofa", Price: 300.0},
	}
	
	for _, pkg := range facilities {
		db.FirstOrCreate(&pkg, entity.Facilities{FacilitiesName: pkg.FacilitiesName})
	}
	
	statuspaymenthall := []entity.StatusPaymentHall{
		{StatusName: "ชำระเงินแล้ว"},
		{StatusName: "ยังไม่ชำระเงิน"},
	}

	for _, pkg := range statuspaymenthall {
		db.FirstOrCreate(&pkg, entity.StatusPaymentHall{StatusName: pkg.StatusName})
	}
}



