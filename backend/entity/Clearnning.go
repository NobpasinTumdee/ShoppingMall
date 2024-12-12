package entity

import (
	"time"
	"gorm.io/gorm"
)

type Area struct {
	gorm.Model
	AreaName string    `json:"AreaName"` // ชื่อพื้นที่
	Floor    int       `json:"Floor"`    // ชั้น

	Schedules []Schedule `gorm:"foreignKey:AreaID"` // One-to-Many กับ Schedule
}

type Schedule struct {
	gorm.Model
	StartTime    time.Time `json:"StartTime"`    // เวลาที่เริ่มงาน
	EndTime      time.Time `json:"EndTime"`      // เวลาที่จบงาน
	//ScheduleDate time.Time `json:"ScheduleDate"` // วันที่ของตาราง

	AreaID       uint      `json:"AreaID"`       // FK ไปยัง Area
	Area         Area      `gorm:"foreignKey:AreaID"` // ความสัมพันธ์ไปยัง Area

	CleaningRecords []CleaningRecord `gorm:"foreignKey:ScheduleID"` // One-to-Many กับ CleaningRecord
}

type CleaningRecord struct {
	gorm.Model
	ActualStartTime time.Time `json:"ActualStartTime"` // เวลาเริ่มงานจริง
	ActualEndTime   time.Time `json:"ActualEndTime"`   // เวลาจบงานจริง
	Notes           *string    `json:"Notes"`            // บันทึก

	ScheduleID      uint      `json:"ScheduleID"`      // FK ไปยัง Schedule
	Schedule        Schedule  `gorm:"foreignKey:ScheduleID"` // ความสัมพันธ์ไปยัง Schedule

	UserID          uint      `json:"UserID"`          // FK ไปยัง User
	User            User      `gorm:"foreignKey:UserID"` // ความสัมพันธ์ไปยัง User
}