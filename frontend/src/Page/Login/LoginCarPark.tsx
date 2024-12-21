import React, { useState } from 'react';
import './Login.css'
import { Button, Form, Input ,message, Select } from 'antd';
import {SignInInterface} from "../../interfaces/SignIn";
import { GetUserById, SignIn, CreateUser } from '../../services/https';
import Arrow from '../../assets/icon/ForPage/LoginIcon/Arrow.png';
import User from '../../assets/icon/ForPage/LoginIcon/User.png';
import Lock from '../../assets/icon/ForPage/LoginIcon/Lock.png';
import LOGOS from '../../assets/icon/LOGOS.png';
import CarPark from '../../assets/CarPark/carpark-cover.webp';

const { Option } = Select;
import {IntroWeb} from '../Component/NavBar';
export const LoginCarPark: React.FC = () => {
    const onFinish = async (values: SignInInterface) => {
        let res = await SignIn(values);
    
        if (res.status === 200) {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("token_type", res.data.token_type);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);

            message.success("Login successful");
            introToMain();
            
            setUserID(res.data.id);

        } else {
            message.error(res.data.error);
        }
        
    };
    const [intro, setIntro] = useState(false);
    const [userID, setUserID] = useState<string>("");

    const introToMain = async () => {
        const res = await GetUserById(userID);
        setIntro(true);
        setTimeout(() => {
            if (res.data.Status === 'ParkingAttendant') { 
                location.href = "/CarPark/Attendant/Main";
            } else if (res.data.Status === 'Customer') { 
                location.href = "/Customer/Main";
            } else {
                location.href = "/Main"; 
            }
        }, 9000);
    };
    
    const close = async () => {
        const res = await GetUserById(userID);
        setIntro(false);
        if (res.data.Status === 'ParkingAttendant') { 
            location.href = "/CarPark/Attendant/Main";
        } else if (res.data.Status === 'Customer') { 
            location.href = "/Customer/Main";
        } else {
            location.href = "/Main"; 
        }
    };
    
        
    return(
        <>
            {intro && 
                <div onClick={close}><IntroWeb /></div>
            }
            <div className='backgroud'></div>
            <div className='Logincontanner'>
                <div className='Loginsub'>
                <span className='LoginLeftCarPark'><p><img style={{width: '100px'}} src={LOGOS} alt="LOGOS" />ICONIC</p><div className='gotocarpark'><a href="/">Go to ICONIC</a></div></span>
                <span className='Loginrigth'>
                    <div className='formLogin'>
                        <div style={{color: '#1d1d1d'}}>Login</div>
                        <Form
                            name="login"
                            onFinish={onFinish}
                            requiredMark={false}
                        >
                            <p style={{color: '#1d1d1d'}}>UserName</p>
                            <img className='iconuser' src={User} alt="User" />
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                
                                <Input placeholder="username" />
                            </Form.Item>
                            <p style={{color: '#1d1d1d'}}>Password</p>
                            <img className='iconuser' src={Lock} alt="Lock" />
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                
                                <Input.Password placeholder="password" />
                            </Form.Item>
                            <div style={{color: '#C9AF62' ,fontWeight: '400'}} ><a style={{color: '#C9AF62' ,fontWeight: '400'}} href="/" >FORGOT PASSWORD</a>{" Or "}<a style={{color: '#C9AF62' ,fontWeight: '400'}} href="/signup"> signup now !</a></div>
                            <div className="LoginButton">
                            <Form.Item>
                                <button>
                                    LOGIN
                                    <img src={Arrow} alt="Arrow" />
                                </button>
                            </Form.Item>
                            </div>
                        </Form>
                    </div>
                </span>
                </div>
            </div>
        </>
    );
};

export const SignUpCarPark: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const res = await CreateUser(values);
            if (res.status === 201) {
                message.success('Registration successful!');
                location.href = "/CarPark"; // เปลี่ยนไปหน้า Login
            } else {
                message.error(res.data.error || 'Registration failed!');
            }
        } catch (error) {
            message.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='backgroudCarPark'></div>
            <div className='LogincontannerCarPark'>
                <div className='LoginsubCarPark'>
                    <span className='LoginLeftCarPark'>
                        <p><img style={{ width: '100px' }} src={LOGOS} alt="LOGOS" />ICONIC</p>
                        <div className='gotocarpark'><a href="/">Go to ICONIC</a></div>
                    </span>
                    <span className='LoginrigthCarPark'>
                        <div className='formLoginCarPark'>
                            <div style={{ color: '#1d1d1d' }}>Register</div>
                            <Form name="register" onFinish={onFinish} layout="vertical" requiredMark={false}>
                                <p style={{ color: '#1d1d1d' }}>Username</p>
                                <img className='iconuser' src={User} alt="User" />
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input placeholder="Enter your username" />
                                </Form.Item>

                                <p style={{ color: '#1d1d1d' }}>Password</p>
                                <img className='iconuser' src={Lock} alt="Lock" />
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password placeholder="Enter your password" />
                                </Form.Item>

                                <p style={{ color: '#1d1d1d' }}>Email</p>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your email!' },
                                        { type: 'email', message: 'Invalid email format!' },
                                    ]}
                                >
                                    <Input placeholder="Enter your email" />
                                </Form.Item>

                                <p style={{ color: '#1d1d1d' }}>First Name</p>
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true, message: 'Please input your first name!' }]}
                                >
                                    <Input placeholder="Enter your first name" />
                                </Form.Item>

                                <p style={{ color: '#1d1d1d' }}>Last Name</p>
                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true, message: 'Please input your last name!' }]}
                                >
                                    <Input placeholder="Enter your last name" />
                                </Form.Item>

                                <p style={{ color: '#1d1d1d' }}>Phone Number</p>
                                <Form.Item
                                    name="tel"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input placeholder="Enter your phone number" />
                                </Form.Item>

                                <p style={{ color: '#1d1d1d' }}>Role</p>
                                <Form.Item
                                    name="status"
                                    rules={[{ required: true, message: 'Please select your role!' }]}
                                >
                                    <Select placeholder="Select your role">
                                        <Option value="Customer">Customer</Option>
                                        <Option value="ParkingAttendant">Parking Attendant</Option>
                                    </Select>
                                </Form.Item>

                                <div style={{ color: '#C9AF62', fontWeight: '400' }}>
                                    <a href="/CarPark" style={{ color: '#C9AF62', fontWeight: '400' }}>
                                        Already have an account? Login now!
                                    </a>
                                </div>

                                <div className="LoginButton">
                                    <Form.Item>
                                        <button>
                                            REGISTER
                                            <img src={Arrow} alt="Arrow" />
                                        </button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                    </span>
                </div>
            </div>
        </>
    );
};
