import React, { useState, useEffect } from "react";
import { Layout, Calendar, Modal, Button, List, message, Spin } from "antd";
import { format, isSameDay, parseISO } from "date-fns";
import SideBar from "../../../Component/SideBar"; // Sidebar สำหรับเมนูด้านซ้าย
import { BookingHallInterface } from "../../../../interfaces/HallInterface";
import { useNavigate } from "react-router-dom";
import { GetBookinghall } from "../../../../services/https";

const { Content, Sider } = Layout;

const CalendarPage: React.FC = () => {
    const [bookings, setBookings] = useState<BookingHallInterface[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // State สำหรับจัดการข้อผิดพลาด
    const navigate = useNavigate();

    // ดึงข้อมูลการจองจาก API
    useEffect(() => {
        const bookingId = 1; // ใส่ ID ที่ต้องการดึง
        fetchData(bookingId); // เรียก API พร้อม ID
    }, []);

    const fetchData = async (id: number) => { // เพิ่มการรับ `id` เป็นพารามิเตอร์
        try {
            const res = await GetBookinghall(ID); // เรียก API พร้อมส่ง ID
            if (res.status === 200) {
                setBookings(res.data);
                console.log("Fetched Booking Data:", res.data);
            } else {
                console.error("Failed to fetch Booking data");
                setError("ไม่สามารถดึงข้อมูลได้");
            }
        } catch (error) {
            console.error("Error fetching booking data:", error);
            setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        } finally {
            setLoading(false);
        }
    };

    // แปลงข้อมูลการจองตามวันที่
    const getBookingsByDate = (date: Date) => {
        return bookings.filter((booking) => {
            const bookingDate = parseISO(String(booking.StartDateTime));
            return isSameDay(bookingDate, date);
        });
    };

    // เมื่อเลือกวันที่ในปฏิทิน
    const onSelectDate = (date: Date) => {
        setSelectedDate(date);
        setVisible(true);
    };

    // ฟังก์ชันสำหรับเมื่อกดปุ่ม Booking
    const handleBookingClick = () => {
        navigate(`/bookinghall`);
    };

    // ฟังก์ชัน render ปฏิทิน
    const dateCellRender = (date: Date) => {
        const dailyBookings = getBookingsByDate(date);
        return (
            <ul style={{ padding: 0 }}>
                {dailyBookings.map((booking) => (
                    <li key={booking.ID} style={{ listStyle: "none", color: "green" }}>
                        {booking.CustomerName} - {booking.ID}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <div style={{ height: "110px", zIndex: "0" }}></div>
            <Layout style={{ minHeight: "750px" }}>
                {/* Sidebar */}
                <Sider width={250} theme="dark">
                    <SideBar />
                </Sider>

                {/* Main Content */}
                <Layout style={{ padding: "10px" }}>
                    <Content style={{ padding: 24, margin: 0, background: "#fff" }}>
                        <h2>ปฏิทินการจองห้องประชุม</h2>

                        {loading ? (
                            <div style={{ textAlign: "center" }}>
                                <Spin tip="กำลังโหลดข้อมูล..." />
                            </div>
                        ) : error ? (
                            <div style={{ textAlign: "center", color: "red" }}>
                                <p>{error}</p>
                            </div>
                        ) : (
                            <Calendar
                                onSelect={(date) => onSelectDate(date.toDate())}
                                dateCellRender={dateCellRender}
                                style={{ borderRadius: '10px' }}
                            />
                        )}

                        {/* Modal แสดงรายละเอียดการจอง */}
                        <Modal
                            title={`รายละเอียดการจอง (${selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""})`}
                            visible={visible}
                            onCancel={() => setVisible(false)}
                            footer={[
                                <Button key="book" type="primary" onClick={handleBookingClick}>
                                    จองห้องประชุม
                                </Button>,
                                <Button key="close" onClick={() => setVisible(false)}>
                                    ปิด
                                </Button>,
                            ]}
                        >
                            {loading ? (
                                <p>กำลังโหลดข้อมูล...</p>
                            ) : (
                                <List
                                    dataSource={getBookingsByDate(selectedDate || new Date())}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={`ห้อง: ${item.Hall?.HallName}`}
                                                description={`ผู้จอง: ${item.CustomerName}, เวลา: ${format(
                                                    parseISO(String(item.StartDateTime)),
                                                    "HH:mm"
                                                )} - ${format(parseISO(String(item.EndDateTime)), "HH:mm")}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            )}
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default CalendarPage;
