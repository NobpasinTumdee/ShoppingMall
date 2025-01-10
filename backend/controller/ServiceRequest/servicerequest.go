package servicerequest

import (
	"errors"
	"net/http"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

//GET ListService
func ListService(c *gin.Context) {
	Status := c.Param("Status")
	var Service []entity.ServiceRequest

	db := config.DB()


	results := db.Preload("User").Preload("Store").Where("status_service = ?", Status).Find(&Service)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Service not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Service)
}
//GET ListStoreService by StatusService
func ListStoreService(c *gin.Context) {
	var Stores []entity.Store
	db := config.DB()


	results := db.Preload("User").Preload("Membership").Preload("ProductType").Where("status_service = ?","Request").Find(&Stores)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Store not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Stores)
}
// GET /Repairman
func ListRepairman(c *gin.Context) {
	var users []entity.User
	db := config.DB()

	results := db.Select("id, email, user_name, password, status, first_name, last_name, age, profile, profile_background, tel").Where("status = ?","Repairman").Find(&users)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, users)
}
// POST Service
func CreateService(c *gin.Context) {
	var Service entity.ServiceRequest

	if err := c.ShouldBindJSON(&Service); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.ServiceRequest{
		Location:        	Service.Location,
		Describtion:        Service.Describtion,
		RequestDate:        Service.RequestDate,
		StatusService:      Service.StatusService,
		StoreID:        	Service.StoreID,
		UserID:        		Service.UserID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Service success", "data": u})
}
