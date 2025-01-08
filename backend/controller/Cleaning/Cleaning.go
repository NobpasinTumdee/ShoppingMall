package Cleaning

import (
	"errors"
	"net/http"
	"strconv"
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

	startTime, err := time.Parse(time.RFC3339, input.ActualStartTime)
	if err != nil {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ActualStartTime format"})
    	return
	}

	endTime, err := time.Parse(time.RFC3339, input.ActualEndTime)
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

func DeleteCleaningRecord(c *gin.Context) {
    //log.Println("Step 1: Starting DeleteCleaningRecord function")

    // ดึงค่าจาก query string
    areaID := c.Query("AreaID")
    day := c.Query("Day")
    //log.Println("Step 2: Received AreaID:", areaID, "Day:", day)

    // ตรวจสอบว่า AreaID และ Day มีค่า
    if areaID == "" || day == "" {
        //log.Println("Step 3: AreaID or Day is empty, returning error")
        c.JSON(http.StatusBadRequest, gin.H{"error": "AreaID and Day are required"})
        return
    }

    // ตรวจสอบว่า AreaID เป็นตัวเลข
    areaIDInt, err := strconv.Atoi(areaID)
    if err != nil {
        //log.Println("Step 4: Invalid AreaID format:", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "AreaID must be a valid integer"})
        return
    }

    // ตรวจสอบรูปแบบวันที่
    layout := "2006-01-02" // รูปแบบ `YYYY-MM-DD`
	parsedDate, err := time.Parse(layout, day)
    if err != nil {
        //log.Println("Step 5: Error parsing Day:", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Day must be in RFC3339 format"})
        return
    }

    // แปลงวันที่เป็นรูปแบบ `YYYY-MM-DD` สำหรับ SQL
    formattedDate := parsedDate.Format("2006-01-02")
    //log.Println("Step 6: Formatted Date:", formattedDate)

    // ลบข้อมูลในฐานข้อมูล
    db := config.DB()
    tx := db.Exec("DELETE FROM cleaning_records WHERE schedule_id IN (SELECT id FROM schedules WHERE area_id = ?) AND DATE(actual_start_time) = ?", areaIDInt, formattedDate)

    if tx.Error != nil {
        //log.Println("Step 7: Error deleting record:", tx.Error)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete record"})
        return
    }

    if tx.RowsAffected == 0 {
        //log.Println("Step 8: No records found to delete")
        c.JSON(http.StatusNotFound, gin.H{"error": "record not found"})
        return
    }

    //log.Println("Step 9: Record deleted successfully")
    c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}







