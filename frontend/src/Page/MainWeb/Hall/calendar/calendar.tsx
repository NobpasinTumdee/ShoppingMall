import React, { useState, useEffect } from "react";
import { Layout, Calendar, Modal, Button, List } from "antd";
import { format, isSameDay } from "date-fns";
import SideBar from "../../../Component/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import { BookingHallInterface } from "../../../../interfaces/HallInterface";
import { GetBookingByHallID } from "../../../../services/https"; // สร้าง service ใหม่สำหรับ API นี้
import { NavBar } from "../../../Component/NavBar";

const { Content, Sider } = Layout;

const CalendarPage: React.FC = () => {
    const [bookings, setBookings] = useState<BookingHallInterface[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [visible, setVisible] = useState(false);

    const { hallId } = useParams<{ hallId: string }>(); // รับ hallID จาก URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (hallId) {
                    const response = await GetBookingByHallID(hallId); // เรียก API ใหม่
                    setBookings(response.data || []);
                }
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
        };

        fetchBookings();
    }, [hallId]);

    const getBookingsByDate = (date: Date) => {
        return bookings.filter((booking) =>
            isSameDay(new Date(booking.StartDateTime), date)
        );
    };

    const onSelectDate = (date: Date) => {
        setSelectedDate(date);
        setVisible(true);
    };

    const handleBookingClick = () => {
        navigate(`/bookings/${hallId}`);
    };

    const dateCellRender = (date: Date) => {
        const dailyBookings = getBookingsByDate(date);

        return (
            <ul style={{ padding: 0, position: "relative" }}>
                {dailyBookings.map((booking) => (
                    <li
                        key={booking.ID}
                        style={{
                            listStyle: "none",
                            color: "green",
                            fontSize: "12px",
                        }}
                    >
                        {booking.CustomerName} -{" "}
                        {booking.Hall?.HallName || "ไม่มีห้องประชุม"}
                    </li>
                ))}
                {dailyBookings.length > 0 && (
                    <div
                        style={{
                            position: "absolute",
                            top: 5,
                            left: 5,
                            right: 5,
                            bottom: 5,
                            backgroundColor: "red",
                            borderRadius: "50%",
                            opacity: 0.4,
                        }}
                    />
                )}
            </ul>
        );
    };

    return (
        <>
        <NavBar />
            <div style={{ height: "110px", zIndex: "0" }}></div>
            <Layout style={{ minHeight: "750px" }}>
                <Sider width={250} theme="dark">
                    <SideBar />
                </Sider>
                <Layout style={{ padding: "10px" }}>
                    <Content style={{ padding: 24, margin: 0, background: "#fff" }}>
                        <h2>ปฏิทินการจองห้องประชุม (Hall ID: {hallId})</h2>
                        <Calendar
                            onSelect={(date) => onSelectDate(date.toDate())}
                            dateCellRender={dateCellRender}
                            style={{ borderRadius: "10px" }}
                        />
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
                            {getBookingsByDate(selectedDate || new Date()).length > 0 ? (
                                <List
                                    dataSource={getBookingsByDate(selectedDate || new Date())}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                title={`ห้อง: ${item.Hall?.HallName || "ไม่พบข้อมูลห้อง"}`}
                                                description={`ผู้จอง: ${item.CustomerName}, เวลา: ${format(
                                                    new Date(item.StartDateTime),
                                                    "HH:mm"
                                                )} - ${format(new Date(item.EndDateTime), "HH:mm")}`}
                                            />
                                        </List.Item>
                                    )}
                                />
                            ) : (
                                <p>ไม่มีการจองในวันที่เลือก</p>
                            )}
                        </Modal>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default CalendarPage;
