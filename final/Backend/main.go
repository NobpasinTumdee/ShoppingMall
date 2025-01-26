package main

import (
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"

	//"example.com/ProjectSeG13/controller"
	"net/http"

	"example.com/ProjectSeG13/controller/Hall"
	"example.com/ProjectSeG13/controller/Inventory"
	"example.com/ProjectSeG13/controller/ServiceRequest"
	"example.com/ProjectSeG13/controller/CleaningRequest"
	"example.com/ProjectSeG13/controller/Store"
	"example.com/ProjectSeG13/controller/user"
	"example.com/ProjectSeG13/controller/Cleaning"
	"example.com/ProjectSeG13/controller/CarPark"
	"example.com/ProjectSeG13/middlewares"
)

const PORT = "8000"

func main() {
  	// open connection database
	config.ConnectionDB()

	// Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	
	r.POST("/signup", user.SignUp) //สมัคร
    r.POST("/signin", user.SignIn) //Sign in == login 
    r.PUT("/ResetPasswordUser", user.ResetPasswordUser) //Sign in == login 

	r.GET("/user" , user.ListUsers)
	r.GET("/event" , user.ListEvent)
	r.GET("/store/:id",Store.GetStoresByProductTypeID)
	r.GET("/store-preload/:id",Store.GetStoreByFloor)
	r.POST("/send-email", user.SendEmailHandler)
	router := r.Group("")
	{
		router.Use(middlewares.Authorizes())
		
		
		//User
		router.GET("/user/:id", user.GetUser)
		router.GET("/users", user.ListUsers)
		router.PUT("/user/:id",user.UpdateUserByid)
		router.POST("/addStore",user.AddStoreUser)
		router.GET("/userstore", user.ListUserstore)
		router.GET("/userstore/:id", user.GetUserstoreByid)
		router.DELETE("/DeleteUserStore/:id", user.DeleteUserStore)
		router.GET("/Message/:id", user.GetMessage)
		router.POST("/Message", user.CreateMessageBoard)
		router.POST("/CreateTax",user.CreateTax)
		router.GET("/Tax/:id", user.GetTaxUser)
		router.PUT("/Tax/:id",user.UpdateTaxUserByid)
		//Admin
		router.GET("/storeWaiting/:status",Store.GetStoreWaiting)
		router.GET("/job/:status",user.GetListUserByStatus)
		router.POST("/event",user.CreateEvent)
		router.DELETE("/event/:id", user.DeleteEvent)
		
		//ระบบ store
		router.PUT("/store/:id",Store.UpdateStoreByid)
		router.POST("/backup",Store.CreateBackUpStore)
		router.GET("/storeid/:id",Store.GetStoreByid)
		router.GET("/statusstore",Store.ListStatusStore)
		router.GET("/Membership/:id",Store.GetMembership)
		router.GET("/Membership",Store.ListMembership)
		router.GET("/commentbystore/:id",Store.ListCommentByStoreId)//rating
		router.GET("/commentbyuser/:id",Store.ListCommentByUserId)
		router.POST("/comment",Store.CreateRating)
		router.DELETE("/comment/:id",Store.DeleteComment)
		router.GET("/average-rating/:id",Store.GetAverageRatingByStoreID)
		router.GET("/backupstore/:id",Store.GetHistoryById)//backupStore
		router.GET("/information/:id",Store.GetInfobyStore)
		router.POST("/information",Store.CreateInformation)
		router.DELETE("/information/:id",Store.DeleteInformation)
		router.DELETE("/info-pic-store/:id",Store.DeleteInformationByid)
		router.PUT("/information/:id",Store.UpdateInformationByid)
		//ระบบ store payment
		router.GET("/PaymentStore/:id", Store.GetPaymentStoreByid)
		router.GET("/additional-package", Store.ListAdditionalPackage)
		router.POST("/additional-create",Store.CreateAdditionalPay)
		router.GET("/additional-list/:id", Store.GetAdditionalPayByID)
		router.GET("/additional-total-price/:id", Store.GetTotalPriceByPaymentStoreID)
		router.GET("/additional-packages", Store.GetAvailableAdditionalPackages)
		router.DELETE("/additional-delete/:id",Store.DeleteAdditional)
		router.GET("/PaymentMethod", Store.ListPaymentMethodStore)
		router.GET("/Payment/:id", Store.GetPaymentStoreWithFKByID)
		router.GET("/PaymentInfo/:id", Store.GetPaymentStoreByPayID)
		router.POST("/CreatePayment",Store.CreatePayment)
		router.PUT("/PaymentStore/:id",Store.UpdatePaymentByid)
		router.PUT("/PaymentStatus/:id",Store.UpdatePaymentStatusByID)//ยังไม่ได้ใช้ เพราะมันแค่เปลี่ยน status
		router.GET("/Receipt/:id", Store.ListReceiptByID)
		router.POST("/Receipt",Store.CreateReceipt)
		router.PUT("/membership-edit/:id",Store.UpdateMembershipByid)
		



		//ระบบ จองรถ
		router.GET("/get-user-details/:id", CarPark.GetUserDetails)	
		router.GET("/Tax-ICONIC",CarPark.GetTaxUserICONIC)

		router.GET("/get-list-parking-card", CarPark.GetListCardAndCheckExpiredCardtoUpdate)	
		
		router.GET("/get-parking-card/:id", CarPark.GetParkingCardByID)
		router.POST("/create-parkingcard",CarPark.CreateParkingCard)
		router.PATCH("/patch-parkingcard/:id",CarPark.UpdateParkingCard)
		router.DELETE("/delete-parkingcard/:id",CarPark.DeleteParkingCard)
		router.POST("/create-parkingusagecard",CarPark.CreateParkingUsageCard)
		router.PATCH("/patch-parkingusagecard/:id",CarPark.UpdateParkingUsageCard)
		router.GET("/get-parkingusagecard/:id", CarPark.GetParkingUsageCardByID)
		router.GET("/get-list-status-card", CarPark.GetListStatusCard)
		router.POST("/create-parkingzone-daily-and-usagecard",CarPark.CreateParkingZoneDailyAndUsageCard)

		router.GET("/get-list-parkingzone-daily", CarPark.GetListZoneDaily)
		router.POST("/create-parkingzone-daily",CarPark.CreateZoneDaily)
		router.PATCH("/patch-parkingzone-daily/:id",CarPark.UpdateZoneDailyByID)
		router.POST("/create-vehicle",CarPark.CreateVehicle)
		router.PATCH("/patch-vehicle/:id",CarPark.UpdateVehicle)
		//ระบบ จองรถ payment
		router.POST("/create-parking-payment",CarPark.CreateParkingPayment)
		router.GET("/get-parkingpayment-by-usagecard/:id", CarPark.GetParkingPaymentByUsageCardID)




		//ระบบ hall
		router.GET("/hall",Hall.ListHall)
		router.GET("/hall/:id",Hall.GetHall)

		router.POST("/booking", Hall.CreateBooking)
		router.GET("/bookings/:id", Hall.GetBookingByID) 
		router.GET("/booking/:id", Hall.ListBookingByHallID) 
		router.PUT("/booking/:id", Hall.UpdateBooking) // Update Booking
		router.DELETE("/booking/:id", Hall.DeleteBooking) //Delete Booking
		router.GET("/calendar/:id", Hall.GetBookingByHallID)
		router.GET("/facilities",Hall.Facilities)
		
		//ระบบ hall payment
		router.GET("/total/:id",Hall.GetBookingWithTotalPrice)
		router.POST("/payment", Hall.CreatePaymentHall)           // Create a new payment
		router.GET("/payment/:id", Hall.GetPaymentByID)      // Get payment details by ID
		router.GET("/payments", Hall.ListPayments)           // List all payments
		router.PUT("/payment/:id", Hall.UpdateStatusHall)       // Update a payment
		router.DELETE("/payment/:id", Hall.DeletePayment)    // Delete a payment
		router.GET("/taxinvoice/:id", Hall.GetInvoice)
		router.POST("/taxinvoice",Hall.CreateInvoice)
		
		//ระบบ แจ้งซ่อม
		router.GET("/Service/:Status", servicerequest.ListService)
		router.GET("/StoreService", servicerequest.ListStoreService)
		router.GET("/Repairman", servicerequest.ListRepairman)
		router.POST("/Service", servicerequest.CreateService)
		//ระบบ เช็คอุปกรณ์ช่าง
		router.GET("/Equipment/:id", servicerequest.GetEquipmentRequest)
		router.POST("/Equipment", servicerequest.CreateEquipment)
		router.PUT("/Inventory/:id", servicerequest.UpdateInventoryByid)
		router.DELETE("/Equipment/:id", servicerequest.DeleteEquipment)
		router.PUT("/Service/:id", servicerequest.UpdateServiceByid)

		//อุปกรณ์ทั้งหมด
		router.GET("/inventory", Inventory.ListInventory)
		router.GET("/inventory/:id", Inventory.GetInventoryByCategory)
		router.GET("/CategoryInventory", Inventory.ListCategoryInventory)
		

		//ระบบ แม่บ้าน
		router.GET("/Area", Cleaning.ListArea)
		router.POST("/CleaningRecord", Cleaning.CreateCleaningRecord)
		router.GET("/Schedules", Cleaning.ListSchedules)
		router.GET("/CleaningRecordsByArea/:id", Cleaning.GetCleaningRecordsByArea)
		router.GET("/SchedulesByArea/:id", Cleaning.GetSchedulesByArea)
		router.DELETE("/DeleteCleaningRecord", Cleaning.DeleteCleaningRecord)
		router.PUT("/UpdateCleaningRecord/:id", Cleaning.UpdateCleaningRecord)
		//ระบบ อุปการณ์แม่บ้าน
		router.POST("/InventoryRequest", CleaningRequest.CreateInventoryRequest)
		router.GET("/ListInventoryRequest", CleaningRequest.ListInventoryCleaningRequest)
		router.PUT("/UpdateQuantityInventory", CleaningRequest.UpdateQuantityInventory)
		router.GET("/ListCreateInventoryRequest", CleaningRequest.ListCreateInventoryRequest)
	}

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}