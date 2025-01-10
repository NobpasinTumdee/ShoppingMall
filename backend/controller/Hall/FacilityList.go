package Hall

import (
	"net/http"

	"example.com/ProjectSeG13/entity"
	"example.com/ProjectSeG13/config"
	"github.com/gin-gonic/gin"
	
)

func Facilities(c *gin.Context) {
	var facilities []entity.Facilities

	db := config.DB()

	db.Find(&facilities)

	c.JSON(http.StatusOK, &facilities)
}