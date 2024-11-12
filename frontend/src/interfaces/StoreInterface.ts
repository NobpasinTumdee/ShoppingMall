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
    PicStoreBackup?:    String ;
    PicOneBackup?:      String ;
    PicTwoBackup?:      String ;
    PicThreeBackup?:    String ;
    MembershipBackup?:  number ;
    NameBackup?:        String ;
    BookingBackup?:     Date ;
    LastDayBackup?:     Date ;
    DescribtionStoreB?: String ;
    ProductTypeIDB?:    number ;
    UserID?:            number ;
    StoreID?:           number ;
}
export interface InfoUserStoreInterface{
    ID?:                number ;
    UserNameStore?:     String ;
    UserPicStore?:      String ;
    UserSubPicOne?:     String ;
    UserSubPicTwo?:     String ;
    UserSubPicThree?:   String ;
    UserDescribStore?:  String ;
    UserID?:            number ;
}