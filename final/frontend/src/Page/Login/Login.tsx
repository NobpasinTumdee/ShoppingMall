import React, { useState } from 'react';
import './Login.css'
import { Form, Input, message } from 'antd';
import { SignInInterface } from "../../interfaces/SignIn";
import { SignIn } from '../../services/https';
import Arrow from '../../assets/icon/ForPage/LoginIcon/Arrow.png';
import User from '../../assets/icon/ForPage/LoginIcon/User.png';
import Lock from '../../assets/icon/ForPage/LoginIcon/Lock.png';
import LOGOS from '../../assets/icon/LOGOS.png';
import Video from '../../assets/Video/background.mp4';
import Zhongli from '../../assets/icon/ForPage/Job/Zhongli.png';

import { IntroWeb } from '../Component/NavBar';
const Login: React.FC = () => {
    const onFinish = async (values: SignInInterface) => {
        let res = await SignIn(values);

        if (res.status === 200) {
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("token_type", res.data.token_type);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("user_name", res.data.user_name);

            message.success(`Welcome ${res.data.user_name}`);

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
    return (
        <>
            {intro &&
                <div onClick={close}><IntroWeb /></div>
            }
            <video autoPlay loop muted playsInline>
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='backgroud'></div>
            <div className="singup">
                <div className="singupL">
                    <img src={Zhongli} />
                </div>
                <div className="singupR">
                    <div style={{ color: '#B0946F', fontSize:'48px',fontFamily:'"Trirong", serif',fontWeight:'600'}}>Login</div>
                    <p style={{ color: '#B0946F', fontSize:'12px',fontFamily:'"Trirong", serif',fontWeight:'100'}}>Welcome to ICONIC Relaxing Your Mind From Madness Your Mind</p>
                    <div className='Logoforlogin'>
                        <img  src={LOGOS} width={140} height={100} />
                    </div>
                    <Form
                        name="login"
                        onFinish={onFinish}
                        requiredMark={false}
                    >
                        <p style={{ color: '#B0946F' }}>UserName</p>
                        <img className='iconuser' src={User} alt="User" />
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >

                            <Input className="customInput" placeholder="User Name" />
                        </Form.Item>
                        <p style={{ color: '#B0946F'}}>Password</p>
                        <img className='iconuser' src={Lock} alt="Lock" />
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >

                            <Input.Password className="customInput" placeholder="password" />
                        </Form.Item>
                        <div style={{ color: '#C9AF62', fontWeight: '400' }} ><a style={{ color: '#C9AF62', fontWeight: '400' }} href="/reset" >FORGOT PASSWORD</a>{" Or "}<a style={{ color: '#C9AF62', fontWeight: '400' }} href="/signup"> SIGN UP NOW !</a></div>
                        <div className="LoginButton1">
                            <Form.Item>
                                <button>
                                    LOGIN
                                    <img src={Arrow} alt="Arrow" />
                                </button>
                            </Form.Item>
                            <a href="/Main">Log in as a guest</a>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default Login;