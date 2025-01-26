package unit

import (
	"example.com/ProjectSeG13/entity"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)
//sprint 1
func TestServiceRequest(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบว่า Location ต้องไม่เป็นค่าว่าง
	t.Run(`TEST Location is not null`, func(t *testing.T) {
        serviceRequest := entity.ServiceRequest{
            Location:      "", // ฟิลด์ที่ทดสอบ
            Description:   "Valid description",
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

	// ตรวจสอบว่า Description ต้องไม่เป็นค่าว่าง
	t.Run(`TEST Description is not null`, func(t *testing.T) {
        serviceRequest := entity.ServiceRequest{
            Location:      "Zone A",
            Description:   "", // ฟิลด์ที่ทดสอบ
            RequestDate:   time.Now(),
            StatusService: "Pending",
            StoreID:       1,
            UserID:        1,
        }

        ok, err := govalidator.ValidateStruct(serviceRequest)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("Description is required"))
	})

	// ตรวจสอบว่า StoreID ต้องไม่เป็น 0
	t.Run("TEST StoreID is not null", func(t *testing.T) {
		serviceRequest := entity.ServiceRequest{
			Location:     "Bangkok",
			Description:  "Valid description",
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
			Description:  "Test Description",
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
			Description:  "Test Description",
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

//sprint 2
func TestEquipmentRequest(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบว่า Quantity ต้องมากกว่า 0
	t.Run("TEST Quantity must be greater than 0", func(t *testing.T) {
		equipmentRequest := entity.EquipmentRequest{
			Quantity:        0, // ค่า Quantity เป็น 0
			DateEquipment:   time.Now(),
			ServiceRequestID: 1,
			InventoryID:      1,
		}

		ok, err := govalidator.ValidateStruct(equipmentRequest)

		g.Expect(ok).NotTo(BeTrue())            // คาดหวังว่าการ Validate ต้องไม่ผ่าน
		g.Expect(err).NotTo(BeNil())            // คาดหวังว่าจะมี Error เกิดขึ้น
		g.Expect(err.Error()).To(Equal("Quantity is required"))
	})

	// ตรวจสอบว่า DateEquipment ต้องไม่เป็นค่าดีฟอลต์ (time.Time{})
	t.Run("TEST DateEquipment is not zero value", func(t *testing.T) {
		equipmentRequest := entity.EquipmentRequest{
			Quantity:        10,
			DateEquipment:   time.Time{}, // ค่า default ของ time.Time
			ServiceRequestID: 1,
			InventoryID:      1,
		}

		ok, err := govalidator.ValidateStruct(equipmentRequest)

		g.Expect(ok).NotTo(BeTrue())            // คาดหวังว่าการ Validate ต้องไม่ผ่าน
		g.Expect(err).NotTo(BeNil())            // คาดหวังว่าจะมี Error เกิดขึ้น
		g.Expect(err.Error()).To(Equal("DateEquipment is required"))
	})

	// ตรวจสอบว่า ServiceRequestID ต้องไม่เป็น 0
	t.Run("TEST ServiceRequestID must not be 0", func(t *testing.T) {
		equipmentRequest := entity.EquipmentRequest{
			Quantity:        10,
			DateEquipment:   time.Now(),
			ServiceRequestID: 0, // ค่า ServiceRequestID เป็น 0
			InventoryID:      1,
		}

		ok, err := govalidator.ValidateStruct(equipmentRequest)

		g.Expect(ok).NotTo(BeTrue())            // คาดหวังว่าการ Validate ต้องไม่ผ่าน
		g.Expect(err).NotTo(BeNil())            // คาดหวังว่าจะมี Error เกิดขึ้น
		g.Expect(err.Error()).To(Equal("ServiceRequestID is required"))
	})

	// ตรวจสอบว่า InventoryID ต้องไม่เป็น 0
	t.Run("TEST InventoryID must not be 0", func(t *testing.T) {
		equipmentRequest := entity.EquipmentRequest{
			Quantity:        10,
			DateEquipment:   time.Now(),
			ServiceRequestID: 1,
			InventoryID:      0, // ค่า InventoryID เป็น 0
		}

		ok, err := govalidator.ValidateStruct(equipmentRequest)

		g.Expect(ok).NotTo(BeTrue())            // คาดหวังว่าการ Validate ต้องไม่ผ่าน
		g.Expect(err).NotTo(BeNil())            // คาดหวังว่าจะมี Error เกิดขึ้น
		g.Expect(err.Error()).To(Equal("InventoryID is required"))
	})

	// ตรวจสอบว่า EquipmentRequest ถูกต้องเมื่อข้อมูลครบถ้วน
	t.Run("TEST EquipmentRequest is valid", func(t *testing.T) {
		equipmentRequest := entity.EquipmentRequest{
			Quantity:        10,
			DateEquipment:   time.Now(),
			ServiceRequestID: 1,
			InventoryID:      1,
		}

		ok, err := govalidator.ValidateStruct(equipmentRequest)

		g.Expect(ok).To(BeTrue())               // คาดหวังว่าการ Validate ต้องผ่าน
		g.Expect(err).To(BeNil())               // คาดหวังว่าจะไม่มี Error เกิดขึ้น
	})
}