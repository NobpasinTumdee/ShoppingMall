package unit

import (
	"testing"
	"time"

	"example.com/ProjectSeG13/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestNameItem(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`NameItem is required`, func(t *testing.T) { 
		Inventory := entity.InventoryRequest{
			NameItem: "",
			DateRequest: time.Now(),
			QuantityRequest: 3,
			UserID: 1,
		}
	
		ok, err := govalidator.ValidateStruct(Inventory)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("NameItem is required"))
	
	})
	
}

func TestDateRequest(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`NameItem is required`, func(t *testing.T) { 
		Inventory := entity.InventoryRequest{
			NameItem: "ถังน้ำ",
			DateRequest: time.Time{},
			QuantityRequest: 3,
			UserID: 1,
		}
	
		ok, err := govalidator.ValidateStruct(Inventory)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("DateRequest is required"))
	
	})
	
}

func TestQuantityRequest(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`NameItem is required`, func(t *testing.T) { 
		Inventory := entity.InventoryRequest{
			NameItem: "ถังน้ำ",
			DateRequest: time.Now(),
			QuantityRequest: 0,
			UserID: 1,
		}
	
		ok, err := govalidator.ValidateStruct(Inventory)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("QuantityRequest is required"))
	
	})
	
}

func TestUserIDInventoryRequest(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`NameItem is required`, func(t *testing.T) { 
		Inventory := entity.InventoryRequest{
			NameItem: "ถังน้ำ",
			DateRequest: time.Now(),
			QuantityRequest: 3,
			UserID: 0,
		}
	
		ok, err := govalidator.ValidateStruct(Inventory)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("User ID is required"))
	
	})
	
}