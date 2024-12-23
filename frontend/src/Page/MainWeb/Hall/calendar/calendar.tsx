import React, { useState, useEffect } from "react";
import { Layout, Calendar, Button } from "antd";
import { isSameDay } from "date-fns";
import SideBar from "../../../Component/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import { BookingHallInterface } from "../../../../interfaces/HallInterface";
import { GetBookingByHallID } from "../../../../services/https"; // สร้าง service ใหม่สำหรับ API นี้
import { NavBar } from "../../../Component/NavBar";

const { Content, Sider } = Layout;

const CalendarPage: React.FC = () => {
    const [bookings, setBookings] = useState<BookingHallInterface[]>([]);

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

    const handleBookingClick = () => {
        navigate(`/bookings/${hallId}`);
    };

    const dateCellRender = (date: Date) => {
        const isDateInRange = bookings.some(
            (booking) =>
                new Date(booking.StartDateTime) <= date &&
                date <= new Date(booking.EndDateTime)
        );

        const dailyBookings = getBookingsByDate(date);

        return (
            <div
                style={{
                    position: "relative",
                    backgroundColor: isDateInRange ? "rgba(255, 0, 0, 0.3)" : undefined,
                    borderRadius: "10px",
                    padding: "5px",
                }}
            >
                <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                    {dailyBookings.map((booking) => (
                        <li
                            key={booking.ID}
                            style={{
                                color: "green",
                                fontSize: "12px",
                            }}
                        >
                            {booking.CustomerName} -{" "}
                            {booking.Hall?.HallName || "ไม่มีห้องประชุม"}
                        </li>
                    ))}
                </ul>
            </div>
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
                        <h2>ปฏิทินการจองห้องประชุม </h2>
                        <Calendar
                            dateCellRender={dateCellRender}
                            style={{ borderRadius: "10px" }}
                        />
                        <Button
                            type="primary"
                            onClick={handleBookingClick}
                            style={{ marginTop: "20px" }}
                        >
                            จองห้องประชุม
                        </Button>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default CalendarPage;
