package CarPark

import (
	//"errors" // เพิ่ม import สำหรับ package errors

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"

	//"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
	"net/http"
)

func CreateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle

	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Create Parking Card
	if err := db.Create(&vehicle).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Vehicle created successfully", "data": vehicle})
}

func UpdateVehicle(c *gin.Context) {
	var vehicle entity.Vehicle
	var user entity.User
	UserID := c.Param("id")
	db := config.DB()

	// ค้นหาผู้ใช้ตาม UserID
	result := db.First(&user, UserID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User ID not found"})
		return
	}

	// รับข้อมูลจาก JSON และผูกข้อมูลกับตัวแปร vehicle
	if err := c.ShouldBindJSON(&vehicle); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// อัปเดตฟิลด์ของ Vehicle ที่ตรงกับ UserID
	result = db.Model(&vehicle).Where("user_id = ?", UserID).Updates(entity.Vehicle{
		LicensePlate: vehicle.LicensePlate,
		Color:        vehicle.Color,
		Make:         vehicle.Make,
		Image:        vehicle.Image,
	})

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Vehicle updated successfully"})
}
