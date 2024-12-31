package Cleaning

import (
	"errors"
	"net/http"
	"time"
	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GET /Area
func ListArea(c *gin.Context) {

	var Areas []entity.Area


	db := config.DB()

	results := db.Find(&Areas)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, Areas)
}

// POST CleaningRecord
func CreateCleaningRecord(c *gin.Context) {
	var input struct {
		ActualStartTime string `json:"ActualStartTime"`
		ActualEndTime   string `json:"ActualEndTime"`
		Notes           string `json:"Notes"`
		AreaID          uint   `json:"AreaID"`
		UserID          uint   `json:"UserID"`
	}

	// Bind JSON Input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse ActualStartTime และ ActualEndTime
	startTime, err := time.Parse("2006-01-02 15:04:05-07:00", input.ActualStartTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ActualStartTime format"})
		return
	}

	endTime, err := time.Parse("2006-01-02 15:04:05-07:00", input.ActualEndTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ActualEndTime format"})
		return
	}

	// ดึงเฉพาะวันที่จาก startTime
	startDate := startTime.Format("2006-01-02")

	db := config.DB()

	// 1. ค้นหา Schedule โดยใช้วันที่แบบไม่แปลง Timezone ใน SQL
	var schedule entity.Schedule
	if err := db.Where("DATE(start_time) = ? AND area_id = ?", startDate, input.AreaID).First(&schedule).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "No schedule found for the given date and area_id"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 2. ตรวจสอบว่ามี CleaningRecord ที่ใช้ ScheduleID ซ้ำหรือไม่
	var existingRecord entity.CleaningRecord
	if err := db.Where("schedule_id = ?", schedule.ID).First(&existingRecord).Error; err == nil {
		// พบข้อมูลซ้ำ
		c.JSON(http.StatusConflict, gin.H{"error": "ข้อมูลมีการถูกบันทึกไว้แล้ว"})
		return
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		// เกิดข้อผิดพลาดอื่นใน Query
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// 3. สร้าง CleaningRecord ใหม่พร้อมกับ ScheduleID ที่หาได้
	u := entity.CleaningRecord{
		ActualStartTime: startTime,
		ActualEndTime:   endTime,
		Notes:           &input.Notes,
		ScheduleID:      schedule.ID,
		UserID:          input.UserID,
	}

	// 4. บันทึก CleaningRecord ลงในฐานข้อมูล
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ตอบกลับหลังจากสร้างสำเร็จ
	c.JSON(http.StatusOK, gin.H{
		"message":     "Cleaning record created successfully",
		"CleaningID":  u.ID,
		"ScheduleID":  u.ScheduleID,
		"ActualStart": u.ActualStartTime,
		"Notes": u.Notes,
	})
}

// GET /Area
func ListSchedules(c *gin.Context) {

	var Schedules []entity.Schedule


	db := config.DB()

	results := db.Find(&Schedules)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, Schedules)
}

// GET /GetCleaningRecordsByArea
func GetCleaningRecordsByArea(c *gin.Context) {
    // รับค่า 'id' จากพารามิเตอร์ URL
    areaID := c.Param("id")

    var cleaningRecords []entity.CleaningRecord

    // เรียกใช้งานฐานข้อมูลผ่าน config
    db := config.DB()

    // คิวรีข้อมูลพร้อมเช็ค area_id
    results := db.Preload("Schedule.Area").
	Preload("User").
	Where("schedules.area_id = ?", areaID).
	Joins("JOIN schedules ON cleaning_records.schedule_id = schedules.id").
	Find(&cleaningRecords)

    // ตรวจสอบข้อผิดพลาด
    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "No cleaning records found for the specified area"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
    // ส่ง JSON กลับไปยัง Client
    c.JSON(http.StatusOK, cleaningRecords)
}

// GET /GetSchedulesByArea
func GetSchedulesByArea(c *gin.Context) {
    areaID := c.Param("id")
    var records []entity.Schedule

    // เรียกใช้งานฐานข้อมูลผ่าน config
    db := config.DB()

    // คิวรีข้อมูลพร้อมเช็ค area_id
    results := db.Raw(`
    SELECT schedules.*
	FROM schedules
	JOIN areas ON schedules.area_id = areas.id
	WHERE areas.id = ?;
	`, areaID).Scan(&records)

    // ตรวจสอบข้อผิดพลาด
    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "No schedules found for the specified area"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
    // ส่ง JSON กลับไปยัง Client
    c.JSON(http.StatusOK, records)
}

