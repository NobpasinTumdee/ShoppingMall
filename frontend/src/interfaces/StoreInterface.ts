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
    StatusStore?:       string ;
    StatusService?:     string ;
    UserID?:            number ;
    ProductTypeID?:     number ;

    Membership?: MembershipInterface;

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
    status_service?:     string ;
    total_rating?:      number ;
}
export interface MembershipInterface {
    ID?:                number;
    PackageName?:  		string ;
    Day?:               number;
    Pwa?:               number;
    Pea?:               number;
    RentalFee?:         number;
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
    StatusPaymentStore?:    string ;
    PayStoreName?:          string ;
    PayStorePackage?:       string ;
    PayStorePwa?:           number ;
    PayStorePea?:           number ;
    PayStoreRental?:        number ;
    PayStoreBook?:          Date ;
    PayStoreLast?:          Date ;

    UserID?:                number ;
    StoreID?:               number ;
    PayMethodStoreID?:      number ;

    User?: UsersInterface;
    Store?: StoreInterface;
    PaymentMethodStore?: PaymentMethodStoreInterface;
}


export interface PaymentMethodStoreInterface{
    ID?:                    number ;
    MethodName?:            string ;
    MethodPic?:             string ;
}


export interface ReceiptInterface{
    ID?:                    number ;
    DateReceipt?:           Date ;
    DescribtionBill?:       string ;
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
