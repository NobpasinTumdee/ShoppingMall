import React from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; 
import { FormOutlined,CalendarOutlined, CarryOutOutlined,CaretLeftOutlined } from '@ant-design/icons';
import { Menu } from "antd";

const SideBar: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Menu mode="inline" style={{ height: '100%', borderRight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
            <Menu.Item
                key="1"
                icon={<CalendarOutlined />}
                onClick={() => navigate(`/calendar/${id}`)} // ส่ง hall.ID ไปที่ URL
            >
                ปฏิทินการใช้ห้องประชุม
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<FormOutlined />}
                onClick={() => navigate(`/booking/${id}`)} // ส่ง hall.ID ไปที่ URL
            >
                จองห้องประชุม
            </Menu.Item>
            <Menu.Item
                key="3"
                icon={<CarryOutOutlined />}
                onClick={() => navigate(`/listbooking/${id}`)}
            >
                รายการจองใช้ห้องประชุม
            </Menu.Item>
        </div>
        {/* เมนู "เลือกห้องประชุม" จะอยู่ด้านล่าง */}
        <Menu.Item
            key="4"
            icon={<CaretLeftOutlined />}
            onClick={() => navigate("/Hall")}
            style={{ marginTop: 'auto' }} // ทำให้เมนูอยู่ด้านล่างสุด
        >
            เลือกห้องประชุม
        </Menu.Item>
    </Menu>
  );
}

export default SideBar;
