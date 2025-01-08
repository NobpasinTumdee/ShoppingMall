package unit

import (
	"testing"
	"time"

	"example.com/ProjectSeG13/entity"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestParkingCardID(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("ParkingCard ID is required", func(t *testing.T) {
		now := time.Now()
		card := entity.ParkingCard{
			ID:                 "",
			ExpiryDate:         &now,
			IsPermanent:        false,
			TypeParkID:         1,
			UserID:             1,
			StatusCardID:       1,
			ParkingFeePolicyID: 1,
		}

		ok, err := govalidator.ValidateStruct(card)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("ID is required"))
	})
}

func TestParkingTransaction(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("LicensePlate is required", func(t *testing.T) {
		transaction := entity.ParkingTransaction{
			//ReservationDate:    time.Now(),
			LicensePlate:       "",
			ParkingCardID:      "PC123456",
			ParkingZoneDailyID: 1,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("License Plate is required"))
	})

	t.Run("ReservationDate is required", func(t *testing.T) {
		transaction := entity.ParkingTransaction{
			//ReservationDate:    time.Time{},
			LicensePlate:       "12AB 1234",
			ParkingCardID:      "PC123456",
			ParkingZoneDailyID: 1,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("Reservation Date is required"))
	})

	// ทดสอบเมื่อ ParkingCardID เป็นค่าว่าง
	t.Run("ParkingCardID is required", func(t *testing.T) {
		transaction := entity.ParkingTransaction{
			//ReservationDate:    time.Now(),
			LicensePlate:       "12AB 1234",
			ParkingCardID:      "",
			ParkingZoneDailyID: 1,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("ParkingCard is required"))
	})

	t.Run("ParkingZoneDailyID is required", func(t *testing.T) {
		transaction := entity.ParkingTransaction{
			//ReservationDate:    time.Now(),
			LicensePlate:       "12AB 1234",
			ParkingCardID:      "PC123456",
			ParkingZoneDailyID: 0,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("ParkingZoneDaily is required"))
	})

	t.Run(`image is not valid`, func(t *testing.T) {
		transaction := entity.ParkingTransaction{
			Image: "invalid",
		}

		ok, err := govalidator.ValidateStruct(transaction)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
	})
}
