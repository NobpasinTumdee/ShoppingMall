package unit

import (
	"example.com/ProjectSeG13/entity"
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestBookingHall(t *testing.T) {
	g := NewGomegaWithT(t)

	// ตรวจสอบว่า UserID ต้องไม่เป็น 0
	t.Run("TEST UserID must not be zero", func(t *testing.T) {
		bookingHall := entity.BookingHall{
			UserID:        0, // ค่า UserID เป็น 0
			HallID:        1,
			FacilitiesID:  1,
			StartDateTime: time.Now(),
			EndDateTime:   time.Now().Add(2 * time.Hour),
			CustomerName:  "John Doe",
			CustomerEmail: "johndoe@example.com",
		}

		ok, err := govalidator.ValidateStruct(bookingHall)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("User ID is required"))
	})

	// ตรวจสอบว่า CustomerName ต้องไม่เป็นค่าว่าง
	t.Run("TEST CustomerName must not be empty", func(t *testing.T) {
		bookingHall := entity.BookingHall{
			UserID:        1,
			HallID:        1,
			FacilitiesID:  1,
			StartDateTime: time.Now(),
			EndDateTime:   time.Now().Add(2 * time.Hour),
			CustomerName:  "", // ฟิลด์ที่ทดสอบ
			CustomerEmail: "johndoe@example.com",
		}

		ok, err := govalidator.ValidateStruct(bookingHall)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("CustomerName is required"))
	})

	// ตรวจสอบว่า CustomerEmail ต้องไม่เป็นค่าว่าง
	t.Run("TEST CustomerEmail must not be empty", func(t *testing.T) {
		bookingHall := entity.BookingHall{
			UserID:        1,
			HallID:        1,
			FacilitiesID:  1,
			StartDateTime: time.Now(),
			EndDateTime:   time.Now().Add(2 * time.Hour),
			CustomerName:  "John Doe",
			CustomerEmail: "", // ฟิลด์ที่ทดสอบ
		}

		ok, err := govalidator.ValidateStruct(bookingHall)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("CustomerEmail is required"))
	})

	// ตรวจสอบว่า StartDateTime และ EndDateTime ต้องไม่เป็นค่าดีฟอลต์
	t.Run("TEST StartDateTime and EndDateTime must not be default values", func(t *testing.T) {
		bookingHall := entity.BookingHall{
			UserID:        1,
			HallID:        1,
			FacilitiesID:  1,
			StartDateTime: time.Time{}, // ค่า default
			EndDateTime:   time.Time{}, // ค่า default
			CustomerName:  "John Doe",
			CustomerEmail: "johndoe@example.com",
		}

		ok, err := govalidator.ValidateStruct(bookingHall)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("StartDateTime is required"))
	})

}
