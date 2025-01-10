import React, { useEffect, useState } from "react";
import { BookingHallInterface, HallInterface } from "../../../../interfaces/HallInterface";
import { NavBar } from "../../../Component/NavBar";
import { ListBookingByHallID, GetHallByID } from "../../../../services/https"; // เพิ่ม GetHallByID
import { useParams } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import { Layout, Table, Tag, Image as AntImage } from "antd";

const { Sider, Content } = Layout;

const Listbooking: React.FC = () => {
  const [hall, setHall] = useState<HallInterface | null>(null); // ใช้ single hall object
  const [bookings, setBookings] = useState<BookingHallInterface[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("No hall ID provided");
        return;
      }

      try {
        // ดึงข้อมูลห้องประชุม
        const hallResponse = await GetHallByID(id);
        setHall(hallResponse.data);

        // ดึงข้อมูลการจอง
        const bookingResponse = await ListBookingByHallID(id);
        setBookings(bookingResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Define columns for the table
  const columns = [
    {
      title: "รูปภาพห้องประชุม",
      key: "ImageHall",
      render: () => (
        <AntImage
          src={hall?.ImageHall || "default-image-url.jpg"} // ใช้ข้อมูลจาก hall
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
        <Tag color={status === "confirmed" ? "green" : "red"}>
          {status === "confirmed" ? "ยืนยันแล้ว" : "รอการยืนยัน"}
        </Tag>
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
                key: booking.ID, // ใช้ ID เป็น key
              }))}
              bordered
              pagination={{ pageSize: 10 }}
            />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Listbooking;
