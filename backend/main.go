package main

import (
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"

	//"example.com/ProjectSeG13/controller"
	"net/http"

	"example.com/ProjectSeG13/controller/Hall"
	"example.com/ProjectSeG13/controller/Store"
	"example.com/ProjectSeG13/controller/user"
	"example.com/ProjectSeG13/middlewares"
	"example.com/ProjectSeG13/controller/Inventory"
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
	r.GET("/store/:id",Store.GetStoresByProductTypeID)
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
		
		//ระบบ store
		router.PUT("/store/:id",Store.UpdateStoreByid)
		router.POST("/backup",Store.CreateBackUpStore)
		router.GET("/storeid/:id",Store.GetStoreByid)
		router.GET("/Membership/:id",Store.GetMembership)
		router.GET("/commentbystore/:id",Store.ListCommentByStoreId)//rating
		router.GET("/commentbyuser/:id",Store.ListCommentByUserId)
		router.POST("/comment",Store.CreateRating)
		router.DELETE("/comment/:id",Store.DeleteComment)
		router.GET("/average-rating/:id",Store.GetAverageRatingByStoreID)
		//ระบบ store payment
		router.GET("/PaymentStore/:id", Store.GetPaymentStoreByid)
		router.GET("/PaymentMethod", Store.ListPaymentMethodStore)
		router.GET("/Payment/:id", Store.GetPaymentStoreWithFKByID)
		router.GET("/PaymentInfo/:id", Store.GetPaymentStoreByPayID)
		router.POST("/CreatePayment",Store.CreatePayment)
		router.PUT("/PaymentStore/:id",Store.UpdatePaymentByid)
		router.PUT("/PaymentStatus/:id",Store.UpdatePaymentStatusByID)//ยังไม่ได้ใช้ เพราะมันแค่เปลี่ยน status
		router.GET("/Receipt/:id", Store.ListReceiptByID)
		router.POST("/Receipt",Store.CreateReceipt)
		



		//ระบบ จองรถ

		//ระบบ จองรถ payment




		//ระบบ hall
		router.GET("/hall",Hall.ListHall)
		router.GET("/hall/:id",Hall.GetHall)

		router.POST("/booking", Hall.CreateBooking)
		router.GET("/booking/:id", Hall.ListBookingByHallID) 
		router.PUT("booking/:id", Hall.UpdateBooking) //Update Booking
		router.DELETE("/booking/:id", Hall.DeleteBooking) //Delete Booking
		router.GET("/calendar/:id", Hall.GetBookingByHallID)
		router.GET("/facilities",Hall.Facilities)
		router.GET("/total/:id",Hall.GetBookingWithTotalPrice)
		//ระบบ hall payment



		//อุปกรณ์ทั้งหมด
		router.GET("/inventory", Inventory.ListInventory)
		router.GET("/inventory/:id", Inventory.GetInventoryByCategory)
		router.GET("/CategoryInventory", Inventory.ListCategoryInventory)
		//ระบบ แจ้งซ่อม

		//ระบบ เช็คอุปกรณ์ช่าง


		

		//ระบบ แม่บ้าน

		//ระบบ อุปการณ์แม่บ้าน

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