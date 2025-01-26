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

func CreatePaymentHall(c *gin.Context) {
	var payment entity.PaymentHall

	// รับข้อมูลที่ไม่ใช่ไฟล์จากฟอร์ม (ต้องใช้ Form ไม่ใช่ JSON)
	if err := c.ShouldBind(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	db := config.DB()

	// สร้างข้อมูล PaymentHall
	newPayment := entity.PaymentHall{
		PaymentDate:          time.Now(),
		TotalAmount:          payment.TotalAmount,
		BookingHallID:        payment.BookingHallID,
		StatusPaymentHallID:  payment.StatusPaymentHallID,
		PayMethodStoreID:     payment.PayMethodStoreID,
		ReceiptImageURL:      payment.ReceiptImageURL,
	}

	// บันทึกข้อมูลการชำระเงินในฐานข้อมูล
	if err := db.Create(&newPayment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create payment: " + err.Error()})
		return
	}

	// ตรวจสอบค่า ID ที่สร้างใหม่
	if newPayment.ID == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve payment ID"})
		return
	}

	// ส่ง Response กลับเมื่อสร้างสำเร็จ
	c.JSON(http.StatusCreated, gin.H{
		"message": "Payment created successfully",
		"data":    newPayment,
	})
}


// GetPaymentByID - ดึงข้อมูลการชำระเงินตาม ID
func GetPaymentByID(c *gin.Context) {
	id := c.Param("id")
	var payment entity.PaymentHall

	db := config.DB()
	if err := db.Where("id = ? AND deleted_at IS NULL", id).First(&payment).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving payment: " + err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// ListPayments - ดึงข้อมูลการชำระเงินทั้งหมด
func ListPayments(c *gin.Context) {
	var payments []entity.PaymentHall

	db := config.DB()
	if err := db.Preload("BookingHall").Find(&payments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving payments: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payments})
}


// DeletePayment - ลบข้อมูลการชำระเงิน
func DeletePayment(c *gin.Context) {
	paymentID := c.Param("id")

	db := config.DB()

	// ลบข้อมูล
	if err := db.Where("id = ?", paymentID).Delete(&entity.PaymentHall{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment deleted successfully"})
}

// ListStatusPaymentHall - ดึงสถานะการชำระเงินทั้งหมด
func ListStatusPaymentHall(c *gin.Context) {
	var statuses []entity.StatusPaymentHall

	db := config.DB()
	if err := db.Find(&statuses).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error retrieving statuses: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": statuses})
}

// GetStatusPaymentHallByID - ดึงสถานะการชำระเงินตาม ID
func GetStatusPaymentHallByID(c *gin.Context) {
	statusID := c.Param("id")
	var status entity.StatusPaymentHall

	db := config.DB()
	if err := db.Where("id = ?", statusID).First(&status).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Status not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error finding status: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": status})
}
func CreateInvoice(c *gin.Context){
	var invoice entity.TaxInvoice

	if err := c.ShouldBindJSON(&invoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()

	u := entity.TaxInvoice{
		UserTaxID:       	invoice.UserTaxID,
		PaymentHallID: 		invoice.PaymentHallID,
		IssueDate: 			invoice.IssueDate,
	}
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "post bill success", "data": u})

}
func GetInvoice(c *gin.Context) {
    id := c.Param("id")
	db := config.DB()
    // ดึงข้อมูลการจอง (BookingHall)
    var taxinvoice []entity.TaxInvoice
    if err := db.
		Preload("TaxUser").
		Preload("PaymentHall").
		Where("id = ?", id).
		First(&taxinvoice).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "taxinvoice not found"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"taxinvoice": taxinvoice})
}

