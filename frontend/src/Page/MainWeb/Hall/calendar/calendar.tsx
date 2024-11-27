import React, { useState, useEffect } from "react";
import { Layout, Calendar, Modal, Button, List, message } from "antd";
import { format, isSameDay, parseISO } from "date-fns";
import SideBar from "../../../Component/SideBar"; // Sidebar สำหรับเมนูด้านซ้าย
import { BookingHallInterface } from "../../../../interfaces/HallInterface";

const { Content, Sider } = Layout;

const CalendarPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingHallInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลการจองจาก API
  useEffect(() => {
    fetch("http://localhost:8000/Hall/celendar")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch(() => {
        message.error("ไม่สามารถโหลดข้อมูลการจองได้");
        setLoading(false);
      });
  }, []);

  // แปลงข้อมูลการจองตามวันที่
  const getBookingsByDate = (date: Date) => {
    return bookings.filter((booking) =>
      isSameDay(parseISO(booking.StartDateTime), date)
    );
  };

  // เมื่อเลือกวันที่ในปฏิทิน
  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
    setVisible(true);
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
            <Calendar
              onSelect={(date) => onSelectDate(date.toDate())}
              dateCellRender={(date) => {
                const dailyBookings = getBookingsByDate(date.toDate());
                return (
                  <ul style={{ padding: 0 }}>
                    {dailyBookings.map((booking) => (
                      <li key={booking.ID} style={{ listStyle: "none", color: "green" }}>
                        {booking.CustomerName}
                      </li>
                    ))}
                  </ul>
                );
              }}
            />

            {/* Modal แสดงรายละเอียดการจอง */}
            <Modal
              title={`รายละเอียดการจอง (${selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""})`}
              visible={visible}
              onCancel={() => setVisible(false)}
              footer={[
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
                        title={`ห้อง: ${item.ID}`}
                        description={`ผู้จอง: ${item.CustomerName}, เวลา: ${format(
                          parseISO(item.StartDateTime),
                          "HH:mm"
                        )} - ${format(parseISO(item.EndDateTime), "HH:mm")}`}
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
