import React, { useEffect, useState } from 'react';
import '../Main.css';
import picEx from '../../../assets/icon/ForPage/Store/Store3.jpg';
import Ap from '../../../assets/icon/ForPage/Admin/Approval.png';
import del from '../../../assets/icon/ForPage/Admin/DoNotDisturb.png';

import Wait from '../../../assets/icon/ForPage/Admin/Wait.png';
import NoOwn from '../../../assets/icon/ForPage/Admin/NoOwn.png';
import Own from '../../../assets/icon/ForPage/Admin/Own.png';

import { message} from "antd";

import {GetStoreWaiting , UpdateStoreByid , AddMessage , AddPayment , DeleteCommentFromStore, GetStatusAll} from '../../../services/https/index';
import {StoreInterface , PaymentInterface, StatusStoreAllInterface} from '../../../interfaces/StoreInterface'
import { MessageBoardInterface } from '../../../interfaces/UsersInterface';




const AdminStore: React.FC = () => {
    //============================ข้อมูลร้านค้า==========================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
            fetchStoreData(String(2));
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
    const [S, setS] = useState(2);
    const selection = async (status: number) => {
        if (status == 1) {
            fetchStoreData(String(2));
            setS(2);
        }else if(status ==2){
            fetchStoreData(String(1));
            setS(1);
        }else if(status ==3){
            fetchStoreData(String(3));
            setS(3);
        }else{
            fetchStoreData(String(4));
            setS(4);
        }
    };
    //================================= status store name ==================================
    const [StatusName, setStatusName] = useState<StatusStoreAllInterface[]>([]);
    useEffect(() => {
        fetchstatus();
    }, []);

    const fetchstatus = async () => {
        try {
            const res = await GetStatusAll();
            if (res.status === 200) {
                setStatusName(res.data);
            }
        } catch (error) {
            console.error("Error fetching status data:", error);
        }
    };

    //================================= set date ========================
    const Booking = new Date(); // กำหนดเป็นวันที่ปัจจุบัน
    const Last = new Date(Booking); // คัดลอกค่า BookingDate
    Last.setDate(Last.getDate() + 3); // เพิ่ม วันให้กับ LastDay
    //================================= update approve ==========================
    const [messageApi, contextHolder] = message.useMessage();
    const approve = async (approval: StoreInterface) => {
        const values: StoreInterface = { ID: approval.ID , BookingDate:Booking , LastDay:Last ,StatusStoreID: 3 };
        const valuesMessage: MessageBoardInterface = { 
            PicNews: 'https://static.vecteezy.com/system/resources/previews/019/787/057/non_2x/business-handshake-on-transparent-background-free-png.png',//https://cdn-icons-png.flaticon.com/512/4272/4272841.png
            TextHeader: 'Waiting for Payment.'+ " -" +approval.NameStore+ "-" , 
            DescribtionNews: 'Your shop reservation has been approved by the administrator and you can You can proceed by making the next payment within 3 days.',
            UserID: approval.UserID
        };
        const LastDate = new Date(Booking); // วันจริงตามแพ็คเกจ
        LastDate.setDate(LastDate.getDate() + Number(approval.Membership?.Day)); 
        const valuesPayment: PaymentInterface = { 
            PayStoreName: approval.NameStore,
            PayStorePackage: approval.Membership?.PackageName,
            PayStorePwa: approval.Membership?.Pwa,
            PayStorePea: approval.Membership?.Pea,
            PayStoreRental: approval.Membership?.RentalFee,
            PayStoreBook: Booking,
            PayStoreLast: LastDate,
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
                setTimeout(() => {
                    messageApi.open({
                        type: "info",
                        content: 'Send Message Success!',
                    });
                }, 3000);
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
                // messageApi.open({
                //     type: "success",
                //     content: 'Create Payment Success!',
                // });
                console.log("Create Payment Success!");
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
            NameStore: 'no owner.',
            BookingDate: new Date('2024-01-01'),
            LastDay: new Date('3030-01-01'),
            DescribtionStore: '',
            // StatusStore: 'This store is available for reservation.',
            UserID: 0,
            ProductTypeID: approval.ProductTypeID,
            StatusStoreID: 1,
        };
        const valuesMessage: MessageBoardInterface = { 
            PicNews: 'https://www.shutterstock.com/image-vector/no-upload-sign-allowed-icon-600nw-2417466507.jpg',
            TextHeader: 'The booking was not approved.'+ " -" +approval.NameStore+ "-" , 
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
            const resDeleteComment = await DeleteCommentFromStore(String(approval.ID));
            if (resDeleteComment.status === 200) {
                // messageApi.open({
                //     type: "info",
                //     content: 'Delete All Comment!',
                // });
                console.log('Delete All Comment!')
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
            {/* <div className='route'><a href="/Admin">Management /</a>Store Management</div> */}
            <h1 className='H1Management'>Store Management</h1>
            <p className='SubH1'>{StatusName[S-1]?.StatusName}</p>
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
                        <div className={`Storewaiting ${data.StatusStoreAll?.ID === 1 ? "WaitOwn" : data.StatusStoreAll?.ID === 2 ? "Waiting" : data.StatusStoreAll?.ID === 3 ? "Payment" : ""}`} key={data.ID} >
                            <span className='Storewaitinginfo'>
                                <img src={data.PicStore || picEx} alt="picEx" />
                                <div className='textinfo'>
                                    <p style={{ fontSize: '34px', marginTop: '30px' ,fontWeight: '600'}}>{data.NameStore} {data.ProductType?.NameType}{data.ProductTypeID} "{data.User?.UserName || "No Owner"}"</p>
                                    <p>{data.DescribtionStore}</p>
                                    <p>DATE: {data.BookingDate ? new Date(data.BookingDate).toLocaleDateString() : 'No Date'} PACKAGE: {data.Membership?.PackageName} GMAIL: {data.User?.Email}</p>
                                </div>
                            </span>
                            <span className='StorewaitingBtn'>
                                {(data.StatusStoreAll?.ID !== 1 && data.StatusStoreAll?.ID !== 3) && (
                                    <>
                                        {data.StatusStoreAll?.ID !== 4 && 
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
                        <div style={{margin:'0 auto'}}>
                            <img src="https://media.tenor.com/lVhFnY9tc94AAAAi/anime-dance.gif" alt="anime gif" width={250} />
                        </div>
                        <h1 className='H1Management'>No Store approval...</h1>
                    </>
            )}
            </div> 
        </>
    );
};

export default AdminStore;
