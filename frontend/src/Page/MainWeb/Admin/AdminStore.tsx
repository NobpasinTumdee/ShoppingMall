import React, { useEffect, useState } from 'react';
import '../Main.css';
import picEx from '../../../assets/icon/ForPage/Store/Store3.jpg';
import Ap from '../../../assets/icon/ForPage/Admin/Approval.png';
import del from '../../../assets/icon/ForPage/Admin/DoNotDisturb.png';

import Wait from '../../../assets/icon/ForPage/Admin/Wait.png';
import NoOwn from '../../../assets/icon/ForPage/Admin/NoOwn.png';
import Own from '../../../assets/icon/ForPage/Admin/Own.png';

import { message} from "antd";

import {GetStoreWaiting , UpdateStoreByid , AddMessage , AddPayment} from '../../../services/https/index';
import {StoreInterface , PaymentInterface} from '../../../interfaces/StoreInterface'
import { MessageBoardInterface } from '../../../interfaces/UsersInterface';




const AdminStore: React.FC = () => {
    //============================ข้อมูลร้านค้า==========================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
            fetchStoreData('WaitingForApproval');
    }, []);
    const fetchStoreData = async (F: string) => {
        try {
            const res = await GetStoreWaiting(F);
            if (res.status === 200 && res.data) {
                setStore(res.data); // กำหนดให้เป็น array ที่ได้จาก API
            } else {
                setStore([]);
            }
        } catch (error) {
            setStore([]); // กำหนดให้เป็น array ว่างเมื่อมี error
        }
    };
    const [S, setS] = useState('WaitingForApproval');
    const selection = async (status: number) => {
        if (status == 1) {
            fetchStoreData('WaitingForApproval');
            setS('WaitingForApproval');
        }else if(status ==2){
            fetchStoreData('This store is available for reservation.');
            setS('This store is available for reservation.');
        }else if(status ==3){
            fetchStoreData('Waiting for Payment.');
            setS('Waiting for Payment.');
        }else{
            fetchStoreData('This store is already taken.');
            setS('This store is already taken.');
        }
    };
    //================================= คำเตือน ==================================


    //================================= set date ========================
    const Booking = new Date(); // กำหนดเป็นวันที่ปัจจุบัน
    const Last = new Date(Booking); // คัดลอกค่า BookingDate
    Last.setDate(Last.getDate() + 3); // เพิ่ม วันให้กับ LastDay
    //================================= update approve ==========================
    const [messageApi, contextHolder] = message.useMessage();
    const approve = async (approval: StoreInterface) => {
        const values = { ...approval, StatusStore: 'Waiting for Payment.', BookingDate:Booking , LastDay:Last };
        const valuesMessage: MessageBoardInterface = { 
            PicNews: 'https://cdn-icons-png.flaticon.com/512/4272/4272841.png',
            TextHeader: 'Waiting for Payment.' , 
            DescribtionNews: 'Your shop reservation has been approved by the administrator and you can You can proceed by making the next payment within 3 days.',
            UserID: approval.UserID
        };
        const valuesPayment: PaymentInterface = { 
            UserID: approval.UserID,
            StoreID: approval.ID
        };
        try {
            const res = await UpdateStoreByid(String(values.ID), values);
            if (res.status === 200) {
                // อัปเดต state เพื่อลบประวัติจากหน้าจอทันที
                setStore((prev) => prev.filter(item => item.ID !== values.ID));
                messageApi.open({
                    type: "success",
                    content: 'Approve Success!',
                });
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
        try {
            const res = await AddMessage(valuesMessage);
            if (res.status === 201) {
                messageApi.open({
                    type: "success",
                    content: 'Send Message Success!',
                });
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "ไม่สำเร็จ",
            });
        }
        try {
            const res = await AddPayment(valuesPayment);
            if (res.status === 201) {
                messageApi.open({
                    type: "success",
                    content: 'Create Payment Success!',
                });
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "ไม่สำเร็จ",
            });
        }
    };
    //================================= update Not approve ==========================
    const NotApprove = async (approval: StoreInterface) => {
        const values: StoreInterface = {
            ID: approval.ID,
            PicStore: '',
            SubPicOne: '',
            SubPicTwo: '',
            SubPicThree: '',
            MembershipID: 0,
            NameStore: 'The shop has no owner.',
            BookingDate: new Date('2024-01-01'),
            LastDay: new Date('2030-01-01'),
            DescribtionStore: '',
            StatusStore: 'This store is available for reservation.',
            UserID: 0,
            ProductTypeID: approval.ProductTypeID
        };
        const valuesMessage: MessageBoardInterface = { 
            PicNews: 'https://www.shutterstock.com/image-vector/no-upload-sign-allowed-icon-600nw-2417466507.jpg',
            TextHeader: 'The booking was not approved.' , 
            DescribtionNews: 'Your store reservation was not approved by a moderator because the content of your store may not be appropriate. We therefore request permission to disapprove your booking.',
            UserID: approval.UserID
        };
        try {
            const res = await UpdateStoreByid(String(values.ID), values);
            if (res.status === 200) {
                // อัปเดต state เพื่อลบประวัติจากหน้าจอทันที
                setStore((prev) => prev.filter(item => item.ID !== values.ID));
                messageApi.open({
                    type: "info",
                    content: 'Not Approve!',
                });
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
        try {
            const res = await AddMessage(valuesMessage);
            if (res.status === 201) {
                messageApi.open({
                    type: "info",
                    content: 'Send Message Success!',
                });
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "ไม่สำเร็จ",
            });
        }
    };
    return (
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            {contextHolder}
            <div className='route'><a href="/Admin">Management /</a>Store Management</div>
            <h1 className='H1Management'>Store Management</h1>
            <p className='SubH1'>{S}</p>
            <div className='AllSeletion'>
                <p style={{backgroundColor: '#6265C9'}} onClick={() => selection(1)} className='selection'><img src={Wait} alt="Wait" /></p>
                <p style={{backgroundColor: '#484848'}} onClick={() => selection(2)} className='selection'><img src={NoOwn} alt="NoOwn" /></p>
                <p style={{backgroundColor: '#C9AF62'}} onClick={() => selection(4)} className='selection'><img src={Own} alt="Own" /></p>
                <p style={{backgroundColor: '#0bd700'}} onClick={() => selection(3)} className='selection'><img src={Own} alt="Own" /></p>
            </div>
            <div className='Storewaitingforapproval'>
            {Store.length > 0 ? (
                Store.map((data) => (
                    <>
                        <div className={`Storewaiting ${data.StatusStore === "This store is available for reservation." ? "WaitOwn" : data.StatusStore === "WaitingForApproval" ? "Waiting" : data.StatusStore === "Waiting for Payment." ? "Payment" : ""}`} key={data.ID} >
                            <span className='Storewaitinginfo'>
                                <img src={data.PicStore || picEx} alt="picEx" />
                                <div className='textinfo'>
                                    <p style={{ fontSize: '34px', marginTop: '30px' ,fontWeight: '600'}}>{data.NameStore} F{data.ProductTypeID}</p>
                                    <p>{data.DescribtionStore}</p>
                                    <p>{data.BookingDate ? new Date(data.BookingDate).toLocaleDateString() : 'No Date'}</p>
                                </div>
                            </span>
                            <span className='StorewaitingBtn'>
                                {(S !== 'This store is available for reservation.' && S !== 'Waiting for Payment.') && (
                                    <>
                                        {S !== 'This store is already taken.' && 
                                            <img style={{width: '40px' , cursor: 'pointer'}} src={Ap} alt="Ap" onClick={() => approve(data)} />
                                        }
                                        <img style={{width: '40px', cursor: 'pointer'}} src={del} alt="del" onClick={() => NotApprove(data)} />
                                    </>
                                )}
                            </span>
                        </div>
                    </>
                ))) : (
                    <>
                        <h1 className='H1Management'>No Store approval...</h1>
                    </>
            )}
            </div> 
        </>
    );
};

export default AdminStore;
