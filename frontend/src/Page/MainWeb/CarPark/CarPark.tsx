import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
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
import { BookCarParkInterface } from "./../../../interfaces/Carpark";

import "./../Store/StoreAndPay.css";
import "./CarPark.css";
import { GetListCard, GetIdCardZone } from "../../../services/https";

type OTPProps = GetProps<typeof Input.OTP>;
type ColumnsType<T extends object> = TableProps<T>["columns"];
type TablePagination<T extends object> = NonNullable<
  Exclude<TableProps<T>["pagination"], boolean>
>;
type TablePaginationPosition<T extends object> = NonNullable<
  TablePagination<T>["position"]
>[number];

const CarPark: React.FC = () => {
  const [data, setData] = useState<BookCarParkInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<BookCarParkInterface | null>(
    null
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<BookCarParkInterface[]>([]);
  const [isHoverable, setIsHoverable] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  ); // Zone
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);
  const [cardData, setCardData] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchParkingCards = async () => {
    setLoading(true);
    try {
      const response = await GetListCard();
      if (response.status === 200 && Array.isArray(response.data)) {
        const formattedData = response.data.map((card: any) => ({
          key: card?.ParkingCardID?.toString() || `key_${Math.random()}`,
          idcard: card?.ParkingCardID || "N/A",
          TypeCard: card?.TypePark?.Type || "Unknown",
          status: card?.StatusCard?.Status || "Unknown",
          idzone: card?.ParkingZone?.map((zone: any) => zone.ID) || [],
          NameZone: card?.ParkingZone?.map((zone: any) => zone.Name) || [],
          LicensePlate: card?.UsageCard || "-",
          Image: card?.ParkingZone?.map((zone: any) => zone.Image) || [],
          Capacity: card?.ParkingZone?.reduce(
            (total: any, zone: any) => total + zone.Capacity,
            0
          ),
          Available: card?.ParkingZone?.reduce(
            (total: any, zone: any) => total + zone.AvailableZone,
            0
          ),
          UserID: card?.MembershipCustomerID || 0,
        }));
        setData(formattedData);
      } else {
        message.error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Error fetching parking cards:", error);
      message.error("Failed to fetch parking cards");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID CARD",
      dataIndex: "idcard",
      key: "idcard",
    },
    {
      title: "Card Type",
      dataIndex: "TypeCard",
      key: "TypeCard",
    },
    {
      title: "License Plate",
      dataIndex: "LicensePlate",
      key: "LicensePlate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: BookCarParkInterface) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleStatusClick("OUT", record)}
            disabled={status === "OUT"}
          >
            IN
          </Button>
          <Button
            type="primary"
            onClick={() => handleStatusClick("IN", record)}
            disabled={status === "IN"}
          >
            OUT
          </Button>
        </Space>
      ),
    },
    {
      title: "History",
      dataIndex: "history",
      key: "history",
      render: (status: string, record: BookCarParkInterface) => (
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
  const [bottom, setBottom] =
    useState<TablePaginationPosition<BookCarParkInterface>>("bottomRight");

  const onChange: OTPProps["onChange"] = (text: string) => {
    console.log("onChange:", text);
    setSearchValue(text); // อัปเดตค่าของ searchValue

    // กรองข้อมูลตาม searchValue
    const filtered = data.filter((item) =>
      item.idcard?.toLowerCase().includes(text.toLowerCase())
    );

    console.log("Filtered Data:", filtered); // ดูผลลัพธ์ที่กรอง
    setFilteredData(filtered); // อัปเดตข้อมูลที่กรอง
  };

  const sharedProps: OTPProps = {
    onChange,
    value: otp, // กำหนดค่า OTP ที่จะแสดงใน Input
  };

  const handleStatusClick = (action: string, record: BookCarParkInterface) => {
    console.log("Selected Record:", record);
    setSelectedCard(record);
    setCarLicensePlate(record.LicensePlate || "Unknown License Plate"); // ตรวจสอบค่า License Plate
    setSelectedStatus(action);
    setIsModalVisible(true);
  };

  useEffect(() => {
    fetchParkingCards();
    console.log("data: ", data);
    if (!isModalVisible) {
      form.resetFields(); // รีเซ็ตค่าในฟอร์มเมื่อ Modal ปิด
      setCarLicensePlate(""); // รีเซ็ตค่า state
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarLicensePlate(e.target.value); // Update the car registration number
  };

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
      const availableCards = data.filter((card: BookCarParkInterface) => {
        if (Array.isArray(card.status)) {
          // หาก status เป็น array ให้ตรวจสอบว่า status มี "IN"
          return card.status.includes("IN");
        }
        return card.status === "IN"; // หาก status เป็น string เปรียบเทียบตรงๆ
      });

      // หากมีข้อมูลที่ตรงเงื่อนไข
      if (availableCards.length > 0) {
        // เลือก card แบบสุ่มจาก availableCards
        const randomCard =
          availableCards[Math.floor(Math.random() * availableCards.length)];
        setSearchValue(randomCard.idcard); // อัปเดต searchValue เป็น idcard ที่สุ่มได้
        setOtp(randomCard.idcard); // อัปเดต otp เป็น idcard ที่สุ่มได้

        // เรียกฟังก์ชัน onChange เพื่อกรองข้อมูลตาม idcard ที่สุ่มได้
        const filtered = data.filter((item) =>
          item.idcard?.toLowerCase().includes(randomCard.idcard.toLowerCase())
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
    setSearchValue(""); // Clear the search value
    setFilteredData(data); // Reset the filtered data to show all records
  };

  return (
    <>
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
          <Table<BookCarParkInterface>
            columns={columns}
            pagination={{ position: [bottom] }}
            dataSource={searchValue ? filteredData : data} // Use filteredData if search is active
            loading={loading}
            style={{ fontSize: "30px" }}
          />
        </Row>
        <Row justify={"center"}>
          <Button
            onClick={handleReset}
            type="default"
            style={{ marginBottom: "16px" }}
          >
            Reset
          </Button>
        </Row>
      </Col>

      <IN
        fetchParkingCards={fetchParkingCards}
        selectedCard={selectedCard}
        selectedStatus={selectedStatus}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        carLicensePlate={carLicensePlate}
        setCarLicensePlate={setCarLicensePlate}
        selectedCardIndex={selectedCardIndex}
        setSelectedCardIndex={setSelectedCardIndex}
        handleInputChange={handleInputChange}
        setSelectedCard={setSelectedCard} // <-- Add this line

        /* handleCancel={handleCancel} */
      />
    </>
  );
};

export default CarPark;
