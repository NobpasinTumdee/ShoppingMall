import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  message,
  Spin,
  Modal,
  ConfigProvider,
  Button,
} from "antd";
import {
  ParkingCardInterface,
  ParkingPaymentInterface,
  ParkingUsageCardInterface,
} from "../../../../interfaces/Carpark";
import {
  GetParkingCardByID,
  GetParkingPaymentByUsageCardID,
  GetTaxUserICONIC,
} from "../../../../services/https"; // ฟังก์ชันที่ใช้ดึงข้อมูลการ์ดและประวัติ
import { NavBar } from "../../../Component/NavBar";
import "./../CarPark.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HistoryCard: React.FC = () => {
  const cardID = localStorage.getItem("CardParkID"); // ดึง cardID จาก localStorage
  const [card, setCard] = useState<ParkingCardInterface | null>(null);
  const [transactions, setTransactions] = useState<
    ParkingTransactionInterface[]
  >([]);
  const [payment, setPayment] = useState<ParkingPaymentInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("cardID", cardID);
    const fetchCardData = async () => {
      try {
        const res = await GetParkingCardByID(cardID || ""); // ดึงข้อมูลการ์ดและประวัติการเข้าออก
        if (res.status === 200) {
          setCard(res.data);
          setTransactions(res.data.ParkingTransaction);
          setPayment(res.data.ParkingPayment);
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
    { title: "Car Color", dataIndex: "Color", key: "Color" },
    { title: "Car Make", dataIndex: "Make", key: "Make" },
    {
      title: "Reservation Date",
      dataIndex: "ReservationDate",
      key: "ReservationDate",
      render: (text: string) => (text ? formatDate(text) : " "),
    },
    {
      title: "Entry Time",
      dataIndex: "EntryTime",
      key: "EntryTime",
      render: (text: string) => (text ? formatDate(text) : " "),
    },
    {
      title: "Exit Time",
      dataIndex: "ExitTime",
      key: "ExitTime",
      render: (text: string) => (text ? formatDate(text) : " "),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (_: any, record: ParkingTransactionInterface) => {
        const paymentData = payment?.find(
          (pay) => pay.ParkingTransactionID === record.ID
        );
        return paymentData ? paymentData.Amount : "N/A";
      },
    },
    {
      title: "Discount",
      dataIndex: "DiscountAmount",
      key: "DiscountAmount",
      render: (_: any, record: ParkingTransactionInterface) => {
        const paymentData = payment?.find(
          (pay) => pay.ParkingTransactionID === record.ID
        );
        return paymentData ? paymentData.DiscountAmount : "N/A";
      },
    },
    {
      title: "Net Amount",
      dataIndex: "NetAmount",
      key: "NetAmount",
      render: (_: any, record: ParkingTransactionInterface) => {
        const paymentData = payment?.find(
          (pay) => pay.ParkingTransactionID === record.ID
        );
        return paymentData ? paymentData.NetAmount : "N/A";
      },
    },
    {
      title: "Bill",
      dataIndex: "Bill",
      key: "Bill",
      fixed: "right" as const,
      render: (_: any, record: ParkingPaymentInterface) => (
        <div className="carpark-button-reset" onClick={() => handleBillClick(record)}>Bill</div>
      ),
    },
  ];

  const handleBillClick = async (record: ParkingTransactionInterface) => {
    try {
      // นำข้อมูลไปยังหน้าถัดไป
      navigate("/CarPark/HistoryCard/Receipt", {
        state: {
          selectedCard: record,
          existingTransaction: record,
        },
      });
    } catch (error) {
      console.error("Error fetching payment details:", error);
      message.error("Error fetching payment details.");
    }
  };

  return (
    <>
      <NavBar />
      <ConfigProvider
        theme={{
          token: {
            //borderRadius: 8,
            colorPrimary: "#fbe8af",

            fontFamily: "Dongle, sans-serif",
            fontSize: 22,
            boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
            margin: 0,
          },
          components: {
            Button: {
              //primaryShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
              primaryColor: "#1e1e1e",
            },
            Table: {
              headerBg: "#fbe8af", // พื้นหลังหัวตาราง
            },
          },
        }}
      >
        <div style={{ height: "110px" }}></div>
        <div className="route">
          <a href="/Main">Home /</a> <a href="/CarPark/Main">Car Parking /</a>{" "}
          History Card{" "}
        </div>
        <Row justify={"center"} style={{ marginTop: "30px" }}>
          <div className="header-title">History Card</div>
        </Row>
        <div>
          <Row justify="center" style={{ marginTop: "30px" }}>
            <Col span={24}>
              <Card
                title={`History for Card ID ${cardID}`}
                bordered={false}
                style={{ marginBottom: 10 }}
              >
                <Row>
                  <Col span={12}>
                    <p style={{ marginTop: 10, lineHeight: 0.7 }}>
                      Card Type: {card?.TypeCard?.Type || " "}
                    </p>
                    <p style={{ lineHeight: 0.7 }}>
                      Status: {card?.StatusCard?.Status}
                    </p>
                    <p style={{ lineHeight: 0.7 }}>
                      Expiry Date: {formatDate(card?.ExpiryDate || "")}
                    </p>
                  </Col>
                </Row>
                <Table
                  columns={columns}
                  dataSource={transactions || payment}
                  rowKey="ID"
                  pagination={false}
                  loading={loading}
                />
              </Card>
            </Col>
          </Row>
        </div>

        <Modal
          open={isModalVisible}
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
      </ConfigProvider>
    </>
  );
};

export default HistoryCard;
