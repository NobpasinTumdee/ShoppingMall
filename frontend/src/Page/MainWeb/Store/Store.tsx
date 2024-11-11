import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import { NavBar } from '../../Component/NavBar';
import { FloorMenu } from './Floor/Floor';
import './StoreAndPay.css'
import PicNoStore from '../../../assets/icon/ForPage/Store/Store3.jpg';
import { message } from "antd";


import market from "../../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../../assets/icon/ForPage/MainIcon/LaptopSettings.png"


//API
import {GetStoreByFloor} from '../../../services/https/index'
import {StoreInterface} from '../../../interfaces/StoreInterface'

import {UpdateStoreByid} from '../../../services/https/index';


const Store: React.FC = () => {
    // const testdata = [
    //     {id: 1,Rating: 2},{id: 2,Rating: 5},{id: 3,Rating: 0},{id: 4,Rating: 3},
    //     {id: 5,Rating: 1},{id: 1,Rating: 1},{id: 2,Rating: 2},{id: 3,Rating: 2},
    //     {id: 4,Rating: 5},{id: 5,Rating: 2},{id: 1,Rating: 4},{id: 2,Rating: 5},
    //     {id: 3,Rating: 3},{id: 4,Rating: 4},{id: 5,Rating: 2},{id: 5,Rating: 4},
    // ]

    

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
            );
        }
        return stars;
    };

    const [isNameFloor, setNameFloor] = useState("NIGHT MARKET");
    const [isFloor1, setFloor1] = useState(0);const [isFloor2, setFloor2] = useState(0);const [isFloor3, setFloor3] = useState(0);const [isFloor4, setFloor4] = useState(0);
    const Floor1 = () => {
        fetchUserData(String(1));setFloor1(1);setFloor2(0);setFloor3(0);setFloor4(0);setNameFloor("NIGHT MARKET")
    };
    const Floor2 = () => {
        fetchUserData(String(2));setFloor1(0);setFloor2(1);setFloor3(0);setFloor4(0);setNameFloor("FOOD CENTER")
    };
    const Floor3 = () => {
        fetchUserData(String(3));setFloor1(0);setFloor2(0);setFloor3(1);setFloor4(0);setNameFloor("DECORATIONS")
    };
    const Floor4 = () => {
        fetchUserData(String(4));setFloor1(0);setFloor2(0);setFloor3(0);setFloor4(1);setNameFloor("COMPUTER EQUIPMENT")
    };


    //===========================================API==========================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
        if (1) {
            fetchUserData(String(1));
        } else {
            message.error("The ID was not found in localStorage.");
            
        }
    }, [1]);
    
    const fetchUserData = async (F: string) => {
        try {
            const res = await GetStoreByFloor(F);
            if (res.status === 200 && res.data) {
                setStore(res.data); // กำหนดให้เป็น array ที่ได้จาก API
            } else {
                setStore([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
                message.error("There is no Store on this floor.");
            }
        } catch (error) {
            setStore([]); // กำหนดให้เป็น array ว่างเมื่อมี error
            message.error("There is no Store on this floor.");
        }
    };
    //===========================================To page sub==========================================
    const navigate = useNavigate();
    const handleStoreClick = (SubStore: StoreInterface) => {
        navigate('/SubStore', { 
          state: { 
            ID: SubStore.ID,
            PicStore: SubStore.PicStore,
            SubPicOne: SubStore.SubPicOne,
            SubPicTwo: SubStore.SubPicTwo,
            SubPicThree: SubStore.SubPicThree,
            MembershipID: SubStore.MembershipID,
            NameStore: SubStore.NameStore,
            BookingDate: SubStore.BookingDate,
            LastDay: SubStore.LastDay,
            DescribtionStore: SubStore.DescribtionStore,
            StatusStore: SubStore.StatusStore,
            UserID: SubStore.UserID,
            ProductTypeID: SubStore.ProductTypeID,
          } 
        });
      };
    //============================================เช็ควันหมดอายุ==================================
    const currentDate = new Date(); // เวลาในปัจจุบัน
    const CheckExpiration = (data : any) => {
        if (currentDate > new Date(data.LastDay)) {
            UpdateStoreByidd(data.ID);
            return "Expired";
        }
        return data.StatusStore;
    };
    //================================= update ==========================
    const UpdateStoreByidd = async (formData: any) => {
        const values: StoreInterface = {
            ID: formData,
            PicStore: '',
            SubPicOne: '',
            SubPicTwo: '',
            SubPicThree: '',
            MembershipID: 0,
            NameStore: 'The shop has no owner.',
            BookingDate: new Date(),
            LastDay:new Date('2030-01-01'),
            DescribtionStore: '',
            StatusStore: 'This store is available for reservation.',
            UserID: 0,
        };
        try {
            const res = await UpdateStoreByid(String(formData), values);
            if (res.status === 200) {
                setTimeout(() => {
                    //navigate("/Store"); // นำทางกลับไปที่หน้า Store
                }, 2000);
            }
        } catch (error) {
            
        }
    };
    return (
        <>
            <FloorMenu />
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='route'><a href="/Main">Home /</a>Store Directory</div>
            <div className='StoreMainContent'>
                <h1>{isNameFloor}</h1>
                <div className='L'><span style={{width: "40%",backgroundColor: "#ffffff"}}></span><span></span><span style={{width: "40%",backgroundColor: "#ffffff"}}></span></div>
                <div className='AllbuttonFloor'>
                    <span style={{width: "40%",backgroundColor: "#ffffff"}}></span>
                    <span onClick={Floor1} className={`buttonFloor ${isFloor1 ? "active" : ""}`}>
                        <div><img src={market} alt="market" /></div>
                        <div>NIGHT MARKET</div>
                    </span>
                    <span onClick={Floor2} className={`buttonFloor ${isFloor2 ? "active" : ""}`}>
                        <div><img src={Food} alt="market" /></div>
                        <div>FOOD CENTER</div>
                    </span>
                    <span onClick={Floor3} className={`buttonFloor ${isFloor3 ? "active" : ""}`}>
                        <div><img src={Decorations} alt="market" /></div>
                        <div>DECORATIONS</div>
                    </span>
                    <span onClick={Floor4} className={`buttonFloor ${isFloor4 ? "active" : ""}`}>
                        <div><img src={Computer} alt="market" /></div>
                        <div>COMPUTER EQUIPMENT</div>
                    </span>
                    <span style={{width: "40%",backgroundColor: "#ffffff"}}></span>
                </div>
                <div className='ContanerStore'>
                    <span style={{width: "20%"}}></span>
                    <span style={{width: "100%"}} className='Store'>
                        {Store.length > 0 ? (
                            Store.map((data) => {
                                const status = CheckExpiration(data);
                                if (status !== 'Expired') {
                                    return (
                                        <span key={data.ID} className={`cardStore ${data.StatusStore === "This store is already taken." ? "active" : data.StatusStore === "WaitingForApproval" ? "inactive" : data.StatusStore === "Waiting for Payment." ? "WaitingPayment" : ""}`} >
                                            <div onClick={() => handleStoreClick(data)}>
                                                <div><img src={data.PicStore || PicNoStore} alt="PicNoStore" /></div>
                                                <div><p style={{fontSize: '28px' , color: '#000'}}>{data.NameStore}</p></div>
                                                <div className='lineStore'></div>
                                                <div className='rating'>{renderStars(4)}</div>
                                                <div className='lineStore'></div>
                                                <div className='DescribtionStore'>{String(data.BookingDate)}<br />{String(data.LastDay)}</div>
                                            </div>
                                            <div className={`ViewStore ${data.StatusStore === "This store is already taken." ? "active" : data.StatusStore === "WaitingForApproval" ? "inactive" : data.StatusStore === "Waiting for Payment." ? "WaitingPayment" : ""}`} >{data.StatusStore}  --</div>
                                        </span>
                                    );
                                }
                                return null
                            })
                        ) : (
                            <h1 style={{textAlign: 'center'}}>No Store On This Floor.</h1>
                        )}
                    </span>
                    <span style={{width: "20%"}}></span>
                </div>
            </div>
        </>

    );

};
export default Store;