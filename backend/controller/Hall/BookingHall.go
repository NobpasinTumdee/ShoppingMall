package Hall

import (
	"net/http"

	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
)

func CreateBooking(c *gin.Context) {
	var booking entity.BookingHall
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบสถานะของห้องประชุม
	var hall entity.Hall
	if err := db.Where("id = ?", booking.HallID).First(&hall).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Hall not found"})
		return
	}
	// สร้างการจองใหม่
	if err := db.Create(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, booking)
}


func UpdateBooking(c *gin.Context) {
	bookingID := c.Param("id")
	var booking entity.BookingHall

	db := config.DB()

	// ค้นหาข้อมูลการจองตาม ID
	if err := db.Where("id = ?", bookingID).First(&booking).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// Binding ข้อมูลใหม่จาก request body
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// อัปเดตการจองห้องประชุม
	if err := db.Save(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, booking)
}


func DeleteBooking(c *gin.Context) {
	bookingID := c.Param("id")

	db := config.DB()

	// ลบข้อมูลการจองห้องประชุม
	if err := db.Where("id = ?", bookingID).Delete(&entity.BookingHall{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Booking deleted successfully"})
}



func GetBookingByID(c *gin.Context) {
	bookingID := c.Param("id")

	db := config.DB()

	// ค้นหาข้อมูลการจองตาม ID
	if err := db.Where("id = ?", bookingID).First(&entity.BookingHall{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// ส่งข้อมูลการจองกลับไป
	c.JSON(http.StatusOK, gin.H{"message": "Booking get"})
}


func ListBookingHall(c *gin.Context) {
	var bookings []entity.BookingHall

	db := config.DB()

	results := db.Select("id, user_id, hall_id, start_date_time, end_date_time, status, customer_name, customer_email, customer_phone, customer_address, cancel_date, total_cost").Find(&bookings)
	
	// ค้นหาข้อมูลการจองและ Preload ข้อมูล Hall ที่เกี่ยวข้อง
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// ส่งข้อมูลการจองกลับไป
	c.JSON(http.StatusOK, bookings)
}

