import React from 'react';
import './Login.css'
import { Form, Input ,message} from 'antd';
import {SignInInterface} from "../../interfaces/SignIn";
import { SignIn } from '../../services/https';
const Login: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values: SignInInterface) => {
        let res = await SignIn(values);
    
        if (res.status === 200) {
            messageApi.success("Sign-in successful");
    
            localStorage.setItem("isLogin", "true");
            localStorage.setItem("token_type", res.data.token_type);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id);

            location.href = "/Main";
            
        } else {
            messageApi.error(res.data.error);
        }
        
    };
    return(
        <>
            {contextHolder}
            <div className='Logincontanner'>
                <div className='Logininput'>
                    Login
                </div>
                <div className='Logintextbox'>
                    <Form
                        name="login"
                        onFinish={onFinish}
                        requiredMark={false}
                    >
                        <div style={{color: '#ffffff'}}>UserName</div>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="username" />
                        </Form.Item>
                        <div style={{color: '#ffffff'}}>Password</div>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="password" />
                        </Form.Item>
                        <a href="/" >FORGOT PASSWORD</a>
                        <div className="LoginButton">
                        <Form.Item>
                            <button style={{
                                borderRadius: '20px',
                                padding: '10px',
                                width: '100px',
                            }}>
                                LOGIN
                            </button>
                        </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};
export default Login;