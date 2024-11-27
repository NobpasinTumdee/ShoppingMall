import React from 'react';
import { Menu } from 'antd';
import { CalendarOutlined, BookOutlined, FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
    return (
      <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
        <Menu.Item key="1" icon={<CalendarOutlined />}>
            <Link to="/calendar">ปฏิทินการใช้ห้อง</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
            <Link to="/booking-status">สถานะการจองห้อง</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FileTextOutlined />}>
            <Link to="/reports">รายงานการจองห้องประชุม</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<SettingOutlined />}>
            <Link to="/admin-info">ข้อมูลผู้ดูแล</Link>
        </Menu.Item>
  </Menu>
    );
};

export default SideBar;
