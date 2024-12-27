package unit

import (
	"example.com/ProjectSeG13/entity"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestServiceRequest(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบว่า Location ต้องไม่เป็นค่าว่าง
	t.Run(`TEST Location is not null`, func(t *testing.T) {
        serviceRequest := entity.ServiceRequest{
            Location:      "", // ฟิลด์ที่ทดสอบ
            Describtion:   "Valid description",
            RequestDate:   time.Now(),
            StatusService: "Pending",
            StoreID:       1,
            UserID:        1,
        }

        ok, err := govalidator.ValidateStruct(serviceRequest)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("Location is required"))
	})

	// ตรวจสอบว่า Describtion ต้องไม่เป็นค่าว่าง
	t.Run(`TEST Describtion is not null`, func(t *testing.T) {
        serviceRequest := entity.ServiceRequest{
            Location:      "Zone A",
            Describtion:   "", // ฟิลด์ที่ทดสอบ
            RequestDate:   time.Now(),
            StatusService: "Pending",
            StoreID:       1,
            UserID:        1,
        }

        ok, err := govalidator.ValidateStruct(serviceRequest)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("Describtion is required"))
	})

	// ตรวจสอบว่า StoreID ต้องไม่เป็น 0
	t.Run("TEST StoreID is not null", func(t *testing.T) {
		serviceRequest := entity.ServiceRequest{
			Location:     "Bangkok",
			Describtion:  "Valid description",
			RequestDate:  time.Now(),
			StatusService: "Pending",
			StoreID:      0,  // ค่า StoreID เป็น 0
			UserID:       1,
		}

		ok, err := govalidator.ValidateStruct(serviceRequest)

		g.Expect(ok).NotTo(BeTrue())            // คาดหวังว่าการ Validate ต้องไม่ผ่าน
		g.Expect(err).NotTo(BeNil())            // คาดหวังว่าจะมี Error เกิดขึ้น
		g.Expect(err.Error()).To(ContainSubstring("StoreID is required"))
	})

	// ตรวจสอบว่า UserID ต้องไม่เป็น 0
	t.Run("TEST UserID is not null", func(t *testing.T) {
		serviceRequest := entity.ServiceRequest{
			Location:     "Bangkok",
			Describtion:  "Test Description",
			RequestDate:  time.Now(),
			StatusService: "Pending",
			StoreID:      1,
			UserID:       0,  // ค่า UserID เป็น 0
		}

		ok, err := govalidator.ValidateStruct(serviceRequest)

		g.Expect(ok).NotTo(BeTrue())            // คาดหวังว่าการ Validate ต้องไม่ผ่าน
		g.Expect(err).NotTo(BeNil())            // คาดหวังว่าจะมี Error เกิดขึ้น
		g.Expect(err.Error()).To(ContainSubstring("UserID is required"))
	})

	// ตรวจสอบว่า RequestDate ต้องไม่เป็นค่าดีฟอลต์ (time.Time{})
	t.Run("TEST RequestDate is not zero value", func(t *testing.T) {
		serviceRequest := entity.ServiceRequest{
			Location:     "Bangkok",
			Describtion:  "Test Description",
			RequestDate:  time.Time{}, // ใช้ค่า default ของ time.Time
			StatusService: "Pending",
			StoreID:      1,
			UserID:       1,
		}

		ok, err := govalidator.ValidateStruct(serviceRequest)

		g.Expect(ok).NotTo(BeTrue())            // คาดหวังว่าการ Validate ต้องไม่ผ่าน
		g.Expect(err).NotTo(BeNil())            // คาดหวังว่าจะมี Error เกิดขึ้น
		g.Expect(err.Error()).To(ContainSubstring("RequestDate is required"))
	})
}
