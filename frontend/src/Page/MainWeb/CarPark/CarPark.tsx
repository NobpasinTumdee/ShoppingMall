import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Form,
  GetProps,
  Input,
  message,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { NavBar } from "../../Component/NavBar";
import IN from "./../CarPark/Modal/In";
import {
  ParkingCardInterface,
} from "./../../../interfaces/Carpark";

import "./../Store/StoreAndPay.css";
import "./CarPark.css";
import {
  GetListCard,
  GetIdCardZone,
} from "../../../services/https";
import OUT from "./Modal/Out";

type OTPProps = GetProps<typeof Input.OTP>;
type ColumnsType<T extends object> = TableProps<T>["columns"];
type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>["position"]
>[number];

const CarPark: React.FC = () => {
  const [cards, setCards] = useState<ParkingCardInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<ParkingCardInterface | null>(
    null
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ParkingCardInterface[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  ); // Zone
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [isModalInVisible, setIsModalInVisible] = useState<boolean>(false);
  const [isModalOutVisible, setIsModalOutVisible] = useState<boolean>(false);

  const [form] = Form.useForm();

  const getParkingCards = async () => {
    setLoading(true); // เปิดสถานะโหลดข้อมูล
    try {
      const resCard = await GetListCard();

      // ตรวจสอบการตอบกลับจาก API
      if (resCard.status === 200) {
        setCards(resCard.data); // ตั้งค่า cards ด้วยข้อมูลจากการ์ด
      } else {
        messageApi.error("Failed to fetch parking cards.");
      }
  
    } catch (error) {
      console.error("Error fetching data:", error);
      messageApi.error("An error occurred while fetching data.");
    } finally {
      setLoading(false); // ปิดสถานะโหลดข้อมูล
    }
  };

  const columns = [
    {
      title: "ID CARD",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Card Type",
      key: "TypePark.Type",
      render: (_: any, record: any) => record.TypePark?.Type || " ",
    },
    {
      title: "License Plate",
      dataIndex: "ParkingTransaction.LicensePlate",
      key: "ParkingTransaction.LicensePlate",
      render: (_: any, record: any) => {
        // ตรวจสอบว่า ParkingTransaction มีข้อมูลก่อน
        const parkingTransactions = record.ParkingTransaction || [];
        const latestTransaction = parkingTransactions.length > 0
          ? parkingTransactions.sort((a: any, b: any) => new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime())[0]
          : null;
    
        // หากมีข้อมูลล่าสุดให้แสดง LicensePlate
        const licensePlate = latestTransaction ? latestTransaction.LicensePlate : " ";
        return licensePlate;
      },
    },
    {
      title: "Status",
      key: "Status",
      render: (_: any, record: ParkingCardInterface) => {
        const status = record.StatusCard?.Status || " "; // กำหนดค่า status
        return (
          <ConfigProvider
            theme={{
              token: {
                // Seed Token
                colorPrimary: "#c9af62",
                borderRadius: 8,

                // Alias Token
                colorBgContainer: "#f6ffed",
              },
            }}
          >
            <Space>
              <Button
                type="primary"
                style={{ width: "59px" }}
                onClick={() => handleStatusClick("IN", record)} //เมื่อคลิกปุ่ม IN  จะเรียกฟังก์ชัน handleStatusClick เพื่อเปลี่ยนสถานะเป็น "IN"
                disabled={status === "OUT"} //กำหนดว่าไม่ให้ปุ่ม IN คลิกได้หากสถานะปัจจุบันของการจอดรถคือ "OUT" (disabled)
              >
                IN
              </Button>
              <Button
                type="primary"
                style={{ width: "59px" }}
                onClick={() => handleStatusClick("OUT", record)} //เมื่อคลิกปุ่ม OUT จะเรียกฟังก์ชัน handleStatusClick เพื่อเปลี่ยนสถานะเป็น "OUT"
                disabled={status === "IN"} //กำหนดว่าไม่ให้ปุ่ม OUT คลิกได้หากสถานะปัจจุบันของการจอดรถคือ "OUT"
              >
                OUT
              </Button>
            </Space>
          </ConfigProvider>
        );
      },
    },

    {
      title: "History",
      dataIndex: "history",
      key: "history",
      render: (status: string, record: ParkingCardInterface) => (
        <Space size="middle">
          <Button
            onClick={() => handleStatusClick(status, record)} // Pass both status and record
            type={status === "Active" ? "primary" : "default"}
          >
            {status}
          </Button>
        </Space>
      ),
    },
  ];

  const [otp, setOtp] = useState<string>(""); // ใช้เก็บค่าของ OTP
  const [isActive, setIsActive] = useState(false);

  /*   const onChange: OTPProps["onChange"] = (value: string) => {
    console.log("onChange:", value);
    setSearchValue(value);

    // กรองข้อมูลตามค่า searchValue
    const filtered = cards.filter((item) =>
      item.ID?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  }; */
  const onChange: OTPProps["onChange"] = (value: string) => {
    console.log("onChange:", value);
    setSearchValue(value);

    // กรองข้อมูลตามค่า searchValue
    const filtered = cards.filter(
      (item) => item.ID.toString().includes(value) // กรองตาม ID ของ parking card
    );

    setFilteredData(filtered); // แสดงข้อมูลที่กรองแล้ว
  };

  const sharedProps: OTPProps = {
    onChange,
    value: otp, // กำหนดค่า OTP ที่จะแสดงใน Input
  };

  // กดปุ่ม IN / OUT จะแสดง modal ที่ใช้เพื่อเปลี่ยนสถานะของการ์ดที่จอดรถ
  /*   const handleStatusClick = (action: string, record: ParkingCardInterface) => {
    setCarLicensePlate(record.LicensePlate || "Unknown License Plate"); // ตรวจสอบค่า License Plate
    setSelectedCard(record);  // กำหนดการ์ดที่ถูกเลือก
    setSelectedStatus(action); // กำหนดสถานะที่เลือก
    setIsModalVisible(true);   // แสดง modal เพื่อให้สามารถแก้ไขสถานะ
  };

 */
  const handleStatusClick = (action: string, record: ParkingCardInterface) => {
    setSelectedCard(record); // กำหนดการ์ดที่เลือก
    setSelectedStatus(action); // กำหนดสถานะที่เลือก

    // เปลี่ยนแปลงสถานะของการ์ดที่เลือก

    if (action === "IN") {
      setIsModalInVisible(true); // เปิด modal สำหรับ IN
    } else if (action === "OUT") {
      setIsModalOutVisible(true); // เปิด modal สำหรับ OUT
    }
  };

  const handleCancelIn = () => {
    setIsModalInVisible(false); // ปิด modal สำหรับ IN
  };

  const handleCancelOut = () => {
    setIsModalOutVisible(false); // ปิด modal สำหรับ OUT
  };

  useEffect(() => {
    getParkingCards();
    console.log("data: ", cards);
  }, []);

  const handleCardMouseDown = () => {
    setIsActive(true);
    // ตั้งเวลาให้เงาหายหลังจาก 5 วินาที
    setTimeout(() => {
      setIsActive(false);
    }, 500); // 5000ms = 5 วินาที
  };

  const handleGeneralCardClick = async () => {
    try {
      // กรองข้อมูลที่สถานะเป็น "IN" โดยพิจารณาจากทั้งกรณีที่ status เป็น string หรือ array
      const availableCards = cards.filter((card: ParkingCardInterface) => {
        if (Array.isArray(card.StatusCard?.Status)) {
          // หาก status เป็น array ให้ตรวจสอบว่า status มี "IN"
          return card.StatusCard.Status.includes("IN");
        }
        return card.StatusCard?.Status === "IN"; // หาก status เป็น string เปรียบเทียบตรงๆ
      });

      // หากมีข้อมูลที่ตรงเงื่อนไข
      if (availableCards.length > 0) {
        // เลือก card แบบสุ่มจาก availableCards
        const randomCard =
          availableCards[Math.floor(Math.random() * availableCards.length)];
        setSearchValue(randomCard.ID || ""); // อัปเดต searchValue เป็น idcard ที่สุ่มได้
        setOtp(randomCard.ID || ""); // อัปเดต otp เป็น idcard ที่สุ่มได้

        // เรียกฟังก์ชัน onChange เพื่อกรองข้อมูลตาม idcard ที่สุ่มได้
        const filtered = cards.filter((item) =>
          item.ID?.toLowerCase().includes(randomCard.ID.toLowerCase())
        );
        setFilteredData(filtered); // อัปเดตข้อมูลที่กรอง
      } else {
        message.warning("No available cards with status 'IN'.");
      }
    } catch (error) {
      console.error("Error fetching random card:", error);
      message.error("An error occurred while fetching random card.");
    }
  };

  const handleReset = () => {
    setOtp("");
    setSearchValue(""); // Clear the search value
    setFilteredData(cards); // Reset the filtered data to show all records
  };

  return (
    <>
      {contextHolder}
      <NavBar />
      <div style={{ height: "110px" }}></div>
      <div className="route">
        <a href="/Main">Home /</a> Parking IN{" "}
      </div>
      <Row justify={"center"} style={{ marginTop: "30px" }}>
        <div className="header-title">Car Parking</div>
      </Row>
      <Row justify={"center"} align={"middle"} style={{ gap: "16px" }}>
        <Col>
          <Card>
            <Flex justify="space-between" gap={"16px"}>
              <div className="text-id-card">ID CARD</div>
              <div>
                <Input.OTP length={4} value={otp} {...sharedProps} />
              </div>
            </Flex>
          </Card>
        </Col>
        <Col>
          <Card
            onClick={handleGeneralCardClick} // เมื่อคลิกที่ Card ของ General
            onMouseDown={handleCardMouseDown} // เมื่อกด
            style={{
              cursor: "pointer",
              width: "auto",
              boxShadow: isActive
                ? "0 0px 10px rgba(201, 175, 98, 0.5)" // เงาสีทองอยู่กลางการ์ด
                : "none", // กำหนดเงาเมื่อคลิก
              transition: "box-shadow 0.3s ease", // การเปลี่ยนแปลงของเงา
            }}
          >
            <Flex gap={"16px"}>
              <UserOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
              <div className="text-id-card">GENERAL</div>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Col>
        <Row
          style={{ margin: "16px" }}
          justify={"center"}
          gutter={{ xs: 8, sm: 16, md: 24 }}
        >
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Dongle, sans-serif",
                fontSize: 22,
                fontWeightStrong: 5,
              },
            }}
          >
            <Table<ParkingCardInterface>
              columns={columns}
              dataSource={searchValue ? filteredData : cards} // Use filteredData if search is active
              loading={loading}
              style={{ fontSize: "30px", textAlignLast: "center" }}
              className="table-card"
              rowKey="ID"
            />
          </ConfigProvider>
        </Row>
        <Row justify={"center"}>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: "Dongle, sans-serif",
                fontSize: 22,
                // Seed Token
                colorPrimary: "#c9af62",
                borderRadius: 8,
              },
            }}
          >
            <Button
              onClick={handleReset}
              type="default"
              style={{ marginBottom: "16px" }}
            >
              Reset
            </Button>
          </ConfigProvider>
        </Row>
      </Col>

      <IN
        setCards={setCards}
        cards={cards}
        //fetchParkingCards={fetchParkingCards}
        getParkingCards={getParkingCards}
        selectedCard={selectedCard}
        selectedStatus={selectedStatus}
        carLicensePlate={carLicensePlate}
        setCarLicensePlate={setCarLicensePlate}
        selectedCardIndex={selectedCardIndex}
        setSelectedCardIndex={setSelectedCardIndex}
        setSelectedCard={setSelectedCard} // <-- Add this line
        setFilteredData={setFilteredData}
        setOtp={setOtp}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        onChange={onChange}
        setIsModalInVisible={setIsModalInVisible}
        isModalInVisible={isModalInVisible}
        setIsModalOutVisible={setIsModalOutVisible}
        isModalOutVisible={isModalOutVisible}
        handleCancelIn={handleCancelIn}
        handleCancelOut={handleCancelOut}
        /* handleCancel={handleCancel} */
      />
      <OUT
        setCards={setCards}
        cards={cards}
        //fetchParkingCards={fetchParkingCards}
        getParkingCards={getParkingCards}
        selectedCard={selectedCard}
        selectedStatus={selectedStatus}
        carLicensePlate={carLicensePlate}
        setCarLicensePlate={setCarLicensePlate}
        selectedCardIndex={selectedCardIndex}
        setSelectedCardIndex={setSelectedCardIndex}
        setSelectedCard={setSelectedCard} // <-- Add this line
        setFilteredData={setFilteredData}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setIsModalOutVisible={setIsModalOutVisible}
        isModalOutVisible={isModalOutVisible}
        handleCancelIn={handleCancelIn}
        handleCancelOut={handleCancelOut}
        /* handleCancel={handleCancel} */
      />
    </>
  );
};

export default CarPark;
