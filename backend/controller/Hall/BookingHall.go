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
	
	b := entity.BookingHall{
		StartDateTime: booking.StartDateTime,
		EndDateTime: booking.EndDateTime,
		Status: booking.Status,
		CustomerName: booking.CustomerName,
		CustomerEmail: booking.CustomerEmail,
		CustomerPhone: booking.CustomerPhone,
		CustomerAddress: booking.CustomerAddress,
		HallID: booking.HallID,
		FacilitiesID: booking.FacilitiesID,
		QuantityF: booking.QuantityF,
	}

	if err := db.Create(&b).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success","data": b})
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

