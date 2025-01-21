package CarPark

import (
	"fmt"
	"time"

	"example.com/ProjectSeG13/config"
	"example.com/ProjectSeG13/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"

	"net/http"
)

// POST ParkingUsageCard
func CreateParkingCard(c *gin.Context) {
	var card entity.ParkingCard
	var user entity.User

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
	/*	var store entity.Store
		 	resultStore := db.Where("user_id = ?", userID).Find(&store)
			if resultStore.Error != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": resultStore.Error.Error()})
				return
			} */

	if user.Status == "Member" {
		card.TypeCardID = 1
		card.ParkingFeePolicyID = 1
	} else if user.Status == "User" {
		card.TypeCardID = 2
		card.ParkingFeePolicyID = 2
	} else {
		card.TypeCardID = 1
		card.ParkingFeePolicyID = 1
	}

	var typeCard entity.TypeCard
	if err := db.Where("id = ?", card.TypeCardID).Find(&typeCard).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TypeCard not found"})
		return
	}

	// เพิ่มปีที่กำหนดจาก ExpiryYear ไปยังวันที่ปัจจุบัน
	expiryDate := time.Now().AddDate(typeCard.ExpiryYear, 0, 0)
	card.ExpiryDate = &expiryDate

	// ตรวจสอบ struc ข้อมูลด้วย govalidator
	if _, err := govalidator.ValidateStruct(card); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
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

	// Determine zones to assign based on TypeCardID
	var zonesToAssign []entity.ParkingZone
	switch card.TypeCardID {
	case 1: // MEMBER
		zonesToAssign = append(zonesToAssign, zoneMap["VIP"], zoneMap["GENERAL"])
	case 2: // GENERAL
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

func GetListCardAndCheckExpiredCardtoUpdate(c *gin.Context) {
	var cards []entity.ParkingCard

	db := config.DB()

	if err := db.Preload("User").Preload("ParkingFeePolicy").
		Preload("TypeCard").Preload("StatusCard").
		Preload("ParkingZone").
		/* Preload("ParkingUsageCard"). */
		Preload("ParkingUsageCard.ParkingPayment").
		Find(&cards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	/******************** ถ้า ExpiryDate น้อยกว่าวันนี้ เปลี่ยน Status Card ******************************/
	for _, card := range cards {
		if card.ExpiryDate != nil && card.ExpiryDate.Before(time.Now()) && card.StatusCardID != 3 {
			card.StatusCard.ID = uint(3)
			if err := db.Save(&card).Error; err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}
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

	if err := db.Preload("ParkingFeePolicy").Preload("ParkingZone").Preload("User").Preload("StatusCard").Preload("TypeCard").Preload("ParkingUsageCard.ParkingZoneDaily.ParkingZone").Preload("ParkingUsageCard").First(&parkingCard, "id = ?", id).Error; err != nil {
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
		Preload("TypeCard").
		Preload("ParkingFeePolicy").
		/* Preload("ParkingUsageCard"). */
		Preload("ParkingUsageCard.ParkingPayment").
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

	if tx := db.Model(&entity.ParkingCard{}).Where("id = ?", id).Update("deleted_at", time.Now()); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

func GetListCardAndUser(c *gin.Context) {
	var cards []entity.ParkingCard
	var users []entity.User // แก้เป็น struct ที่เก็บข้อมูลผู้ใช้งานจริง

	db := config.DB()

	// ดึงข้อมูล ParkingCard พร้อม preload ความสัมพันธ์
	if err := db.Preload("User").Preload("ParkingFeePolicy").
		Preload("TypeCard").Preload("StatusCard").
		Preload("ParkingZone").
		/* Preload("ParkingUsageCard"). */
		Preload("ParkingUsageCard.ParkingPayment").
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

func GetListUsageCard(c *gin.Context) {
	var trans []entity.ParkingUsageCard

	db := config.DB()

	if err := db.Preload("User").
		Preload("ParkingZone").
		Preload("ParkingPayment").
		Preload("ParkingZoneDaily").
		Find(&trans).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, trans)
}

func GetListStatusCard(c *gin.Context) {
	var status []entity.StatusCard

	db := config.DB()

	if err := db.Find(&status).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, status)
}

// POST ParkingUsageCard
func CreateParkingUsageCard(c *gin.Context) {
	var trans entity.ParkingUsageCard

	if err := c.ShouldBindJSON(&trans); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	if err := db.Create(&trans).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "ParkingUsageCard created successfully", "data": trans})
}

func UpdateParkingUsageCard(c *gin.Context) {
	var tran entity.ParkingUsageCard
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

func GetParkingUsageCardByID(c *gin.Context) {
	id := c.Param("id")
	var usageCard entity.ParkingUsageCard

	db := config.DB()

	if err := db.Preload("ParkingZoneDaily").Preload("ParkingZoneDaily.ParkingZone").Preload("ParkingCard").First(&usageCard, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Record not found"})
		return
	}
	c.JSON(http.StatusOK, usageCard)
}

/********************************* TypeCard *************************************/
func GetListTypeCard(c *gin.Context) {
	var typeCards []entity.TypeCard

	db := config.DB()

	if err := db.Find(&typeCards).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, typeCards)
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
		Preload("TypeCard").
		Preload("ParkingFeePolicy").
		Preload("ParkingUsageCard").
		Preload("ParkingZone").
		Preload("User").
		Where("user_id = ?", userID).
		Order("created_at DESC").
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

/*************************************** Create ZoneDaily+ParkingUsageCard ***********************************************/

func CreateParkingZoneDailyAndUsageCard(c *gin.Context) {
	var input struct {
		ZoneDaily   entity.ParkingZoneDaily   `json:"ParkingZoneDaily"`
		UsageCard entity.ParkingUsageCard `json:"ParkingUsageCard"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Check if ZoneDaily exists for the given date and zone
	var existingZoneDaily entity.ParkingZoneDaily
	result := db.Where("date = ? AND parking_zone_id = ?", input.ZoneDaily.Date, input.ZoneDaily.ParkingZoneID).First(&existingZoneDaily)

	if result.RowsAffected == 0 {
		// Create new ZoneDaily if not exists
		if err := db.Create(&input.ZoneDaily).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create ZoneDaily"})
			return
		}
		existingZoneDaily = input.ZoneDaily
	} else {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Create ParkingUsageCard
	input.UsageCard.ParkingZoneDailyID = existingZoneDaily.ID
	if err := db.Create(&input.UsageCard).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create ParkingUsageCard"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Successfully created ZoneDaily and ParkingUsageCard",
		"data":    input,
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

	// ตรวจสอบ struc ข้อมูลด้วย govalidator
	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("ParkingCard ID:", payload.ParkingCard.ID)
	fmt.Println("ParkingCard StatusCardID:", payload.ParkingCard.StatusCardID)

	// ตรวจสอบการมีอยู่ของ ParkingCard และ ParkingZone
	if err := db.First(&payload.ParkingCard, c.Param("cid")).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Parking card not found"})
		return
	}

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
	if err := db.Preload("ParkingZone.TypeCard").Preload("ParkingZone.ParkingCard").First(&cards, ID).Error; err != nil {
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
