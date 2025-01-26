package CarPark

import (
	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"net/http"
)

func GetListZoneDaily(c *gin.Context) {
	var daily []entity.ParkingZoneDaily

	db := config.DB()

	if err := db.
		Preload("ParkingZone").
		Find(&daily).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, daily)
}

func CreateZoneDaily(c *gin.Context) {
	var daily entity.ParkingZoneDaily
	db := config.DB()

	if err := c.ShouldBindJSON(&daily); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload", "details": err.Error()})
		return
	}

	if daily.AvailableZone < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already full."})
		return
	}

	if daily.ReservedAvailable < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already fully reserved."})
		return
	}

	// ตรวจสอบว่า ParkingZone ที่เชื่อมโยงมีข้อมูลหรือไม่
	var zone entity.ParkingZone
	if daily.ParkingZoneID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ParkingZoneID is required"})
		return
	}

	// ค้นหาข้อมูลจาก ParkingZone ตาม ID
	if err := db.First(&zone, daily.ParkingZoneID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ParkingZone not found", "details": err.Error()})
		return
	}

	// ตรวจสอบว่า AvailableZone และ ReservedAvailable ไม่เกินขีดจำกัด
	if daily.AvailableZone > zone.MaxCapacity {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AvailableZone exceeds MaxCapacity"})
		return
	}

	if daily.ReservedAvailable > zone.MaxReservedCapacity {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ReservedAvailable exceeds MaxReservedCapacity"})
		return
	}

	// สร้างข้อมูลใหม่ในตาราง ParkingZoneDaily
	if err := db.Create(&daily).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create ParkingZoneDaily", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ParkingZoneDaily created successfully"})
}

func UpdateZoneDailyByID(c *gin.Context) {
	var daily entity.ParkingZoneDaily
	var existingDaily entity.ParkingZoneDaily
	var zone entity.ParkingZone

	DailyID := c.Param("id") // ID จาก URL

	// ตรวจสอบว่า JSON payload ถูกต้อง
	if err := c.ShouldBindJSON(&daily); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	db := config.DB()

	// ตรวจสอบ struc ข้อมูลด้วย govalidator
	if _, err := govalidator.ValidateStruct(daily); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่ามีข้อมูลที่ต้องการอัปเดตหรือไม่
	if err := db.Where("id = ?", DailyID).First(&existingDaily).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}

	// ตรวจสอบว่า ParkingZone ที่เชื่อมโยงกับ ParkingZoneDaily มีอยู่หรือไม่
	if err := db.Where("id = ?", daily.ParkingZoneID).First(&zone).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ParkingZone not found"})
		return
	}

	// ตรวจสอบค่าต่าง ๆ ตามเงื่อนไข
	if daily.AvailableZone < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already full."})
		return
	}

	if daily.ReservedAvailable < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already fully reserved."})
		return
	}

	if daily.ReservedAvailable > zone.MaxReservedCapacity {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ReservedAvailable exceeds MaxReservedCapacity"})
		return
	}

	// อัปเดตข้อมูลในฐานข้อมูล
	if err := db.Model(&existingDaily).Updates(daily).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update record"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ParkingZoneDaily updated successfully"})
}