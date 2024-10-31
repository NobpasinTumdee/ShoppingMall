import React from 'react';
import LOGO from "../../assets/icon/LOGO.png";
import Clock from "../../assets/icon/ForPage/MainIcon/Clock.png";
import Address from "../../assets/icon/ForPage/MainIcon/Address.png";
import UserIcon from "../../assets/icon/ForPage/MainIcon/UserProfile.jpg"
import './NavBar.css';

export const NavBar: React.FC = () => {
    return (
        <>
            <nav className='positionNav'>
                <nav className='NavComponent'>
                    <span className='SubNab1'>
                        <img style={{ width: '25px', height: '25px' }} src={Clock} alt="Clock" />
                        <p>OPEN NOW <br /> 10 AM - 9 PM <br /> Now 12/05/2024 16:30</p>
                        <div className='vertical-divider'></div>

                        <img style={{ width: '25px', height: '25px' }} src={Address} alt="Address" />
                        <p>111, University Road, Suranaree<br /> Subdistrict, Mueang Nakhon Ratchasima<br />District, Nakhon Ratchasima 30000</p>
                        <div className='vertical-divider'></div>
                    </span>
                    <span className='SubNab2'><img style={{ width: '200px', height: '30px' }} src={LOGO} alt="LOGO" /></span>
                    <span className='SubNab3'>
                        <span>Hello! PorGz Welcome to The Mall</span>
                        <img style={{ width: '45px', height: '45px', borderRadius: '50px', cursor: 'pointer' }} src={UserIcon} alt="User" />
                    </span>
                </nav>
                <nav className='NavComponentMenu'>
                    <div></div>
                    <div>
                        <span className='MenuHover'>NEWS</span>
                        <span className='MenuHover'>STORE</span>
                        <span className='MenuHover'>BOOK A HALL</span>
                        <span className='MenuHover'>SERVICEREQUEST</span>
                        <span className='MenuHover'>CLEANING</span>
                    </div>
                    <div></div>
                </nav>
            </nav>
        </>
    );
};
