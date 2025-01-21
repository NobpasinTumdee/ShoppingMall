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
  UploadFile,
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  DeleteParkingCard,
  GetListCardAndCheckExpiredCardtoUpdate,
  GetListStatusCard,
} from "./../../../../services/https";
import {
  ParkingCardInterface,
  StatusCardInterface,
} from "./../../../../interfaces/Carpark";
import "./../CarPark.css";
import PicFloor from "./../../../../assets/icon/ForPage/Store/Reserve.png";
import IN from "./Modal/In";
import OUT from "./Modal/Out";
import { NavBar } from "../../../Component/NavBar";
import AddCardModal from "./Modal/AddCard";
import dayjs from "dayjs";
import carIn from "./../../../../assets/CarPark/car_in.png";
import carOut from "./../../../../assets/CarPark/car_out.png";
import expired from "./../../../../assets/CarPark/expired.png";

//import "./../Store/StoreAndPay.css";

type OTPProps = GetProps<typeof Input.OTP>;

const today = dayjs();
const dateOnly = today?.format("YYYY-MM-DD"); // เอาแค่วันที่
const dateWithTime = `${dateOnly}T00:00:00+07:00`;

const CarPark: React.FC = () => {
  const [cards, setCards] = useState<ParkingCardInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedButtonInOutDefault, setSelectedButtonInOutDefault] =
    useState<string>("IN");
  const [selectedCard, setSelectedCard] = useState<ParkingCardInterface | null>(
    null
  );
  const [status, setStatus] = useState<StatusCardInterface[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ParkingCardInterface[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  ); // Zone
  const [isModalInVisible, setIsModalInVisible] = useState<boolean>(false);
  const [isModalOutVisible, setIsModalOutVisible] = useState<boolean>(false);
  const [isAddCardModalVisible, setIsAddCardModalVisible] = useState(false);
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carColor, setCarColor] = useState<string>();
  const [carMake, setCarMake] = useState<string>();
  const [reload, setReload] = useState(false);
  const [loadAfterOutModal, setLoadAfterOutModal] = useState(false);

  const columns = [
    { title: "ID CARD", dataIndex: "ID", key: "ID", fixed: "left" as const },
    {
      title: "Card Type",
      key: "cardType",
      render: (_: any, record: any) => {
        const cardType = record.TypeCard?.Type || "";
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
        record.ExpiryDate !== null
          ? formatDate(new Date(record.ExpiryDate))
          : "-",
    },
    {
      title: "Manage Card",
      key: "StatusCard.Status",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => {
        const isExpired = !!(
          record.ExpiryDate && new Date(record.ExpiryDate) < new Date()
        );

        let iconSrc;
        let statusText;

        switch (record.StatusCard?.Status) {
          case "IN":
            iconSrc = carIn;
            statusText = "IN";
            break;
          case "OUT":
            iconSrc = carOut;
            statusText = "OUT";
            break;
          case "Expired":
            iconSrc = expired;
            statusText = "Expired";
            break;
          default:
            iconSrc = carIn;
            statusText = "IN";
        }

        return (
          <div className="display-table">
            <div
              className={`carpark-button-status ${isExpired ? "disabled" : ""}`}
              onClick={() =>
                handleStatusClick(record.StatusCard?.Status || "", record)
              }
              style={{
                backgroundColor: isExpired ? "#ccc" : "#fbe8af", // สีพื้นหลัง
              }}
            >
              <img src={iconSrc} alt={statusText} />
              <p>{statusText}</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "History",
      key: "history",
      fixed: "right" as const,
      render: (_: any, record: ParkingCardInterface) => (
        <Link to="/CarPark/HistoryCard" className="carpark-button-history">
          <div onClick={() => handleHistoryClick(record)}>History</div>
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

  useEffect(() => {
    getParkingCards();
    getStatus();
    console.log("loadAfterOutModal: ",loadAfterOutModal);
  }, [reload, loadAfterOutModal]);

  const getParkingCards = async () => {
    setLoading(true);
    try {
      const resCard = await GetListCardAndCheckExpiredCardtoUpdate();
      if (resCard.status === 200) {
        const data = resCard.data;
        setCards(data);

        setSelectedButtonInOutDefault("IN");
        const filtered = data.filter(
          (card: any) => card.StatusCard?.Status === "IN"
        );
        setFilteredData(filtered);

      } else {
        message.error("Failed to fetch parking cards.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = async () => {
    setLoading(true);
    try {
      const response = await GetListStatusCard();
      if (response.status === 200) {
        const data = response.data;
        setStatus(data);
      } else {
        message.error("Failed to fetch status card.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const [otp, setOtp] = useState<string>(""); // ใช้เก็บค่าของ OTP
 
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

  const handleDeleteCard = async (cardID: string) => {
    try {
      const response = await DeleteParkingCard(cardID);
      if (response.status === 200) {
        message.success("Card deleted successfully.");
        setCards(cards.filter((card) => card.ID !== cardID));
        setReload(!reload);
      } else {
        message.error("Failed to delete card.");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      message.error("An error occurred while deleting the card.");
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

  const handleStatusClick = (status: string, record: ParkingCardInterface) => {
    const updatedCards = cards.map((card) =>
      card.ID === record.ID ? { ...card } : card
    );

    setCards(updatedCards);
    setSelectedCard(record);
    setSelectedButtonInOutDefault(status);
    console.log("status: ", status);
    if (status === "IN") {
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

  const [isActive, setIsActive] = useState(false);
  const handleCardMouseDown = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

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
            Table: {
              headerBg: "#fbe8af", // พื้นหลังหัวตาราง
            },
          },
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
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
                    <div
                      className={`carpark-button-reset ${
                        selectedButtonInOutDefault === "IN" ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedButtonInOutDefault("IN");
                        handleReset();
                      }}
                    >
                      Car IN
                    </div>
                    <div
                      className={`carpark-button-reset ${
                        selectedButtonInOutDefault === "OUT" ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedButtonInOutDefault("OUT");
                        handleReset();
                      }}
                    >
                      Car OUT
                    </div>
                    <div
                      className={`carpark-button-reset ${
                        selectedButtonInOutDefault === "Expired" ? "active" : ""
                      }`}
                      onClick={() => {
                        setSelectedButtonInOutDefault("Expired");
                        handleReset();
                      }}
                    >
                      Expired
                    </div>
                  </Space>
                </Row>
                {/********************************** ส่วนที่จะแสดงตารางเมื่อเลือก Car IN หรือ Car OUT **************************/}
                <Row justify="center" style={{ marginTop: "30px" }}>
                  <Table
                    columns={
                      selectedButtonInOutDefault == "OUT" ||
                      selectedButtonInOutDefault == "IN" ||
                      selectedButtonInOutDefault == "Expired"
                        ? columns
                        : columns
                    }
                    dataSource={filteredData.filter((card) => {
                      if (selectedButtonInOutDefault == "IN") {
                        return card.StatusCard?.Status == "IN";
                      }
                      if (selectedButtonInOutDefault == "OUT") {
                        return card.StatusCard?.Status == "OUT";
                      }
                      if (selectedButtonInOutDefault == "Expired") {
                        return card.StatusCard?.Status == "Expired";
                      }
                      return false;
                    })}
                    loading={false}
                    style={{
                      justifyContent: "center",
                      fontSize: "30px",
                      textAlignLast: "center",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                      animation: "ease-in-out",
                      width: "100%",
                    }}
                    className="table-card"
                    rowKey="ID"
                    scroll={{ x: "max-content" }}
                  />
                </Row>
                <Row justify={"center"}>
                  <div
                    className="carpark-button-reset"
                    onClick={handleReset}
                    style={{ marginBottom: "16px" }}
                  >
                    Reset
                  </div>
                </Row>
              </Col>
            </Card>
          </>
        )}
        <IN
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          onChange={onChange}
          setOtp={setOtp}
          setIsModalInVisible={setIsModalInVisible}
          isModalInVisible={isModalInVisible}
          getParkingCards={getParkingCards}
          setSelectedButtonInOutDefault={setSelectedButtonInOutDefault}
          setFilteredData={setFilteredData}
          setCards={setCards}
          cards={cards}
          status={status}
        ></IN>
        <OUT
          setCards={setCards}
          cards={cards}
          getParkingCards={getParkingCards}
          selectedCard={selectedCard}
          selectedButtonInOutDefault={selectedButtonInOutDefault}
          selectedCardIndex={selectedCardIndex}
          setSelectedCardIndex={setSelectedCardIndex}
          setSelectedCard={setSelectedCard}
          setFilteredData={setFilteredData}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          status={status}
          setIsModalOutVisible={setIsModalOutVisible}
          isModalOutVisible={isModalOutVisible}
          setCarLicensePlate={setCarLicensePlate}
          carLicensePlate={carLicensePlate}
          setCarColor={setCarColor}
          carColor={carColor}
          setCarMake={setCarMake}
          carMake={carMake}
          setLoadAfterOutModal={setLoadAfterOutModal}
          loadAfterOutModal={loadAfterOutModal}
        />
        <AddCardModal
          visible={isAddCardModalVisible}
          onCancel={handleCancel}
          onAddCard={handleAddCard}
          getParkingCards={getParkingCards}
          cards={cards}
        />
      </ConfigProvider>
    </>
  );
};

export default CarPark;
