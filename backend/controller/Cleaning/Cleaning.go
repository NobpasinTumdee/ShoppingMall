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

	startDate := startTime.Format("2006-01-02")

	db := config.DB()

	var schedule entity.Schedule
	if err := db.Where("DATE(start_time) = ? AND area_id = ?", startDate, input.AreaID).First(&schedule).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "No schedule found for the given date and area_id"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var existingRecord entity.CleaningRecord
	if err := db.Where("schedule_id = ?", schedule.ID).First(&existingRecord).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "ข้อมูลมีการถูกบันทึกไว้แล้ว"})
		return
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	u := entity.CleaningRecord{
		ActualStartTime: startTime,
		ActualEndTime:   endTime,
		Notes:           &input.Notes,
		ScheduleID:      schedule.ID,
		UserID:          input.UserID,
	}

	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

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
    
    areaID := c.Param("id")

    var cleaningRecords []entity.CleaningRecord

    db := config.DB()

    results := db.Preload("Schedule.Area").
	Preload("User").
	Where("schedules.area_id = ?", areaID).
	Joins("JOIN schedules ON cleaning_records.schedule_id = schedules.id").
	Find(&cleaningRecords)

    
    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "No cleaning records found for the specified area"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
    c.JSON(http.StatusOK, cleaningRecords)
}

// GET /GetSchedulesByArea
func GetSchedulesByArea(c *gin.Context) {
    
	areaID := c.Param("id")
    var records []entity.Schedule

    db := config.DB()

    results := db.Raw(`
    SELECT schedules.*
	FROM schedules
	JOIN areas ON schedules.area_id = areas.id
	WHERE areas.id = ?;
	`, areaID).Scan(&records)

    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "No schedules found for the specified area"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }
    c.JSON(http.StatusOK, records)
}

func DeleteCleaningRecord(c *gin.Context) {

    areaID := c.Query("AreaID")
    day := c.Query("Day")

    if areaID == "" || day == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "AreaID and Day are required"})
        return
    }

    areaIDInt, err := strconv.Atoi(areaID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "AreaID must be a valid integer"})
        return
    }

    layout := "2006-01-02"
	parsedDate, err := time.Parse(layout, day)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Day must be in RFC3339 format"})
        return
    }

    formattedDate := parsedDate.Format("2006-01-02")

    db := config.DB()
    tx := db.Exec("DELETE FROM cleaning_records WHERE schedule_id IN (SELECT id FROM schedules WHERE area_id = ?) AND DATE(actual_start_time) = ?", areaIDInt, formattedDate)

    if tx.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete record"})
        return
    }

    if tx.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "record not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

// UpdateCleaningRecord อัปเดตข้อมูล CleaningRecord
func UpdateCleaningRecord(c *gin.Context) {
	var input struct {
		ActualStartTime string `json:"ActualStartTime"`
		ActualEndTime   string `json:"ActualEndTime"`
		Notes           string `json:"Notes"`
		UserID          uint   `json:"UserID"`
	}

	ID := c.Param("id")

	db := config.DB()

	// ตรวจสอบว่า CleaningRecord มีอยู่จริงหรือไม่
	var cleaningRecord entity.CleaningRecord
	if err := db.First(&cleaningRecord, ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "CleaningRecord not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

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

	cleaningRecord.ActualStartTime = startTime
	cleaningRecord.ActualEndTime = endTime
	cleaningRecord.Notes = &input.Notes

	if err := db.Save(&cleaningRecord).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update CleaningRecord"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "CleaningRecord updated successfully",
		"data":    cleaningRecord,
	})
}







