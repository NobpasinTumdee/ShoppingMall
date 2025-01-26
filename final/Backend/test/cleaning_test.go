package unit

import (
	"testing"
	"time"

	"example.com/ProjectSeG13/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestActualStartTime(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`ActualStartTime is required`, func(t *testing.T) { 
		cleaning := entity.CleaningRecord{
			ActualStartTime: time.Time{},
			ActualEndTime:   time.Now().AddDate(-20, 0, 0),
			Notes:           nil,
			ScheduleID:      1,
			UserID:          1,
		}
	
		ok, err := govalidator.ValidateStruct(cleaning)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("ActualStartTime is required"))
	
	})
	
}

func TestActualEndTime(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`ActualEndTime is required`, func(t *testing.T) { 
		cleaning := entity.CleaningRecord{
			ActualStartTime: time.Now().AddDate(-20, 0, 0),
			ActualEndTime:   time.Time{},
			Notes:           nil,
			ScheduleID:      1,
			UserID:          1,
		}
	
		ok, err := govalidator.ValidateStruct(cleaning)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil()) 
		g.Expect(err.Error()).To(Equal("ActualEndTime is required"))
	
	})
	
}

func TestUserID(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`User ID is required`, func(t *testing.T) { 
		cleaning := entity.CleaningRecord{
			ActualStartTime: time.Now().AddDate(-20, 0, 0),
			ActualEndTime:   time.Now().AddDate(-20, 0, 0),
			Notes:           nil,
			ScheduleID:      1,
			UserID:          0, 
		}
	
		ok, err := govalidator.ValidateStruct(cleaning)
		g.Expect(ok).NotTo(BeTrue()) 
		g.Expect(err).NotTo(BeNil()) 
	    g.Expect(err.Error()).To(Equal("User ID is required"))
	})
}

func TestScheduleID(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`Schedule ID is required`, func(t *testing.T) {
		cleaning := entity.CleaningRecord{
			ActualStartTime: time.Now().AddDate(-20, 0, 0),
			ActualEndTime:   time.Now().AddDate(-20, 0, 0),
			Notes:           nil,
			ScheduleID:      0,
			UserID:          1, 
		}

		ok, err := govalidator.ValidateStruct(cleaning)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())

		g.Expect(err.Error()).To(Equal("Schedule ID is required"))
	})

}

func TestCleaning_Valid(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`Valid Cleaning.`, func(t *testing.T) {
		cleaning := entity.CleaningRecord{
			ActualStartTime: time.Now().AddDate(-20, 0, 0),
			ActualEndTime:   time.Now().AddDate(-20, 0, 0),
			Notes:           nil,
			ScheduleID:      1,
			UserID:          1, 
		}

		ok, err := govalidator.ValidateStruct(cleaning)
		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

}

func TestNotes(t *testing.T){

	g := NewGomegaWithT(t)

	t.Run(`Notes exceeds maximum length`, func(t *testing.T) {

		longNote := string(make([]byte, 501))
		cleaning := entity.CleaningRecord{
			ActualStartTime: time.Now().AddDate(-20, 0, 0),
			ActualEndTime:   time.Now().AddDate(-20, 0, 0),
			Notes:           &longNote,
			ScheduleID:      1,
			UserID:          1,
		}
	
		ok, err := govalidator.ValidateStruct(cleaning)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("Notes must be between 0 and 500 characters"))
	})

}