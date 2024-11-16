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
    UserID?:            number ;
    ProductTypeID?:     number ;

    Membership?: MembershipInterface;
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
    UserID?:                number ;
    StoreID?:               number ;
    PayMethodStoreID?:      number ;

    User?: UsersInterface;
    Store?: StoreInterface;
}


export interface PaymentMethodStoreInterface{
    ID?:                    number ;
    MethodName?:            string ;
    MethodPic?:             string ;
}