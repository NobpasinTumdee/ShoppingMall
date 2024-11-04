import React, { useEffect, useState } from 'react';
import { NavBar } from '../../../../Page/Component/NavBar';
import { useLocation } from 'react-router-dom';
import './SubStore.css'


const BookStore: React.FC = () => {
    const location = useLocation();
    const {
        ID,
        PicStore,
        SubPicOne,
        SubPicTwo,
        SubPicThree,
        MembershipID,
        NameStore,
        BookingDate,
        LastDay,
        DescribtionStore,
        StatusStore,
        UserID,
        ProductTypeID
    } = location.state as {
        ID: number;
        PicStore: string;
        SubPicOne: string;
        SubPicTwo: string;
        SubPicThree: string;
        MembershipID: number;
        NameStore: string;
        BookingDate: Date;
        LastDay: Date;
        DescribtionStore: string;
        StatusStore: string;
        UserID: number;
        ProductTypeID: number;
    };
    const bookingDateObj = new Date(BookingDate);
    const lastDayObj = new Date(LastDay);

    const formattedBookingDate = bookingDateObj.toLocaleDateString();
    const formattedLastDay = lastDayObj.toLocaleDateString();

    return (

        <>
            <NavBar />
            <div style={{ height: '110px' }}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Store">Store Directory /</a>
                {NameStore}
            </div>
            <h1 className='H1'>Book A Sales Stall</h1>
            <div className='Package'>
                <span>Week</span>
                <span>Mount</span>
                <span>Year</span>
            </div>
            <div>
                {ID}{PicStore}{SubPicOne}{SubPicTwo}{SubPicThree}{MembershipID}{NameStore}
                {formattedBookingDate}{formattedLastDay}{DescribtionStore}{StatusStore}{UserID}{ProductTypeID} 
            </div>
        </>

    );

};

export default BookStore;
