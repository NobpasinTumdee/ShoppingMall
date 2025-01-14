import React, { useEffect, useState } from "react";
import { BookingHallInterface, HallInterface } from "../../../../interfaces/HallInterface";
import { NavBar } from "../../../Component/NavBar";
import { ListBookingByHallID, GetHallByID, DeleteBookingHall } from "../../../../services/https"; // เพิ่ม DeleteBookingHall
import { useParams } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import { Layout, Table, Tag, Image as AntImage, Button } from "antd";  // เพิ่ม Button และ Modal

const { Sider, Content } = Layout;

const Listbooking: React.FC = () => {
  const [hall, setHall] = useState<HallInterface | null>(null);
  const [bookings, setBookings] = useState<BookingHallInterface[]>([]);
  const [loading, setLoading] = useState(false); // สำหรับการโหลดข้อมูล
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("No hall ID provided");
        return;
      }

      setLoading(true);
      try {
        const hallResponse = await GetHallByID(id);
        setHall(hallResponse.data);

        const bookingResponse = await ListBookingByHallID(id);
        setBookings(bookingResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleDeleteBooking = async (bookingId: number) => {
    // ขอให้ลบการจองจาก API
    try {
      await DeleteBookingHall(bookingId.toString());
      setBookings(bookings.filter(booking => booking.ID !== bookingId)); // อัปเดตหลังจากลบ
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  const handleEditBooking = (booking: BookingHallInterface) => {
    // ฟังก์ชันสำหรับการแก้ไขข้อมูลการจอง
    console.log("Editing booking:", booking);
    // คุณสามารถเปิด Modal หรือเชื่อมโยงไปที่หน้าแก้ไขการจองที่นี่
  };

  const columns = [
    {
      title: "รูปภาพห้องประชุม",
      key: "ImageHall",
      render: () => (
        <AntImage
          src={hall?.ImageHall || "default-image-url.jpg"}
          alt="รูปภาพห้องประชุม"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      title: "ชื่อผู้จอง",
      dataIndex: "CustomerName",
      key: "CustomerName",
    },
    {
      title: "อีเมล",
      dataIndex: "CustomerEmail",
      key: "CustomerEmail",
    },
    {
      title: "วันที่เริ่มต้น",
      dataIndex: "StartDateTime",
      key: "StartDateTime",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "วันที่สิ้นสุด",
      dataIndex: "EndDateTime",
      key: "EndDateTime",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "สถานะ",
      key: "Status",
      dataIndex: "Status",
      render: (status: string) => (
        <Tag color={status === "ยังไม่ชำระเงิน" ? "red" : "green"}>
          {status === "ยังไม่ชำระเงิน" ? "ยังไม่ชำระเงิน" : "ชำระเงินแล้ว"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: BookingHallInterface) => (
        record.StatusPaymentHallID === "ยังไม่ชำระเงิน" && (
          <div>
            <Button onClick={() => handleEditBooking(record)} style={{ marginRight: 8 }}>
              แก้ไข
            </Button>
            <Button onClick={() => handleDeleteBooking(record.ID!)} danger>
              ยกเลิก
            </Button>
          </div>
        )
      ),
    },
  ];

  return (
    <>
      <NavBar />
      <div style={{ height: "110px", zIndex: "0" }}></div>
      <Layout>
        <Sider width={250} theme="dark">
          <SideBar />
        </Sider>
        <Layout>
          <Content style={{ padding: "20px", background: "#fff" }}>
            <h2>รายการจองห้องประชุม</h2>
            {hall && (
              <div style={{ marginBottom: "20px" }}>
                <h3>{hall.HallName}</h3>
                <p>ความจุ: {hall.Capacity} คน</p>
                <p>สถานที่: {hall.Location}</p>
              </div>
            )}
            <Table
              columns={columns}
              dataSource={bookings.map((booking) => ({
                ...booking,
                key: booking.ID, 
              }))}
              bordered
              pagination={{ pageSize: 10 }}
              loading={loading}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Listbooking;
