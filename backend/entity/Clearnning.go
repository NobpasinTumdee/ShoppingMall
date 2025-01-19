package entity

import (
	"time"
	"gorm.io/gorm"
)

type Area struct {
	gorm.Model
	AreaName string    `json:"AreaName"` 
	Floor    int       `json:"Floor"`    

	Schedules []Schedule `gorm:"foreignKey:AreaID"` 
}

type Schedule struct {
	gorm.Model
	StartTime    time.Time `json:"StartTime"` 
	EndTime      time.Time `json:"EndTime"`     

	AreaID       uint      `json:"AreaID"`
	Area         Area      `gorm:"foreignKey:AreaID"` 
}

type CleaningRecord struct {
	gorm.Model
	ActualStartTime time.Time `json:"ActualStartTime" valid:"required~ActualStartTime is required"`
	ActualEndTime   time.Time `json:"ActualEndTime" valid:"required~ActualEndTime is required"`   
	Notes           *string    `json:"Notes"`

	ScheduleID      uint      `json:"ScheduleID" valid:"required~Schedule ID is required"`      
	Schedule        Schedule  `gorm:"foreignKey:ScheduleID" valid:"-"` 

	UserID          uint      `json:"UserID" valid:"required~User ID is required"`          
	User            User      `gorm:"foreignKey:UserID" valid:"-"` 
}
