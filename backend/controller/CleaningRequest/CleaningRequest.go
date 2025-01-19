package CleaningRequest

import (
	"net/http"
	"time"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"
)

func CreateInventoryRequest(c *gin.Context) { 
    var input struct {
        NameItem        string `json:"NameItem"`
        DateRequest     string `json:"DateRequest"`
        QuantityRequest int    `json:"QuantityRequest"`
        UserID          uint   `json:"UserID"`
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Parse DateRequest
    Date, err := time.Parse(time.RFC3339, input.DateRequest)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid DateRequest format"})
        return
    }

    db := config.DB()

    // ค้นหา Inventory ตาม NameItem
    var inventory entity.Inventory
    if err := db.Where("inventory_name = ?", input.NameItem).First(&inventory).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Inventory item not found"})
        return
    }

    // สร้างข้อมูล InventoryRequest
    u := entity.InventoryRequest{
        NameItem:        input.NameItem,
        DateRequest:     Date,
        QuantityRequest: input.QuantityRequest,
        UserID:          input.UserID,
    }

    // บันทึกข้อมูล InventoryRequest
    if err := db.Create(&u).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // ใช้ u.ID และ inventory.ID ให้สัมพันธ์กันใน RequestDetail
    x := entity.RequestDetail{
        RequestID:     u.ID,
        InventoryID:   inventory.ID,
        StatusRequest: false, // ค่าเริ่มต้นเป็น false ก่อนตรวจสอบ
    }

    // บันทึกข้อมูล RequestDetail
    if err := db.Create(&x).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "Service success",
        "InventoryRequest": u,
        "RequestDetail":    x,
    })
}

func UpdateQuantityInventory(c *gin.Context) { 
    var payload struct {
        NameItem string `json:"NameItem"`
        Quantity int    `json:"Quantity"`
    }

    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON payload"})
        return
    }

    db := config.DB()
    var inventory entity.Inventory

    // ค้นหา Inventory ตาม NameItem
    if err := db.Where("inventory_name = ?", payload.NameItem).First(&inventory).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Inventory item not found"})
        return
    }

    var request entity.InventoryRequest
    if err := db.Where("name_item = ?", payload.NameItem).Order("created_at DESC").First(&request).Error; err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Request not found"})
        return
    }

    var requestDetail entity.RequestDetail
    err := db.Where("request_id = ?", request.ID).First(&requestDetail).Error

    if inventory.QuantityInventory < payload.Quantity {
        if err != nil {
            requestDetail = entity.RequestDetail{
                RequestID:     request.ID, 
                InventoryID:   inventory.ID,
                StatusRequest: false,
                Reason:        "จำนวนอุปกรณ์ที่ต้องการไม่พอ",
            }
            db.Create(&requestDetail)
        } else {
            requestDetail.StatusRequest = false
            requestDetail.Reason = "จำนวนอุปกรณ์ที่ต้องการไม่พอ"
            db.Save(&requestDetail)
        }

        c.JSON(http.StatusBadRequest, gin.H{"error": "จำนวนอุปกรณ์ที่ต้องการไม่พอ"})
        return
    }

    inventory.QuantityInventory -= payload.Quantity
    if err := db.Save(&inventory).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to update inventory"})
        return
    }

    // อัปเดต RequestDetail
    if err != nil {
        requestDetail = entity.RequestDetail{
            RequestID:     request.ID,
            InventoryID:   inventory.ID,
            StatusRequest: true,
            Reason:        "เบิกอุปกรณ์เสร็จสิ้น",
        }
        db.Create(&requestDetail)
    } else {
        requestDetail.StatusRequest = true
        requestDetail.Reason = "เบิกอุปกรณ์เสร็จสิ้น"
        db.Save(&requestDetail)
    }

    c.JSON(http.StatusOK, gin.H{
        "message":  "Quantity updated successfully",
        "NameItem": inventory.InventoryName,
        "Quantity": inventory.QuantityInventory,
    })
}

// GET /InventoryCleaningRequest
func ListInventoryCleaningRequest(c *gin.Context) {

	var inventories []entity.Inventory

	db := config.DB()

    results := db.Joins("LEFT JOIN category_inventories c ON inventories.category_id = c.id").
    Where("c.id = ?", 1).
    Find(&inventories) 

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, inventories)
}

//ListCreateInventoryRequest
func ListCreateInventoryRequest(c *gin.Context) {

	var requests []entity.InventoryRequest


	db := config.DB()

	results := db.Preload("User").Preload("RequestDetails").Find(&requests)

	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, requests)
}





