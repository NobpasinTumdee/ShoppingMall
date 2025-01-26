package Store

import (
	"errors" // เพิ่ม import สำหรับ package errors
	"net/http"
	"time"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

//GET ListStore by Floor
func GetStoreByFloor(c *gin.Context) {
	ID := c.Param("id")
	var Stores []entity.Store

	db := config.DB()


	// Query the user by ID
	results := db.Preload("User").Preload("StoreInformation").Preload("Membership").Preload("ProductType").Preload("StatusStoreAll").Where("product_type_id = ?", ID).Find(&Stores)
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
// GET /membership
func ListMembership(c *gin.Context) {
	var Membership []entity.Membership
	db := config.DB()

	results := db.Select("id, package_name, day, pwa, pea, rental_fee, parking_card_count").Find(&Membership)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, Membership)
}
//ไม่ได้ใช้
func GetStoreDetails(c *gin.Context) {
	ID := c.Param("id")
	action := c.Query("action") // ใช้ query parameter เพื่อเลือก action
	db := config.DB()

	if action == "average-rating" {
		// Logic สำหรับการดึงค่าเฉลี่ยคะแนน
		var totalRatings int64
		var sumRatings int64

		results := db.Model(&entity.Rating{}).Where("store_id = ?", ID).Count(&totalRatings).Select("SUM(rating)").Row()
		results.Scan(&sumRatings)

		// ถ้าไม่มีข้อมูล ให้ return ค่าเฉลี่ยเป็น 0
		var averageRating float64
		if totalRatings == 0 {
			averageRating = 0
		} else {
			// คำนวณค่าเฉลี่ย
			averageRating = float64(sumRatings) / float64(totalRatings)
		}

		c.JSON(http.StatusOK, gin.H{
			"store_id":      ID,
			"averageRating": averageRating,
			"totalRatings":  totalRatings,
		})
	} else if action == "list-store" {
		// Logic สำหรับการดึงรายการร้านค้า
		var Stores []entity.Store
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
	} else {
		// ถ้าไม่มี action ที่รองรับ
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid action"})
	}
}

func GetStoresByProductTypeID(c *gin.Context) {
	// รับค่า ProductTypeID จาก URL Parameters
	productTypeID := c.Param("id")

	db := config.DB()
	type StoreWithRating struct {
		ID            		uint    	`json:"id"`
		PicStore  			string 		`json:"pic_store"`
		SubPicOne  			string 		`json:"sub_pic_one"`
		SubPicTwo  			string 		`json:"sub_pic_two"`
		SubPicThree  		string 		`json:"sub_pic_three"`
		NameStore     		string  	`json:"name_store"`
		BookingDate   		time.Time 	`json:"booking_date"`
		LastDay       		time.Time 	`json:"last_day"`
		DescribtionStore  	string 		`json:"describtion_store"`
		//StatusStore  		string 		`json:"status_store"`
		StatusService  		string 		`json:"status_service"`
		TotalRating   		float64 	`json:"total_rating"`
		StatusStoreID       uint    	`json:"status_store_id"`
		StatusName          string      `json:"status_name"`
	}

	var stores []StoreWithRating

	// สร้าง SQL Query สำหรับคำนวณค่าเฉลี่ยของ Rating
	const sqlAverageRating = `
		SELECT r.store_id, AVG(r.rating) as avg_rating
		FROM ratings r
		WHERE r.deleted_at IS NULL
		GROUP BY r.store_id
	`

	// Query ดึงข้อมูลร้านค้าพร้อมค่าเฉลี่ยของรีวิวและ StatusStoreAll
	db.Table("stores as s").
		Select(`s.id, s.pic_store, s.sub_pic_one, s.sub_pic_two, s.sub_pic_three, 
				s.name_store, s.booking_date, s.last_day, s.describtion_store, 
				s.status_service, s.status_store_id, 
				COALESCE(sr.avg_rating, 0) as total_rating,
				ssa.status_name`).
		Joins("LEFT JOIN (" + sqlAverageRating + ") sr ON sr.store_id = s.id").
		Joins("LEFT JOIN status_store_alls ssa ON ssa.id = s.status_store_id").
		Where("s.deleted_at IS NULL AND s.product_type_id = ?", productTypeID).
		Scan(&stores)

	c.JSON(http.StatusOK, stores)
}

//GET ListStore by id
func GetStoreByid(c *gin.Context) {
	ID := c.Param("id")
	var Stores entity.Store

	db := config.DB()

	results := db.Preload("User").Preload("StoreInformation").Preload("Membership").Preload("ProductType").Preload("StatusStoreAll").Where("id = ?", ID).Find(&Stores)
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



	results := db.Preload("User").Preload("StoreInformation").Preload("Membership").Preload("ProductType").Preload("StatusStoreAll").Where("status_store_id = ?", StatusStore).Find(&Stores)
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

// GET /Membership/:id
func GetMembership(c *gin.Context) {
	ID := c.Param("id")
	var Membership entity.Membership

	db := config.DB()


	results := db.Where("id = ?", ID).First(&Membership)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Membership)
}



// POST Comment
func CreateRating(c *gin.Context) {
	var Rating entity.Rating

	if err := c.ShouldBindJSON(&Rating); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	db := config.DB()
	u := entity.Rating{
		Rating:			Rating.Rating,
		Comment: 		Rating.Comment,
		UserID:        	Rating.UserID,
		StoreID:        Rating.StoreID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Comment success", "data": u})
}


// GET /comment/:id
func ListCommentByStoreId(c *gin.Context) {
	ID := c.Param("id")
	var Rating []entity.Rating

	db := config.DB()


	results := db.Preload("User").Preload("Store").Where("store_id = ?", ID).Find(&Rating)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Rating)
}

// GET /comment/:id by userid
func ListCommentByUserId(c *gin.Context) {
	ID := c.Param("id")
	var Rating []entity.Rating

	db := config.DB()


	results := db.Preload("User").Preload("Store").Where("user_id = ?", ID).Find(&Rating)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Comment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Rating)
}

