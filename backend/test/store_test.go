package unit
import(
	"example.com/ProjectSeG13/entity"
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)


// Sprint1 ====================================================================
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
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
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
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
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
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
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
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
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
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
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
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
        }

        ok, err := govalidator.ValidateStruct(store)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("ProductTypeID is required"))
    })
}
// Sprint2 ====================================================================
func TestPayment(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`TEST Status is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            StatusPaymentStore: "",
            PayStoreName: "TEST",
            PayStorePackage: "week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            Store: entity.Store{
                PicStore: "Pic",
                NameStore: "TEST",
                DescribtionStore: "TEST",
                MembershipID: 1,
                UserID: 1,
                ProductTypeID: 1,
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
        }

        ok, err := govalidator.ValidateStruct(payment)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Status is required"))
    })

    t.Run(`TEST StoreName is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            StatusPaymentStore: "paid",
            PayStoreName: "",
            PayStorePackage: "week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            Store: entity.Store{
                PicStore: "Pic",
                NameStore: "TEST",
                DescribtionStore: "TEST",
                MembershipID: 1,
                UserID: 1,
                ProductTypeID: 1,
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
        }

        ok, err := govalidator.ValidateStruct(payment)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("StoreName is required"))
    })

    t.Run(`TEST StorePackage is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            StatusPaymentStore: "paid",
            PayStoreName: "TEST",
            PayStorePackage: "",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            Store: entity.Store{
                PicStore: "Pic",
                NameStore: "TEST",
                DescribtionStore: "TEST",
                MembershipID: 1,
                UserID: 1,
                ProductTypeID: 1,
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
        }

        ok, err := govalidator.ValidateStruct(payment)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("StorePackage is required"))
    })

    t.Run(`TEST Pwa is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            StatusPaymentStore: "paid",
            PayStoreName: "TEST",
            PayStorePackage: "Week",
            PayStorePwa: 0,
            PayStorePea: 1,
            PayStoreRental: 1,
            Store: entity.Store{
                PicStore: "Pic",
                NameStore: "TEST",
                DescribtionStore: "TEST",
                MembershipID: 1,
                UserID: 1,
                ProductTypeID: 1,
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
        }

        ok, err := govalidator.ValidateStruct(payment)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Pwa is required"))
    })

    t.Run(`TEST Pea is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            StatusPaymentStore: "paid",
            PayStoreName: "TEST",
            PayStorePackage: "Week",
            PayStorePwa: 1,
            PayStorePea: 0,
            PayStoreRental: 1,
            Store: entity.Store{
                PicStore: "Pic",
                NameStore: "TEST",
                DescribtionStore: "TEST",
                MembershipID: 1,
                UserID: 1,
                ProductTypeID: 1,
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
        }

        ok, err := govalidator.ValidateStruct(payment)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Pea is required"))
    })

    t.Run(`TEST Rental is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            StatusPaymentStore: "paid",
            PayStoreName: "TEST",
            PayStorePackage: "Week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 0,
            Store: entity.Store{
                PicStore: "Pic",
                NameStore: "TEST",
                DescribtionStore: "TEST",
                MembershipID: 1,
                UserID: 1,
                ProductTypeID: 1,
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            User: entity.User{
                UserName: "test",
                Password: "123",
                Email: "porporpor547@gmail.com",
            },
        }

        ok, err := govalidator.ValidateStruct(payment)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Rental is required"))
    })
}
//bill
func TestReceipt(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`TEST DescribtionBill is Not null`, func(t *testing.T) {
        Receipt := entity.Receipt{
            DescribtionBill: "",
            PaymentStoreID: 1,
            UserTaxID: 1,
            PaymentStore: entity.PaymentStore{
                StatusPaymentStore: "paid",
                PayStoreName: "TEST",
                PayStorePackage: "Week",
                PayStorePwa: 1,
                PayStorePea: 1,
                PayStoreRental: 1,
                Store: entity.Store{
                    PicStore: "Pic",
                    NameStore: "TEST",
                    DescribtionStore: "TEST",
                    MembershipID: 1,
                    UserID: 1,
                    ProductTypeID: 1,
                    User: entity.User{
                        UserName: "test",
                        Password: "123",
                        Email: "porporpor547@gmail.com",
                    },
                },
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            TaxUser: entity.TaxUser{
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
        }

        ok, err := govalidator.ValidateStruct(Receipt)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("DescribtionBill is required"))
    })

    t.Run(`TEST PaymentStoreID is Not null`, func(t *testing.T) {
        Receipt := entity.Receipt{
            DescribtionBill: "TEST",
            PaymentStoreID: 0,
            UserTaxID: 1,
            PaymentStore: entity.PaymentStore{
                StatusPaymentStore: "paid",
                PayStoreName: "TEST",
                PayStorePackage: "Week",
                PayStorePwa: 1,
                PayStorePea: 1,
                PayStoreRental: 1,
                Store: entity.Store{
                    PicStore: "Pic",
                    NameStore: "TEST",
                    DescribtionStore: "TEST",
                    MembershipID: 1,
                    UserID: 1,
                    ProductTypeID: 1,
                    User: entity.User{
                        UserName: "test",
                        Password: "123",
                        Email: "porporpor547@gmail.com",
                    },
                },
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            TaxUser: entity.TaxUser{
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
        }

        ok, err := govalidator.ValidateStruct(Receipt)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("PaymentStoreID is required"))
    })

    t.Run(`TEST PaymentStoreID is Not null`, func(t *testing.T) {
        Receipt := entity.Receipt{
            DescribtionBill: "TEST",
            PaymentStoreID: 1,
            UserTaxID: 0,
            PaymentStore: entity.PaymentStore{
                StatusPaymentStore: "paid",
                PayStoreName: "TEST",
                PayStorePackage: "Week",
                PayStorePwa: 1,
                PayStorePea: 1,
                PayStoreRental: 1,
                Store: entity.Store{
                    PicStore: "Pic",
                    NameStore: "TEST",
                    DescribtionStore: "TEST",
                    MembershipID: 1,
                    UserID: 1,
                    ProductTypeID: 1,
                    User: entity.User{
                        UserName: "test",
                        Password: "123",
                        Email: "porporpor547@gmail.com",
                    },
                },
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
            TaxUser: entity.TaxUser{
                User: entity.User{
                    UserName: "test",
                    Password: "123",
                    Email: "porporpor547@gmail.com",
                },
            },
        }

        ok, err := govalidator.ValidateStruct(Receipt)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("UserTaxID is required"))
    })
}