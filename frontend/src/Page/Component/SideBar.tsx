import React from 'react';
import { Menu } from 'antd';
import { CalendarOutlined, BookOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HallInterface } from '../../interfaces/HallInterface';

interface SideBarProps {
    hall: HallInterface; // รับข้อมูล Hall เป็น props
}

const SideBar: React.FC<SideBarProps> = ({ hall }) => {
    const navigate = useNavigate();

    return (
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item
                key="1"
                icon={<CalendarOutlined />}
                onClick={() => navigate(`/bookings/hall/${hall.ID}`)} // ส่ง hall.ID ไปที่ URL
            >
                ปฏิทินการใช้ห้อง
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<BookOutlined />}
                onClick={() => navigate(`/bookings/${hall.ID}`)} // ส่ง hall.ID ไปที่ URL
            >
                จองห้องประชุม
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<FileTextOutlined />}
                onClick={() => navigate("/reports")}
            >
                รายงานการจองห้องประชุม
            </Menu.Item>
            <Menu.Item
                key="4"
                icon={<SettingOutlined />}
                onClick={() => navigate("/admin-info")}
            >
                ข้อมูลผู้ดูแล
            </Menu.Item>
        </Menu>
    );
};

export default SideBar;
