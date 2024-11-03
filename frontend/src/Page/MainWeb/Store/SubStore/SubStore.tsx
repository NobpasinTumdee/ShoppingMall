import React from 'react';
import './SubStore.css';
import { useLocation } from 'react-router-dom';

import { NavBar } from '../../../../Page/Component/NavBar';

const SubStore: React.FC = () => {
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
    // const formattedBookingDate = BookingDate.toLocaleDateString();
    // const formattedLastDay = LastDay.toLocaleDateString();

    return (
        <>
            <NavBar />
            <div style={{ height: '110px' }}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Store">Store Directory /</a>
                Name Substore
            </div>
            <div>
                {ID} {PicStore} {SubPicOne} {SubPicTwo} {SubPicThree} {MembershipID} {NameStore} 
                {/* {formattedBookingDate} {formattedLastDay} */} {DescribtionStore} {StatusStore} {UserID} {ProductTypeID} 
            </div>
        </>
    );
};

export default SubStore;
