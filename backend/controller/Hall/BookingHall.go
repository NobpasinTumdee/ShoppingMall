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
	err := db.Where("hall_id = ? AND ((start_date_time <= ? AND end_date_time >= ?) OR (start_date_time <= ? AND end_date_time >= ?))",
		booking.HallID,
		booking.StartDateTime,
		booking.StartDateTime,
		booking.EndDateTime,
		booking.EndDateTime).Find(&existingBookings).Error

	// ถ้ามีการจองที่ซ้อนทับ
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "เกิดข้อผิดพลาดในการค้นหาการจอง"})
		return
	}

	if len(existingBookings) > 0 {
		c.JSON(http.StatusConflict, gin.H{"message": "ช่วงเวลานี้มีการจองแล้ว กรุณาเลือกเวลาอื่น"})
		return
	}

	// หาค่า StatusPaymentHallID สำหรับ "ยังไม่ชำระเงิน"
	var statusPayment entity.StatusPaymentHall
	if err := db.Where("status_name = ?", "ยังไม่ชำระเงิน").First(&statusPayment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบสถานะการชำระเงินที่ตรงกัน"})
		return
	}

	// สร้างข้อมูลการจองใหม่
	newBooking := entity.BookingHall{
		StartDateTime:      booking.StartDateTime,
		EndDateTime:        booking.EndDateTime,
		CustomerName:       booking.CustomerName,
		CustomerEmail:      booking.CustomerEmail,
		CustomerPhone:      booking.CustomerPhone,
		CustomerAddress:    booking.CustomerAddress,
		HallID:             booking.HallID,
		FacilitiesID:       booking.FacilitiesID,
		StatusPaymentHallID: statusPayment.ID, // ตั้งค่าเป็น "ยังไม่ชำระเงิน"
		QuantityF:          booking.QuantityF,
	}

	// บันทึกข้อมูลการจองใหม่
	if err := db.Create(&newBooking).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ส่งกลับข้อมูลเมื่อบันทึกสำเร็จ
	c.JSON(http.StatusCreated, gin.H{"message": "การจองสำเร็จ", "data": newBooking})
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

