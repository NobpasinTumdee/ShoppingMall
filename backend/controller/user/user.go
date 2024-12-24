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
	results := db.Select("id, email, user_name, password, status, first_name, last_name, age, profile, profile_background, tel").Find(&users)

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, users)
}

// PUT update User by id 
func UpdateUserByid(c *gin.Context) {
	var User entity.User
	UserID := c.Param("id")
	db := config.DB()
 
	result := db.First(&User, UserID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id Store not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&User); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&User)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
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

	c.JSON(http.StatusOK, &user)
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

// GET /userstore
func ListUserstore(c *gin.Context) {

	var userStore []entity.InfoUserStore

	// Get the database connection
	db := config.DB()

	// Query the user table for basic user data
	results := db.Select("id, user_name_store, user_sub_pic_one, user_sub_pic_two , user_sub_pic_three , user_describ_store , user_id").Find(&userStore)

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, userStore)
}


// GET /userstore/:id
func GetUserstoreByid(c *gin.Context) {
	ID := c.Param("id")
	var user []entity.InfoUserStore

	db := config.DB()

	results := db.Where("user_id = ?", ID).Find(&user)
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


// DELETE /DeleteUserStore/:id
func DeleteUserStore(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM info_User_stores WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// GET /Message/:id
func GetMessage(c *gin.Context) {
	ID := c.Param("id")
	var MessageBoard []entity.MessageBoard

	db := config.DB()


	// Query the user by ID
	results := db.Where("user_id = ?", ID).Find(&MessageBoard)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "MessageBoard not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, MessageBoard)
}

// POST MessageBoard
func CreateMessageBoard(c *gin.Context) {
	var Message entity.MessageBoard

	if err := c.ShouldBindJSON(&Message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.MessageBoard{	
		PicNews:        	Message.PicNews,
		TextHeader:        	Message.TextHeader,
		DescribtionNews:    Message.DescribtionNews,
		UserID:        		Message.UserID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "MessageBoard success", "data": u})
}

//==============================tax====================================
// POST tax
func CreateTax(c *gin.Context) {
	var TaxUser entity.TaxUser

	if err := c.ShouldBindJSON(&TaxUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.TaxUser{
		CompanyName: TaxUser.CompanyName,
		Residencee: TaxUser.Residencee,
		IdentificationNumber: TaxUser.IdentificationNumber,
		UserID: TaxUser.UserID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Save your tax success", "data": u})
}

// GET /Tax/:id
func GetTaxUser(c *gin.Context) {
	ID := c.Param("id")
	var TaxUser entity.TaxUser

	db := config.DB()


	results := db.Preload("User").Where("user_id = ?", ID).First(&TaxUser)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, TaxUser)
}

// PUT update TaxUser by id 
func UpdateTaxUserByid(c *gin.Context) {
	var TaxUser entity.TaxUser
	TaxID := c.Param("id")
	db := config.DB()
 
	result := db.First(&TaxUser, TaxID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id TaxUser not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&TaxUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&TaxUser)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}


//GET user by status
func GetListUserByStatus(c *gin.Context) {
	StatusUser := c.Param("status")
	var User []entity.User

	db := config.DB()



	results := db.Preload("TaxUser").Where("status = ?", StatusUser).Find(&User)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Store not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, User)
}
