package unit

import (
	"fmt"
	"testing"
	"time"

	"example.com/ProjectSeG13/entity"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestParkingCard(t *testing.T) {
	g := NewGomegaWithT(t)

	now := time.Now()

	t.Run("Valid ParkingCard", func(t *testing.T) {
		card := entity.ParkingCard{
			ID:                 "0001",
			ExpiryDate:         &now,
			IsPermanent:        false,
			TypeCardID:         1,
			UserID:             1,
			StatusCardID:       1,
			ParkingFeePolicyID: 1,
		}

		ok, err := govalidator.ValidateStruct(card)
		fmt.Println("Validation Result:", ok, err)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run("ID is not length 4", func(t *testing.T) {
		card := entity.ParkingCard{
			ID:                 "00",
			ExpiryDate:         &now,
			IsPermanent:        false,
			TypeCardID:         1,
			UserID:             1,
			StatusCardID:       1,
			ParkingFeePolicyID: 1,
		}

		ok, err := govalidator.ValidateStruct(card)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ParkingCardID is not match"))
	})

	t.Run("ID is required", func(t *testing.T) {
		card := entity.ParkingCard{
			ID:                 "",
			IsPermanent:        false,
			TypeCardID:         1,
			UserID:             1,
			StatusCardID:       1,
			ParkingFeePolicyID: 1,
		}

		ok, err := govalidator.ValidateStruct(card)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ParkingCard ID is required"))
	})

	t.Run("TypeCardID is required", func(t *testing.T) {
		card := entity.ParkingCard{
			ID:                 "0001",
			IsPermanent:        false,
			TypeCardID:         0,
			UserID:             1,
			StatusCardID:       1,
			ParkingFeePolicyID: 1,
		}

		ok, err := govalidator.ValidateStruct(card)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("TypeCardID is required"))
	})

	t.Run("StatusCardID is required", func(t *testing.T) {
		card := entity.ParkingCard{
			ID:                 "0001",
			IsPermanent:        false,
			TypeCardID:         1,
			UserID:             1,
			StatusCardID:       0, // ไม่มี StatusCardID
			ParkingFeePolicyID: 1,
		}

		ok, err := govalidator.ValidateStruct(card)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("StatusCardID is required"))
	})

	t.Run("ParkingFeePolicyID is required", func(t *testing.T) {
		card := entity.ParkingCard{
			ID:                 "0001",
			IsPermanent:        false,
			TypeCardID:         1,
			UserID:             1,
			StatusCardID:       1,
			ParkingFeePolicyID: 0, // ไม่มี ParkingFeePolicyID
		}

		ok, err := govalidator.ValidateStruct(card)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ParkingFeePolicyID is required"))
	})
}

func TestParkingUsageCard(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Valid ParkingUsageCard", func(t *testing.T) {
		now := time.Now()
		totalHourly := 20.022
		transaction := entity.ParkingUsageCard{
			LicensePlate:       "12AB 1234",
			ParkingCardID:      "0001",
			ParkingZoneDailyID: 1,
			ReservationDate:    &now,
			EntryTime:          &now,
			ExitTime:           &now,
			TotalHourly:        &totalHourly,
			IsReservedPass:     nil,
			Image:              "some-image-url",
			Color:              "Red",
			Make:               "Toyota",
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)
		fmt.Println("Validation Result:", ok, err)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run("LicensePlate is required", func(t *testing.T) {
		transaction := entity.ParkingUsageCard{
			LicensePlate:       "", // ไม่มี LicensePlate
			ParkingCardID:      "PC123456",
			ParkingZoneDailyID: 1,
			Image:              "some-image-url",
			Color:              "Red",
			Make:               "Toyota",
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("License Plate is required"))
	})

	t.Run("Image is required", func(t *testing.T) {
		transaction := entity.ParkingUsageCard{
			LicensePlate:       "12AB 1234",
			ParkingCardID:      "PC123456",
			ParkingZoneDailyID: 1,
			Image:              "", // ไม่มี Image
			Color:              "Red",
			Make:               "Toyota",
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Image is required"))
	})

	t.Run("Color is required", func(t *testing.T) {
		transaction := entity.ParkingUsageCard{
			LicensePlate:       "12AB 1234",
			ParkingCardID:      "PC123456",
			ParkingZoneDailyID: 1,
			Image:              "some-image-url",
			Color:              "", // ไม่มี Color
			Make:               "Toyota",
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Color is required"))
	})

	t.Run("Make is required", func(t *testing.T) {
		transaction := entity.ParkingUsageCard{
			LicensePlate:       "12AB 1234",
			ParkingCardID:      "PC123456",
			ParkingZoneDailyID: 1,
			Image:              "some-image-url",
			Color:              "Red",
			Make:               "", // ไม่มี Make
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(transaction)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Make is required"))
	})

	t.Run("ParkingZoneDailyID is required", func(t *testing.T) {
		transaction := entity.ParkingUsageCard{
			LicensePlate:  "12AB 1234",
			ParkingCardID: "PC123456",
			Image:         "some-image-url",
			Color:         "Red",
			Make:          "Toyota",
			UserID:        1,
		}

		ok, err := govalidator.ValidateStruct(transaction)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ParkingZoneDaily is required"))
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
		g.Expect(err.Error()).To(Equal("License Plate is required"))
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
		g.Expect(err.Error()).To(Equal("Color is required"))
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
		g.Expect(err.Error()).To(Equal("Make is required"))
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
		g.Expect(err.Error()).To(Equal("Image is required"))
	})
}

func TestParkingPayment(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Valid ParkingPayment", func(t *testing.T) {
		now := time.Now()
		payment := entity.ParkingPayment{
			ReceiptNo:          "EXT12345",
			PaymentDate:        now,
			Amount:             100,
			DiscountAmount:     10,
			NetAmount:          90,
			CashReceived:       100,
			Change:             10,
			IsCash:             true,
			ParkingUsageCardID: 1,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(payment)
		fmt.Println("Validation Error:", err)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run("ReceiptNo is required", func(t *testing.T) {
		payment := entity.ParkingPayment{
			ReceiptNo:          "",
			PaymentDate:        time.Now(),
			Amount:             100,
			DiscountAmount:     10,
			NetAmount:          90,
			CashReceived:       100,
			Change:             10,
			IsCash:             true,
			ParkingUsageCardID: 1,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ReceiptNo is required"))
	})

	t.Run("ReceiptNo is not match EXTxxxxx", func(t *testing.T) {
		payment := entity.ParkingPayment{
			ReceiptNo:          "12345",
			PaymentDate:        time.Now(),
			Amount:             100,
			DiscountAmount:     10,
			NetAmount:          90,
			CashReceived:       100,
			Change:             10,
			IsCash:             true,
			ParkingUsageCardID: 1,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ReceiptNo is not match"))
	})

	t.Run("PaymentDate is required", func(t *testing.T) {
		payment := entity.ParkingPayment{
			ReceiptNo:          "EXT12345",
			Amount:             100,
			DiscountAmount:     10,
			NetAmount:          90,
			CashReceived:       100,
			Change:             10,
			IsCash:             true,
			ParkingUsageCardID: 1,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("PaymentDate is required"))
	})

	t.Run("ParkingUsageCardID is required", func(t *testing.T) {
		payment := entity.ParkingPayment{
			ReceiptNo:          "EXT12345",
			PaymentDate:        time.Now(),
			Amount:             100,
			DiscountAmount:     10,
			NetAmount:          90,
			CashReceived:       100,
			Change:             10,
			IsCash:             true,
			ParkingUsageCardID: 0,
			UserID:             1,
		}

		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("ParkingUsageCardID is required"))
	})

	t.Run("UserID is required", func(t *testing.T) {
		payment := entity.ParkingPayment{
			ReceiptNo:          "EXT12345",
			PaymentDate:        time.Now(),
			Amount:             100,
			DiscountAmount:     10,
			NetAmount:          90,
			CashReceived:       100,
			Change:             10,
			IsCash:             true,
			ParkingUsageCardID: 1,
			UserID:             0,
		}

		ok, err := govalidator.ValidateStruct(payment)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("UserID is required"))
	})
}
