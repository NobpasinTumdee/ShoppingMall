package Store

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

//GET ListStore by Floor
func GetStoreByFloor(c *gin.Context) {
	ID := c.Param("id")
	var Stores []entity.Store

	db := config.DB()


	// Query the user by ID
	results := db.Where("product_type_id = ?", ID).Find(&Stores)
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
//GET ListStore by id
func GetStoreByid(c *gin.Context) {
	ID := c.Param("id")
	var Stores entity.Store

	db := config.DB()

	results := db.Where("id = ?", ID).Find(&Stores)
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

// PUT update Store by id 
func UpdateStoreByid(c *gin.Context) {
	var Store entity.Store
	StoreID := c.Param("id")
	db := config.DB()
 
	result := db.First(&Store, StoreID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id Store not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&Store); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&Store)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// POST backupStore
func CreateBackUpStore(c *gin.Context) {
	var Store entity.BackupStore

	if err := c.ShouldBindJSON(&Store); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.BackupStore{
		PicStoreBackup:        Store.PicStoreBackup,

		PicOneBackup:        Store.PicOneBackup,
		PicTwoBackup:        Store.PicTwoBackup,
		PicThreeBackup:        Store.PicThreeBackup,

		MembershipBackup:        Store.MembershipBackup,
		
		NameBackup:        Store.NameBackup,
		BookingBackup:        Store.BookingBackup,
		LastDayBackup:        Store.LastDayBackup,
		DescribtionStoreB:        Store.DescribtionStoreB,
		
		UserID:        Store.UserID,
		
		ProductTypeIDB:        Store.ProductTypeIDB,
		
		StoreID:        Store.StoreID,
		
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Backup success", "data": u})
}

//GET ListStore WaitingForApproval
func GetStoreWaiting(c *gin.Context) {
	StatusStore := c.Param("status")
	var Stores []entity.Store

	db := config.DB()



	results := db.Where("status_store = ?", StatusStore).Find(&Stores)
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