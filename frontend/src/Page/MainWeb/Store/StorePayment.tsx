import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {message} from 'antd'

import './StoreAndPay.css'

import { GetPaymentid , GetUserById} from '../../../services/https';
import { PaymentInterface } from '../../../interfaces/StoreInterface';

import PWA from '../../../assets/icon/ForPage/StorePayment/PWA.jpg'
import PEA from '../../../assets/icon/ForPage/StorePayment/PEA.jpg'
import storeicon from '../../../assets/icon/ForPage/StorePayment/storeicon.jpg'

const StorePayment: React.FC = () => {
    const location = useLocation();
    const [Payment, setPayment] = useState<PaymentInterface | null>(null);
    const { 
        ID
    } = location.state as { 
        ID: number;
    };
    useEffect(() => {
        if (1) {
            fetchPayment(String(ID));
        }
    }, [1]);
    const fetchPayment = async (ID: string ) => {
        try {
            const res = await GetPaymentid(ID);
            if (res.status === 200) {
                setPayment(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };

    //========================================total price============================================
    const [Total, setTotal] = useState(0);

    useEffect(() => {
        const Pwa = Number(Payment?.Store?.Membership?.Pwa || 0);
        const Pea = Number(Payment?.Store?.Membership?.Pea || 0);
        const RentalFee = Number(Payment?.Store?.Membership?.RentalFee || 0);
        setTotal(Pwa + Pea + RentalFee);
    }, [Payment]);

    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Inbox">Inbox /</a>
                {Payment?.Store?.NameStore}
            </div>
            {/* <div>{Payment?.ID}{Payment?.PayMethodStoreID}{Payment?.StatusPaymentStore}</div> */}
            <div className='PaymentContanerBox'>
                <div className='listPay'>
                    <h1>Total amount to be paid  "{Payment?.Store?.NameStore}"</h1>
                    <div className='PaymentContanerBoxSub'>
                        <div>Section</div>
                        <div>Price</div>
                    </div>
                    <hr />
                    <div className='PWA'>
                        <img src={PWA} alt="PWA" />
                        <div style={{marginLeft: '20px'}}>
                            <p style={{fontWeight: '900'}}>Provincial Waterworks Authority #{Payment?.Store?.Membership?.PackageName}</p>
                            <p>Booking Date : {String(Payment?.Store?.BookingDate)}</p>
                            <p>Last Day : {String(Payment?.Store?.LastDay)}</p>
                        </div>
                        <div style={{marginLeft: '20%',fontWeight: '900' ,display: 'flex',alignItems: 'center'}}>{Payment?.Store?.Membership?.Pwa} Bath</div>
                    </div>

                    <div className='PWA'>
                        <img src={PEA} alt="PEA" />
                        <div style={{marginLeft: '20px'}}>
                            <p style={{fontWeight: '900'}}>Provincial ELECTRICITY Authority #{Payment?.Store?.Membership?.PackageName}</p>
                            <p>Booking Date : {String(Payment?.Store?.BookingDate)}</p>
                            <p>Last Day : {String(Payment?.Store?.LastDay)}</p>
                        </div>
                        <div style={{marginLeft: '18%',fontWeight: '900' ,display: 'flex',alignItems: 'center'}}>{Payment?.Store?.Membership?.Pea} Bath</div>
                    </div>

                    <div className='PWA'>
                        <img src={storeicon} alt="storeicon" />
                        <div style={{marginLeft: '20px'}}>
                            <p style={{fontWeight: '900'}}>Rental Fee #{Payment?.Store?.Membership?.PackageName}</p>
                            <p>Booking Date : {String(Payment?.Store?.BookingDate)}</p>
                            <p>Last Day : {String(Payment?.Store?.LastDay)}</p>
                        </div>
                        <div style={{marginLeft: '20%',fontWeight: '900' ,display: 'flex',alignItems: 'center'}}>{Payment?.Store?.Membership?.RentalFee} Bath</div>
                    </div>
                    <hr />
                    <div className='total'><p></p><p>Total : {Total} Bath <hr /></p></div>
                </div>
                <div className='listPayR'>
                    <div className='listPayRSub'>
                        <h2>Payment Info</h2>
                        <p>Payment options</p>
                    </div>
                </div>
            </div>
        </>
    );

};

export default StorePayment;