// DELETE /comment/:id
func DeleteComment(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM ratings WHERE store_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// GET /average-rating/:id
func GetAverageRatingByStoreID(c *gin.Context) {
	ID := c.Param("id")
	var totalRatings int64
	var sumRatings int64

	db := config.DB()

	// ดึงค่าคะแนนรวมและจำนวนคะแนนทั้งหมด
	results := db.Model(&entity.Rating{}).Where("store_id = ?", ID).Count(&totalRatings).Select("SUM(rating)").Row()
	results.Scan(&sumRatings)

	// ถ้าไม่มีข้อมูล ให้ return ค่าเฉลี่ยเป็น 0
	var averageRating float64
	if totalRatings == 0 {
		averageRating = 0
	} else {
		// คำนวณค่าเฉลี่ย
		averageRating = float64(sumRatings) / float64(totalRatings)
	}

	c.JSON(http.StatusOK, gin.H{
		"store_id":      ID,
		"averageRating": averageRating,
		"totalRatings":  totalRatings,
	})
}

//GET ListBackUp store by id
func GetHistoryById(c *gin.Context) {
	ID := c.Param("id")
	var Stores []entity.BackupStore

	db := config.DB()

	results := db.Preload("User").Preload("Store").Preload("Store.StoreInformation").Where("store_id = ?", ID).Find(&Stores)
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

// GET /users
func ListStatusStore(c *gin.Context) {
	var status []entity.StatusStoreAll
	db := config.DB()

	results := db.Select("id, status_name").Find(&status)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, status)
}
//==================================================StoreInformation======================================================
//GET Listinfo by storeid
func GetInfobyStore(c *gin.Context) {
	ID := c.Param("id")
	var Information []entity.StoreInformation

	db := config.DB()

	results := db.Preload("Store").Preload("Store.User").Preload("Store.Membership").Preload("Store.ProductType").Preload("Store.StatusStoreAll").Where("store_id = ?", ID).Find(&Information)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "Store Information not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, Information)
}

// POST StoreInformation
func CreateInformation(c *gin.Context) {
	var Information entity.StoreInformation

	if err := c.ShouldBindJSON(&Information); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.StoreInformation{
		Picture:        	Information.Picture,
		Details:        	Information.Details,
		DescriptionPic:     Information.DescriptionPic,
		StoreID:        	Information.StoreID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "save information store success", "data": u})
}
// DELETE /information/:storeid
func DeleteInformation(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM store_informations WHERE store_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
// DELETE /information/:id
func DeleteInformationByid(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM store_informations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}
// PUT update info by id 
func UpdateInformationByid(c *gin.Context) {
	var Information entity.StoreInformation
	InfoID := c.Param("id")
	db := config.DB()
 
	result := db.First(&Information, InfoID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id Information not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&Information); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&Information)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// PUT update package store
func UpdateMembershipByid(c *gin.Context) {
	var Membership entity.Membership
	ID := c.Param("id")
	db := config.DB()
 
	result := db.First(&Membership, ID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&Membership); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&Membership)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}