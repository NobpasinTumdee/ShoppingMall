import React, { useEffect, useState } from 'react';
import { ListHall } from '../../../../services/https'; // ฟังก์ชันสำหรับดึงข้อมูล Hall จาก API
import { HallInterface } from '../../../../interfaces/HallInterface'; // Interface ของข้อมูล Hall
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const handleHallClick = (HallID: string) => {
    navigate('Hall/BookingHall', { state: { HallID } });
  };
const SelectHall: React.FC = () => {
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
            <h1>Select Hall</h1>
            <div>
                {/* เช็คว่ามีข้อมูลหรือไม่ */}
                {Hall.length > 0 ? (
                    Hall.map((data) => (
                        <div key={data.ID}>
                            <h2>{data.hallName}</h2>
                            <p>ID: {data.ID}</p>
                        </div>
                    ))
                ) : (
                    <p>No halls available.</p> // ข้อความแสดงเมื่อไม่มีข้อมูล
                )}
            </div>
        </>
    );
};

export default SelectHall;
