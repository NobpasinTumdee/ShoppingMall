import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  GetProps,
  Input,
  Row,
  Space,
  Table,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { GetListCard } from "./../../../../services/https";
import { ParkingCardInterface, ParkingFeePolicyInterface } from "./../../../../interfaces/Carpark";
import "./../CarPark.css";

import IN from "./Modal/In";
import OUT from "./Modal/Out";
import { NavBar } from "../../../Component/NavBar";

//import "./../Store/StoreAndPay.css";

type OTPProps = GetProps<typeof Input.OTP>;

const CarPark: React.FC = () => {
  const [cards, setCards] = useState<ParkingCardInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedฺButtonInOut, setSelectedฺButtonInOut] =
    useState<boolean>(false);
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

  const columnsCarIn = [
    { title: "ID CARD", dataIndex: "ID", key: "ID", fixed: "left" as const },
    {
      title: "Card Type",
      key: "TypePark.Type",
      render: (_: any, record: any) => record.TypePark?.Type || "",
    },
    {
      title: "ExpiryDate",
      dataIndex: "ExpiryDate",
      key: "ExpiryDate",
      render: (_: any, record: any) =>
        formatDate(new Date(record.ExpiryDate)) || "",
    },
    {
      title: "Status",
      key: "IsActive",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Button
          type="primary"
          onClick={() => handleStatusClick(record.IsActive || false, record)}
        >
          {record.IsActive ? "OUT" : "IN"}
        </Button>
      ),
    },
    {
      title: "History",
      key: "history",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Link to="/HistoryCard">
          <Button onClick={() => handleHistoryClick(record)}>History</Button>
        </Link>
      ),
    },
  ];

  // Columns สำหรับ Car OUT
  const columnsCarOut = [
    { title: "ID CARD", dataIndex: "ID", key: "ID", fixed: "left" as const },
    {
      title: "Image Car",
      dataIndex: "Image",
      key: "Image",
      fixed: "left" as const,
      render: (_: any, record: any) => {
        const latestTransaction = record.ParkingTransaction?.sort(
          (a: any, b: any) =>
            new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime()
        )[0];
        return latestTransaction?.Image || "";
      },
    },
    {
      title: "Card Type",
      key: "TypePark.Type",
      render: (_: any, record: any) => record.TypePark?.Type || " ",
    },
    {
      title: "ExpiryDate",
      dataIndex: "ExpiryDate",
      key: "ExpiryDate",
      render: (_: any, record: any) =>
        formatDate(new Date(record.ExpiryDate)) || "",
    },
    {
      title: "License Plate",
      dataIndex: "ParkingTransaction.LicensePlate",
      key: "LicensePlate",
      render: (_: any, record: any) => {
        const latestTransaction = record.ParkingTransaction?.sort(
          (a: any, b: any) =>
            new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime()
        )[0];
        return latestTransaction?.LicensePlate || "";
      },
    },
    {
      title: "Car Color",
      dataIndex: "ParkingTransaction.Color",
      key: "Color",
      render: (_: any, record: any) => {
        const latestTransaction = record.ParkingTransaction?.sort(
          (a: any, b: any) =>
            new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime()
        )[0];
        return latestTransaction?.Color || "";
      },
    },
    {
      title: "Car Make",
      dataIndex: "ParkingTransaction.Make",
      key: "Make",
      render: (_: any, record: any) => {
        const latestTransaction = record.ParkingTransaction?.sort(
          (a: any, b: any) =>
            new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime()
        )[0];
        return latestTransaction?.Make || "";
      },
    },
    {
      title: "EntryTime",
      dataIndex: "ParkingTransaction.EntryTime",
      key: "EntryTime",
      render: (_: any, record: any) => {
        const parkingTransactions = record.ParkingTransaction || [];
        const latestTransaction =
          parkingTransactions.length > 0
            ? parkingTransactions.sort(
                (a: any, b: any) =>
                  new Date(b.EntryTime).getTime() -
                  new Date(a.EntryTime).getTime()
              )[0]
            : null;

        const entryTime = latestTransaction?.EntryTime;
        return entryTime ? formatDate(new Date(entryTime)) : "";
      },
    },
    {
      title: "Fee",
      dataIndex: "ParkingTransaction.Fee",
      key: "Fee",
      render: (_: any, record: any) => {
        const latestTransaction = record.ParkingTransaction?.sort(
          (a: any, b: any) =>
            new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime()
        )[0];
        
        if (latestTransaction?.EntryTime && latestTransaction?.ExitTime) {
          const fee = calculateParkingFee(
            new Date(latestTransaction.EntryTime),
            new Date(latestTransaction.ExitTime),
            record.ParkingFeePolicy
          );
          return `${fee} Baht`;
        }
        return "N/A";
      },
    },
    {
      title: "Hourly Rate",
      dataIndex: "ParkingTransaction.Hourly_Rate",
      key: "Hourly_rate",
      render: (_: any, record: any) => {
        const latestTransaction = record.ParkingTransaction?.sort(
          (a: any, b: any) =>
            new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime()
        )[0];
    
        if (latestTransaction?.EntryTime) {
          const entryTime = new Date(latestTransaction.EntryTime);
          const hours = calculateHourlyRate(entryTime);
          return `${hours} Hour${hours > 1 ? "s" : ""}`;
        }
        return "N/A";
      },
    },
    {
      title: "Status",
      key: "IsActive",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Button
          type="primary"
          onClick={() => handleStatusClick(record.IsActive || false, record)}
        >
          {record.IsActive ? "OUT" : "IN"}
        </Button>
      ),
    },
    {
      title: "History",
      key: "history",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Link to="/HistoryCard">
          <Button onClick={() => handleHistoryClick(record)}>History</Button>
        </Link>
      ),
    },
  ];

  const [otp, setOtp] = useState<string>(""); // ใช้เก็บค่าของ OTP
  const [isActive, setIsActive] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-EN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const calculateHourlyRate = (entryTime: Date) => {
    const currentTime = new Date();
    const diffMs = currentTime.getTime() - entryTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // ชั่วโมงเต็ม
    const remainingMinutes = (diffMs % (1000 * 60 * 60)) / (1000 * 60); // นาทีที่เกิน
    
    // ถ้านาทีเกิน 0 ให้เพิ่ม 1 ชั่วโมง
    return remainingMinutes > 0 ? diffHours + 1 : diffHours;
  };

  const handleLostCardFee = (policy: ParkingFeePolicyInterface) => {
    return policy.LostCard!;
  };

  
  const calculateParkingFee = (entryTime: Date, exitTime: Date, policy: ParkingFeePolicyInterface): number => {
    const parkedMs = exitTime.getTime() - entryTime.getTime();
    const parkedHours = Math.ceil(parkedMs / (1000 * 60 * 60)); 
    
    if (policy.IsExempt) return 0; // ยกเว้นค่าจอด
  
    let totalFee = 0;
    
    if (parkedHours > policy.FreeHours!) {
      const chargeableHours = parkedHours - policy.FreeHours!;
      const increment = parseFloat(policy.Time_Increment || "1");
      
      const additionalFees = Math.ceil(chargeableHours / increment) * policy.AddBase_Fee!;
      
      totalFee = additionalFees - policy.Discount!;
    }
    
    return totalFee > 0 ? totalFee : 0;
  };  

  const getParkingCards = async () => {
    setLoading(true);
    try {
      const resCard = await GetListCard();

      // ตรวจสอบการตอบกลับจาก API
      if (resCard.status === 200) {
        setCards(resCard.data);
      } else {
        messageApi.error("Failed to fetch parking cards.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      messageApi.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const onChange: OTPProps["onChange"] = (value: string) => {
    setSearchValue(value);

    const filtered = cards.filter((item) => item.ID.toString().includes(value));
    setFilteredData(filtered);

    if (filtered.length > 0) {
      const currentStatus = filtered[0].IsActive;
      setSelectedฺButtonInOut(currentStatus === false ? false : true);
    }
  };

  const sharedProps: OTPProps = {
    onChange,
    value: otp,
  };

  useEffect(() => {
    getParkingCards();
    /*  setSelectedฺButtonInOut(false);
    const filtered = cards.filter(
      (item) =>
        item.ID.toString().includes(searchValue) &&
        item.IsActive === selectedฺButtonInOut
    );
    setFilteredData(filtered); */
  }, []);

  const handleStatusClick = (action: boolean, record: ParkingCardInterface) => {
    const updatedCards = cards.map((card) =>
      card.ID === record.ID ? { ...card } : card
    );

    setCards(updatedCards);
    setSelectedCard(record);
    setSelectedฺButtonInOut(action);

    if (action === false) {
      setIsModalInVisible(true);
    } else if (action === true) {
      setIsModalOutVisible(true);
    }

    const filtered = updatedCards.filter(
      (item) =>
        item.ID.toString().includes(searchValue) &&
        item.IsActive === selectedฺButtonInOut
    );
    setFilteredData(filtered);
  };

  const handleHistoryClick = (record: ParkingCardInterface) => {
    setSelectedCard(record);
    localStorage.setItem("CardParkID", record?.ID || "");
  };

  const handleCancel = () => {
    setIsModalInVisible(false);
    setIsModalOutVisible(false);
  };

  const handleCardMouseDown = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  const handleGeneralCardClick = async () => {
    try {
      const availableCards = cards.filter(
        (card: ParkingCardInterface) => card.IsActive === false
      );

      if (availableCards.length > 0) {
        const randomCard =
          availableCards[Math.floor(Math.random() * availableCards.length)];
        setSearchValue(randomCard.ID || "");
        setOtp(randomCard.ID || "");
        setSelectedฺButtonInOut(false);

        const filtered = cards.filter(
          (item) =>
            item.ID?.toLowerCase().includes(randomCard.ID.toLowerCase()) &&
            item.IsActive === false
        );
        setFilteredData(filtered);
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
      <NavBar />
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 8,
            colorPrimary: "#fbe8af",

            fontFamily: "Dongle, sans-serif",
            fontSize: 22,
            fontWeightStrong: 5,
            boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
          },
          components: {
            Button: {
              primaryShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
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
          <a href="/Main">Home /</a> Car Parking{" "}
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
                <UserOutlined
                  style={{ fontSize: "24px", marginRight: "8px" }}
                />
                <div className="text-id-card">GENERAL</div>
              </Flex>
            </Card>
          </Col>
        </Row>
        <Col>
          <Row justify="center" style={{ marginTop: "30px" }}>
            <Space>
              <Button
                type={selectedฺButtonInOut === false ? "primary" : "default"}
                onClick={() => {
                  setSelectedฺButtonInOut(false);
                  handleReset();
                }}
              >
                Car IN
              </Button>
              <Button
                type={selectedฺButtonInOut === true ? "primary" : "default"}
                onClick={() => {
                  setSelectedฺButtonInOut(true);
                  handleReset();
                }}
              >
                Car OUT
              </Button>
            </Space>
          </Row>
          <Row
            style={{ margin: "16px" }}
            justify={"center"}
            gutter={{ xs: 24, sm: 24, md: 24 }}
          >
            <Table
              columns={selectedฺButtonInOut ? columnsCarOut : columnsCarIn}
              dataSource={
                searchValue
                  ? filteredData.filter(
                      (card) => card.IsActive === selectedฺButtonInOut
                    )
                  : cards.filter(
                      (card) => card.IsActive === selectedฺButtonInOut
                    )
              }
              loading={loading}
              style={{
                fontSize: "30px",
                textAlignLast: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                animation: "ease-in-out",
              }}
              className="table-card"
              rowKey="ID"
              scroll={{ x: "max-content" }}
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
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          onChange={onChange}
          setOtp={setOtp}
          setIsModalInVisible={setIsModalInVisible}
          isModalInVisible={isModalInVisible}
          getParkingCards={getParkingCards}
        ></IN>
        <OUT
          setCards={setCards}
          cards={cards}
          getParkingCards={getParkingCards}
          selectedCard={selectedCard}
          selectedฺButtonInOut={selectedฺButtonInOut}
          carLicensePlate={carLicensePlate}
          setCarLicensePlate={setCarLicensePlate}
          selectedCardIndex={selectedCardIndex}
          setSelectedCardIndex={setSelectedCardIndex}
          setSelectedCard={setSelectedCard}
          setFilteredData={setFilteredData}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          setIsModalOutVisible={setIsModalOutVisible}
          isModalOutVisible={isModalOutVisible}
          handleCancel={handleCancel}
        />
      </ConfigProvider>
    </>
  );
};

export default CarPark;
