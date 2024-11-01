import React, { useEffect, useState } from 'react';
import { NavBar } from '../../Component/NavBar';
import { FloorMenu } from './Floor/Floor';
import './StoreAndPay.css'
import PicNoStore from '../../../assets/icon/ForPage/Store/Store3.jpg';
import { message } from "antd";

//API
import {GetStoreByFloor} from '../../../services/https/index'
import {StoreInterface} from '../../../interfaces/StoreInterface'

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
    const Floor1 = () => {
        fetchUserData(String(1));
        setNameFloor("NIGHT MARKET")
    };
    const Floor2 = () => {
        fetchUserData(String(2));
        setNameFloor("FOOD CENTER")
    };
    const Floor3 = () => {
        fetchUserData(String(3));
        setNameFloor("DECORATIONS")
    };
    const Floor4 = () => {
        fetchUserData(String(4));
        setNameFloor("COMPUTER EQUIPMENT")
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


    return (
        <>
            <NavBar />
            <FloorMenu />
            <div style={{height: '110px'}}></div>
            <div className='route'><a href="/Main">Home /</a>Store Directory</div>
            <div className='StoreMainContent'>
                <h1>{isNameFloor}</h1>
                <div className='AllbuttonFloor'>
                    <span onClick={Floor1} className='buttonFloor'>Floor 1</span>
                    <span onClick={Floor2} className='buttonFloor'>Floor 2</span>
                    <span onClick={Floor3} className='buttonFloor'>Floor 3</span>
                    <span onClick={Floor4} className='buttonFloor'>Floor 4</span>
                </div>
                <div className='ContanerStore'>
                    <span style={{width: "20%"}}></span>
                    <span style={{width: "100%"}} className='Store'>
                        {Store.length > 0 ? (
                            Store.map((data) => (
                                <span key={data.ID} className='cardStore'>
                                    <div><img src={data.PicStore || PicNoStore} alt="PicNoStore" /></div>
                                    <div><p style={{fontSize: '28px' , color: '#000'}}>{data.NameStore}</p></div>
                                    <div className='lineStore'></div>
                                    <div className='rating'>{renderStars(4)}</div>
                                    <div className='lineStore'></div>
                                    <div><p>{data.DescribtionStore}</p></div>
                                    <div className='ViewStore'>VIEW STORE  --</div>
                                </span>
                            ))
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