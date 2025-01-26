package unit

import (
	"testing"

	"example.com/ProjectSeG13/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestInventoryID(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`Inventory ID is required`, func(t *testing.T) { 
		Request := entity.RequestDetail{
			InventoryID: 0,
			RequestID: 1,
			StatusRequest: true,
			Reason: "ผ่าน",
		}
	
		ok, err := govalidator.ValidateStruct(Request)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("Inventory ID is required"))
	
	})
	
}

func TestRequestID(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`Inventory ID is required`, func(t *testing.T) { 
		Request := entity.RequestDetail{
			InventoryID: 1,
			RequestID: 0,
			StatusRequest: true,
			Reason: "ผ่าน",
		}
	
		ok, err := govalidator.ValidateStruct(Request)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("Request ID is required"))
	
	})
	
}

func TestReason(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`Inventory ID is required`, func(t *testing.T) { 
		Request := entity.RequestDetail{
			InventoryID: 1,
			RequestID: 1,
			StatusRequest: false,
			Reason: "",
		}
	
		ok, err := govalidator.ValidateStruct(Request)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("Reason is required"))
	
	})
	
}