package CarPark

import (
	//"errors" // เพิ่ม import สำหรับ package errors
	//"strings"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"

	//"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
	"net/http"
)

func GetListZone(c *gin.Context) {
	var zones []entity.ParkingZone

	db := config.DB()

	if err := db.Preload("ParkingCard").Preload("TypePark").Find(&zones).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, zones)
}

func UpdateParkingZone(c *gin.Context) {
	var zone entity.ParkingZone
	//var daily entity.ParkingZoneDaily
	ZoneID := c.Param("id")
	db := config.DB()
	result := db.First(&zone, ZoneID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&zone); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to mappayload"})
		return
	}

	/* if zone.AvailableZone < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already full."})
		return
	}

	if zone.ReservedAvailable < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already fully reserved."})
		return
	}

	if zone.AvailableZone < 0 || zone.ReservedAvailable > zone.MaxReservedCapacity {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone has no available parking space or the reserved capacity is full."})
		return
	} */

	result = db.Save(&zone)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "ParkingZone updated successfully"})
}

func GetZoneByTypePark(c *gin.Context) {
	var zones []entity.ParkingZone
	typePark := c.Param("type") // รับค่า type จาก URL params

	db := config.DB()

	// ค้นหาบันทึก TypePark ที่ตรงกับค่า type ที่ส่งมา
	var typeParkRecords []entity.TypePark
	if err := db.Where("Type = ?", typePark).Find(&typeParkRecords).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "TypePark not found"})
		return
	}

	// ค้นหาทุกๆ ParkingZones ที่เชื่อมโยงกับ TypePark ที่พบ
	for _, typeParkRecord := range typeParkRecords {
		var zone []entity.ParkingZone
		if err := db.Where("type_park_id = ?", typeParkRecord.ID).Find(&zone).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Parking zones not found"})
			return
		}
		// ใช้ append เพื่อเพิ่มผลลัพธ์ใน zones
		zones = append(zones, zone...)
	}

	// ส่งผลลัพธ์
	c.JSON(http.StatusOK, zones)
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

func GetZoneDailyByZoneID(c *gin.Context) {
	var daily []entity.ParkingZoneDaily
	ZoneID := c.Param("id")

	db := config.DB()

	if err := db.Where("parking_zone_id = ?", ZoneID).Find(&daily).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ParkingZoneDaily not found"})
		return
	}

	c.JSON(http.StatusOK, daily)
}

func UpdateZoneDailyByID(c *gin.Context) {
	var daily entity.ParkingZoneDaily
	var existingDaily entity.ParkingZoneDaily
	var zone entity.ParkingZone

	DailyID := c.Param("id") // ID จาก URL
	db := config.DB()

	// ตรวจสอบว่า JSON payload ถูกต้อง
	if err := c.ShouldBindJSON(&daily); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
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

func UpdateZoneDailyByZoneID(c *gin.Context) {
	var daily entity.ParkingZoneDaily
	var zone entity.ParkingZone
	ZoneID := c.Param("id")
	db := config.DB()

	// ตรวจสอบว่า ParkingZone มีอยู่หรือไม่
	if err := db.Where("id = ?", ZoneID).First(&zone).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ParkingZone not found"})
		return
	}

	// ตรวจสอบว่า ParkingZoneDaily สำหรับ ZoneID นี้มีอยู่หรือไม่
	if err := db.Where("parking_zone_id = ?", ZoneID).First(&daily).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "ParkingZoneDaily not found"})
		return
	}

	// ตรวจสอบว่า payload ที่ส่งมาถูกต้องหรือไม่
	if err := c.ShouldBindJSON(&daily); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// ตรวจสอบว่า AvailableZone และ ReservedAvailable เป็นค่าที่ถูกต้องหรือไม่
	if daily.AvailableZone < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already full."})
		return
	}

	if daily.ReservedAvailable < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "This zone is already fully reserved."})
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

	// อัปเดตข้อมูลใน ParkingZoneDaily
	daily.ParkingZoneID = zone.ID // เพื่อให้แน่ใจว่า ParkingZoneID ถูกต้อง
	if err := db.Save(&daily).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update ParkingZoneDaily", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ParkingZoneDaily updated successfully"})
}

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

/* func AddParkingZoneDailyData(db *gorm.DB, zoneID uint, date time.Time, totalCapacity, availableZone, reservedCapacity, reservedAvailable int) error {
    parkingZoneDaily := ParkingZoneDaily{
        ParkingZoneID:   zoneID,
        Date:            date,
        TotalCapacity:   totalCapacity,
        AvailableZone:   availableZone,
        ReservedCapacity: reservedCapacity,
        ReservedAvailable: reservedAvailable,
    }

    if err := db.Create(&parkingZoneDaily).Error; err != nil {
        return err
    }
    return nil
}
func UpdateParkingZoneDailyData(db *gorm.DB, zoneID uint, date time.Time, availableZone, reservedAvailable int) error {
    var parkingZoneDaily ParkingZoneDaily
    if err := db.Where("ParkingZoneID = ? AND Date = ?", zoneID, date).First(&parkingZoneDaily).Error; err != nil {
        return err
    }

    parkingZoneDaily.AvailableZone = availableZone
    parkingZoneDaily.ReservedAvailable = reservedAvailable

    if err := db.Save(&parkingZoneDaily).Error; err != nil {
        return err
    }
    return nil
}
func GetParkingZoneDailyData(db *gorm.DB, zoneID uint, date time.Time) (*ParkingZoneDaily, error) {
    var parkingZoneDaily ParkingZoneDaily
    if err := db.Where("ParkingZoneID = ? AND Date = ?", zoneID, date).First(&parkingZoneDaily).Error; err != nil {
        return nil, err
    }
    return &parkingZoneDaily, nil
}
*/
