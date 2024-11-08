import React, { useEffect, useState } from 'react';
import { message } from "antd";
import LOGO from "../../assets/icon/highLogo.jpg";
import LOGOSQ from "../../assets/icon/LOGOS.png";
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
            
        }
    }, [userIdstr]);

    const fetchUserData = async (userIdstr: string ) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            } else {
                
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
    //=====================time================================
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    const getFormattedDateTime = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = (date.getFullYear()).toString(); // to year พศ +543
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      };
    //====================is open? ============================
    useEffect(() => {
        const hours = currentTime.getHours();
        if (hours >= 10 && hours <= 21) {
            //setOpen(true);
            settextOpen('OPEN NOW');
        } else {
            //setOpen(false);
            settextOpen('NOT OPEN NOW');
        }
    }, [currentTime]);
    //const [isOpen, setOpen] = useState(false);
    const [istextOpen, settextOpen] = useState('NOT OPEN NOW');
    return (
        <>
            <nav className='positionNav'>
                <nav className='NavComponent'>
                    <span className='SubNab1'>
                        <img style={{ width: '25px', height: '25px' }} className='Clock' src={Clock} alt="Clock" />
                        <p>{istextOpen} <br /> 10 AM - 9 PM <br /> Now {getFormattedDateTime(currentTime)}</p>
                        <div className='vertical-divider'></div>

                        <img style={{ width: '25px', height: '25px' }} className='Loclation' src={Address} alt="Address" />
                        <p>111, University Road, Suranaree<br /> Subdistrict, Mueang Nakhon Ratchasima<br />District, Nakhon Ratchasima 30000</p>
                        <div className='vertical-divider'></div>
                    </span>
                    <span className='SubNab2'><img style={{ width: '200px', height: '30px' }} src={LOGO} alt="LOGO" /></span>
                    <span className='SubNab3'>
                        <span>Hello! {user?.UserName} Welcome to ICONIC🎉</span>
                        <img style={{ width: '45px', height: '45px', borderRadius: '50px', cursor: 'pointer' }} src={user?.Profile || UserIcon} alt="User" onClick={OpenMenu}></img>
                        {isMenuOpen && (
                            <div className='dropboxMenu'>
                                <a href="" ><p className='dropboxMenuP'>Edit Your Profile</p></a>
                                <a href="" ><p className='dropboxMenuP'>Job Application</p></a>
                                <a href="" ><p className='dropboxMenuP'>Car Parking</p></a>
                                <a href="/Admin" ><p className='dropboxMenuP'>Management</p></a>
                                <div className='lineMenu'></div>
                                <p className='dropboxMenuP' onClick={Logout}>Log Out</p>
                            </div>
                        )}
                    </span>
                </nav>
                <nav className='NavComponentMenu'>
                    <div></div>
                    <div>
                        <a href="/Main" ><span className={`MenuHover ${location.pathname === "/Main" ? "active" : ""}`}>NEWS</span></a>
                        <a href="/Store" ><span className={`MenuHover ${location.pathname === "/Store" ? "active" : ""}`}>STORE</span></a>
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



export const IntroWeb: React.FC = () => {
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
        } else {
            
        }
    }, [userIdstr]);

    const fetchUserData = async (userIdstr: string ) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            } else {
                
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };

    const [intro, setIntro] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIntro(false)
        }, 10000);
    }, []);
    return (

        <>
            {intro && 
                <div className='introMainWeb'>
                    <img src={LOGOSQ} alt="LOGOSQ" />
                    <h1>Hello! {user?.UserName}</h1>
                    <h2>WELCOME TO ICONIC</h2>
                </div>
            }
        </>

    );

};
