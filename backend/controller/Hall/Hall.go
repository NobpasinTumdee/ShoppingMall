package Hall

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

func ListHall(c *gin.Context){
	var hall []entity.Hall

	db := config.DB()

	results := db.Select("id, hall_name, capacity, location, image_hall, description, price_per_hour").Find(&hall)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, hall)
}

func GetHall(c *gin.Context){
	ID := c.Param("id")
	var hall entity.Hall

	db := config.DB()

	results := db.Where("id = ?", ID).First(&hall)
	if results.Error != nil{
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Hall not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}
	c.JSON(http.StatusOK, hall)
}

func GetBookingWithTotalPrice(c *gin.Context) {
	ID := c.Param("id")
	var booking entity.BookingHall

	db := config.DB()

	// ดึงข้อมูล Booking พร้อมข้อมูลที่เกี่ยวข้อง
	results := db.Preload("Hall").Preload("Facilities").Where("id = ?", ID).First(&booking)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	// คำนวณระยะเวลาการจอง (ชั่วโมง)
	duration := booking.EndDateTime.Sub(booking.StartDateTime).Hours()
	if duration < 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid booking time range"})
		return
	}

	// คำนวณราคาจาก Hall
	totalPrice := float64(booking.Hall.PricePerHour) * duration

	// รวมราคาจาก Facilities (ถ้ามี)
	if booking.Facilities.ID > 0 && booking.QuantityF > 0 {
		totalPrice += booking.Facilities.Price * float64(booking.QuantityF)
	}

	// ส่งข้อมูลกลับไปยัง frontend
	c.JSON(http.StatusOK, booking)
}
