package Hall

import (
	"errors"
	"net/http"
	"time"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// CreatePayment - สร้างการชำระเงินใหม่
func CreatePayment(c *gin.Context) {
	var payment entity.PaymentHall

	// รับข้อมูลจาก JSON
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// ตรวจสอบว่ามี BookingHall ที่ตรงกับ ID ที่ระบุหรือไม่
	var booking entity.BookingHall
	if err := db.Where("id = ?", payment.BookingHallID).First(&booking).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "BookingHall not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// อัปเดตสถานะการจองเป็น "ชำระเงินแล้ว"
	var statusPaid entity.StatusPaymentHall
	if err := db.Where("status_name = ?", "ชำระเงินแล้ว").First(&statusPaid).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบสถานะการชำระเงินที่ตรงกัน"})
		return
	}
	booking.StatusPaymentHallID = statusPaid.ID
	if err := db.Save(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถอัปเดตสถานะการจองได้"})
		return
	}

	// บันทึกข้อมูลการชำระเงิน
	payment.PaymentDate = time.Now() // กำหนดวันที่ชำระเงินเป็นวันที่ปัจจุบัน
	if err := db.Create(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Payment created successfully", "data": payment})
}

// GetPaymentByID - ดึงข้อมูลการชำระเงินตาม ID
func GetPaymentByID(c *gin.Context) {
	paymentID := c.Param("id")
	var payment entity.PaymentHall

	db := config.DB()
	if err := db.Where("id = ?", paymentID).First(&payment).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// ListPayments - ดึงข้อมูลการชำระเงินทั้งหมด
func ListPayments(c *gin.Context) {
	var payments []entity.PaymentHall

	db := config.DB()
	if err := db.Find(&payments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}

// UpdatePayment - อัปเดตข้อมูลการชำระเงิน
func UpdatePayment(c *gin.Context) {
	paymentID := c.Param("id")
	var payment entity.PaymentHall

	db := config.DB()

	// ค้นหาการชำระเงินที่ต้องการอัปเดต
	if err := db.Where("id = ?", paymentID).First(&payment).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// รับข้อมูลใหม่จาก JSON
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// อัปเดตข้อมูล
	if err := db.Save(&payment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment updated successfully", "data": payment})
}

// DeletePayment - ลบข้อมูลการชำระเงิน
func DeletePayment(c *gin.Context) {
	paymentID := c.Param("id")

	db := config.DB()

	// ลบข้อมูลการชำระเงิน
	if err := db.Where("id = ?", paymentID).Delete(&entity.PaymentHall{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment deleted successfully"})
}

func ListStatusPaymentHall(c *gin.Context) {
	var statuses []entity.StatusPaymentHall

	db := config.DB()

	// ดึงข้อมูลสถานะทั้งหมด
	if err := db.Find(&statuses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่งข้อมูลสถานะทั้งหมด
	c.JSON(http.StatusOK, statuses)
}

func GetStatusPaymentHallByID(c *gin.Context) {
	statusID := c.Param("id")
	var status entity.StatusPaymentHall

	db := config.DB()

	// ค้นหาข้อมูลสถานะตาม ID
	if err := db.Where("id = ?", statusID).First(&status).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Status not found"})
		return
	}

	// ส่งข้อมูลสถานะ
	c.JSON(http.StatusOK, status)
}
