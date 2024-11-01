import React, { useEffect, useState } from 'react';
import { message } from "antd";
import LOGO from "../../assets/icon/LOGO.png";
import Clock from "../../assets/icon/ForPage/MainIcon/Clock.png";
import Address from "../../assets/icon/ForPage/MainIcon/Address.png";
import UserIcon from "../../assets/icon/ForPage/MainIcon/UserProfile.jpg"
import './NavBar.css';

//API
import { UsersInterface } from "../../interfaces/UsersInterface";
import { GetUserById } from '../../services/https';

export const NavBar: React.FC = () => {
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
        } else {
            message.error("หากท่านเป็นสมาชิกโปรด อย่าลืมที่จะ login");
        }
    }, [userIdstr]);

    const fetchUserData = async (userIdstr: string ) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            } else {
                message.error("หากท่านเป็นสมาชิกโปรด อย่าลืมที่จะ login");
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Debug
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };

    //=====================Menu on Profile======================
    const [isMenuOpen, setMenu] = useState(false);
    const OpenMenu = () => {
        setMenu(!isMenuOpen);
    };

    //=====================Logout======================
    const Logout = () => {
        localStorage.clear();
        message.success("Logout successful");
        setTimeout(() => {
          location.href = "/";
        }, 1000);
    };

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
                        <span>Hello! {user?.UserName} Welcome to ICONKORAT</span>
                        <img style={{ width: '45px', height: '45px', borderRadius: '50px', cursor: 'pointer' }} src={user?.Profile || UserIcon} alt="User" onClick={OpenMenu}></img>
                        {isMenuOpen && (
                            <div className='dropboxMenu'>
                                <a href="#" ><p className='dropboxMenuP'>Edit Your Profile</p></a>
                                <a href="#" ><p className='dropboxMenuP'>Job Application</p></a>
                                <div className='lineMenu'></div>
                                <p className='dropboxMenuP' onClick={Logout}>Log Out</p>
                            </div>
                        )}
                    </span>
                </nav>
                <nav className='NavComponentMenu'>
                    <div></div>
                    <div>
                        <a href="#" ><span className='MenuHover'>NEWS</span></a>
                        <a href="#" ><span className='MenuHover'>STORE</span></a>
                        <a href="#" ><span className='MenuHover'>BOOK A HALL</span></a>
                        <a href="#" ><span className='MenuHover'>SERVICEREQUEST</span></a>
                        <a href="#" ><span className='MenuHover'>CLEANING</span></a>
                    </div>
                    <div></div>
                </nav>
            </nav>
        </>
    );
};
