package Hall

import (
	"net/http"

	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	
	
)

func CreateBooking(c *gin.Context) {
	var booking entity.BookingHall

	// รับข้อมูลจาก JSON
	if err := c.ShouldBindJSON(&booking); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบว่ามีการจองซ้อนทับหรือไม่
	var existingBookings []entity.BookingHall
	err := db.Where(
		"hall_id = ? AND ((start_date_time <= ? AND end_date_time >= ?) OR (start_date_time <= ? AND end_date_time >= ?))",
		booking.HallID,
		booking.StartDateTime,
		booking.StartDateTime,
		booking.EndDateTime,
		booking.EndDateTime,
	).Find(&existingBookings).Error

	// ถ้ามีการจองที่ซ้อนทับ
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "เกิดข้อผิดพลาดในการค้นหาการจอง"})
		return
	}

	if len(existingBookings) > 0 {
		c.JSON(http.StatusConflict, gin.H{"message": "ช่วงเวลานี้มีการจองแล้ว กรุณาเลือกเวลาอื่น"})
		return
	}

	// สร้างข้อมูลการจองใหม่ พร้อมตั้งค่า Status เป็น 0
	b := entity.BookingHall{
		StartDateTime:  booking.StartDateTime,
		EndDateTime:    booking.EndDateTime,
		CustomerName:   booking.CustomerName,
		CustomerEmail:  booking.CustomerEmail,
		CustomerPhone:  booking.CustomerPhone,
		CustomerAddress: booking.CustomerAddress,
		HallID:         booking.HallID,
		FacilitiesID:   booking.FacilitiesID,
		QuantityF:      booking.QuantityF,
		UserID:         booking.UserID,
		Status:         false, // กำหนด Status เป็น false (0)
	}

	// บันทึกข้อมูลการจองใหม่
	if err := db.Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ส่งกลับข้อมูลเมื่อบันทึกสำเร็จ
	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": b})
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

	var booking entity.BookingHall

	// ค้นหาข้อมูลการจองตาม ID
	if err := db.Where("id = ?", bookingID).First(&booking).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Booking not found"})
		return
	}

	// ส่งข้อมูลการจองกลับไป
	c.JSON(http.StatusOK, booking)
}



func ListBookingByHallID(c *gin.Context) {
	var bookings []entity.BookingHall

	db := config.DB()

	hallID := c.Param("id")

	if err := db.Where("hall_id = ?", hallID).Find(&bookings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No bookings found for the specified Hall ID"})
		return
	}	

	// ส่งข้อมูลการจองกลับไป
	c.JSON(http.StatusOK, bookings)
}

func GetBookingByHallID(c *gin.Context) {
	var bookings []entity.BookingHall
	
    hallID := c.Param("id") // ดึง hallID จาก URL Parameters

    db := config.DB()

    // ค้นหาข้อมูลการจองเฉพาะ Hall ที่เลือก
	if err := db.Where("hall_id = ?", hallID).Find(&bookings).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No bookings found for the specified Hall ID"})
		return
	}	

    c.JSON(http.StatusOK, bookings)
}

func UpdateStatusHall(c *gin.Context) {
	bookingID := c.Param("id") // รับ bookingID จาก URL
	db := config.DB()

	// ค้นหาข้อมูลการจองห้องตาม bookingID
	var booking entity.BookingHall
	if err := db.First(&booking, bookingID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "BookingHall ID not found"})
		return
	}

	// รับข้อมูลจาก body request สำหรับการอัปเดตสถานะ
	var input struct {
		Status bool `json:"Status" binding:"required"` // แค่การอัปเดตสถานะการจอง
	}

	// Bind ข้อมูล JSON ที่ส่งมา
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	// อัปเดตสถานะการจองห้อง
	booking.Status = input.Status
	if err := db.Save(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update booking status"})
		return
	}

	// ส่งผลลัพธ์เมื่อการอัปเดตสำเร็จ
	c.JSON(http.StatusOK, gin.H{
		"message": "Booking status updated successfully",
		"booking": booking,
	})
}





