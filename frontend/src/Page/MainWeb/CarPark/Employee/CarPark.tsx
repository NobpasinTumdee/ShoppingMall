import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  GetProps,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  DatabaseOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { DeleteParkingCard, GetListCard } from "./../../../../services/https";
import {
  ParkingCardInterface,
  ParkingFeePolicyInterface,
} from "./../../../../interfaces/Carpark";
import "./../CarPark.css";
import PicFloor from "./../../../../assets/icon/ForPage/Store/Reserve.png";
import IN from "./Modal/In";
import OUT from "./Modal/Out";
import { NavBar } from "../../../Component/NavBar";
import AddCardModal from "./Modal/AddCard";

//import "./../Store/StoreAndPay.css";

type OTPProps = GetProps<typeof Input.OTP>;

const CarPark: React.FC = () => {
  const [cards, setCards] = useState<ParkingCardInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedButtonInOutDefault, setSelectedButtonInOutDefault] =
    useState<string>("IN");
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
  const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
  const [data, setData] = useState("No result");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);

  const columnsCarIn = [
    { title: "ID CARD", dataIndex: "ID", key: "ID", fixed: "left" as const },
    {
      title: "Card Type",
      key: "cardType",
      render: (_: any, record: any) => {
        const cardType = record.TypePark?.Type || "";
        const cardStatus =
          record.IsPermanent === true ? "Permanent" : "Temporary";
        return `${cardType} , ${cardStatus}`;
      },
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
      key: "StatusCard.Status",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Button
          type="primary"
          onClick={() =>
            handleStatusClick(record.StatusCard?.Status || "", record)
          }
        >
          {record.StatusCard?.Status === "IN"
            ? "IN"
            : record.StatusCard?.Status === "OUT"
            ? "OUT"
            : record.StatusCard?.Status === "Expired"
            ? "Expired"
            : record.StatusCard?.Status === "Reserved"
            ? "IN"
            : "Un Used"}
        </Button>
      ),
    },
    {
      title: "History",
      key: "history",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Link to="/CarPark/HistoryCard">
          <Button onClick={() => handleHistoryClick(record)}>History</Button>
        </Link>
      ),
    },
    {
      title: "",
      key: "delete",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDeleteCard(record.ID || "")}
        >
          <DeleteOutlined />
        </Popconfirm>
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
      render: (_: any, record: any) => {
        const latestTransaction = record.ParkingTransaction?.sort(
          (a: any, b: any) =>
            new Date(b.EntryTime).getTime() - new Date(a.EntryTime).getTime()
        )[0];

        return latestTransaction?.Image ? (
          <img
            src={latestTransaction.Image}
            alt="Car"
            style={{ width: "100px", height: "60px", objectFit: "cover" }}
          />
        ) : (
          ""
        );
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
        return "";
      },
    },
    {
      title: "Status",
      key: "StatusCard.Status",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Button
          type="primary"
          onClick={() =>
            handleStatusClick(record.StatusCard?.Status || "", record)
          }
        >
          {record.StatusCard?.Status === "IN"
            ? "IN"
            : record.StatusCard?.Status === "OUT"
            ? "OUT"
            : record.StatusCard?.Status === "Expired"
            ? "Expired"
            : "Un Used"}
        </Button>
      ),
    },
    {
      title: "History",
      key: "history",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Link to="/CarPark/HistoryCard">
          <Button onClick={() => handleHistoryClick(record)}>History</Button>
        </Link>
      ),
    },
    {
      title: "",
      key: "delete",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDeleteCard(record.ID || "")}
        >
          <DeleteOutlined />
        </Popconfirm>
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

  const calculateParkingFee = (
    entryTime: Date,
    exitTime: Date,
    policy: ParkingFeePolicyInterface
  ): number => {
    const parkedMs = exitTime.getTime() - entryTime.getTime();
    const parkedHours = Math.ceil(parkedMs / (1000 * 60 * 60));

    if (policy.IsExempt) return 0; // ยกเว้นค่าจอด

    let totalFee = 0;

    if (parkedHours > policy.FreeHours!) {
      const chargeableHours = parkedHours - policy.FreeHours!;
      const increment = parseFloat(policy.Time_Increment || "1");

      const additionalFees =
        Math.ceil(chargeableHours / increment) * policy.AddBase_Fee!;

      totalFee = additionalFees - policy.Discount!;
    }

    return totalFee > 0 ? totalFee : 0;
  };

  const getParkingCards = async () => {
    setLoading(true);
    try {
      const resCard = await GetListCard();
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

  const handleDeleteCard = async (cardID: string) => {
    try {
      const response = await DeleteParkingCard(cardID);
      if (response.status === 200) {
        messageApi.success("Card deleted successfully.");
        setCards(cards.filter((card) => card.ID !== cardID));
      } else {
        messageApi.error("Failed to delete card.");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      messageApi.error("An error occurred while deleting the card.");
    }
  };

  const onChange: OTPProps["onChange"] = (value: string) => {
    setSearchValue(value);

    const filtered = cards.filter((item) =>
      (item.ID || "").toString().includes(value)
    );
    setFilteredData(filtered);

    if (filtered.length > 0) {
      const currentStatus = filtered[0].StatusCard?.Status;
      setSelectedButtonInOutDefault(
        currentStatus === "IN"
          ? "IN"
          : currentStatus === "OUT"
          ? "OUT"
          : "Expired"
      );
    }
  };

  const sharedProps: OTPProps = {
    onChange,
    value: otp,
  };

  useEffect(() => {
    getParkingCards();
    //setSelectedฺButtonInOut(false);
    const filtered = cards.filter(
      (card) => card.StatusCard?.Status === "IN" 
    );
    setFilteredData(filtered);
    setSelectedButtonInOutDefault("IN");
  }, [selectedButtonInOutDefault]);

  const handleStatusClick = (status: string, record: ParkingCardInterface) => {
    const updatedCards = cards.map((card) =>
      card.ID === record.ID ? { ...card } : card
    );

    setCards(updatedCards);
    setSelectedCard(record);
    setSelectedButtonInOutDefault(status);
    console.log("status: ", status);
    if (status === "IN" /* || status === "Reserved" */) {
      setIsModalInVisible(true);
    } else if (status === "OUT") {
      setIsModalOutVisible(true);
    } else {
    }

    const filtered = updatedCards.filter(
      (item) =>
        (item.ID || "").toString().includes(searchValue) &&
        item.StatusCard?.Status === selectedButtonInOutDefault
    );
    setFilteredData(filtered);
  };

  const handleHistoryClick = (record: ParkingCardInterface) => {
    setSelectedCard(record);
    localStorage.setItem("CardParkID", record?.ID || "");
  };

  const handleAddCard = () => {
    setIsAddCardModalVisible(false);
  };

  const showAddCardModal = () => {
    setIsAddCardModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalInVisible(false);
    setIsModalOutVisible(false);
    setIsAddCardModalVisible(false);
  };

  const handleCardMouseDown = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  /*   const toggleCamera = () => {
    setIsCameraActive((prev) => !prev); // Toggle camera on/off
  };

  const handleCamera = () => {
    try {
      const filtered = cards.filter((item) =>
        item.ID?.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
      console.log("Filtered Data: ", filtered); // ตรวจสอบผลลัพธ์ที่กรอง
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    }
  };
  const handleReservation = (cardID: string) => {
    // ค้นหา Card ที่ตรงกับ cardID
    const selectedCardData = cards.find((card) => card.ID === cardID);
  }; */

  const handleGeneralCardClick = async () => {
    try {
      // ตรวจสอบว่า StatusCard.Status เป็น 'IN' หรือไม่
      const availableCards = cards.filter(
        (card: ParkingCardInterface) =>
          card.StatusCard?.Status === "IN" && card.IsPermanent === false
      );

      if (availableCards.length > 0) {
        const randomCard =
          availableCards[Math.floor(Math.random() * availableCards.length)];
        setSearchValue(randomCard.ID || "");
        setOtp(randomCard.ID || "");
        setSelectedButtonInOutDefault("IN");

        const filtered = cards.filter(
          (item) =>
            item.ID?.toLowerCase().includes(
              (randomCard.ID || "").toLowerCase()
            ) &&
            item.StatusCard?.Status === "IN" &&
            item.IsPermanent === false
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
        <div style={{ height: "110px", zIndex: "0" }}></div>
        <div className="route">
          <a href="/Main">Home /</a> Car Parking{" "}
        </div>

        <Row justify={"center"} style={{ marginTop: "30px" }}>
          <div className="header-title">Car Parking</div>
        </Row>
        <Row justify={"center"}>
          <div className="line-after-header"></div>
        </Row>
        <Card>
          <div className="AddCardBtn" onClick={showAddCardModal}>
            <p>Add Card</p>
            <span>
              <img src={PicFloor} />
            </span>
          </div>
          <Row
            justify={"center"}
            align={"middle"}
            style={{ gap: "16px", marginTop: "30px" }}
          >
            <Col></Col>
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
                  type={
                    selectedButtonInOutDefault === "IN"
                      ? "primary"
                      : selectedButtonInOutDefault === "OUT"
                      ? "default"
                      : "default"
                  }
                  onClick={() => {
                    setSelectedButtonInOutDefault("IN");
                    handleReset();
                  }}
                >
                  Car IN
                </Button>
                <Button
                  type={
                    selectedButtonInOutDefault === "OUT"
                      ? "primary"
                      : selectedButtonInOutDefault === "IN"
                      ? "default"
                      : "default"
                  }
                  onClick={() => {
                    setSelectedButtonInOutDefault("OUT");
                    handleReset();
                  }}
                >
                  Car OUT
                </Button>
                {/* <Button
                  type={
                    selectedButtonInOutDefault === "Reserved"
                      ? "primary"
                      : selectedButtonInOutDefault === "IN" && "OUT"
                      ? "default"
                      : "default"
                  }
                  onClick={() => {
                    setSelectedButtonInOutDefault("Reserved");
                    handleReset();
                  }}
                >
                  Reserved
                </Button> */}
              </Space>
            </Row>
            {/********************************** ส่วนที่จะแสดงตารางเมื่อเลือก Car IN หรือ Car OUT **************************/}

            <Row justify="center" style={{ marginTop: "30px" }}>
              <Table
                columns={
                  selectedButtonInOutDefault == "OUT"
                    ? columnsCarOut
                    : selectedButtonInOutDefault == "IN"
                    ? columnsCarIn
                    : /* : selectedButtonInOutDefault == "Reserved"
                    ? columnsReserved */
                      columnsCarIn
                }
                dataSource={filteredData.filter((card) => {
                  /*  if (!card.ParkingTransaction) return false; */
                  if (selectedButtonInOutDefault == "IN") {
                    return (
                      card.StatusCard?.Status == "IN" /* &&
                      (card.ParkingTransaction.length === 0 ||  // หาก ParkingTransaction เป็น array ว่างๆ ให้ถือว่าเป็น IN  
                        card.ParkingTransaction.some( 
                          (transaction) => transaction.IsReservedPass == null //หรือมี transaction ที่ IsReservedPass เป็น null
                        )) */
                    );
                  }
                  if (selectedButtonInOutDefault == "OUT") {
                    return card.StatusCard?.Status == "OUT";
                  }
                  /*                   if (selectedButtonInOutDefault == "Reserved") {
                    return card.ParkingTransaction?.some(
                      (transaction) => transaction.IsReservedPass == false
                    );
                  } */
                  return false;
                })}
                loading={false}
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
            {/**************************************** ส่วนที่จะแสดงการ์ดเมื่อเลือก Reserved *******************************/}
            {/* {selectedButtonInOutDefault === "Reserved" && (
              <Row justify="center" style={{ marginTop: "30px" }}>
                <Card>
                  <Row justify="center" align="middle" style={{ gap: "16px" }}>
                    {/* กรองข้อมูลใน cards โดยใช้ filter ก่อน */}
            {/* {cards
                      .filter(
                        (card) =>
                          card.ParkingTransaction &&
                          card.ParkingTransaction.some(
                            (transaction) =>
                              transaction.IsReservedPass === false
                          )
                      )
                      .map((card, index) => (
                        <Col key={index}>
                          <Card
                            style={{
                              cursor: "pointer",
                              width: "auto",
                              boxShadow: "0 0px 10px rgba(201, 175, 98, 0.5)",
                              transition: "box-shadow 0.3s ease",
                            }}
                            onClick={() => handleReservation(card.ID || "")}
                          >
                            <CreditCardOutlined
                              style={{ fontSize: "24px", marginRight: "8px" }}
                            />
                            <div className="text-id-card">{card.ID}</div>
                          </Card>
                        </Col>
                      ))}
                  </Row>
                </Card>
              </Row>
            )}  */}

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
        </Card>
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
          selectedButtonInOutDefault={selectedButtonInOutDefault}
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
        <AddCardModal
          visible={isAddCardModalVisible}
          onCancel={handleCancel}
          onAddCard={handleAddCard}
          getParkingCards={getParkingCards}
        />
      </ConfigProvider>
    </>
  );
};

export default CarPark;