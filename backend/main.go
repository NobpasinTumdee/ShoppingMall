package main

import (
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	//"example.com/ProjectSeG13/controller"
  	"net/http"
	"example.com/ProjectSeG13/middlewares"
	"example.com/ProjectSeG13/controller/user"
	"example.com/ProjectSeG13/controller/Store"
	"example.com/ProjectSeG13/controller/CarPark"
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
	router := r.Group("")
	{
		router.Use(middlewares.Authorizes())


		//User
		router.GET("/user/:id", user.GetUser)


		//ระบบ store
		router.GET("/store/:id",Store.GetStoreByFloor)
		router.PUT("/store/:id",Store.UpdateStoreByid)
		router.POST("/backup",Store.CreateBackUpStore)
		//ระบบ store payment




		//ระบบ จองรถ	
		router.GET("/get-list-parking-card", CarPark.GetListCard)	
		//router.GET("/get-list-last-parkingtransaction", CarPark.GetListLastTransaction)	
		//router.POST("/create-parkingcard",CarPark.CreateParkingCard)
		router.POST("/create-parkingtransaction",CarPark.CreateParkingTransaction)
		router.PUT("/update-parkingcard/:id",CarPark.UpdateParkingCard)
		router.GET("/get-card-zone/:id", CarPark.GetIdCardZone)
		router.PUT("/update-parkingzone/:id",CarPark.UpdateParkingZone)
		router.PUT("/update-parkingcard-zone/:cid/:zid",CarPark.UpdateParkingCardAndZone)
		
		//ระบบ จองรถ payment




		//ระบบ hall

		//ระบบ hall payment




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