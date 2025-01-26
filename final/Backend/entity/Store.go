package entity

import (
	"time"
	"gorm.io/gorm"
)

type Store struct {
	gorm.Model
	PicStore  						string 				`json:"PicStore" valid:"required~Photo Store is required"`
	SubPicOne  						string 				`json:"SubPicOne"`
	SubPicTwo  						string 				`json:"SubPicTwo"`
	SubPicThree  					string 				`json:"SubPicThree"`
	NameStore  						string 				`json:"NameStore" valid:"required~NameStore is required"`
	BookingDate  					time.Time 			`json:"BookingDate"`
	LastDay  						time.Time 			`json:"LastDay"`
	DescribtionStore  				string 				`json:"DescribtionStore" valid:"required~DescribtionStore is required"`
	StatusService  					string 				`json:"StatusService"`
	

	MembershipID 					uint 				`json:"MembershipID" valid:"required~MembershipID is required"`
	Membership   					Membership 			`gorm:"foreignKey:MembershipID" valid:"-"`

	UserID 							uint 				`json:"UserID" valid:"required~User ID is required"`
	User   							User 				`gorm:"foreignKey:UserID"`

	StatusStoreID 					uint 				`json:"StatusStoreID"`
	StatusStoreAll   				StatusStoreAll 		`gorm:"foreignKey:StatusStoreID" valid:"-"`

	ProductTypeID 					uint 				`json:"ProductTypeID" valid:"required~ProductTypeID is required"`
	ProductType   					ProductType 		`gorm:"foreignKey:ProductTypeID" valid:"-"`



	ServiceRequest 					[]ServiceRequest 	`gorm:"foreignKey:StoreID"`
	Rating 							[]Rating 			`gorm:"foreignKey:StoreID"`
	BackupStore 					[]BackupStore 		`gorm:"foreignKey:StoreID"`
	PaymentStore 					[]PaymentStore 		`gorm:"foreignKey:StoreID"`
	StoreInformation 				[]StoreInformation 	`gorm:"foreignKey:StoreID"`
}

type StatusStoreAll struct {
	gorm.Model
	StatusName						string 				`json:"StatusName" valid:"required~Status Name is required"`

	Store 							[]Store 			`gorm:"foreignKey:StatusStoreID"`
}

type StoreInformation struct {
	gorm.Model
	Picture							string 				`json:"Picture" valid:"required~Picture is required"`
	Details							string 				`json:"Details" valid:"required~Details is required"`
	DescriptionPic					string 				`json:"DescriptionPic"`

	StoreID 						uint 				`json:"StoreID" valid:"required~StoreID is required"`
	Store   						Store 				`gorm:"foreignKey:StoreID" valid:"-"`
}


type Membership struct {
	gorm.Model
	PackageName						string 				`json:"PackageName" valid:"required~PackageName is required"`
	Day								int 				`json:"Day" valid:"required~Day is required"`
	Pwa								int 				`json:"Pwa" valid:"required~Pwa is required"`
	Pea								int 				`json:"Pea" valid:"required~Pea is required"`
	RentalFee						int 				`json:"RentalFee" valid:"required~RentalFee is required"`
	ParkingCardCount				int 				`json:"ParkingCardCount"`

	Store 							[]Store 			`gorm:"foreignKey:MembershipID"`
}



type Rating struct {
	gorm.Model
	Rating							int 				`json:"Rating"`
	Comment							string 				`json:"Comment"`
	
	StoreID 						uint 				`json:"StoreID"`
	Store   						Store 				`gorm:"foreignKey:StoreID"`
	
	UserID 							uint 				`json:"UserID"`
	User   							User 				`gorm:"foreignKey:UserID"`
}


type BackupStore struct {
	gorm.Model
	PicStoreBackup  				string 				`json:"PicStoreBackup"`
	PicOneBackup  					string 				`json:"PicOneBackup"`
	PicTwoBackup   					string 				`json:"PicTwoBackup"`
	PicThreeBackup  				string 				`json:"PicThreeBackup"`
	MembershipBackup 				uint 				`json:"MembershipBackup"`
	NameBackup  					string 				`json:"NameBackup"`
	BookingBackup  					time.Time 			`json:"BookingBackup"`
	LastDayBackup  					time.Time 			`json:"LastDayBackup"`
	DescribtionStoreB  				string 				`json:"DescribtionStoreB"`
	ProductTypeIDB 					int 				`json:"ProductTypeIDB"`



	UserID 							uint 				`json:"UserID"`
	User   							User 				`gorm:"foreignKey:UserID"`

	StoreID 						uint 				`json:"StoreID"`
	Store   						Store 				`gorm:"foreignKey:StoreID"`
}
