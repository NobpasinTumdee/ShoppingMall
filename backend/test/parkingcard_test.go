package unit

import (
	"fmt"
	"testing"
	"time"

	"example.com/ProjectSeG13/entity"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestParkingTransaction(t *testing.T) {
    g := NewGomegaWithT(t)

    t.Run("Valid ParkingTransaction", func(t *testing.T) {
        now := time.Now()
        totalHourly := 20.022 // ประกาศตัวแปร float64 ก่อน
        transaction := entity.ParkingTransaction{
            LicensePlate:       "12AB 1234",
            ParkingCardID:      "PC123456",
            ParkingZoneDailyID: 1,
            ReservationDate:    &now,
            EntryTime:          &now,
            ExitTime:           &now,
            TotalHourly:        &totalHourly, // ใช้ pointer ของตัวแปร totalHourly
            IsReservedPass:     nil,
            Image:              "some-image-url",
            Color:              "Red",
            Make:               "Toyota",
        }
    
        ok, err := govalidator.ValidateStruct(transaction)
        fmt.Println("Validation Result:", ok, err)
        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    
    t.Run("LicensePlate is required", func(t *testing.T) {
        transaction := entity.ParkingTransaction{
            LicensePlate:       "",
            ParkingCardID:      "PC123456",
            ParkingZoneDailyID: 1,
            ReservationDate:    &time.Time{},
        }

        ok, err := govalidator.ValidateStruct(transaction)
        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("License Plate is required"))
    })

    t.Run("ParkingZoneDailyID is required", func(t *testing.T) {
        transaction := entity.ParkingTransaction{
            LicensePlate:       "12AB 1234",
            ParkingCardID:      "PC123456",
            ParkingZoneDailyID: 0,
            ReservationDate:    &time.Time{},
        }

        ok, err := govalidator.ValidateStruct(transaction)
        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("ParkingZoneDaily is required"))
    })
}

func TestVehicle(t *testing.T) {
    g := NewGomegaWithT(t)

    t.Run("Valid Vehicle", func(t *testing.T) {
        vehicle := entity.Vehicle{
            LicensePlate: "12AB 1234",
            Color:        "Red",
            Make:         "Toyota",
            Image:        "some-image-url",
        }

        ok, err := govalidator.ValidateStruct(vehicle)
        g.Expect(ok).To(BeTrue())  
        g.Expect(err).To(BeNil())  
    })

    t.Run("LicensePlate is required", func(t *testing.T) {
        vehicle := entity.Vehicle{
            LicensePlate: "",
            Color:        "Red",
            Make:         "Toyota",
            Image:        "some-image-url",
        }

        ok, err := govalidator.ValidateStruct(vehicle)
        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("License Plate is required"))
    })

    t.Run("Color is required", func(t *testing.T) {
        vehicle := entity.Vehicle{
            LicensePlate: "12AB 1234",
            Color:        "",
            Make:         "Toyota",
            Image:        "some-image-url",
        }

        ok, err := govalidator.ValidateStruct(vehicle)
        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("Color is required"))
    })

    t.Run("Make is required", func(t *testing.T) {
        vehicle := entity.Vehicle{
            LicensePlate: "12AB 1234",
            Color:        "Red",
            Make:         "",
            Image:        "some-image-url",
        }

        ok, err := govalidator.ValidateStruct(vehicle)
        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("Make is required"))
    })

    t.Run("Image is required", func(t *testing.T) {
        vehicle := entity.Vehicle{
            LicensePlate: "12AB 1234",
            Color:        "Red",
            Make:         "Toyota",
            Image:        "",
        }

        ok, err := govalidator.ValidateStruct(vehicle)
        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(ContainSubstring("Image is required"))
    })
}
