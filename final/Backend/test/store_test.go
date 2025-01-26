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
    t.Run(`TEST Positive`, func(t *testing.T) {
        store := entity.Store{
            NameStore:      "test",
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

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
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

func TestStatusStore(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`Test Positive`, func(t *testing.T) {
        Status := entity.StatusStoreAll{
            StatusName: "test",
        }

        ok, err := govalidator.ValidateStruct(Status)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`Test Status Store name Not null`, func(t *testing.T) {
        Status := entity.StatusStoreAll{
            StatusName: "",
        }

        ok, err := govalidator.ValidateStruct(Status)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Status Name is required"))
    })
}


func TestInformationStore(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`Test Positive`, func(t *testing.T) {
        Status := entity.StoreInformation{
            Picture: "test",
            Details: "test",
            StoreID: 1,
        }

        ok, err := govalidator.ValidateStruct(Status)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`Test Picture Not null`, func(t *testing.T) {
        Status := entity.StoreInformation{
            Picture: "",
            Details: "test",
            StoreID: 1,
        }

        ok, err := govalidator.ValidateStruct(Status)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Picture is required"))
    })


    t.Run(`Test Details Not null`, func(t *testing.T) {
        Status := entity.StoreInformation{
            Picture: "test",
            Details: "",
            StoreID: 1,
        }

        ok, err := govalidator.ValidateStruct(Status)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Details is required"))
    })


    t.Run(`Test StoreID Not null`, func(t *testing.T) {
        Status := entity.StoreInformation{
            Picture: "test",
            Details: "test",
            StoreID: 0,
        }

        ok, err := govalidator.ValidateStruct(Status)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("StoreID is required"))
    })
}


func TestMembership(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`Test Positive`, func(t *testing.T) {
        Membership := entity.Membership{
            PackageName: "test",
            Day: 100,
            Pwa: 100,
            Pea: 100,
            RentalFee: 100,
        }

        ok, err := govalidator.ValidateStruct(Membership)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`Test PackageName Not null`, func(t *testing.T) {
        Membership := entity.Membership{
            PackageName: "",
            Day: 100,
            Pwa: 100,
            Pea: 100,
            RentalFee: 100,
        }

        ok, err := govalidator.ValidateStruct(Membership)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("PackageName is required"))
    })
    t.Run(`Test PackageName Not null`, func(t *testing.T) {
        Membership := entity.Membership{
            PackageName: "test",
            Day: 0,
            Pwa: 100,
            Pea: 100,
            RentalFee: 100,
        }

        ok, err := govalidator.ValidateStruct(Membership)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Day is required"))
    })
    t.Run(`Test Pwa Not null`, func(t *testing.T) {
        Membership := entity.Membership{
            PackageName: "test",
            Day: 100,
            Pwa: 0,
            Pea: 100,
            RentalFee: 100,
        }

        ok, err := govalidator.ValidateStruct(Membership)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Pwa is required"))
    })
    t.Run(`Test Pea Not null`, func(t *testing.T) {
        Membership := entity.Membership{
            PackageName: "test",
            Day: 100,
            Pwa: 100,
            Pea: 0,
            RentalFee: 100,
        }

        ok, err := govalidator.ValidateStruct(Membership)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("Pea is required"))
    })
    t.Run(`Test RentalFee Not null`, func(t *testing.T) {
        Membership := entity.Membership{
            PackageName: "test",
            Day: 100,
            Pwa: 100,
            Pea: 100,
            RentalFee: 0,
        }

        ok, err := govalidator.ValidateStruct(Membership)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("RentalFee is required"))
    })
}
// Sprint2 ====================================================================
func TestPayment(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`TEST Positive`, func(t *testing.T) {
        payment := entity.PaymentStore{
            PayMethodStoreID: 1,
            PayStoreName: "TEST",
            PayStorePackage: "week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            StatusPaymentStoreID: 1,
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

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`TEST Status is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            PayMethodStoreID: 0,
            PayStoreName: "TEST",
            PayStorePackage: "week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            StatusPaymentStoreID: 1,
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
            PayMethodStoreID: 1,
            PayStoreName: "",
            PayStorePackage: "week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            StatusPaymentStoreID: 1,
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
            PayMethodStoreID: 1,
            PayStoreName: "TEST",
            PayStorePackage: "",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            StatusPaymentStoreID: 1,
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
            PayMethodStoreID: 1,
            PayStoreName: "TEST",
            PayStorePackage: "Week",
            PayStorePwa: 0,
            PayStorePea: 1,
            PayStoreRental: 1,
            StatusPaymentStoreID: 1,
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
            PayMethodStoreID: 1,
            PayStoreName: "TEST",
            PayStorePackage: "Week",
            PayStorePwa: 1,
            PayStorePea: 0,
            PayStoreRental: 1,
            StatusPaymentStoreID: 1,
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
            PayMethodStoreID: 1,
            PayStoreName: "TEST",
            PayStorePackage: "Week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 0,
            StatusPaymentStoreID: 1,
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
    t.Run(`TEST StatusPaymentStoreID is Not null`, func(t *testing.T) {
        payment := entity.PaymentStore{
            PayMethodStoreID: 1,
            PayStoreName: "TEST",
            PayStorePackage: "Week",
            PayStorePwa: 1,
            PayStorePea: 1,
            PayStoreRental: 1,
            StatusPaymentStoreID: 0,
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
        g.Expect(err.Error()).To(Equal("StatusPaymentStoreID is required"))
    })
}
//bill
func TestReceipt(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`TEST Positive`, func(t *testing.T) {
        Receipt := entity.Receipt{
            DescribtionBill: "test",
            PaymentStoreID: 1,
            UserTaxID: 1,
            PaymentStore: entity.PaymentStore{
                PayMethodStoreID: 1,
                PayStoreName: "TEST",
                PayStorePackage: "Week",
                PayStorePwa: 1,
                PayStorePea: 1,
                PayStoreRental: 1,
                StatusPaymentStoreID: 1,
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

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`TEST DescribtionBill is Not null`, func(t *testing.T) {
        Receipt := entity.Receipt{
            DescribtionBill: "",
            PaymentStoreID: 1,
            UserTaxID: 1,
            PaymentStore: entity.PaymentStore{
                PayMethodStoreID: 1,
                PayStoreName: "TEST",
                PayStorePackage: "Week",
                PayStorePwa: 1,
                PayStorePea: 1,
                PayStoreRental: 1,
                StatusPaymentStoreID: 1,
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
                PayMethodStoreID: 1,
                PayStoreName: "TEST",
                PayStorePackage: "Week",
                PayStorePwa: 1,
                PayStorePea: 1,
                PayStoreRental: 1,
                StatusPaymentStoreID: 1,
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
                PayMethodStoreID: 1,
                PayStoreName: "TEST",
                PayStorePackage: "Week",
                PayStorePwa: 1,
                PayStorePea: 1,
                PayStoreRental: 1,
                StatusPaymentStoreID: 1,
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


func TestPaymentStoreStatus(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`Test Positive`, func(t *testing.T) {
        data := entity.PaymentStoreStatus{
            PaymentStatusStore: "test",
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`Test PaymentStoreStatus Not null`, func(t *testing.T) {
        data := entity.PaymentStoreStatus{
            PaymentStatusStore: "",
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("PaymentStatusStore is required"))
    })
}



func TestAdditionalPackage(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`Test Positive`, func(t *testing.T) {
        data := entity.AdditionalPackage{
            AdditionalPicture: "test",
            AdditionalName: "test",
            DescribtionPackage: "test",
            PricePackage: 100,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`Test AdditionalPicture Not null`, func(t *testing.T) {
        data := entity.AdditionalPackage{
            AdditionalPicture: "",
            AdditionalName: "test",
            DescribtionPackage: "test",
            PricePackage: 100,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("AdditionalPicture is required"))
    })

    t.Run(`Test AdditionalName Not null`, func(t *testing.T) {
        data := entity.AdditionalPackage{
            AdditionalPicture: "test",
            AdditionalName: "",
            DescribtionPackage: "test",
            PricePackage: 100,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("AdditionalName is required"))
    })

    t.Run(`Test DescribtionPackage Not null`, func(t *testing.T) {
        data := entity.AdditionalPackage{
            AdditionalPicture: "test",
            AdditionalName: "test",
            DescribtionPackage: "",
            PricePackage: 100,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("DescribtionPackage is required"))
    })

    t.Run(`Test PricePackage Not null`, func(t *testing.T) {
        data := entity.AdditionalPackage{
            AdditionalPicture: "test",
            AdditionalName: "test",
            DescribtionPackage: "test",
            PricePackage: 0,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("PricePackage is required"))
    })
}


func TestAdditionalPay(t *testing.T) {
    g := NewGomegaWithT(t)
    t.Run(`Test Positive`, func(t *testing.T) {
        data := entity.AdditionalPay{
            AdditionalPackageID: 1,
            PaymentStoreID: 1,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).To(BeTrue())
        g.Expect(err).To(BeNil())
    })
    t.Run(`Test AdditionalPackageID Not null`, func(t *testing.T) {
        data := entity.AdditionalPay{
            AdditionalPackageID: 0,
            PaymentStoreID: 1,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("AdditionalPackageID is required"))
    })

    t.Run(`Test PaymentStoreID Not null`, func(t *testing.T) {
        data := entity.AdditionalPay{
            AdditionalPackageID: 1,
            PaymentStoreID: 0,
        }

        ok, err := govalidator.ValidateStruct(data)

        g.Expect(ok).NotTo(BeTrue())
        g.Expect(err).NotTo(BeNil())
        g.Expect(err.Error()).To(Equal("PaymentStoreID is required"))
    })
}
