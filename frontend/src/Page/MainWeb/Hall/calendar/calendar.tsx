import React, { useEffect, useState } from "react"; 
import { Layout, Button, Calendar } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../../../Component/NavBar";
import SideBar from "../../../Component/SideBar";
import { GetBookingByHallID } from "../../../../services/https";
import { BookingHallInterface } from "../../../../interfaces/HallInterface";
import dayjs, { Dayjs } from "dayjs"; 
const { Sider,Content } = Layout;

const Carlendar: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ bookings, setBookings] = useState<BookingHallInterface[]>([]);
    
    useEffect(() => {
        console.log("Current hall ID:", id);
        const fetchBookings = async () => {
            try {
                if (id) {
                    const response = await GetBookingByHallID(id);
                    setBookings(response.data || []);
                    console.log(">>>>>",response.data);
                }
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
        };

        fetchBookings();
    }, [id]);

    const handleBookingClick = () => {
        navigate(`/booking/${id}`);
    };
    const cellRender = (date: Dayjs) => {
        // กรองการจองที่เริ่มในวันที่ปัจจุบัน
        const dayStartBookings = bookings.filter((booking) =>
            dayjs(booking.StartDateTime).isSame(date, "day")
        );
    
        // กรองการจองที่สิ้นสุดในวันที่ปัจจุบัน
        const dayEndBookings = bookings.filter((booking) =>
            dayjs(booking.EndDateTime).isSame(date, "day")
        );
    
        // กรองการจองที่ครอบคลุมวันนั้นในช่วงเวลา
        const dayInRangeBookings = bookings.filter((booking) =>
            dayjs(booking.StartDateTime).isBefore(date, "day") &&
            dayjs(booking.EndDateTime).isAfter(date, "day")
        );
    
        return (
            <div style={{ padding: "5px" }}>
                {dayStartBookings.length > 0 && (
                    <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                        <li>
                            <strong>เริ่ม:</strong>
                        </li>
                        {dayStartBookings.map((booking, index) => (
                            <li key={`start-${index}`}>
                                {dayjs(booking.StartDateTime).format("HH:mm")} -{" "}
                                {dayjs(booking.EndDateTime).format("HH:mm")}
                            </li>
                        ))}
                    </ul>
                )}
                {dayEndBookings.length > 0 && (
                    <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                        <li>
                            <strong>สิ้นสุด:</strong>
                        </li>
                        {dayEndBookings.map((booking, index) => (
                            <li key={`end-${index}`}>
                                {dayjs(booking.StartDateTime).format("HH:mm")} -{" "}
                                {dayjs(booking.EndDateTime).format("HH:mm")}
                            </li>
                        ))}
                    </ul>
                )}
                {dayInRangeBookings.length > 0 && (
                    <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                        <li>
                            <strong>ระหว่าง:</strong>
                        </li>
                        {dayInRangeBookings.map((booking, index) => (
                            <li key={`range-${index}`}>
                                {dayjs(booking.StartDateTime).format("HH:mm")} -{" "}
                                {dayjs(booking.EndDateTime).format("HH:mm")}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };
    
    return (
        <>
            <NavBar /><div style={{ height: "110px", zIndex: "0" }}></div>
            <Layout style={{ minHeight: "750px" }}>
                <Sider width={250} theme="dark">
                    <SideBar />
                </Sider>
                <Layout style={{ padding: "2px" }}>
                    <Content style={{ padding: 24, margin: 0, background: "#fff" }}>
                        <h2>ปฏิทินการจองห้องประชุม</h2>
                        <Calendar 
                            cellRender={cellRender} style={{ borderRadius: "10px" }} />                        
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

export default Carlendar;
