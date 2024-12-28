import React, { useState } from "react";
import './SignUp.css'
import { Form, Input ,message, Select, Upload, UploadFile, UploadProps } from 'antd';
import { SignUpInterface } from "../../interfaces/SignIn";
import {  CreateUser } from '../../services/https';
import Arrow from '../../assets/icon/ForPage/LoginIcon/Arrow.png';
import User from '../../assets/icon/ForPage/LoginIcon/User.png';
import Lock from '../../assets/icon/ForPage/LoginIcon/Lock.png';
import LOGOS from '../../assets/icon/LOGOS.png';
import { PlusOutlined } from "@ant-design/icons";

const SignUp: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: SignUpInterface) => {
        values.profile = fileList[0].thumbUrl;
        console.log("values: ",values)
        let res = await CreateUser(values);
        console.log(res);
        if (res.status === 201) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
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
    const onChangeUpload: UploadProps["onChange"] = ({fileList: newFileList,}) => {
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
            <div className='SignUpcontanner'>
                <div className='Loginsub'>
                <span className='SignUpLeft'><p><img style={{width: '100px'}} src={LOGOS} alt="LOGOS" />ICONIC</p><p>Relaxing Your Mind From Madness Your Mind From</p></span>
                <span className='SignUprigth'>
                    <div className='formSignUp'>
                            <div style={{ color: '#1d1d1d' }}>Register</div>
                            <Form name="register" onFinish={onFinish} layout="vertical" requiredMark={false}>
                                <p style={{ color: '#1d1d1d' }}>Profile Image</p>
                                <Form.Item
                                    name="profile"
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
                                <p style={{ color: '#1d1d1d' }}>Age</p>
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
                                <p style={{ color: '#1d1d1d' }}>Phone Number</p>
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
export default SignUp;