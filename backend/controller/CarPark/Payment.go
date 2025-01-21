package CarPark

import (

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"

	"net/http"
)

func CreateParkingPayment(c *gin.Context) {
	var payment entity.ParkingPayment

	// รับข้อมูลจาก JSON
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	if err := db.Create(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Parking Payment created successfully",
		"data":    payment,
	})
}

func GetParkingFeePolicyByID(c *gin.Context) {
	id := c.Param("id")
	var policy entity.ParkingFeePolicy

	db := config.DB()

	if err := db.First(&policy, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, policy)
}

func GetParkingPaymentByUsageCardID(c *gin.Context) {
	usageCard_id := c.Param("id")
	var payment entity.ParkingPayment

	db := config.DB()

	if err := db.Preload("User").Preload("ParkingUsageCard.ParkingCard.TypeCard").Preload("ParkingUsageCard.ParkingCard.ParkingFeePolicy")/* .Preload("ParkingUsageCard") */.Preload("ParkingUsageCard.ParkingZoneDaily").First(&payment, "parking_usage_card_id = ?", usageCard_id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
	}
	c.JSON(http.StatusOK, payment)
}

func GetParkingPaymentAndUsageCardByUsageCardID(c *gin.Context) {
	usageCard_id := c.Param("id")
	var payment entity.ParkingPayment
	var usageCard entity.ParkingUsageCard

	db := config.DB()

	// ดึงข้อมูล ParkingPayment
	if err := db.Preload("User").
		Preload("ParkingUsageCard.ParkingCard.TypeCard").
		/* Preload("ParkingUsageCard"). */
		First(&payment, "parking_usage_card_id = ?", usageCard_id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Payment record not found"})
		return
	}

	// ดึงข้อมูล ParkingUsageCard
	if err := db.Preload("ParkingZoneDaily").
		First(&usageCard, "id = ?", usageCard_id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "UsageCard record not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"payment":     payment,
		"usageCard": usageCard,
	})
}
