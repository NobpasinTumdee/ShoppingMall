package unit
import(
	"example.com/ProjectSeG13/entity"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUser(t *testing.T) {
	g := NewGomegaWithT(t)
	t.Run(`TEST User Name User is Not null`, func(t *testing.T) {
		User := entity.User{
			UserName: "",
			Password: "123",
			Email: "porporpor547@gmail.com",
		}

		ok, err := govalidator.ValidateStruct(User)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("User Name is required"))

	})
	t.Run(`TEST Password User is Not null`, func(t *testing.T) {
		User := entity.User{
			UserName: "Hu Tao",
			Password: "",
			Email: "porporpor547@gmail.com",
		}

		ok, err := govalidator.ValidateStruct(User)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Password is required"))

	})
	t.Run(`TEST Email User is Not null`, func(t *testing.T) {
		User := entity.User{
			UserName: "Hu Tao",
			Password: "123",
			Email: "",
		}

		ok, err := govalidator.ValidateStruct(User)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Email is required"))

	})
	t.Run(`TEST invalid Email User is Not null`, func(t *testing.T) {
		User := entity.User{
			UserName: "Hu Tao",
			Password: "123",
			Email: "invalid-email@",
		}

		ok, err := govalidator.ValidateStruct(User)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Email is invalid"))

	})
}