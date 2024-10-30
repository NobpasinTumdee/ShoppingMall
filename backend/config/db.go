package config

import (
	//"example.com/ProjectSeG13/entity"
	"fmt"
	//"time"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("MusicData.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		//&entity.User{},
	)
	
	//User
	//hashedPassword, _ := HashPassword("123456")
	// User := []entity.User{
	// 	{UserName: "NobpasinTumdee" ,Password: hashedPassword ,Email: "B6506407@g.sut.ac.th" ,FirstName: "Nobpasin" , Lastname: "Tumdee" , ArtistName: "PorGz" , Age: "21" , UserPic: "https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-6/297412273_1103712770544237_4663638775877889323_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE2U1GBz9RwMkB8LO3gyGOyD0lIw0Dk2O8PSUjDQOTY74Wmvi770I9kFs5DstlhbH4Vm26pI0JryreKrawczeu_&_nc_ohc=E7MH_4RERmIQ7kNvgGvMDrp&_nc_zt=23&_nc_ht=scontent.fnak3-1.fna&_nc_gid=AvOKn40H_Q-pf3cQzuNR5yn&oh=00_AYBGCLpie-KMyHekzarDAtb7Wb8_fZwJ3jvuw-gFHlvYBQ&oe=67140AEF",Status: "User"},
	// }
	// for _, pkg := range User {
	// 	db.FirstOrCreate(&pkg,entity.User{UserName: pkg.UserName})
	// }

	
	// //Music
	// Music := []entity.Music{
	// 	{MusicName: "Chimera",Length:  "4.50",PicMusic:  "https://musicart.xboxlive.com/7/e08a5200-0000-0000-0000-000000000002/504/image.jpg"   ,DetailsMusic:  "Lolem asd iov lsid ksf eeiv feina iosad ;olofeh Lofeox msoem kkmek." , UserID: 0 },
	// 	{MusicName: "Smell of the Game",Length:  "4.50",PicMusic:  "https://musicart.xboxlive.com/7/e08a5200-0000-0000-0000-000000000002/504/image.jpg"   ,DetailsMusic:  "Lolem asd iov lsid ksf eeiv feina iosad ;olofeh Lofeox msoem kkmek." , UserID: 0 },
	// }
	// for _, pkg := range Music {
	// 	db.FirstOrCreate(&pkg,entity.Music{MusicName: pkg.MusicName})
	// }


}
