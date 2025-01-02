package CarPark

import (
	//"errors" // เพิ่ม import สำหรับ package errors

	//"fmt"

	"fmt"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/gin-gonic/gin"

	//"gorm.io/gorm" // เพิ่ม import สำหรับ gorm
	"net/http"
)

// POST ParkingTransaction
func CreateParkingCard(c *gin.Context) {
	var card entity.ParkingCard
	var user entity.User
	var store entity.Store

	// Bind JSON
	if err := c.ShouldBindJSON(&card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var userID = card.UserID

	db := config.DB()

	// Find user
	resultUser := db.Where("id = ?", userID).Find(&user)
	if resultUser.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": resultUser.Error.Error()})
		return
	}

	// Find store
	resultStore := db.Where("user_id = ?", userID).Find(&store)
	if resultStore.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": resultStore.Error.Error()})
		return
	}

	// Determine TypeParkID and ParkingFeePolicyID
	if user.Status == "Member" && store.UserID == 0 {
		card.TypeParkID = 1
		card.ParkingFeePolicyID = 1
	} else if user.Status == "Member" && store.UserID != 0 {
		card.TypeParkID = 2
		card.ParkingFeePolicyID = 2
	} else if user.Status == "User" {
		card.TypeParkID = 3
		card.ParkingFeePolicyID = 3
	} else {
		return
	}

	// Create ParkingCard
	if err := db.Create(&card).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Map zone name to ID
	var parkingZones []entity.ParkingZone
	db.Find(&parkingZones)

	zoneMap := make(map[string]entity.ParkingZone)
	for _, zone := range parkingZones {
		zoneMap[zone.Name] = zone
	}

	// Determine zones to assign based on TypeParkID
	var zonesToAssign []entity.ParkingZone
	switch card.TypeParkID {
	case 1: // VIP
		zonesToAssign = append(zonesToAssign, zoneMap["VIP"], zoneMap["GENERAL"])
	case 2: // STORE
		zonesToAssign = append(zonesToAssign, zoneMap["STORE"], zoneMap["GENERAL"])
	case 3: // GENERAL
		zonesToAssign = append(zonesToAssign, zoneMap["GENERAL"])
	}

	// Create ParkingCardZone for each zone
	for _, zone := range zonesToAssign {
		parkingCardZone := entity.ParkingCardZone{
			ParkingCardID: card.ID,
			ParkingZoneID: zone.ID,
		}
		if err := db.FirstOrCreate(&parkingCardZone, entity.ParkingCardZone{
			ParkingCardID: parkingCardZone.ParkingCardID,
			ParkingZoneID: parkingCardZone.ParkingZoneID,
		}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	c.JSON(http.StatusCreated, gin.H{"message": "ParkingCard created successfully", "data": card})
}

// POST ParkingCard+Vehical
/* func CreateParkingCardAndVehical(c *gin.Context) {
    var card entity.ParkingCard
    var vehicle entity.Vehicle

    if err := c.ShouldBindJSON(&card); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := c.ShouldBindJSON(&vehicle); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()

    // Create Parking Card
    if err := db.Create(&card).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Create Vehicle
    if err := db.Create(&vehicle).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"message": "Parking Card and Vehicle created successfully", "data": card})
} */

func GetListCard(c *gin.Context) {
	var cards []entity.ParkingCard

	db := config.DB()

	if err := db.Preload("User").Preload("ParkingFeePolicy").
		Preload("TypePark").Preload("StatusCard").
		Preload("ParkingZone").
		Preload("ParkingTransaction").
		Preload("ParkingPayment").
		Find(&cards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, cards)
}

func UpdateParkingCard(c *gin.Context) {
	var card entity.ParkingCard
	CardID := c.Param("id")

	db := config.DB()

	result := db.First(&card, CardID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to mappayload"})
		return
	}
	result = db.Save(&card)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "ParkingCard updated successfully"})
}

func GetParkingCardByID(c *gin.Context) {
	id := c.Param("id")
	var parkingCard entity.ParkingCard

	db := config.DB()

	if err := db.Preload("ParkingZone").Preload("User").Preload("StatusCard").Preload("TypePark").Preload("ParkingTransaction").Preload("ParkingPayment").First(&parkingCard, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, parkingCard)
}

