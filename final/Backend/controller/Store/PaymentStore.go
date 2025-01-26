package Store

import (
	"net/http"
	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	"errors"  // เพิ่ม import สำหรับ package errors
	"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
)

// GET ListPaymentStore by userid
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
		Preload("PaymentStoreStatus").
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
		Preload("PaymentStoreStatus").
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
		PayMethodStoreID:     0,
		PayStoreName:         payment.PayStoreName,
		PayStorePackage:      payment.PayStorePackage,
		PayStorePwa:          payment.PayStorePwa,
		PayStorePea:          payment.PayStorePea,
		PayStoreRental:       payment.PayStoreRental,
		PayStoreBook:         payment.PayStoreBook,
		PayStoreLast:         payment.PayStoreLast,
		Evidence:             payment.Evidence,
		UserID:               payment.UserID,
		StoreID:              payment.StoreID,
		StatusPaymentStoreID: 1,
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
	paymentStore.StatusPaymentStoreID = 2
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

// bin=============================================================================================================================
// GET ListReceiptByID by userid with FK data
func ListReceiptByID(c *gin.Context) {
	ID := c.Param("id")
	var Receipt entity.Receipt

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
		DateReceipt:     Receipt.DateReceipt,
		DescribtionBill: Receipt.DescribtionBill,
		Additional:      Receipt.Additional,
		TotalPrice:      Receipt.TotalPrice,
		PaymentStoreID:  Receipt.PaymentStoreID,
		UserTaxID:       Receipt.UserTaxID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "post bill success", "data": u})
}

// GET /additional-package
func ListAdditionalPackage(c *gin.Context) {
	var Package []entity.AdditionalPackage
	db := config.DB()

	results := db.Select("id, additional_picture,additional_name,describtion_package,price_package").Find(&Package)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, Package)
}

// POST /additional-create
func CreateAdditionalPay(c *gin.Context) {
	var Additional entity.AdditionalPay

	if err := c.ShouldBindJSON(&Additional); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	u := entity.AdditionalPay{
		AdditionalPackageID: Additional.AdditionalPackageID,
		PaymentStoreID:      Additional.PaymentStoreID,
	}

	// บันทึก
	if err := db.Create(&u).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "post additional create success", "data": u})
}

// GET /additional-list/:id
func GetAdditionalPayByID(c *gin.Context) {
	ID := c.Param("id")
	var AdditionalPay []entity.AdditionalPay

	db := config.DB()

	results := db.
		Preload("PaymentStore").
		Preload("AdditionalPackage").
		Preload("PaymentStore.PaymentMethodStore").
		Preload("PaymentStore.Receipt").
		Preload("PaymentStore.Store").
		Where("payment_store_id = ?", ID).
		Find(&AdditionalPay)

	if results.Error != nil {
		if errors.Is(results.Error, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": "AdditionalPay not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, AdditionalPay)
}

// DELETE /additional-delete/:id
func DeleteAdditional(c *gin.Context) {

	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM additional_pays WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

// GET /additional-total-price/:id
func GetTotalPriceByPaymentStoreID(c *gin.Context) {
	ID := c.Param("id")
	var totalPrice *uint

	db := config.DB()

	result := db.Model(&entity.AdditionalPay{}).
		Select("SUM(additional_packages.price_package) AS total_price").
		Joins("JOIN additional_packages ON additional_pays.additional_package_id = additional_packages.id").
		Where("additional_pays.payment_store_id = ?", ID).
		Scan(&totalPrice)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if totalPrice == nil {
		c.JSON(http.StatusOK, gin.H{"total_price": nil})
		return
	}

	c.JSON(http.StatusOK, gin.H{"total_price": *totalPrice})
}

// get package ที่ payment id นั้นๆยังไม่ได้เลือก
func GetAvailableAdditionalPackages(c *gin.Context) {
	// Get PaymentStoreID from query parameters
	var query struct {
		PaymentStoreID uint `form:"PaymentStoreID" binding:"required"`
	}
	if err := c.ShouldBindQuery(&query); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PaymentStoreID is required"})
		return
	}
	db := config.DB()

	// Fetch AdditionalPackages not associated with the given PaymentStoreID
	var availablePackages []entity.AdditionalPackage
	err := db.
		Where("id NOT IN (?)", db.Table("additional_pays").Select("additional_package_id").Where("payment_store_id = ?", query.PaymentStoreID)).
		Find(&availablePackages).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve additional packages"})
		return
	}

	// Return the available packages
	c.JSON(http.StatusOK, availablePackages)
}
