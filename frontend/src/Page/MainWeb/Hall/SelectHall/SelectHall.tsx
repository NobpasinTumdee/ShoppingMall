import React, { useEffect, useState } from 'react';
import { ListHall } from '../../../../services/https'; // ฟังก์ชันสำหรับดึงข้อมูล Hall จาก API
import { HallInterface } from '../../../../interfaces/HallInterface'; // Interface ของข้อมูล Hall
import { Card, Button, Row, Col } from 'antd'; // ใช้ Ant Design
import './SelectHall.css';
import { useNavigate } from 'react-router-dom';



const SelectHall: React.FC = () => {
    const navigate = useNavigate();
    const handleHallClick = (HallID: string) => {
    navigate('calendar', { state: { HallID } });
  };
    // สร้าง state สำหรับเก็บข้อมูลห้อง
    const [Hall, setHall] = useState<HallInterface[]>([]);
    
    // ใช้ useEffect เพื่อดึงข้อมูล Hall เมื่อ component ถูก mount
    useEffect(() => {
        fetchHall();
    }, []); // [] หมายถึง useEffect จะทำงานแค่ครั้งแรกที่ component ถูก mount

    // ฟังก์ชันสำหรับดึงข้อมูล Hall จาก API
    const fetchHall = async () => {
        try {
            const res = await ListHall(); // เรียก API
            if (res.status === 200) { // เช็คสถานะของการตอบกลับ
                setHall(res.data); // เก็บข้อมูล Hall ที่ได้ลงใน state
                console.log("Fetched Hall Data:", res.data);
            } else {
                console.error("Failed to fetch hall data");
            }
        } catch (error) {
            console.error("Error fetching hall data:", error);
        }
    };

    // การ render ข้อมูล
    return (
        <>
            <div style={{ height: '110px', zIndex: '0' }}></div>
            <div className='hall-list'>
                <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Select Hall</h1>
                <Row gutter={[16, 16]} justify="center">
                    {Hall.length > 0 ? (
                        Hall.map((hall) => (
                            <Col key={hall.ID} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    title={`Hall: ${hall.HallName}`}
                                    cover={
                                        <img
                                            src={hall.ImageHall} 
                                        />
                                    }
                                    style={{ borderRadius: '10px', textAlign: 'center' }}
                                    bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() => handleHallClick(hall.ID.toString())}
                                    >
                                        Select
                                    </Button>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center' }}>No halls available.</p>
                    )}
                </Row>
            </div>
        </>
    );
};

export default SelectHall;
