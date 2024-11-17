package config

import (
	"example.com/ProjectSeG13/entity"
	"fmt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
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

func SetupDatabase() {/*
	db.Migrator().DropTable(
		&entity.MembershipCustomer{}, &entity.HistoryMembership{}, &entity.ParkingCard{}, &entity.ParkingZone{}, &entity.ParkingCardZone{})*/
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

		//ระบบจองที่จอดรถและชำระเงิน
		&entity.ParkingCard{},
		&entity.StatusParking{},
		&entity.MembershipCustomer{},
		&entity.HistoryMembership{},
		&entity.ParkingZone{},
		&entity.ParkingCardZone{},
		&entity.ParkingFeePolicy{},
		&entity.ParkingPayment{},
	)

	//User
	hashedPassword, _ := HashPassword("123456")
	User := []entity.User{
		{UserName: "NobpasinTumdee", Password: hashedPassword, Email: "B6506407@g.sut.ac.th", FirstName: "Nobpasin", LastName: "Tumdee", Age: 21, Profile: "https://cache-igetweb-v2.mt108.info/uploads/images-cache/12677/product/dd87089fb03608d6fab36fa1204ce286_full.jpg", ProfileBackground: "", Status: "User"},
		{UserName: "PorGz", Password: hashedPassword, Email: "PorGz@g.sut.ac.th", FirstName: "Por", LastName: "Gz", Age: 21, Profile: "", ProfileBackground: "", Status: "User"},
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
		{PackageName: "Week", Day: 7, Pwa: 350, Pea: 700, RentalFee: 1050, ParkingCardCount: 1},
		{PackageName: "Mount", Day: 30, Pwa: 1500, Pea: 3000, RentalFee: 3600, ParkingCardCount: 3},
		{PackageName: "Year", Day: 365, Pwa: 18250, Pea: 35600, RentalFee: 36500, ParkingCardCount: 6},
	}
	for _, pkg := range Membership {
		db.FirstOrCreate(&pkg, entity.Membership{PackageName: pkg.PackageName})
	}

	//Store
	Store := []entity.Store{
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro1", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro2", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro3", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro4", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro5", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro6", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro7", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro8", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro9", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro10", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro11", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro12", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro13", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro14", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro15", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro16", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro17", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro18", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro19", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},
		{PicStore: "https://t4.ftcdn.net/jpg/05/02/34/81/360_F_502348111_jYZObrgLLrKgcYlf1gNgm8cJNbUo8DoA.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 1, NameStore: "Unicro20", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 1},

		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro21", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro22", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro23", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro24", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro25", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro26", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro27", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro28", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro29", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro30", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro31", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro32", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro33", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro34", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro35", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro36", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro37", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro38", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro39", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},
		{PicStore: "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 2, NameStore: "Unicro40", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 2},

		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro41", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro42", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro43", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro44", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro45", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro46", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro47", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro48", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro49", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro50", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro51", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro52", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro53", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro54", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro55", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro56", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro57", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro58", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro59", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},
		{PicStore: "https://images.ctfassets.net/wdjnw2prxlw8/7fC7srWuSrTZmTqoNkRSDC/297fdf60e5ba04edc297be23f4ca06ba/macerich-queens-center-mall.jpg", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro60", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 3},

		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro61", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro62", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro63", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro64", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro65", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro66", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro67", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro68", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro69", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro70", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro71", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro72", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro73", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro74", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro75", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro76", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro77", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro78", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro79", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
		{PicStore: "https://www.theakyra.com/files/5615/2510/0430/Terminal_21_Shopping_Mall_in_Bangkok.png", SubPicOne: "", SubPicTwo: "", SubPicThree: "", MembershipID: 3, NameStore: "Unicro80", BookingDate: time.Now(), LastDay: time.Now(), DescribtionStore: "test Test test", StatusStore: "inuse", UserID: 1, ProductTypeID: 4},
	}
	for _, pkg := range Store {
		db.FirstOrCreate(&pkg, entity.Store{NameStore: pkg.NameStore})
	}

	//StatusParking
	NameStatus := []entity.StatusParking{
		{Status: "Pending"}, {Status: "Paid"}, {Status: "Expired"}, {Status: "Error"}, {Status: "Un Used"},
	}
	for _, pkg := range NameStatus {
		db.FirstOrCreate(&pkg, entity.StatusParking{Status: pkg.Status})
	}

	//MembershipCustomer
	MembershipCustomers := []entity.MembershipCustomer{
		{FirstName: "Kittisorn", LastName: "Ngandee", DOB: time.Date(1998, 5, 23, 0, 0, 0, 0, time.UTC), Tel: "0811981663"},
		{FirstName: "Pachnida", LastName: "Wamakarn", DOB: time.Date(1998, 5, 24, 0, 0, 0, 0, time.UTC), Tel: "0811981664"},
		{FirstName: "Jedsadaporn", LastName: "Pinjai", DOB: time.Date(1998, 5, 25, 0, 0, 0, 0, time.UTC), Tel: "0811981665"},
		{FirstName: "Tortakul", LastName: "Subka", DOB: time.Date(1998, 5, 26, 0, 0, 0, 0, time.UTC), Tel: "0811981666"},
		{FirstName: "Jularat", LastName: "Piangthaisong", DOB: time.Date(1998, 5, 27, 0, 0, 0, 0, time.UTC), Tel: "0811981667"},
		{FirstName: "Nattawut", LastName: "Srisung", DOB: time.Date(1998, 5, 28, 0, 0, 0, 0, time.UTC), Tel: "0811981668"},
		{FirstName: "Sutthipong", LastName: "Kittiwattanawong", DOB: time.Date(1998, 5, 29, 0, 0, 0, 0, time.UTC), Tel: "0811981669"},
		{FirstName: "Chayanon", LastName: "Boonchud", DOB: time.Date(1998, 5, 30, 0, 0, 0, 0, time.UTC), Tel: "0811981670"},
		{FirstName: "Sakda", LastName: "Rattanawong", DOB: time.Date(1998, 5, 31, 0, 0, 0, 0, time.UTC), Tel: "0811981671"},
		{FirstName: "Narissara", LastName: "Sutthiwong", DOB: time.Date(1998, 6, 1, 0, 0, 0, 0, time.UTC), Tel: "0811981672"},
	}
	for _, customer := range MembershipCustomers {
		db.FirstOrCreate(&customer)
	}

	//HistoryMembership
	historyMemberships := []entity.HistoryMembership{
		{IssueDate: time.Date(2004, 1, 1, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 1},
		{IssueDate: time.Date(2004, 1, 2, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 2, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 2},
		{IssueDate: time.Date(2004, 1, 3, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 3, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 3},
		{IssueDate: time.Date(2004, 1, 4, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 4, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 4},
		{IssueDate: time.Date(2004, 1, 5, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 5, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 5},
		{IssueDate: time.Date(2004, 1, 6, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 6, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 6},
		{IssueDate: time.Date(2004, 1, 7, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 7, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 7},
		{IssueDate: time.Date(2004, 1, 8, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 8, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 8},
		{IssueDate: time.Date(2004, 1, 9, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 9, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 9},
		{IssueDate: time.Date(2004, 1, 10, 0, 0, 0, 0, time.UTC), ExpiryDate: time.Date(2025, 1, 10, 0, 0, 0, 0, time.UTC), MembershipCustomerID: 10},
	}
	for _, history := range historyMemberships {
		db.FirstOrCreate(&history)
	}

	//ParkingCard
	var stores []entity.Store
	var membershipCustomers []entity.MembershipCustomer
	db.Find(&stores)
	db.Find(&membershipCustomers)
	for _, store := range stores {
		var membership entity.Membership
		db.First(&membership, store.MembershipID)

		if membership.ParkingCardCount > 0 {
			for i := 0; i < membership.ParkingCardCount; i++ {
				parkingCard := entity.ParkingCard{
					StoreID:         store.ID,
					ExpiryDate:      store.LastDay,
					StatusParkingID: 5,
				}

				db.FirstOrCreate(&parkingCard)
			}
		}
	}
	for _, membershipCustomer := range membershipCustomers {
		var historyMembership entity.HistoryMembership
		db.First(&historyMembership, membershipCustomer.ID)

		parkingCard := entity.ParkingCard{
			MembershipCustomerID: membershipCustomer.ID,
			ExpiryDate:           historyMembership.ExpiryDate,
			StatusParkingID:      5,
		}

		db.FirstOrCreate(&parkingCard)
	}

	//ParkingZone
	ParkingZones := []entity.ParkingZone{
		{Name: "GENERAL", Capacity: 500, AvailableZone: 500},
		{Name: "VIP", Capacity: 150, AvailableZone: 150},
		{Name: "STORE", Capacity: 150, AvailableZone: 150},
	}
	for _, zone := range ParkingZones {
		db.FirstOrCreate(&zone)
	}

	//ParkingZone
	var parkingCards []entity.ParkingCard
	var parkingZones []entity.ParkingZone
	db.Find(&parkingCards)
	db.Find(&parkingZones)
	for _, card := range parkingCards {
		var zoneType string
		var membershipCustomer entity.MembershipCustomer
		var store entity.Store
		var zone entity.ParkingZone

		// ตรวจสอบเงื่อนไขต่างๆ
		if card.MembershipCustomerID == 0 && card.StoreID == 0 {
			zone.ID = 1
			zoneType = "GENERAL"
		} else if card.MembershipCustomerID != 0 && card.StoreID == 0 {
			result := db.First(&membershipCustomer, "id = ?", card.MembershipCustomerID)
			if result.RowsAffected > 0 {
				zone = parkingZones[1]
				zoneType = zone.Name
			}
		} else if card.MembershipCustomerID == 0 && card.StoreID != 0 {
			result := db.First(&store, "id = ?", card.StoreID)
			if result.RowsAffected > 0 {
				zone = parkingZones[2]
				zoneType = zone.Name
			}
		}
		parkingCardZone := entity.ParkingCardZone{
			ParkingCardID: card.ID,
			ParkingZoneID: zone.ID,
			Type:          zoneType,
		}
		db.FirstOrCreate(&parkingCardZone)
	}

	//ParkingFeePolicy=
	feePolicy := []entity.ParkingFeePolicy{
		{FreeHours: 3.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 0, LostCard: 50.0, IsExempt: false, ParkingCardZoneID: 1},
		{FreeHours: 4.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 20, LostCard: 50.0, IsExempt: false, ParkingCardZoneID: 2},
	}
	for _, pkg := range feePolicy {
		db.FirstOrCreate(&pkg, entity.ParkingFeePolicy{ParkingCardZoneID: pkg.ParkingCardZoneID})
	}

}
