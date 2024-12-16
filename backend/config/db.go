package config

import (
	"fmt"
	"strconv"
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
		&entity.TypePark{},
		&entity.StatusCard{},
		&entity.StatusPayment{},
		&entity.MembershipCustomer{},
		&entity.HistoryMembership{},
		&entity.ParkingCard{},
		&entity.ParkingZone{},
		&entity.ParkingCardZone{},
		&entity.ParkingFeePolicy{},
		&entity.ParkingPayment{},
		&entity.ParkingTransaction{},
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
		{PackageName: "Week", Day: 7, Pwa: 350, Pea: 700, RentalFee: 1050},
		{PackageName: "Mount", Day: 30, Pwa: 1500, Pea: 3000, RentalFee: 3600},
		{PackageName: "Year", Day: 365, Pwa: 18250, Pea: 35600, RentalFee: 36500},
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

	// StatusPayment
	NameStatusPayment := []entity.StatusPayment{
		{Status: "Pending"}, {Status: "Paid"}, {Status: "Error"},
	}
	for _, pkg := range NameStatusPayment {
		db.FirstOrCreate(&pkg, entity.StatusPayment{Status: pkg.Status})
	}

	// StatusCard
	NameStatusCard := []entity.StatusCard{
		{Status: "IN"}, {Status: "OUT"}, {Status: "Un Used"}, {Status: "Expired"},
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
		db.FirstOrCreate(&customer, entity.MembershipCustomer{FirstName: customer.FirstName, LastName: customer.LastName})
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
		db.FirstOrCreate(&history, entity.HistoryMembership{IssueDate: history.IssueDate, ExpiryDate: history.ExpiryDate, MembershipCustomerID: history.MembershipCustomerID})
	}

	// ParkingZone
	ParkingZones := []entity.ParkingZone{
		{Name: "VIP", Capacity: 150, AvailableZone: 150, Image: "https://scontent.fbkk29-5.fna.fbcdn.net/v/t1.6435-9/69634816_3284945448183041_5929657803344969728_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeH7aZEh79aE3GrCMxEycVazK-Qi7lmfAMkr5CLuWZ8AyQdP4deNxQ9TxWEA_xaEXJJ1bkMeLxaK6l0IguiF1ScP&_nc_ohc=HHwdlMsqInMQ7kNvgHcBK4q&_nc_zt=23&_nc_ht=scontent.fbkk29-5.fna&_nc_gid=AysvpZXPyfWOMR0V7BbkNjS&oh=00_AYB86cIxoXTgtujJm4Oha2iNfyQ5ADMaB1vD-Rp38dbzaw&oe=676FFD02", TypeParkID: 1},
		{Name: "STORE", Capacity: 150, AvailableZone: 150, Image: "https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/467472946_1244156386684689_3812533161216721348_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEf-7GCGOcBEkWwVtPsZDA7Mo9cV6lZQjgyj1xXqVlCOLp0Vo2D3380RKH459Xq0reVeWE0GjRPuNp0Aygtng54&_nc_ohc=L7HrMPnJMlQQ7kNvgGUUJe-&_nc_zt=23&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD1QEtF_SJWRQn9oIsRDoLWWJ-2xOq50VV9Ah_4oY5q3HPJw&oe=676FFEEF", TypeParkID: 2},
		{Name: "GENERAL", Capacity: 500, AvailableZone: 500, Image: "https://image.makewebeasy.net/makeweb/m_1920x0/ODn1Yn6Lo/CARPARK/%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%88%E0%B8%AD_2565_01_31_%E0%B9%80%E0%B8%A7%E0%B8%A5%E0%B8%B2_14_00_35.png?v=202012190947", TypeParkID: 3},
	}
	for _, zone := range ParkingZones {
		db.FirstOrCreate(&zone, entity.ParkingZone{Name: zone.Name, Capacity: zone.Capacity, AvailableZone: zone.AvailableZone, Image: zone.Image})
	}

	// ParkingCard
	var stores []entity.Store
	var membershipCustomers []entity.MembershipCustomer
	db.Find(&stores)
	db.Find(&membershipCustomers)

	// สร้าง ParkingCard สำหรับ Store
	for _, store := range stores {
		var lastCard entity.ParkingCard
		result := db.Last(&lastCard)

		// ตรวจสอบว่า Last() พบข้อมูลหรือไม่
		if result.Error != nil && result.Error.Error() == "record not found" {
			// ถ้าไม่มีข้อมูลในตาราง parking_cards
			newID := "0001" // กำหนดเป็น 0001 หรือค่าเริ่มต้นอื่น ๆ
			parkingCard := entity.ParkingCard{
				ID:           newID,
				StoreID:      store.ID,
				ExpiryDate:   store.LastDay,
				StatusCardID: 1,
				TypeParkID:   2,
				ParkingFeePolicyID: 2,
			}
			db.Create(&parkingCard) // สร้างบันทึกใหม่
		} else if result.Error != nil {
			// ถ้ามีข้อผิดพลาดอื่น ๆ
			fmt.Println("Error fetching last parking card:", result.Error)
			return
		} else {
			// ถ้าพบข้อมูลในตาราง
			lastID, err := strconv.Atoi(lastCard.ID)
			if err != nil {
				fmt.Println("Error converting ID:", err)
				return
			}
			newID := fmt.Sprintf("%04d", lastID+1)

			parkingCard := entity.ParkingCard{
				ID:                 newID,
				StoreID:            store.ID,
				ExpiryDate:         store.LastDay,
				StatusCardID:       1,
				TypeParkID:         2,
				ParkingFeePolicyID: 2,
			}

			db.FirstOrCreate(&parkingCard, entity.ParkingCard{StoreID: parkingCard.StoreID, ExpiryDate: parkingCard.ExpiryDate, StatusCardID: parkingCard.StatusCardID, TypeParkID: parkingCard.TypeParkID})
		}
	}

	// สร้าง ParkingCard สำหรับ MembershipCustomer
	for _, membershipCustomer := range membershipCustomers {
		var historyMembership entity.HistoryMembership
		db.First(&historyMembership, membershipCustomer.ID)

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
			ID:                   newID,
			MembershipCustomerID: membershipCustomer.ID,
			ExpiryDate:           historyMembership.ExpiryDate,
			StatusCardID:         1,
			TypeParkID:           1,
			ParkingFeePolicyID:   1,
		}

		db.FirstOrCreate(&parkingCard, entity.ParkingCard{MembershipCustomerID: parkingCard.MembershipCustomerID, ExpiryDate: parkingCard.ExpiryDate, StatusCardID: parkingCard.StatusCardID, TypeParkID: parkingCard.TypeParkID})
	}

	// เพิ่ม ParkingCard สำหรับ GENERAL
	var generalZone entity.ParkingZone
	var existingGeneralCards int64
	db.First(&generalZone, "name = ?", "GENERAL")

	db.Model(&entity.ParkingCard{}).Where("membership_customer_id = 0 AND store_id = 0").Count(&existingGeneralCards)

	generalZoneCapacity := int(generalZone.Capacity)
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
		if card.StoreID != 0 {
			zonesToAssign = append(zonesToAssign, zoneMap["STORE"], zoneMap["GENERAL"])
		} else if card.MembershipCustomerID != 0 {
			zonesToAssign = append(zonesToAssign, zoneMap["VIP"], zoneMap["GENERAL"])
		} else {
			zonesToAssign = append(zonesToAssign, zoneMap["GENERAL"])
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

	//ParkingFeePolicy
	feePolicy := []entity.ParkingFeePolicy{
		{FreeHours: 3.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 0, LostCard: 50.0, IsExempt: false, TypeParkID: 1},
		{FreeHours: 4.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 20, LostCard: 50.0, IsExempt: false, TypeParkID: 2},
		{FreeHours: 4.0, AddBase_Fee: 20.0, Time_Increment: time.Now(), Discount: 20, LostCard: 50.0, IsExempt: false, TypeParkID: 3},
	}
	for _, pkg := range feePolicy {
		db.FirstOrCreate(&pkg, entity.ParkingFeePolicy{TypeParkID: pkg.TypeParkID})
	}

}
