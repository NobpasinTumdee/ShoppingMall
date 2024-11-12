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