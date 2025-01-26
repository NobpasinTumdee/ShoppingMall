import React, { useState } from "react";
import './SignUp.css'
import { Form, Input, message, Select, Upload, UploadFile, UploadProps } from 'antd';
import { UsersInterface } from "../../interfaces/UsersInterface";
import { CreateUser , ResetPassword } from '../../services/https';
import Arrow from '../../assets/icon/ForPage/LoginIcon/Arrow.png';
// import User from '../../assets/icon/ForPage/LoginIcon/User.png';
// import Lock from '../../assets/icon/ForPage/LoginIcon/Lock.png';
// import LOGOS from '../../assets/icon/LOGOS.png';
import { PlusOutlined } from "@ant-design/icons";
import Stonk from '../../assets/icon/ForPage/Job/Klee.png';
import Bennett from '../../assets/icon/ForPage/Job/Noelle.png';
import Video from '../../assets/Video/background.mp4'
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish = async (values: UsersInterface) => {
        values.Profile = fileList[0].thumbUrl;
        console.log("values: ", values)
        let res = await CreateUser(values);
        console.log(res);
        if (res.status === 201) {
            messageApi.open({
                type: "success",
                content: "sign up success!",
            });
            setTimeout(function () {
                location.href = "/";
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "กรุณาเปลี่ยนชื่อ ชื่อนี้ถูกใช้แล้ว!",
            });
        }
    };

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onChangeUpload: UploadProps["onChange"] = ({ fileList: newFileList, }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src && file.originFileObj) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as File);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>
            {contextHolder}
            <div className='backgroud'></div>
            <video autoPlay loop muted playsInline>
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="singup">
                <div className="singupL">
                    <img src={Stonk} />
                </div>
                <div className="singupR">
                    <div style={{ color: '#1d1d1d', fontSize: '40px' }}>Register</div>
                    <Form name="register" onFinish={onFinish} layout="vertical" requiredMark={false}>
                        <div className="formsingup">
                            <p style={{ color: '#1d1d1d',fontWeight:'700'}}>Profile Image</p>
                            <Form.Item
                                name="Profile"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e?.fileList}
                            >
                                <Upload
                                    fileList={fileList}
                                    onChange={onChangeUpload}
                                    onPreview={onPreview}
                                    beforeUpload={(file) => {
                                        setFileList([...fileList, file]);
                                        return false;
                                    }}
                                    maxCount={1}
                                    multiple={false}
                                    listType="picture-circle"
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <p style={{color: '#1d1d1d',fontWeight:'700'}}>Username</p>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="Enter your username" />
                            </Form.Item>
                            <p style={{color: '#1d1d1d',fontWeight:'700'}}>Password</p>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Enter your password" />
                            </Form.Item>
                            <p style={{color: '#1d1d1d',fontWeight:'700'}}>Email</p>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Invalid email format!' },
                                ]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>
                            <p style={{color: '#1d1d1d',fontWeight:'700'}}>First Name</p>
                            <Form.Item
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                            >
                                <Input placeholder="Enter your first name" />
                            </Form.Item>
                            <p style={{color: '#1d1d1d',fontWeight:'700'}}>Last Name</p>
                            <Form.Item
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                            >
                                <Input placeholder="Enter your last name" />
                            </Form.Item>
                            <p style={{color: '#1d1d1d',fontWeight:'700'}}>Age</p>
                            <Form.Item
                                name="age"
                                rules={[{ required: true, message: 'Please input your age!' }]}
                            >
                                <Select placeholder="Select your age">
                                    {Array.from({ length: 100 }, (_, i) => (
                                        <Select.Option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <p style={{color: '#1d1d1d',fontWeight:'700'}}>Phone Number</p>
                            <Form.Item
                                name="tel"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>
                            <div style={{ color: '#C9AF62', fontWeight: '400' }}>
                                <a href="/" style={{ color: '#C9AF62', fontWeight: '400' }}>
                                    Already have an account? Login now!
                                </a>
                            </div>
                        </div>
                        <div className="LoginButton" style={{margin: '30px 0'}}>
                            <Form.Item>
                                <button>
                                    REGISTER
                                    <img src={Arrow} alt="Arrow" />
                                </button>
                            </Form.Item>
                        </div>
                    </Form>
                    <img onClick={() => navigate("/")} style={{position:'absolute', top:'20px', right:'20px',cursor:'pointer'}} width={30} src="https://static-00.iconduck.com/assets.00/return-icon-2048x1866-c8h3yn0w.png" alt="" />
                </div>
            </div>
        </>
    );
};
export default SignUp;

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    //=================================form=================================
    const [formData, setFormData] = useState({
        UserName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmitEdit = async (e: any) => {
        e.preventDefault();
        console.log(formData.UserName);
        console.log(formData.Email);
        console.log(formData.Password);
        if (formData.Password !== formData.ConfirmPassword) {
            messageApi.open({
                type: "info",
                content: "Passwords do not match.",
            });
        }else{
            reset(formData);
        }
    };
    const reset = async (formData: any) => {
        const values: UsersInterface = {
            UserName: formData.UserName,
            Email: formData.Email,
            Password: formData.Password,
        }
        try {
            const res = await ResetPassword(values);
            if (res.status === 200) {
                messageApi.open({
                    type: "success",
                    content: "Reset Password success!",
                });
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (error) {
            console.error("Error Edit:", error);
        }
    }

    return (
        <>
            {contextHolder}
            <div className='backgroud'></div>
            <video autoPlay loop muted playsInline>
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="singup">
                <div className="singupL" style={{width: '35%'}}>
                    <img src={Bennett} />
                </div>
                <div className="resetR">
                    <h1>Reset Password</h1>
                    <form onSubmit={handleSubmitEdit}>
                        <p style={{margin:'0 10px', fontWeight:'500',color:'#886d4b'}}>User Name</p>
                        <input
                            type="text"
                            id="UserName"
                            name="UserName"
                            value={formData.UserName}
                            onChange={handleChange}
                            required
                        />
                        <p style={{margin:'0 10px', fontWeight:'500',color:'#886d4b'}}>Email</p>
                        <input
                            type="text"
                            id="Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                        />
                        <div style={{display: 'flex',justifyContent:'start'}}>
                            <div style={{width:'45%'}}>
                                <p style={{margin:'0 10px', fontWeight:'500',color:'#886d4b'}}>New Password</p>
                                <input
                                    type="Password"
                                    id="Password"
                                    name="Password"
                                    value={formData.Password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div style={{width:'45%'}}>
                                <p style={{margin:'0 10px', fontWeight:'500',color:'#886d4b'}}>Confirm Password</p>
                                <input
                                    type="password"
                                    id="ConfirmPassword"
                                    name="ConfirmPassword"
                                    value={formData.ConfirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button className='SubmitEdit' style={{backgroundColor:'#E8D196',padding:'10px 20px',margin:'20px 0'}}>ResetPassword</button>
                    </form>
                    <img onClick={() => navigate("/")} style={{position:'absolute', top:'20px', right:'20px',cursor:'pointer'}} width={30} src="https://static-00.iconduck.com/assets.00/return-icon-2048x1866-c8h3yn0w.png" alt="" />
                </div>
            </div>
        </>
    );
};