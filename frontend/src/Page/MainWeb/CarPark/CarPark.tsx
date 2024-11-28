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
  const myId = localStorage.getItem("id");

  const [data, setData] = useState<BookCarParkInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<BookCarParkInterface | null>(null);  const [searchValue, setSearchValue] = useState<string>("");
  const [isHoverable, setIsHoverable] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  ); // Zone
  const [carRegistration, setCarRegistration] = useState<string>(""); // LicenseNo

  const fetchParkingCards = async () => {
    setLoading(true);
    console.log("Fetching parking cards...");
    try {
      const response = await GetListCard();
      console.log("Response from API:", response); // Log full response
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((card: any) => ({
            key: card?.ID?.toString() || `${Math.random()}`, // Fallback to unique random ID
            idcard: card?.ID?.toString() || "",
            TypeCard: card?.TypePark?.Type || "Unknown",
            status: card?.StatusCard?.Status || "Unknown",
            idzone: card.ParkingZone.map((zone: { ID: any }) => zone.ID).join(
              ", "
            ),
            NameZone: card.ParkingZone.map((zone: { Name: any }) => zone.Name),
            LicensePlate: card.ParkingZone.map(
              (zone: { LicensePlate: any }) => zone.LicensePlate
            ) ,
            Image: card.ParkingZone.map((zone: { Image: any }) => zone.Image),
            Capacity: card.ParkingZone.reduce(
              (total: any, zone: { Capacity: any }) => total + zone.Capacity,
              0
            ),
            Available: card.ParkingZone.reduce(
              (total: any, zone: { AvailableZone: any }) =>
                total + zone.AvailableZone,
              0
            ),
            UserID: card?.MembershipCustomerID || 0,
          }));
          console.log("formattedData from API:", formattedData); // Log full response
          setData(formattedData);
        } else {
          console.error("Unexpected response structure:", response.data);
          message.error("Failed to fetch parking cards");
        }
      }
    } catch (error) {
      console.error("Error fetching parking cards:", error);
      message.error("An error occurred while fetching parking cards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParkingCards();
  }, []);

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
            onClick={() => handleStatusClick("IN", record)}
            disabled={status !== "IN"}
          >
            IN
          </Button>
          <Button
            type="dashed"
            onClick={() => handleStatusClick("OUT", record)}
            disabled={status !== "OUT"}
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
  };

  // const onInput: OTPProps["onInput"] = (value: string) => {
  //   console.log("onInput:", value);
  // };
  const onInput: React.FormEventHandler<HTMLDivElement> = (event) => {
    const value = (event.target as HTMLInputElement).value;
    console.log("onInput:", value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
    value: otp, // กำหนดค่า OTP ที่จะแสดงใน Input
  };

  const handleSearch = () => {
    const filteredData = data.filter((item) =>
      item.idcard?.toLowerCase().includes(searchValue.toLowerCase())
    );
    setData(filteredData);
  };

  const handleStatusClick = (action: string, record: BookCarParkInterface) => {
    console.log("Selected Record:", record); // ตรวจสอบข้อมูลที่ถูกส่งเข้า
    setSelectedCard(record);
    setSelectedStatus(action);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!carRegistration) {
      message.error("กรุณากรอกหมายเลขทะเบียนรถ");
      return; // Don't proceed if car registration number is empty
    }
  
    // Perform the API call or other operations here
    try {
      const response = await axios.patch(
        `/api/parking-status/${selectedCard?.idcard}`,
        {
          status: "OUT", // Update the status to OUT
          licensePlate: carRegistration, // Send the license plate number
        }
      );
  
      if (response.status === 200) {
        message.success(`สถานะเปลี่ยนเป็น OUT สำหรับรถ ${carRegistration}`);
        setIsModalVisible(false); // Close Modal
        // Update the UI after status change
        setData((prevData) =>
          prevData.map((item) =>
            item.idcard === selectedCard?.idcard
              ? { ...item, status: ["OUT"] } // Update status to OUT
              : item
          )
        );
      } else {
        message.error("ไม่สามารถเปลี่ยนสถานะได้");
      }
    } catch (error) {
      console.error("Error updating parking status:", error);
      message.error("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ");
    }
  };
  

  const handleCancel = () => {
    setIsModalVisible(false); // ปิด Modal
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarRegistration(e.target.value); // Update the car registration number
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
      const response = await GetListCard(); // เรียก API จาก backend
      if (response.status === 200) {
        const randomCard = response.data.cards.find(
          (card: any) => card.StatusCard.Status === "IN"
        );
        if (randomCard) {
          message.success(`Random ID Card: ${randomCard.ID}`);
        } else {
          message.error("No available cards with status 'IN'.");
        }
      }
    } catch (error) {
      message.error("An error occurred while fetching random card.");
    }
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
                <Input.OTP length={4} {...sharedProps} {...handleSearch} />
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
      <Row
        style={{ margin: "16px" }}
        justify={"center"}
        gutter={{ xs: 8, sm: 16, md: 24 }}
      >
        <Table<BookCarParkInterface>
          columns={columns}
          pagination={{ position: [bottom] }}
          dataSource={data}
          loading={loading} // แสดงสถานะระหว่างการโหลด
          style={{ fontSize: "30px" }}
        />
      </Row>

      <IN
          selectedCard={selectedCard}
          selectedStatus={selectedStatus}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          carRegistration={carRegistration}
          setCarRegistration={setCarRegistration}
          selectedCardIndex={selectedCardIndex}
          setSelectedCardIndex={setSelectedCardIndex}
          handleInputChange={handleInputChange}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
    </>
  );
};

export default CarPark;
