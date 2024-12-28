package unit

import (
	"time"
	"example.com/ProjectSeG13/entity"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestVehicleValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Valid Vehicle", func(t *testing.T) {
		vehicle := entity.Vehicle{
			LicensePlate: "BG1234",
			Color:        "Red",
			Make:         "Toyota",
			Image:        "image.jpg",
			UserID:       1,
		}

		ok, err := govalidator.ValidateStruct(vehicle)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run("Invalid Vehicle - Missing UserID", func(t *testing.T) {
		vehicle := entity.Vehicle{
			LicensePlate: "BG1234",
			Color:        "Red",
			Make:         "Toyota",
			Image:        "image.jpg",
		}

		ok, err := govalidator.ValidateStruct(vehicle)
		g.Expect(ok).To(BeFalse())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("User ID is required"))
	})
}

func TestParkingCardValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Valid ParkingCard", func(t *testing.T) {
		parkingCard := entity.ParkingCard{
			ID:            "PC1234",
			ExpiryDate:    time.Now().Add(24 * time.Hour),
			IsPermanent:   true,
			TypeParkID:    1,
			StoreID:       1,
			UserID:        1,
			StatusCardID:  1,
			ParkingFeePolicyID: 1,
		}

		ok, err := govalidator.ValidateStruct(parkingCard)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run("Invalid ParkingCard - Missing ID", func(t *testing.T) {
		parkingCard := entity.ParkingCard{
			ExpiryDate:  time.Now().Add(24 * time.Hour),
			IsPermanent: true,
		}

		ok, err := govalidator.ValidateStruct(parkingCard)
		g.Expect(ok).To(BeFalse())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ParkingCard ID is required"))
	})
}

func TestParkingZoneValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Valid ParkingZone", func(t *testing.T) {
		parkingZone := entity.ParkingZone{
			Name:              "Zone A",
			TypeParkID:        1,
		}

		ok, err := govalidator.ValidateStruct(parkingZone)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run("Invalid ParkingZone - Missing Name", func(t *testing.T) {
		parkingZone := entity.ParkingZone{
			TypeParkID:        1,
		}

		ok, err := govalidator.ValidateStruct(parkingZone)
		g.Expect(ok).To(BeFalse())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Name is required"))
	})
}
func TestParkingTransactionValidation(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Valid ParkingTransaction", func(t *testing.T) {
		entryTime := time.Now()
		exitTime := time.Now().Add(2 * time.Hour)
		parkingTransaction := entity.ParkingTransaction{
			//ReservationDate: "2024-12-28",
			EntryTime:       &entryTime,
			ExitTime:        &exitTime,
			LicensePlate:    "BG1234",
			Color:           "Red",
			Make:            "Toyota",
			ParkingCardID:   "PC1234",
			ParkingZoneID:   1,
			UserID:          1,
		}

		ok, err := govalidator.ValidateStruct(parkingTransaction)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run("Invalid ParkingTransaction - Missing ParkingCardID", func(t *testing.T) {
		parkingTransaction := entity.ParkingTransaction{
			//ReservationDate: "2024-12-28",
			LicensePlate:    "BG1234",
			Color:           "Red",
			Make:            "Toyota",
			ParkingZoneID:   1,
			UserID:          1,
		}

		ok, err := govalidator.ValidateStruct(parkingTransaction)
		g.Expect(ok).To(BeFalse())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("ParkingCardID is required"))
	})
}