// import { useState } from "react";
// import { Layout, Card, Spin, Alert, Typography, Table, Button, Input, Modal } from "antd";
// import QRCode from "qrcode.react"; // ใช้สร้าง QR Code
// import { GetPriceByBookingid } from "../../../../services/https";
// import { PaymentHallInterface } from "../../../../interfaces/HallInterface";
// import { NavBar } from "../../../Component/NavBar";
// import SideBar from "../../../Component/SideBar";

// // const { Sider } = Layout;
// const { Title } = Typography;

// function PaymentHall() {
//   const [BookingHallID, setBookingHallID] = useState<string>(""); // เก็บ ID การจอง
//   const [paymentData, setPaymentData] = useState<PaymentHallInterface[] | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedPayment, setSelectedPayment] = useState<PaymentHallInterface | null>(null); // เก็บข้อมูลการชำระเงินที่เลือก

//   // ฟังก์ชันดึงข้อมูลการชำระเงิน
//   const fetchPaymentData = async (bookingId: string) => {
//     setLoading(true);
//     setError(null);
//     setPaymentData(null);
//     try {
//       const res = await GetPriceByBookingid(bookingId);
//       if (res.status === 200) {
//         setPaymentData(res.data);
//       } else {
//         setError("ไม่พบข้อมูลการชำระเงิน");
//       }
//     } catch (err) {
//       console.error("Error fetching payment data:", err);
//       setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ฟังก์ชันค้นหาข้อมูล
//   const handleSearch = () => {
//     if (BookingHallID.trim() !== "") {
//       fetchPaymentData(BookingHallID);
//     } else {
//       setError("กรุณากรอก BookingHallID");
//     }
//   };

//   // ฟังก์ชันสร้างสถานะการชำระเงิน
//   const renderStatus = (status: string) => {
//     return status === "paid" ? (
//       <span style={{ color: "green" }}>ชำระแล้ว</span>
//     ) : (
//       <span style={{ color: "red" }}>ยังไม่ชำระ</span>
//     );
//   };

//   // ฟังก์ชันเรนเดอร์ QR Code Modal
//   const renderQRCodeModal = () => {
//     return (
//       <Modal
//         visible={!!selectedPayment}
//         title="ชำระเงินด้วย QR Code"
//         onCancel={() => setSelectedPayment(null)}
//         footer={[
//           <Button key="close" onClick={() => setSelectedPayment(null)}>
//             ปิด
//           </Button>,
//         ]}
//       >
//         {selectedPayment && (
//           <>
//             <p>ชื่อการชำระเงิน: {selectedPayment.paymentName}</p>
//             <p>จำนวนเงิน: {selectedPayment.amount.toLocaleString()} บาท</p>
//             <div style={{ textAlign: "center" }}>
//               <QRCode
//                 value={`PAYMENT:${selectedPayment.paymentName}|AMOUNT:${selectedPayment.amount}`}
//                 size={200}
//               />
//             </div>
//           </>
//         )}
//       </Modal>
//     );
//   };

//   // คอลัมน์ของตาราง
//   const columns = [
//     {
//       title: "ลำดับ",
//       dataIndex: "id",
//       key: "id",
//       render: (_: any, __: any, index: number) => index + 1,
//     },
//     {
//       title: "ชื่อการชำระเงิน",
//       dataIndex: "paymentName",
//       key: "paymentName",
//     },
//     {
//       title: "จำนวนเงิน",
//       dataIndex: "amount",
//       key: "amount",
//       render: (value: number) => `${value.toLocaleString()} บาท`,
//     },
//     {
//       title: "สถานะ",
//       dataIndex: "status",
//       key: "status",
//       render: renderStatus,
//     },
//     {
//       title: "การชำระเงิน",
//       key: "action",
//       render: (_: any, record: PaymentHallInterface) =>
//         record.status !== "paid" && (
//           <Button type="primary" onClick={() => setSelectedPayment(record)}>
//             ชำระเงิน
//           </Button>
//         ),
//     },
//   ];

//   return (
//     <>
//       <NavBar />
//       <div style={{ height: "110px", zIndex: "0" }}></div>
//       <div style={{ display: "flex" }}>
//         <Sider width={250} theme="dark">
//           <SideBar />
//         </Sider>
//         <div style={{ flex: 1, padding: "20px" }}>
//           <Card>
//             <Title level={2}>รายละเอียดการชำระเงิน</Title>
//             <div style={{ marginBottom: "20px" }}>
//               <Input.Search
//                 placeholder="กรุณากรอก BookingHallID"
//                 enterButton="ค้นหา"
//                 size="large"
//                 value={BookingHallID}
//                 onChange={(e) => setBookingHallID(e.target.value)}
//                 onSearch={handleSearch}
//               />
//             </div>
//             {loading ? (
//               <Spin tip="กำลังโหลดข้อมูล..." size="large" />
//             ) : error ? (
//               <Alert
//                 message="เกิดข้อผิดพลาด"
//                 description={error}
//                 type="error"
//                 showIcon
//                 action={
//                   <Button size="small" type="primary" onClick={handleSearch}>
//                     ลองอีกครั้ง
//                   </Button>
//                 }
//               />
//             ) : paymentData && paymentData.length > 0 ? (
//               <Table
//                 dataSource={paymentData}
//                 columns={columns}
//                 rowKey="id"
//                 pagination={{ pageSize: 5 }}
//               />
//             ) : (
//               <Alert message="ไม่พบข้อมูลการชำระเงิน" type="info" showIcon />
//             )}
//           </Card>
//         </div>
//       </div>
//       {renderQRCodeModal()}
//     </>
//   );
// }

// export default PaymentHall;
