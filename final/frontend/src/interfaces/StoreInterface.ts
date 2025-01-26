import { UsersInterface } from "./UsersInterface";
export interface StoreInterface {
    ID?:                number;
    PicStore?:  		string ;
    SubPicOne?:  		string ;
    SubPicTwo?:  		string ;
    SubPicThree?:  		string ;
    MembershipID?:  	number ;
    NameStore?:  		string ;
    BookingDate?:  		Date ;
    LastDay?:  		    Date ;
    DescribtionStore?:  string ;
    StatusService?:     string ;
    UserID?:            number ;
    ProductTypeID?:     number ;
    StatusStoreID?:     number ;

    Membership?:        MembershipInterface;
    User?:              UsersInterface;
    ProductType?:       ProductTypeInterface;
    StatusStoreAll?:    StatusStoreAllInterface;

    //With Rating
    id?:                number ;
    pic_store?:         string ;
    sub_pic_one?:       string ;
    sub_pic_two?:       string ;
    sub_pic_three?:     string ;
    name_store?:        string ;
    booking_date?:      string ;
    last_day?:          string ;
    describtion_store?: string ;
    status_store?:      string ;
    status_service?:    string ;
    total_rating?:      number ;
    status_store_id?:   number ;
    status_name?:       string ;
}
export interface MembershipInterface {
    ID?:                number;
    PackageName?:  		string ;
    Day?:               number;
    Pwa?:               number;
    Pea?:               number;
    RentalFee?:         number;
}
export interface ProductTypeInterface {
    ID?:                number;
    NameType?:  		string ;
}

export interface BackupStoreInterface{
    ID?:                number ;
    PicStoreBackup?:    string ;
    PicOneBackup?:      string ;
    PicTwoBackup?:      string ;
    PicThreeBackup?:    string ;
    MembershipBackup?:  number ;
    NameBackup?:        string ;
    BookingBackup?:     Date ;
    LastDayBackup?:     Date ;
    DescribtionStoreB?: string ;
    ProductTypeIDB?:    number ;
    UserID?:            number ;
    StoreID?:           number ;

    User?: UsersInterface;
    Store?: StoreInterface;
}


export interface InfoUserStoreInterface{
    ID?:                number ;
    UserNameStore?:     string ;
    UserPicStore?:      string ;
    UserSubPicOne?:     string ;
    UserSubPicTwo?:     string ;
    UserSubPicThree?:   string ;
    UserDescribStore?:  string ;
    UserID?:            number ;
}



export interface PaymentInterface{
    ID?:                    number ;
    PayStoreName?:          string ;
    PayStorePackage?:       string ;
    PayStorePwa?:           number ;
    PayStorePea?:           number ;
    PayStoreRental?:        number ;
    PayStoreBook?:          Date ;
    PayStoreLast?:          Date ;
    Evidence?:              string ;

    UserID?:                number ;
    StoreID?:               number ;
    PayMethodStoreID?:      number ;
    StatusPaymentStoreID?:  number ;

    User?: UsersInterface;
    Store?: StoreInterface;
    PaymentMethodStore?: PaymentMethodStoreInterface;
    PaymentStoreStatus?: PaymentStoreStatusInterface;
}


export interface PaymentMethodStoreInterface{
    ID?:                    number ;
    MethodName?:            string ;
    MethodPic?:             string ;
}

export interface PaymentStoreStatusInterface{
    ID?:                    number ;
    PaymentStatusStore?:    string ;
}


export interface ReceiptInterface{
    ID?:                    number ;
    DateReceipt?:           Date ;
    DescribtionBill?:       string ;
    Additional?:            number ;
    TotalPrice?:            number ;
    PaymentStoreID?:        number ;
    UserTaxID?:             number ;

    PaymentStore?: PaymentInterface;
    TaxUser?: TaxUserInterface;
}

export interface TaxUserInterface{
    ID?:                     number ;
    CompanyName?:            string ;
    Residencee?:             string ;
    IdentificationNumber?:   number ;
    UserID?:                 number ;

    User?: UsersInterface;
}

export interface RatingInterface{
    ID?:                    number ;
    Rating?:                number ;
    Comment?:               string ;
    UserID?:                number ;
    StoreID?:               number ;

    User?: UsersInterface;
    Store?: StoreInterface;
}
export interface AverageRatingInterface {
    store_id: string;       
    averageRating: number;  
    totalRatings: number;   
}
export interface StatusStoreAllInterface {
    ID?: number;       
    StatusName?: string;  
}
export interface StoreInformationInterface {
    ID?:                    number;       
    Picture?:               string;
    Details?:               string;
    DescriptionPic?:        string;
    StoreID?:               number;
    Store?:                 StoreInterface;
}
export interface AdditionalPackageInterface {
    ID?:                    number;       
    AdditionalPicture?:     string;
    AdditionalName?:        string;
    DescribtionPackage?:    string;
    PricePackage?:          number;
}
export interface AdditionalPayInterface {
    ID?:                    number;       
    AdditionalPackageID?:   number;
    PaymentStoreID?:        number;

    AdditionalPackage?:     AdditionalPackageInterface;
    PaymentStore?:          PaymentInterface;
}