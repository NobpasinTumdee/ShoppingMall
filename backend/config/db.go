package config

import (
	"example.com/ProjectSeG13/entity"
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"strconv"
	"time"
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
		&entity.ServiceRequest{},
		&entity.EquipmentRequest{},

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

		//ระบบจองที่จอดรถและชำระเงิน
		&entity.TypePark{},
		&entity.StatusCard{},
		&entity.StatusPayment{},
		&entity.ParkingCard{},
		&entity.ParkingZone{},
		&entity.ParkingZoneDaily{},
		&entity.ParkingCardZone{},
		&entity.ParkingFeePolicy{},
		&entity.ParkingPayment{},
		&entity.Vehicle{},
		&entity.ParkingTransaction{},
	)

	//User
	hashedPassword, _ := HashPassword("1")
	User := []entity.User{
		{UserName: "NobpasinTumdee", Password: hashedPassword, Email: "B6506407@g.sut.ac.th", FirstName: "Nobpasin", LastName: "Tumdee", Age: 21, Profile: "https://i.pinimg.com/736x/db/c0/14/dbc014d8d2229eb5e5a3e76980c137ca.jpg", ProfileBackground: "", Status: "User"},
		{UserName: "PorGz", Password: hashedPassword, Email: "PorGz@g.sut.ac.th", FirstName: "Por", LastName: "Gz", Age: 21, Profile: "", ProfileBackground: "", Status: "User"},
		{UserName: "Admin", Password: hashedPassword, Email: "Admin@g.sut.ac.th", FirstName: "Admin", LastName: "", Age: 100, Profile: "https://theinformalgamer.wordpress.com/wp-content/uploads/2022/02/character_yae_miko_thumb-min.png", ProfileBackground: "", Status: "Admin"},
		{UserName: "Employee", Password: hashedPassword, Email: "Employee@g.sut.ac.th", FirstName: "employee", LastName: "", Age: 100, Profile: "https://tiermaker.com/images/template_images/2022/15460683/genshin-characters-going-to-a-beach---pool-party-15460683/screenshot20221127-203037googlejpg.png", ProfileBackground: "", Status: "Employee"},
		{UserName: "Member", Password: hashedPassword, Email: "Member@g.sut.ac.th", FirstName: "Member", LastName: "", Age: 100, Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/keqing-edit-by-me-jpg.png", ProfileBackground: "", Status: "Member"},
		{UserName: "Cleaning", Password: hashedPassword, Email: "Cleaning@g.sut.ac.th", FirstName: "Cleaning", LastName: "", Age: 100, Profile: "https://tiermaker.com/images/chart/chart/genshin-characters-as-mcdonalds-workers-girls-15172367/kokomijpg.png", ProfileBackground: "", Status: "Cleaning"},
		{UserName: "Repairman", Password: hashedPassword, Email: "Repairman@g.sut.ac.th", FirstName: "Repairman", LastName: "", Age: 100, Profile: "https://i.pinimg.com/236x/a6/61/b1/a661b180316fb4559c0685a65b289ee4.jpg", ProfileBackground: "", Status: "Repairman"},
	}
	for _, pkg := range User {
		db.FirstOrCreate(&pkg, entity.User{UserName: pkg.UserName})
	}

	//ProductType
	Floor := []entity.ProductType{
		{NameType: "A"}, {NameType: "B"}, {NameType: "C"}, {NameType: "D"},
	}
	for _, pkg := range Floor {
		db.FirstOrCreate(&pkg, entity.ProductType{NameType: pkg.NameType})
	}

	//Membership
	Membership := []entity.Membership{
		{PackageName: "Week", Day: 7, Pwa: 350, Pea: 700, RentalFee: 1050},
		{PackageName: "Mount", Day: 30, Pwa: 1500, Pea: 3000, RentalFee: 3600},
		{PackageName: "Year", Day: 365, Pwa: 18250, Pea: 35600, RentalFee: 36500},
	}
	for _, pkg := range Membership {
		db.FirstOrCreate(&pkg, entity.Membership{PackageName: pkg.PackageName})
	}

	//PaymentMethodStore
	PaymentMethod := []entity.PaymentMethodStore{
		{MethodName: "Mastercard", MethodPic: "https://cdn-icons-png.flaticon.com/512/105/105615.png"},
		{MethodName: "Promptpay", MethodPic: "https://static-00.iconduck.com/assets.00/qr-scan-icon-512x512-9bsp061y.png"},
	}
	for _, pkg := range PaymentMethod {
		db.FirstOrCreate(&pkg, entity.PaymentMethodStore{MethodName: pkg.MethodName})
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
			//fmt.Printf("Assigned AreaID %d on %s\n", area.ID, day.Format("2006-01-02"))
		}
	}

	//CategoryInventory
	item := []entity.CategoryInventory{
		{CategoryName: "Cleaning equipment"}, {CategoryName: "Tools"},
	}
	for _, pkg := range item {
		db.FirstOrCreate(&pkg, entity.CategoryInventory{CategoryName: pkg.CategoryName})
	}

	//Inventory
	Inventory := []entity.Inventory{
		{InventoryName: "ไม้ถูพื้น", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "ถังน้ำ", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "น้ำยาทำความสะอาดพื้น", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "ไม้กวาด", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "ที่โกยผง", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "ผ้าไมโครไฟเบอร์", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "น้ำยาเช็ดกระจก", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "ฟองน้ำล้างจาน", QuantityInventory: 15, CategoryID: 1},
		{InventoryName: "เครื่องดูดฝุ่น", QuantityInventory: 5, CategoryID: 1},
		{InventoryName: "ถุงมือยาง", QuantityInventory: 150, CategoryID: 1},
		{InventoryName: "ไขควง", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "คีม", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "ประแจ", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "เลื่อยมือ", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "ตลับเมตร", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "สว่านไฟฟ้า", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "ระดับน้ำ", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "ค้อน", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "ใบตัดเหล็ก", QuantityInventory: 15, CategoryID: 2},
		{InventoryName: "ปืนยิงซิลิโคน", QuantityInventory: 15, CategoryID: 2},
	}
	for _, pkg := range Inventory {
		db.FirstOrCreate(&pkg, entity.Inventory{InventoryName: pkg.InventoryName})
	}

	Store := []entity.Store{
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro1", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "Request", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro2", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro3", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro4", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro5", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro6", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro7", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro8", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro9", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro10", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro11", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro12", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro13", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro14", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro15", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro16", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro17", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro18", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro19", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro20", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is available for reservation.", StatusService: "NoRequest", UserID: 0, ProductTypeID: 1},

		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro21", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro22", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro23", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro24", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro25", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro26", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro27", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro28", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro29", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro30", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro31", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro32", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro33", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro34", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro35", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro36", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro37", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro38", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro39", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro40", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 2},

		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro41", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro42", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro43", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro44", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro45", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro46", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro47", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro48", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro49", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro50", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro51", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro52", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro53", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro54", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro55", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro56", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro57", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro58", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro59", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro60", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 3},

		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro61", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro62", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro63", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro64", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro65", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro66", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro67", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro68", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro69", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro70", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro71", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro72", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro73", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro74", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro75", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro76", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro77", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro78", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro79", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro80", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", StatusService: "NoRequest", UserID: 1, ProductTypeID: 4},

		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro21", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro22", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro23", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro24", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro25", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro26", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro27", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro28", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro29", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro30", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro31", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro32", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro33", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro34", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro35", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro36", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro37", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro38", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro39", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro40", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 2},

		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro41", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro42", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro43", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro44", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro45", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro46", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro47", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro48", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro49", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro50", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro51", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro52", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro53", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro54", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro55", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro56", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro57", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro58", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro59", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro60", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 3},

		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro61", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro62", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro63", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro64", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro65", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro66", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro67", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro68", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro69", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro70", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro71", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro72", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro73", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro74", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro75", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro76", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro77", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro78", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro79", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro80", BookingDate: time.Now(), LastDay: time.Now().AddDate(0, 0, 365), DescribtionStore: "test Test test", StatusStore: "This store is already taken.", UserID: 1, ProductTypeID: 4},
	}
	for _, pkg := range Store {
		db.FirstOrCreate(&pkg, entity.Store{NameStore: pkg.NameStore})
	}
	// StatusPayment
	NameStatusPayment := []entity.StatusPayment{
		{Status: "Pending"}, {Status: "Paid"}, {Status: "Error"},
	}
	for _, pkg := range NameStatusPayment {
		db.FirstOrCreate(&pkg, entity.StatusPayment{Status: pkg.Status})
	}

	// StatusCard
	NameStatusCard := []entity.StatusCard{
		{Status: "IN"}, {Status: "OUT"}, {Status: "Inactive"}, {Status: "Expired"},
	}
	for _, pkg := range NameStatusCard {
		db.FirstOrCreate(&pkg, entity.StatusCard{Status: pkg.Status})
	}

	// TypePark
	TypeParks := []entity.TypePark{
		{Type: "VIP"},
		{Type: "STORE"},
		{Type: "GENERAL"},
	}
	for _, pkg := range TypeParks {
		db.FirstOrCreate(&pkg, entity.TypePark{Type: pkg.Type})
	}

	// ParkingZone
	/* var countZone int64
	db.Model(&entity.ParkingZone{}).Count(&countZone)
	if countZone > 3 {
		fmt.Println("Cannot create more than 3 parking zones.")
	} else { */
		// หากจำนวน ParkingZone ไม่เกิน 3 ก็สามารถสร้างได้
		ParkingZones := []entity.ParkingZone{
			{Name: "VIP", MaxCapacity: 150, MaxReservedCapacity: 50, Image: "https://scontent.fbkk29-5.fna.fbcdn.net/v/t1.6435-9/69634816_3284945448183041_5929657803344969728_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH7aZEh79aE3GrCMxEycVazK-Qi7lmfAMkr5CLuWZ8AyQdP4deNxQ9TxWEA_xaEXJJ1bkMeLxaK6l0IguiF1ScP&_nc_ohc=HHwdlMsqInMQ7kNvgHcBK4q&_nc_zt=23&_nc_ht=scontent.fbkk29-5.fna&_nc_gid=AysvpZXPyfWOMR0V7BbkNjS&oh=00_AYB86cIxoXTgtujJm4Oha2iNfyQ5ADMaB1vD-Rp38dbzaw&oe=676FFD02", TypeParkID: 1},
			{Name: "STORE", MaxCapacity: 150,MaxReservedCapacity: 50, Image: "https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/467472946_1244156386684689_3812533161216721348_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEf-7GCGOcBEkWwVtPsZDA7Mo9cV6lZQjgyj1xXqVlCOLp0Vo2D3380RKH459Xq0reVeWE0GjRPuNp0Aygtng54&_nc_ohc=L7HrMPnJMlQQ7kNvgGUUJe-&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD1QEtF_SJWRQn9oIsRDoLWWJ-2xOq50VV9Ah_4oY5q3HPJw&oe=676FFEEF", TypeParkID: 2},
			{Name: "GENERAL", MaxCapacity: 500, MaxReservedCapacity: 200, Image: "https://www.livinginsider.com/upload/topic1660/648a696420bb4_71335.jpeg", TypeParkID: 3},
		}
		for _, zone := range ParkingZones {
			db.FirstOrCreate(&zone, entity.ParkingZone{Name: zone.Name, MaxCapacity: zone.MaxCapacity, Image: zone.Image})
		}
	/* } */

	// ParkingCard
	cards := []entity.ParkingCard{
	   	{ID: "0001", ExpiryDate: time.Now().AddDate(1, 0, 0), IsPermanent:false, UserID: 0, StatusCardID: 1, TypeParkID: 3, ParkingFeePolicyID: 3},
	}
	for _, card := range cards {
	   	db.FirstOrCreate(&card, entity.ParkingCard{ID: card.ID})
	}
	
	// เพิ่ม ParkingCard สำหรับ GENERAL
	var generalZone entity.ParkingZone
	var existingGeneralCards int64
	db.First(&generalZone, "name = ?", "GENERAL")

	db.Model(&entity.ParkingCard{}).
		Joins("JOIN type_parks ON type_parks.id = parking_cards.type_park_id").
		Where("type_parks.type = ?", "GENERAL").
		Count(&existingGeneralCards)

	generalZoneCapacity := int(generalZone.MaxCapacity)
	cardsToCreate := generalZoneCapacity - int(existingGeneralCards)

	for i := 0; i < cardsToCreate; i++ {
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
			ExpiryDate:         time.Now().AddDate(1, 0, 0),
			IsPermanent:        false,
			StatusCardID:       1,
			TypeParkID:         3,
			ParkingFeePolicyID: 3,
		}

		db.FirstOrCreate(&parkingCard, entity.ParkingCard{ExpiryDate: parkingCard.ExpiryDate, StatusCardID: parkingCard.StatusCardID, TypeParkID: parkingCard.TypeParkID})
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

		// ตรวจสอบเพื่อกำหนด TypeCard
		if card.TypeParkID == 2 { // 2 = STORE
			zonesToAssign = append(zonesToAssign, zoneMap["STORE"], zoneMap["GENERAL"])
		} else if card.TypeParkID == 1 { // 1 = VIP
			zonesToAssign = append(zonesToAssign, zoneMap["VIP"], zoneMap["GENERAL"])
		} else if card.TypeParkID == 3 {
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
		{FreeHours: 3.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 0, IsExempt: false, TypeParkID: 1},
		{FreeHours: 4.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 20, IsExempt: false, TypeParkID: 2},
		{FreeHours: 4.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 20, IsExempt: false, TypeParkID: 3},
	}
	for _, pkg := range feePolicy {
		db.FirstOrCreate(&pkg, entity.ParkingFeePolicy{TypeParkID: pkg.TypeParkID})
	}

}
