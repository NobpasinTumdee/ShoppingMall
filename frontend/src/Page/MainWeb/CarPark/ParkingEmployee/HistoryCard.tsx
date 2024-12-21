import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, message, Spin, Modal } from "antd";
import {
  ParkingCardInterface,
  ParkingTransactionInterface,
} from "../../../../interfaces/Carpark";
import { GetParkingCardByID } from "../../../../services/https"; // ฟังก์ชันที่ใช้ดึงข้อมูลการ์ดและประวัติ
import { NavBar } from "../../../Component/NavBarCarPark";

const HistoryCard: React.FC = () => {
  const cardID = localStorage.getItem("CardParkID"); // ดึง cardID จาก localStorage
  const [card, setCard] = useState<ParkingCardInterface | null>(null);
  const [transactions, setTransactions] = useState<
    ParkingTransactionInterface[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  useEffect(() => {
    console.log("cardID", cardID);
    const fetchCardData = async () => {
      try {
        const res = await GetParkingCardByID(cardID || ""); // ดึงข้อมูลการ์ดและประวัติการเข้าออก
        if (res.status === 200) {
          setCard(res.data);
          setTransactions(res.data.ParkingTransaction);
        } else {
          message.error("Failed to fetch parking card data.");
        }
      } catch (error) {
        message.error("Error fetching parking card data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, []); // ทำงานแค่ครั้งเดียวเมื่อเริ่ม

  // ฟังก์ชันการจัดรูปแบบวันที่
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-EN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // คอลัมน์สำหรับตารางประวัติการเข้าออก
  const columns = [
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (image: string) =>
        image ? (
          <img
            src={image}
            alt="Car"
            style={{
              width: "100px",
              height: "60px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedImage(image);
              setIsModalVisible(true);
            }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "License Plate",
      dataIndex: "LicensePlate",
      key: "LicensePlate",
    },
    {
      title: "Entry Time",
      dataIndex: "EntryTime",
      key: "EntryTime",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Exit Time",
      dataIndex: "ExitTime",
      key: "ExitTime",
      render: (text: string) => (text ? formatDate(text) : "N/A"),
    },
    {
      title: "Fee",
      dataIndex: "Fee",
      key: "Fee",
    },
    {
      title: "Entry Time",
      dataIndex: "EntryTime",
      key: "EntryTime",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Exit Time",
      dataIndex: "ExitTime",
      key: "ExitTime",
      render: (text: string) => (text ? formatDate(text) : "N/A"),
    },
    {
      title: "Fee",
      dataIndex: "Fee",
      key: "Fee",
    },
    { title: "Car Color", dataIndex: "Color", key: "Color" },
    { title: "Car Make", dataIndex: "Make", key: "Make" },
  ];

  return (
    <>
      <NavBar />
      <div style={{ height: "110px" }}></div>
      <div className="route">
        <a href="/Main">Home /</a> <a href="/CarPark/Main">Car Parking /</a> History
        Card{" "}
      </div>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <div className="header-title">History Card</div>
      </Row>
      <div>
        <Row justify="center" style={{ marginTop: "30px" }}></Row>
        <Row justify="center" style={{ marginTop: "30px" }}>
          <Col span={24}>
            <Card title={`History for Card ID ${cardID}`} bordered={false}>
              <Row>
                <Col span={12}>
                  <p>Card Type: {card?.TypePark?.Type || "N/A"}</p>
                  <p>Status: {card?.StatusCard?.Status === "IN" ? "IN" : card?.StatusCard?.Status === "OUT" ? "OUT" : "Default"}</p>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={transactions}
                rowKey="ID"
                pagination={false}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        centered
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Car Large"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Modal>
    </>
  );
};

export default HistoryCard;
