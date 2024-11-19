import React from 'react';

import Home from '../../../assets/icon/ForPage/Admin/HomePage.png'
import Hall from '../../../assets/icon/ForPage/Admin/CityHall.png'
import Store from '../../../assets/icon/ForPage/Admin/StoreSetting.png'
import Job from '../../../assets/icon/ForPage/Admin/JobSeeker.png'
import '../Main.css';

import { useNavigate } from 'react-router-dom';

const Admin: React.FC = () => {
    const navigate = useNavigate();
    const handleClickToStore = () => {
        navigate('/AdminStore');
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
                <span className='ManagementSpan' >
                    <img src={Hall} alt="Hall" />
                    <span>Manage Hall</span>
                </span>
                <span className='ManagementSpan' onClick={handleClickToStore}>
                    <img src={Store} alt="Store" />
                    <span>Manage Store</span>
                </span>
                <span className='ManagementSpan' >
                    <img src={Job} alt="Job" />
                    <span>Manage Job</span>
                </span>
            </div>

        </>

    );

};

export default Admin;