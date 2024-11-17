package Store

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

//GET ListPaymentStore by userid
func GetPaymentStoreByid(c *gin.Context) {
	ID := c.Param("id")
	var PaymentStore []entity.PaymentStore

	db := config.DB()


	results := db.Where("user_id = ?", ID).Find(&PaymentStore)
	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "PaymentStore not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, PaymentStore)
}

// GET ListPaymentStore by userid with FK data
func GetPaymentStoreWithFKByID(c *gin.Context) {
    ID := c.Param("id")
    var paymentStores []entity.PaymentStore

    db := config.DB()

    results := db.Preload("Store").
        Preload("PaymentMethodStore").
        Preload("User").
        Preload("Store.Membership"). 
        Preload("Store.ProductType"). 
        Where("user_id = ?", ID).
        Find(&paymentStores)

    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "PaymentStore not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, paymentStores)
}
// GET ListPaymentStore by id payment
func GetPaymentStoreByPayID(c *gin.Context) {
    ID := c.Param("id")
    var paymentStores entity.PaymentStore

    db := config.DB()

    results := db.Preload("Store").
        Preload("PaymentMethodStore").
        Preload("User").
        Preload("Store.Membership"). 
        Preload("Store.ProductType"). 
        Where("id = ?", ID).
        Find(&paymentStores)

    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "PaymentStore not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, paymentStores)
}


// POST Payment
func CreatePayment(c *gin.Context) {
	var payment entity.PaymentStore

	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.PaymentStore{
		StatusPaymentStore:        "wait",
		PayMethodStoreID:        0,
		UserID:        payment.UserID,
		StoreID:        payment.StoreID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "post payment success", "data": u})
}

// PUT update PaymentStore by id 
func UpdatePaymentByid(c *gin.Context) {
	var PaymentStore entity.PaymentStore
	ID := c.Param("id")
	db := config.DB()
 
	result := db.First(&PaymentStore, ID)
 
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Id PaymentStore not found"})
		return
	}
 
 
	if err := c.ShouldBindJSON(&PaymentStore); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
 
 
	result = db.Save(&PaymentStore)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
 
	c.JSON(http.StatusOK, gin.H{"message": "PaymentStore successful"})
}

// PUT update PaymentStore status to 'paid' by id
func UpdatePaymentStatusByID(c *gin.Context) {
    var paymentStore entity.PaymentStore
    ID := c.Param("id") // รับ id จาก URL
    db := config.DB()

    // ค้นหา PaymentStore ตาม ID
    result := db.First(&paymentStore, ID)
    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "PaymentStore ID not found"})
        return
    }

    // อัปเดตเฉพาะ StatusPaymentStore เป็น 'paid'
    paymentStore.StatusPaymentStore = "paid"
    if err := db.Save(&paymentStore).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update PaymentStore status"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "PaymentStore status updated to 'paid'", "paymentStore": paymentStore})
}


// GET /PaymentMethodStore
func ListPaymentMethodStore(c *gin.Context) {

	var PM []entity.PaymentMethodStore

	db := config.DB()

	results := db.Select("id, method_name , method_pic").Find(&PM)

	// Check for errors in the query
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	// Return the results as JSON
	c.JSON(http.StatusOK, PM)
}



//bin=============================================================================================================================
// GET ListReceiptByID by userid with FK data
func ListReceiptByID(c *gin.Context) {
    ID := c.Param("id")
    var Receipt []entity.Receipt

    db := config.DB()

    results := db.
        Preload("PaymentStore").
        Preload("PaymentStore.PaymentMethodStore").
        Preload("PaymentStore.User").
        Preload("PaymentStore.Store").
        Preload("PaymentStore.Store.Membership").
        Preload("PaymentStore.Store.ProductType").
        Preload("TaxUser").
        Where("payment_store_id = ?", ID).
        Find(&Receipt)

    if results.Error != nil {
        if errors.Is(results.Error, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "bin not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, Receipt)
}

// POST bill
func CreateReceipt(c *gin.Context) {
	var Receipt entity.Receipt

	if err := c.ShouldBindJSON(&Receipt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.Receipt{
		DateReceipt:        	Receipt.DateReceipt,
		DescribtionBill:        Receipt.DescribtionBill,
		PaymentStoreID:        	Receipt.PaymentStoreID,
		UserTaxID:        		Receipt.UserTaxID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "post bill success", "data": u})
}