package entity

import (
	"time"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName  				string 		`json:"UserName"`// valid:"required~User Name is required"
	Password     			string 		`json:"Password"`// valid:"required~Password is required"
	Email     				string 		`json:"Email"`// valid:"required~Email is required, email~Email is invalid"
	Profile     			string 		`json:"Profile"`
	ProfileBackground     	string 		`json:"ProfileBackground"`
	FirstName     			string 		`json:"FirstName"`
	LastName     			string 		`json:"LastName"`
	Age     				int 		`json:"Age"`
	Tel     				string 		`json:"Tel"`
	Status     				string 		`json:"Status"`



	Store []Store `gorm:"foreignKey:UserID"`
	BackupStore []BackupStore `gorm:"foreignKey:UserID"`
	PaymentStore []PaymentStore `gorm:"foreignKey:UserID"`
	
	//ServiceRequest []ServiceRequest `gorm:"foreignKey:UserID"`

	Rating []Rating `gorm:"foreignKey:UserID"`

	MessageBoard []MessageBoard `gorm:"foreignKey:UserID"`

	BookingHall []BookingHall	`gorm:"foreignKey:UserID"`

	InfoUserStore []InfoUserStore	`gorm:"foreignKey:UserID"`
	TaxUser []TaxUser	`gorm:"foreignKey:UserID"`
	Event []Event	`gorm:"foreignKey:UserID"`

	CleaningRecords []CleaningRecord	`gorm:"foreignKey:UserID"` //บันทึกการทำความสะอาด

	InventoryRequests []InventoryRequest   `gorm:"foreignKey:UserID"` //เบิกอุปกรณ์ทำความสะอาด

	ParkingTransaction 	[]ParkingTransaction `gorm:"foreignKey:UserID"`
	ParkingCard 		[]ParkingCard `gorm:"foreignKey:UserID"`
	ParkingPayment     	[]ParkingPayment     `gorm:"foreignKey:UserID"`
}

type MessageBoard struct {
	gorm.Model
	PicNews					string 		`json:"PicNews"`
	TextHeader				string 		`json:"TextHeader"`
	DescribtionNews			string 		`json:"DescribtionNews"`
	
	UserID 					uint 		`json:"UserID"`
	User   					User 		`gorm:"foreignKey:UserID"`
}

type InfoUserStore struct {
	gorm.Model
	UserNameStore			string 		`json:"UserNameStore"`
	UserPicStore			string 		`json:"UserPicStore"`
	UserSubPicOne			string 		`json:"UserSubPicOne"`
	UserSubPicTwo			string 		`json:"UserSubPicTwo"`
	UserSubPicThree			string 		`json:"UserSubPicThree"`
	UserDescribStore		string 		`json:"UserDescribStore"`
	
	UserID 					uint 		`json:"UserID"`
	User   					User 		`gorm:"foreignKey:UserID"`
}
type TaxUser struct {
	gorm.Model
	CompanyName				string 		`json:"CompanyName"`
	Residencee				string 		`json:"Residencee"`
	IdentificationNumber	int 		`json:"IdentificationNumber"`

	UserID 					uint 		`json:"UserID"`
	User   					User 		`gorm:"foreignKey:UserID"`

	Receipt 				[]Receipt 	`gorm:"foreignKey:UserTaxID"`
}
type Event struct {
	gorm.Model
	EventPic				string 		`json:"event_pic"`
	EventTopic				string 		`json:"event_topic"`
	EventDescription		string 		`json:"event_description"`
	EventDate				time.Time 		`json:"event_date"`
	
	UserID 					uint 		`json:"UserID"`
	User   					User 		`gorm:"foreignKey:UserID"`
}
