import React, { useEffect, useState } from "react"; 
import {
  BookingHallInterface,
  HallInterface,
} from "../../../../interfaces/HallInterface"; 
import { NavBar } from "../../../Component/NavBar";
import { ListBookingByHallID, GetHallByID } from "../../../../services/https"; 
import { useParams, useNavigate } from "react-router-dom";
import SideBar from "../../../Component/SideBar";
import { Layout, Table, Tag, Image as AntImage, Button} from "antd";
import { ColumnsType } from "antd/es/table";

const { Sider, Content } = Layout;

const Listbooking: React.FC = () => {
  const [hall, setHall] = useState<HallInterface>();
  const [bookings, setBookings] = useState<BookingHallInterface[]>([]);
  const { id } = useParams(); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error("No hall ID provided");
        return;
      }
  
      try {
        const hallResponse = await GetHallByID(id);
        setHall(hallResponse.data);
        console.log("data: ",hallResponse)
        const bookingResponse = await ListBookingByHallID(id);
        setBookings(bookingResponse.data || []);
        console.log("Bookings:", bookingResponse.data); // ตรวจสอบข้อมูล booking
        
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    fetchData();
  }, [id]);
  const handlePaymentClick = (id: number) => {
    console.log("Booking ID clicked:", id); // ตรวจสอบค่าที่ได้รับเมื่อคลิก
    navigate(`/payment/${id}`);
  };
  
  const columns:ColumnsType<BookingHallInterface> = [
    {
      title: "Hall",
      key: "ImageHall",
      align: 'center',
      render: () => (
        <AntImage
          src={hall?.ImageHall || "default-image-url.jpg"}
          alt="รูปภาพห้องประชุม"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      ),
    },
    {
      title: "BookingName",
      dataIndex: "CustomerName",
      align: 'center',
      key: "CustomerName",
    },
    {
      title: "Contact",
      dataIndex: "CustomerEmail",
      align: 'center',
      key: "CustomerEmail",
    },
    {
      title: "StartDate",
      dataIndex: "StartDateTime",
      align: 'center',
      key: "StartDateTime",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "EndDate",
      dataIndex: "EndDateTime",
      align: 'center',
      key: "EndDateTime",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "STATUS",
      dataIndex: "Status",
      align: 'center',
      key: "Status",
      render: (status: boolean) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "ยืนยันแล้ว" : "รอการยืนยัน"}
        </Tag>
      ),
    },
    {
      title: "ACTION",
      align: 'center',
      key: "actions",
      render: (record: BookingHallInterface) => (
        record.Status === false ? ( // แสดงปุ่มเฉพาะเมื่อ Status เป็น false
          <Button
            type="primary"
            onClick={() => {
              console.log("record.ID:", record.ID);
              handlePaymentClick(Number(record.ID));
            }}
          >
            ชำระเงิน
          </Button>
        ) : (
          <span>ชำระเงินแล้ว</span> // ข้อความที่จะแสดงแทนปุ่ม
        )
      ),
    },
    // {
    //   title: "INVOICE",
    //   align: "center",
    //   key: "invoice",
    //   render: (record: BookingHallInterface) => (
    //     <Button
    //       type="link"
    //       onClick={() => window.open(`/taxinvoice/${record.ID}`, "_blank")}
    //     >
    //       ดูใบแจ้งหนี้
    //     </Button>
    //   ),
    // }
  ];
  

  return (
    <>
      <NavBar />
      <div style={{ height: "110px", zIndex: "0" }}></div>
      <Layout>
          <Sider width={250} theme="dark">
            <SideBar />
          </Sider>
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
              />
            </Content>
       </Layout>
      
      
    </>
  );
};

export default Listbooking;
