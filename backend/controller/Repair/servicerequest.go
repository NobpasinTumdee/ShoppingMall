package Repair

import (
	"net/http"
	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	"errors"
	"gorm.io/gorm"
)

// GET /service-requests - List all repair requests
func GetAllServiceRequests(c *gin.Context) {
	var requests []entity.ServiceRequest

	db := config.DB()

	// ดึงข้อมูลคำขอแจ้งซ่อมทั้งหมด
	results := db.Preload("Equipment").Preload("User").Find(&requests)
	if results.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, requests)
}

// GET /service-requests/:id - Get a specific repair request
func GetServiceRequestByID(c *gin.Context) {
	ID := c.Param("id")
	var request entity.ServiceRequest

	db := config.DB()

	// ค้นหาคำขอแจ้งซ่อมตาม ID
	results := db.Preload("Equipment").Preload("User").Where("id = ?", ID).First(&request)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Repair request not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, request)
}

// POST /service-requests - Create a new repair request
func CreateServiceRequest(c *gin.Context) {
	var newRequest entity.ServiceRequest

	// รับข้อมูลคำขอแจ้งซ่อมจากผู้ใช้
	if err := c.ShouldBindJSON(&newRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// บันทึกคำขอแจ้งซ่อมลงฐานข้อมูล
	if err := db.Create(&newRequest).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Repair request created successfully", "data": newRequest})
}

// PUT /service-requests/:id - Update repair request status
func UpdateServiceRequestStatus(c *gin.Context) {
	ID := c.Param("id")
	var request entity.ServiceRequest

	db := config.DB()

	// ค้นหาคำขอแจ้งซ่อมที่ต้องการอัปเดต
	if err := db.First(&request, ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Repair request not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// รับสถานะใหม่จากผู้ใช้
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// อัปเดตสถานะคำขอแจ้งซ่อม
	if err := db.Save(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Repair request updated successfully", "data": request})
}

// DELETE /service-requests/:id - Delete a repair request
func DeleteServiceRequest(c *gin.Context) {
	ID := c.Param("id")
	var request entity.ServiceRequest

	db := config.DB()

	// ค้นหาคำขอแจ้งซ่อมที่ต้องการลบ
	if err := db.First(&request, ID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Repair request not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	// ลบคำขอแจ้งซ่อม
	if err := db.Delete(&request).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Repair request deleted successfully"})
}