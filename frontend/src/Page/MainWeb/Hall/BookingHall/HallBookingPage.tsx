import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, DatePicker, Select, message } from 'antd';
import axios from 'axios'; // สำหรับเรียก API
import SideBar from '../../../Component/SideBar'; // นำเข้า SideBar ที่สร้างไว้
import './HallBookingPage.css';
import { BookingHallInterface } from '../../../../interfaces/HallInterface';
import { HallInterface } from '../../../../interfaces/HallInterface';
import { useParams } from "react-router-dom";
import { NavBar } from '../../../Component/NavBar';

const { Sider, Content } = Layout;
const { Option } = Select;

const BookingHall: React.FC = () => {
    const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();
    const [Hall, setHall] = useState<HallInterface[]>([]); // เก็บข้อมูลห้องประชุม
    const [loading, setLoading] = useState<boolean>(true); // สถานะการโหลด

    // ฟังก์ชันดึงข้อมูลห้องประชุมจาก API
    useEffect(() => {
        const fetchHalls = async () => {
        };

        fetchHalls();
    }, []);

    // ฟังก์ชันเมื่อมีการส่งฟอร์ม
    const onFinish = (values: BookingHallInterface) => {
        console.log('Success:', values);
        message.success('Booking successfully submitted!');
        form.resetFields();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Booking submission failed!');
    };

    return (
        <>
        <NavBar />
            <div style={{ height: '110px', zIndex: '0' }}></div>
            <Layout style={{ minHeight: '750px' }}>
                {/* Sidebar */}
                <Sider width={250} theme="dark">
                    <SideBar />
                </Sider>

                {/* Main Content */}
                <Layout style={{ padding: '10px' }}>
                    <Content style={{ padding: 24, margin: 0, background: '#fff' }}>
                        <h2>จองห้องประชุม</h2>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={{ maxWidth: '600px', margin: '0 auto' }}
                        >
                            {/* ชื่อผู้จอง */}
                            <Form.Item
                                label="ชื่อผู้จอง"
                                name="CustomerName"
                                rules={[{ required: true, message: 'กรุณากรอกชื่อผู้จอง' }]}
                            >
                                <Input placeholder="ชื่อผู้จอง" />
                            </Form.Item>

                            {/* อีเมล */}
                            <Form.Item
                                label="อีเมล"
                                name="CustomerEmail"
                                rules={[
                                    { required: true, message: 'กรุณากรอกอีเมล' },
                                    { type: 'email', message: 'กรุณากรอกอีเมลที่ถูกต้อง' }
                                ]}
                            >
                                <Input placeholder="อีเมล" />
                            </Form.Item>

                            {/* หมายเลขโทรศัพท์ */}
                            <Form.Item
                                label="หมายเลขโทรศัพท์"
                                name="CustomerPhone"
                                rules={[{ required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์' }]}
                            >
                                <Input placeholder="หมายเลขโทรศัพท์" />
                            </Form.Item>

                            {/* ที่อยู่ */}
                            <Form.Item
                                label="ที่อยู่"
                                name="CustomerAddress"
                                rules={[{ required: true, message: 'กรุณากรอกที่อยู่' }]}
                            >
                                <Input placeholder="ที่อยู่" />
                            </Form.Item>

                            {/* วันที่เริ่มต้น */}
                            <Form.Item
                                label="วันที่เริ่มต้น"
                                name="StartDateTime"
                                rules={[{ required: true, message: 'กรุณาเลือกวันที่และเวลาสิ้นสุด' }]}
                            >
                                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                            </Form.Item>
                            {/* วันที่สิ้นสุด */}
                            <Form.Item
                                label="วันที่สิ้นสุด"
                                name="EndDateTime"
                                rules={[{ required: true, message: 'กรุณาเลือกวันที่และเวลาสิ้นสุด' }]}
                            >
                                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
                            </Form.Item>

                            {/* ปุ่มส่ง */}
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%', backgroundColor: '#E8D196', color: '#000' }}
                                >
                                    จองห้องประชุม
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default BookingHall;
