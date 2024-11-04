import React from 'react';
import { NavBar } from '../../../../Page/Component/NavBar';
import { useLocation } from 'react-router-dom';
import './SubStore.css'
import {UpdateStoreByid} from '../../../../services/https/index';
import { StoreInterface } from '../../../../interfaces/StoreInterface';
import { message } from "antd";
import { useNavigate } from "react-router-dom";


const BookStore: React.FC = () => {
    const userIdstr = localStorage.getItem("id");
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

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const UpdateStoreByidd = async (newMembershipID: number) => {
        const values: StoreInterface = {
            ID,
            PicStore,
            SubPicOne,
            SubPicTwo,
            SubPicThree,
            MembershipID: newMembershipID, // อัพเดท MembershipID
            NameStore,
            BookingDate,
            LastDay,
            DescribtionStore,
            StatusStore,
            UserID: Number(userIdstr),
            ProductTypeID
        };
        try {
            const res = await UpdateStoreByid(String(ID), values);
            if (res.status === 200) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                });
                setTimeout(() => {
                    //navigate("/Store"); // นำทางกลับไปที่หน้า Store
                }, 2000);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "การอัพเดทไม่สำเร็จ",
            });
        }
    };
    return (

        <>
            {contextHolder}
            <NavBar />
            <div style={{ height: '110px' }}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Store">Store Directory /</a>
                {NameStore}
            </div>
            <h1 className='H1'>Book A Sales Stall</h1>
            <div className='Package'>
                <span className='Packagespan' ><div>Week</div><p>7 Days</p><p>- PWA 350 Bath</p><p>- PEA  700 Bath</p><p>- Rent  150/day Bath</p><div className='PromotionBtn'onClick={() => UpdateStoreByidd(1)}>Use this promotion</div></span>
                <span className='Packagespan' ><div>Mount</div><p>30 Days</p><p>- PWA 1500 Bath</p><p>- PEA  3000 Bath</p><p>- Rent  120/day Bath</p><div className='PromotionBtn'onClick={() => UpdateStoreByidd(2)}>Use this promotion</div></span>
                <span className='Packagespan' ><div>Year</div><p>365 Days</p><p>- PWA 18,250 Bath</p><p>- PEA  35,600 Bath</p><p>- Rent  100/day Bath</p><div className='PromotionBtn'onClick={() => UpdateStoreByidd(3)}>Use this promotion</div></span>
            </div>
            
        </>

    );

};

export default BookStore;
