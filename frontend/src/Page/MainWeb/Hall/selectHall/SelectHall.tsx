import React, { useEffect, useState } from 'react';
import { ListHall } from '../../../../services/https'; // ฟังก์ชันสำหรับดึงข้อมูล Hall จาก API
import { HallInterface } from '../../../../interfaces/HallInterface'; // Interface ของข้อมูล Hall
import { Card, Button, Row, Col, Spin, message } from 'antd'; // ใช้ Ant Design
import './SelectHall.css';
import { useNavigate } from 'react-router-dom';

const SelectHall: React.FC = () => {
  const navigate = useNavigate();

  const [hallList, setHallList] = useState<HallInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchHall();
  }, []);

  const fetchHall = async () => {
    const res = await ListHall();
    try {
     
      if (res.status === 200) {
        setHallList(res.data);
      } else {
        message.error("Failed to fetch hall data.");
      }
    } catch (error) {
      console.error("Error fetching hall data:", error);
      message.error("An error occurred while fetching hall data.");
    } finally {
      setLoading(false); // ปิดสถานะ Loading
    }
  };

  // ฟังก์ชันสำหรับการคลิกเลือก Hall
  const handleHallClick = (id: string) => {
    console.log("Hall ID being passed:", id); // ตรวจสอบว่า id ถูกส่งไปอย่างถูกต้อง
    navigate(`/calendar/${id}`);
  };
  

  return (
    <>
      <div style={{ height: '110px', zIndex: '0' }}></div>
      <div className="hall-list">
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Select Hall</h1>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <Spin size="large" />
          </div>
        ) : hallList.length > 0 ? (
          <Row gutter={[16, 16]} justify="center">
            {hallList.map((hall) => (
              <Col key={hall.ID} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  title={`${hall.HallName}`}
                  cover={
                    <img
                      src={hall.ImageHall}
                      alt={hall.HallName} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  }
                  style={{ borderRadius: '10px', textAlign: 'center' }}
                  bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Button
                    type="primary"
                    onClick={() => handleHallClick(hall.ID!.toString())}
                  >
                    Select
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No halls available.</p>
        )}
      </div>
    </>
  );
};

export default SelectHall;
