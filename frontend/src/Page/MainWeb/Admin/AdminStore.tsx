import React, { useEffect, useState } from 'react';
import '../Main.css';
import picEx from '../../../assets/icon/ForPage/Store/Store3.jpg';
import Ap from '../../../assets/icon/ForPage/Admin/Approval.png';
import del from '../../../assets/icon/ForPage/Admin/DoNotDisturb.png';

import Wait from '../../../assets/icon/ForPage/Admin/Wait.png';
import NoOwn from '../../../assets/icon/ForPage/Admin/NoOwn.png';
import Own from '../../../assets/icon/ForPage/Admin/Own.png';

import { message} from "antd";

import {GetStoreWaiting , UpdateStoreByid} from '../../../services/https/index';
import {StoreInterface} from '../../../interfaces/StoreInterface'
const AdminStore: React.FC = () => {
    const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
            fetchUserData('WaitingForApproval');
    }, []);
    const fetchUserData = async (F: string) => {
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
            fetchUserData('WaitingForApproval');
            setS('WaitingForApproval');
        }else if(status ==2){
            fetchUserData('This store is available for reservation.');
            setS('This store is available for reservation.');
        }else if(status ==3){
            fetchUserData('Waiting for Payment.');
            setS('Waiting for Payment.');
        }else{
            fetchUserData('This store is already taken.');
            setS('This store is already taken.');
        }
    };

    //================================= update approve ==========================
    const [messageApi, contextHolder] = message.useMessage();
    const approve = async (approval: StoreInterface) => {
        const values = { ...approval, StatusStore: 'Waiting for Payment.' };
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
            LastDay: new Date('2024-01-01'),
            DescribtionStore: '',
            StatusStore: 'This store is available for reservation.',
            UserID: 0,
            ProductTypeID: approval.ProductTypeID
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
    };
    return (
        <>
            {contextHolder}
            <div style={{ height: '110px' }}></div>
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
                        <div className='Storewaiting' key={data.ID}>
                            <span className='Storewaitinginfo'>
                                <img src={data.PicStore || picEx} alt="picEx" />
                                <div className='textinfo'>
                                    <p style={{ fontSize: '34px', marginTop: '30px' ,fontWeight: '600'}}>{data.NameStore} F{data.ProductTypeID}</p>
                                    <p className='info'>{data.DescribtionStore}</p>
                                </div>
                            </span>
                            <span className='StorewaitingBtn'>
                                {(S !== 'This store is available for reservation.' && S !== 'Waiting for Payment.') && (
                                    <>
                                        <img style={{width: '40px' , cursor: 'pointer'}} src={Ap} alt="Ap" onClick={() => approve(data)} />
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