func GetParkingCardByUserID(c *gin.Context) {
	userID := c.Param("id")            // รับค่า user_id จาก URL parameter
	var parkingCard entity.ParkingCard // ใช้เป็นตัวแปรเดียว แทนที่จะเป็น slice

	db := config.DB()

	// ค้นหาบัตรจอดรถที่มี user_id ตรงกับที่รับมา
	if err := db.Preload("StatusCard").
		Preload("TypePark").
		Preload("ParkingFeePolicy").
		Preload("ParkingTransaction").
		Preload("ParkingPayment").
		Preload("ParkingZone").
		Preload("User").
		Where("user_id = ?", userID). // ค้นหาตาม user_id
		First(&parkingCard).Error; err != nil {
		// หากพบข้อผิดพลาดจากการ query หรือไม่พบข้อมูล
		c.JSON(http.StatusNotFound, gin.H{"error": "No parking card found for user_id " + userID})
		return
	}

	// ตรวจสอบว่า UserID ของบัตรจอดรถไม่เป็น 0
	if parkingCard.UserID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invalid UserID in parking card"})
		return
	}

	// ส่งข้อมูลบัตรจอดรถที่พบกลับไป
	c.JSON(http.StatusOK, parkingCard)
}

func DeleteParkingCard(c *gin.Context) {

	id := c.Param("id")

	db := config.DB()

	if err := db.Where("parking_cards_id = ?", id).Delete(&entity.ParkingCardZone{}).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Card not found"})
		return
	}
	if tx := db.Exec("DELETE FROM parking_cards WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})

}

func GetListCardAndUser(c *gin.Context) {
	var cards []entity.ParkingCard
	var users []entity.User // แก้เป็น struct ที่เก็บข้อมูลผู้ใช้งานจริง

	db := config.DB()

	// ดึงข้อมูล ParkingCard พร้อม preload ความสัมพันธ์
	if err := db.Preload("User").Preload("ParkingFeePolicy").
		Preload("TypePark").Preload("StatusCard").
		Preload("ParkingZone").
		Preload("ParkingTransaction").
		Preload("ParkingPayment").
		Find(&cards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// ดึงข้อมูลผู้ใช้งาน (User)
	if err := db.Find(&users).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	// ส่ง response รวม
	c.JSON(http.StatusOK, gin.H{
		"cards": cards,
		"users": users,
	})
}


func GetListTransaction(c *gin.Context) {
	var trans []entity.ParkingTransaction

	db := config.DB()

	if err := db.Preload("User").
		Preload("ParkingZone").
		Preload("ParkingPayment").
		Find(&trans).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, trans)
}

// POST ParkingTransaction
func CreateParkingTransaction(c *gin.Context) {
	var trans entity.ParkingTransaction

	if err := c.ShouldBindJSON(&trans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	newTransaction := entity.ParkingTransaction{
		ReservationDate: trans.ReservationDate,
		IsReservedPass:  trans.IsReservedPass,
		EntryTime:       trans.EntryTime,
		ExitTime:        trans.ExitTime,
		Hourly_Rate:     trans.Hourly_Rate,
		Image:           trans.Image,
		LicensePlate:    trans.LicensePlate,
		Color:           trans.Color,
		Make:            trans.Make,
		UserID:          trans.UserID,
		ParkingCardID:   trans.ParkingCardID, // Using ParkingCard ID
		ParkingZoneDailyID:   trans.ParkingZoneDailyID,
	}

	if err := db.Create(&newTransaction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "ParkingTransaction created successfully", "data": newTransaction})
}

func UpdateParkingTransaction(c *gin.Context) {
	var tran entity.ParkingTransaction
	TranID := c.Param("id")
	db := config.DB()
	result := db.First(&tran, TranID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&tran); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to mappayload"})
		return
	}
	result = db.Save(&tran)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
    c.JSON(http.StatusOK, gin.H{"message": "ParkingZone updated successfully"})
}

