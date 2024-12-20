import React, { useEffect, useState } from 'react';

import Home from '../../../assets/icon/ForPage/Admin/HomePage.png'
import History from '../../../assets/icon/ForPage/Admin/History.png'
import Store from '../../../assets/icon/ForPage/Admin/StoreSetting.png'
import Job from '../../../assets/icon/ForPage/Admin/JobSeeker.png'
import '../Main.css';

import { useNavigate } from 'react-router-dom';

import { GetStoreByFloor} from '../../../services/https';
import { StoreInterface } from '../../../interfaces/StoreInterface';

const Admin: React.FC = () => {
    const [isFloorPopup, setFloorPopup] = useState(false);
    const navigate = useNavigate();
    const handleClickToHistory = () => {
        setFloorPopup(!isFloorPopup)
    };
    const handleClickToStore = () => {
        navigate('/AdminStore');
    };
    const handleClickToJob = () => {
        navigate('/AdminJob');
    };
    //==============================ดึงข้อมูลร้านทั้งหมด================================
    const [isStore, setStore] = useState<StoreInterface[]>([]);
    const [isNumber, setNumber] = useState('');
    useEffect(() => {
        fetchStore(String(1))
    }, []);
    const fetchStore = async (F: string) => {
        try {
            const res = await GetStoreByFloor(F);
            if (res.status === 200 && res.data) {
                setStore(res.data);
                setNumber(F)
            }else{
                setStore([]);
            }
        } catch (error) {
            setStore([]);
        }
    }
    //============================ส่งข้อมูลไปอีกหน้า===================================
    const handleStoreClick = (SubStore: StoreInterface) => {
        navigate('/BackUpStore', { 
          state: { 
            ID: SubStore.id,
          } 
        });
    };

    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <h1 className='H1Management'>Welcome to Management</h1>
            <p className='PManagement'>What do you want to do?</p>
            <div className='Mainpage'>
                <p className='ManageMainPage'><img src={Home} alt="Home" />Manage Main Page</p>
            </div>
            <div className='Management'>
                <span className='ManagementSpan' onClick={handleClickToHistory}>
                    <img src={History} alt="History" />
                    <span>Manage History</span>
                </span>
                <span className='ManagementSpan' onClick={handleClickToStore}>
                    <img src={Store} alt="Store" />
                    <span>Manage Store</span>
                </span>
                <span className='ManagementSpan' onClick={handleClickToJob} >
                    <img src={Job} alt="Job" />
                    <span>Manage Job</span>
                </span>
            </div>
            {isFloorPopup &&
                <div className='popupStore'>
                    <div className='popupheader'>
                        <h1>Store</h1>
                        <div>
                            <span className='BtnFloor' onClick={() => fetchStore(String(1))}>Floor 1</span>
                            <span className='BtnFloor' onClick={() => fetchStore(String(2))}>Floor 2</span>
                            <span className='BtnFloor' onClick={() => fetchStore(String(3))}>Floor 3</span>
                            <span className='BtnFloor' onClick={() => fetchStore(String(4))}>Floor 4</span>
                        </div>
                    </div>
                    <div className='AllStore'>
                        <div className='CardStore'>
                            {isStore.length > 0 ? (
                                isStore.map((data,index) => (
                                    <div className='CardSubStore' key={index} >
                                        <img src={data.pic_store} alt="" width={250} height={150} onClick={() => handleStoreClick(data)}/>
                                        <p className='NoStorecard'>No.{data.id}</p>
                                        <p className='FloorNumber'>F{isNumber}</p>
                                    </div>   
                                ))
                            ) : (
                                <>No Store...</>
                            )}
                        </div>
                    </div>
                    <div className='Exit' style={{textAlign: 'center' ,color: "#fff"}} onClick={handleClickToHistory}>X</div>
                </div>
            }

        </>

    );

};

export default Admin;