package user

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

// GET /users
func ListUsers(c *gin.Context) {

	// Define a slice to hold user records
	var users []entity.User

	// Get the database connection
	db := config.DB()

	// Query the user table for basic user data
	results := db.Select("id, email, user_name, password, status, first_name, last_name, age, profile, profile_background").Find(&users)

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, users)
}


// GET /user/:id
func GetUser(c *gin.Context) {
	ID := c.Param("id")
	var user entity.User

	db := config.DB()


	// Query the user by ID
	results := db.Where("id = ?", ID).First(&user)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, user)
}


// create POST StoreUser by iduser
func AddStoreUser(c *gin.Context) {
	var UserStore entity.InfoUserStore

	if err := c.ShouldBindJSON(&UserStore); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.InfoUserStore{
		UserNameStore: UserStore.UserNameStore,
		UserPicStore: UserStore.UserPicStore,
		UserSubPicOne: UserStore.UserSubPicOne,
		UserSubPicTwo: UserStore.UserSubPicTwo,
		UserSubPicThree: UserStore.UserSubPicThree,
		UserDescribStore: UserStore.UserDescribStore,
		UserID: UserStore.UserID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Backup success", "data": u})
}