/********************************* User *************************************/
func GetUserDetails(c *gin.Context) {
	userID := c.Param("id") // รับค่า user_id จาก URL parameter

	db := config.DB()

	// เริ่มต้นสร้างตัวแปรสำหรับเก็บข้อมูลทั้งหมด
	var user entity.User
	var vehicle entity.Vehicle
	var parkingCard entity.ParkingCard

	// ดึงข้อมูล User
	if err := db.Where("id = ?", userID).First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// ดึงข้อมูล Vehicle ที่เชื่อมกับ User
	if err := db.Preload("User").Where("user_id = ?", userID).First(&vehicle).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No vehicle found for user_id " + userID})
		return
	}

	// ดึงข้อมูล ParkingCard ที่เชื่อมกับ User
	if err := db.Preload("StatusCard").
		Preload("TypePark").
		Preload("ParkingFeePolicy").
		Preload("ParkingTransaction").
		Preload("ParkingPayment").
		Preload("ParkingZone").
		Preload("User").
		Where("user_id = ?", userID).
		First(&parkingCard).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No parking card found for user_id " + userID})
		return
	}

	// ส่งข้อมูลทั้งหมดกลับไปในรูปแบบ JSON
	c.JSON(http.StatusOK, gin.H{
		"user":        user,
		"vehicle":     vehicle,
		"parkingCard": parkingCard,
	})
}

/*************************************** Not Used ***********************************************/
func UpdateParkingCardAndZone(c *gin.Context) {

	var payload struct {
		ParkingCard entity.ParkingCard `json:"parking_card"`
		ParkingZone entity.ParkingZone `json:"parking_zone"`
	}

	db := config.DB()

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
		return
	}

	fmt.Println("Payload:", payload)

	fmt.Println("ParkingCard ID:", payload.ParkingCard.ID)
	fmt.Println("ParkingCard StatusCardID:", payload.ParkingCard.StatusCardID)

	// ตรวจสอบการมีอยู่ของ ParkingCard และ ParkingZone
	if err := db.First(&payload.ParkingCard, c.Param("cid")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Parking card not found"})
		return
	}

	/* fmt.Println("ParkingZone ID:", payload.ParkingZone.ID)
	fmt.Println("ParkingZone AvailableZone:", payload.ParkingZone.AvailableZone) */

	if err := db.First(&payload.ParkingZone, c.Param("zid")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Parking zone not found"})
		return
	}

	// อัปเดตข้อมูล
	if err := db.Save(&payload.ParkingCard).Error; err != nil {
		fmt.Println("Error saving ParkingCard:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update parking card"})
		return
	}

	if err := db.Save(&payload.ParkingZone).Error; err != nil {
		fmt.Println("Error saving ParkingZone:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update parking zone"})
		return
	}

	// ส่งข้อความตอบกลับ
	c.JSON(http.StatusOK, gin.H{"message": "Parking card and zone updated successfully"})
}

func GetIdCardZone(c *gin.Context) {
	ID := c.Param("id")
	var cards entity.ParkingCard
	// var zones entity.ParkingZone
	// var cardzone entity.ParkingCardZone

	db := config.DB()
	if err := db.Preload("ParkingZone.TypePark").Preload("ParkingZone.ParkingCard").First(&cards, ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Card not found"})
		return
	}
	// if err := db.Where("id = ?", ID).Preload("ParkingZone").Find(&cards).Error; err != nil {
	// 	c.JSON(http.StatusNotFound, gin.H{"error": "Data not found"})
	// 	return
	// }

	c.JSON(http.StatusOK, gin.H{
		"cards": cards,
		// "zones": zones,
		// "cardzone": cardzone,
	})
}

func GetVehicleByUserID(c *gin.Context) {
	userID := c.Param("id")    // รับค่า user_id จาก URL parameter
	var vehical entity.Vehicle // ใช้เป็นตัวแปรเดียว แทนที่จะเป็น slice

	db := config.DB()

	// ค้นหาบัตรจอดรถที่มี user_id ตรงกับที่รับมา
	if err := db.Preload("User").Where("user_id = ?", userID).First(&vehical).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "No parking card found for user_id " + userID})
		return
	}

	// ตรวจสอบว่า UserID ของบัตรจอดรถไม่เป็น 0
	if vehical.UserID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invalid UserID in parking card"})
		return
	}

	// ส่งข้อมูลบัตรจอดรถที่พบกลับไป
	c.JSON(http.StatusOK, vehical)
}

func GetParkingCardWithZoneByID(c *gin.Context) {
	id := c.Param("id")
	var parkingCard entity.ParkingCard

	db := config.DB()

	if err := db.Preload("ParkingZone").First(&parkingCard, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, parkingCard)
}
