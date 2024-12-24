import React, { useState } from 'react';
import './Login.css'
import { Form, Input ,message} from 'antd';
import {SignInInterface} from "../../interfaces/SignIn";
import { SignIn } from '../../services/https';
import Arrow from '../../assets/icon/ForPage/LoginIcon/Arrow.png';
import User from '../../assets/icon/ForPage/LoginIcon/User.png';
import Lock from '../../assets/icon/ForPage/LoginIcon/Lock.png';
import LOGOS from '../../assets/icon/LOGOS.png';

import {IntroWeb} from '../Component/NavBar';
const Login: React.FC = () => {
    const onFinish = async (values: SignInInterface) => {
        let res = await SignIn(values);
    
        if (res.status === 200) {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("token_type", res.data.token_type);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);

            message.success("Login successful");
            introToMain();
            
        } else {
            message.error(res.data.error);
        }
        
    };
    const [intro, setIntro] = useState(false);
    const introToMain = async () => {
        setIntro(true);
        setTimeout(() => {
            location.href = "/Main";
        }, 9000);
    };
    const close = async () => {
        setIntro(false);
        location.href = "/Main";
    }
    return(
        <>
            {intro && 
                <div onClick={close}><IntroWeb /></div>
            }
            <div className='backgroud'></div>
            <div className='Logincontanner'>
                <div className='Loginsub'>
                <span className='LoginLeft'><p><img style={{width: '100px'}} src={LOGOS} alt="LOGOS" />ICONIC</p><p>Relaxing Your Mind From Madness Your Mind From</p></span>
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
export default Login;