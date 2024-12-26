package unit
import(
	"example.com/ProjectSeG13/entity"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)



func TestStore(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`TEST Name Store is Not null`, func(t *testing.T) {
        store := entity.Store{
            NameStore:      "",
            PicStore:       "abcdefg",
            DescribtionStore: "test",
            UserID:         1,
			MembershipID: 1,
			ProductTypeID: 1,
        }

        ok, err := govalidator.ValidateStruct(store)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("NameStore is required"))
    })
	t.Run(`TEST Photo Store is Not null`, func(t *testing.T) {
        store := entity.Store{
            NameStore:      "Apple Store",
            PicStore:       "",
            DescribtionStore: "test",
            UserID:         1,
			MembershipID: 1,
			ProductTypeID: 1,
        }

        ok, err := govalidator.ValidateStruct(store)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Photo Store is required"))
    })
	t.Run(`TEST DescribtionStore Store is Not null`, func(t *testing.T) {
        store := entity.Store{
            NameStore:      "Apple Store",
            PicStore:       "zxcvbnm",
            DescribtionStore: "",
            UserID:         1,
			MembershipID: 1,
			ProductTypeID: 1,
        }

        ok, err := govalidator.ValidateStruct(store)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("DescribtionStore is required"))
    })
	t.Run(`TEST UserID Store is Not null`, func(t *testing.T) {
        store := entity.Store{
            NameStore:      "Apple Store",
            PicStore:       "zxcvbnm",
            DescribtionStore: "test",
            UserID:         0,
			MembershipID: 1,
			ProductTypeID: 1,
        }

        ok, err := govalidator.ValidateStruct(store)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("User ID is required"))
    })
	t.Run(`TEST MembershipID Store is Not null`, func(t *testing.T) {
        store := entity.Store{
            NameStore:      "Apple Store",
            PicStore:       "zxcvbnm",
            DescribtionStore: "test",
            UserID:         1,
			MembershipID: 0,
			ProductTypeID: 1,
        }

        ok, err := govalidator.ValidateStruct(store)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("MembershipID is required"))
    })
	t.Run(`TEST ProductTypeID Store is Not null`, func(t *testing.T) {
        store := entity.Store{
            NameStore:      "Apple Store",
            PicStore:       "zxcvbnm",
            DescribtionStore: "test",
            UserID:         1,
			MembershipID: 1,
			ProductTypeID: 0,
        }

        ok, err := govalidator.ValidateStruct(store)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("ProductTypeID is required"))
    })
}
