import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Typography,
  Form,
  Button,
  Select,
  message,
  Modal,
  ConfigProvider,
  Card,
  Progress,
  Upload,
  UploadFile,
  UploadProps,
  QRCode,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { NavBar } from "../../../Component/NavBar";
import {
  CreateParkingTransaction,
  GetListCard,
  GetListZone,
  GetParkingCardByUserID,
  GetUserById,
  GetZoneByTypePark,
  UpdateParkingCard,
  UpdateParkingZone,
} from "../../../../services/https";
import {
  ParkingCardInterface,
  ParkingZoneInterface,
} from "../../../../interfaces/Carpark";
import dayjs from "dayjs";
import { CardInterface } from "antd/es/card";

const { Title } = Typography;
const { Option } = Select;
const userid = localStorage.getItem("id");

const CustomerParkingBooking: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [zones, setZones] = useState<ParkingZoneInterface[]>([]);
  const [listcards, setListCards] = useState<ParkingCardInterface[]>([]);
  const [cards, setCards] = useState<ParkingCardInterface>();
  const [user, setUser] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [carColor, setCarColor] = useState<string>("");
  const [carMake, setCarMake] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [carLicensePlate, setCarLicensePlate] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<ParkingCardInterface | null>(
    null
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const imageUrl = fileList[0]?.thumbUrl || null;
  const [cardID, setCardID] = useState<string>("");
  
  const role = localStorage.getItem("status");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await GetUser();
      await checkUserBooking();
      await GetZone();
      await getCardByID();
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const GetZone = async () => {
    try {
      const res = await GetZoneByTypePark(getTypeParkByStatus());
      if (res.status === 200) {
        localStorage.setItem("zoneid", res.data.ID);
        setZones(res.data);
        console.log("zone: ", res.data);
      } else {
        messageApi.error("Failed to fetch parking zones.");
      }
    } catch (error) {
      console.error("Error fetching zones:", error);
      messageApi.error("An error occurred while fetching zones.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

/*   const getCard = async () => {
    setLoading(true);
    try {
      const resCard = await GetListCard();

      // ตรวจสอบการตอบกลับจาก API
      if (resCard.status === 200) {
      } else {
        messageApi.error("Failed to fetch parking cards.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      messageApi.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }; */

  const checkUserBooking = async () => {
    try {
      const res = await GetListCard();
      const bookings = res.data.filter(
        (booking: any) => booking.UserID === Number(userid)
      );
      if (res.status === 200) {
        setListCards(res.data); 
        
        // เช็คว่าเคยจองแล้วหรือไม่
        const today = dayjs().format("YYYY-MM-DD");
        const bookedDates = bookings.map((booking: any) => booking.ReservationDate);
        if (bookedDates.includes(today)) {
          messageApi.error("You have already booked for today.");
          return true;
        }
        return false;
      } else {
        messageApi.error("Failed to fetch parking cards.");
      }
    } catch (error) {
      console.error("Error checking user booking:", error);
      return false;
    }
  };

  const GetUser = async () => {
    try {
      const res = await GetUserById(userid || "");
      if (res.status === 200) {
        localStorage.setItem("status", res.data.Status);
        setUser(res.data.Status);
      } else {
        messageApi.error("Failed to fetch user.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      messageApi.error("An error occurred while fetching user.");
    } finally {
      setLoading(false); // Set loading to false after fetching user data
    }
  };

  const getCardByID = async () => {
    setLoading(true);
    try {
      const resCard = await GetParkingCardByUserID(userid || "");

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

  const getTypeParkByStatus = () => {
    console.log("role: ", role);
    switch (role) {
      case "User":
        return "GENERAL";
      case "Member":
        return ["GENERAL", "STORE"].join(","); // Join array to string
      case "MembershipCustomer":
        return ["GENERAL", "VIP"].join(",");
      default:
        return "GENERAL";
    }
  };

  const handleCancel = () => {
    setCarLicensePlate("");
    setCarColor("");
    setSelectedZone(null);
    setSelectedCard(null);
    setSelectedCardIndex(null);
    setFileList([]);
    form.resetFields();
  };

  const getRandomCard = (): string | null => {
    if (role === "Member") {
      // สำหรับ Member ให้เลือกบัตรเดียวที่มีอยู่แล้ว
      if (listcards.length > 0) {
        const card = listcards[0]; // เลือกบัตรแรก (ถ้ามี)
        setSelectedCard(card);
        setCardID(cards?.ID || "");
        return card.ID || null;
      }
      message.error("No available cards.");
      return null;
    } else {
      // สำหรับ User อื่นๆ ให้สุ่มบัตร
      const availableCards = listcards.filter(
        (card) => card.StatusCard?.Status === "IN"
      );
      if (availableCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCards.length);
        setSelectedCard(availableCards[randomIndex]);
        setCardID(availableCards[randomIndex].ID || "");
        return availableCards[randomIndex].ID || null;
      } else {
        message.error("No available cards with status IN.");
        return null;
      }
    }
  };

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };
  
  const handleZoneClick = (index: number) => {
    setSelectedZone(index === selectedZone ? null : index);
  };

  const handlePreOk = async () => {
    if (await checkUserBooking()) {
      return; // ถ้าผู้ใช้จองแล้วไม่สามารถจองใหม่ได้
    }
  
    if (!selectedDate || !zones[selectedZone || 0].ID || !carLicensePlate || !carColor || !carMake || imageUrl === null) {
      messageApi.error("Please fill in all required fields.");
      return;
    }
  
    setIsModalVisible(true);
  
    if (role !== "Member" && role !== "MembershipCustomer") {
      getRandomCard();
    }
  
    if (cards?.StatusCard?.Status === "Reserved") {
      message.error("This parking card is already reserved. Please select another one.");
      return;
    }
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
    } catch {
      message.error("Please fill in all required fields!");
      return;
    }

    // ตรวจสอบว่ามีการเลือก zone หรือยัง
    if (selectedZone === null) {
      message.error("Please select a parking zone!");
      return;
    }

    if (!selectedDate || !carLicensePlate || !carColor || !carMake) {
      message.error("Please fill in all required fields!");
      return;
    }

    if (!cardID) {
      message.error("Failed to get a random card ID.");
      return;
    }

    localStorage.setItem("idcard", cardID);

    const CardTransData = {
      ReservationDate: selectedDate,
      LicensePlate: carLicensePlate,
      Image: imageUrl || "",
      Color: carColor,
      Make: carMake,
      UserID: Number(localStorage.getItem("id")),
      ParkingCardID: cardID,
      StatusPaymentID: 1,
      ParkingZoneID: zones[selectedZone].ID,
    };

    const updateCardData = {
      ID: cardID,
      IsActive: true,
      StatusCardID: 4,
    };

    const updateZoneData = {
      ID: selectedZone,
      AvailableZone: (zones[selectedZone].AvailableZone || 0) - 1,
    };

    try {
      const resCard = await UpdateParkingCard(cardID || "", updateCardData);
      const resZone = await UpdateParkingZone(
        zones[selectedZone].ID || 0,
        updateZoneData
      );
      const resTrans = await CreateParkingTransaction(CardTransData);

      if (
        resCard.status === 200 &&
        resZone.status === 200 &&
        resTrans.status === 201
      ) {
        messageApi.success("Parking booking successful!");
        setIsModalVisible(false); // ปิด modal เมื่อสำเร็จ
        checkUserBooking();
        handleCancel();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      message.error("Error updating parking card or zone.");
      console.error("Error details:", error);
    }
  };

  // สร้างรายการของวันที่ที่สามารถเลือกได้ (3 วันข้างหน้า)
  const generateAvailableDates = () => {
    const today = dayjs();
    const availableDates = [
      today.format("YYYY-MM-DD"),
      today.add(1, "day").format("YYYY-MM-DD"),
      today.add(2, "day").format("YYYY-MM-DD"),
    ];
    return availableDates;
  };
  
  const onChangeUpload: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const renderReservedForm = () => (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        borderRadius: "8px",
      }}
    >
      <h2>This parking spot is already reserved.</h2>
      <p>You cannot make a reservation for this spot.</p>
    </div>
  );
  

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
              colorBgContainer: "#fbe8af",
            },
          },
        }}
      >
        <div style={{ height: "110px" }}></div>
        <div className="route">
          <a href="/Main">Home /</a>
          <a href="/CarParking-In">Parking IN /</a> Zone
        </div>
        <Row justify="center">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "Dongle, sans-serif",
              fontSize: "80px",
              fontWeight: 400,
              color: "#62501a",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              margin: "0% 0",
              lineHeight: "70px",
              marginTop: "50px",
              marginBottom: "30px",
            }}
          >
            Parking Reservation
          </h1>
        </Row>
        <Row justify="center">
          <Col span={8}>
            <Form layout="horizontal" form={form}>
              <Form.Item
                name="ReservationDate"
                label="Reservation Date"
                rules={[
                  {
                    required: true,
                    message: "Please select the reservation date!",
                  },
                ]}
                className="custom-form-item"
              >
                <Select
                  placeholder="Choose a date"
                  onChange={handleDateChange}
                  value={selectedDate}
                  style={{ width: "100%" }}
                >
                  {generateAvailableDates().map((date) => (
                    <Option key={date} value={date}>
                      {dayjs(date).format("YYYY-MM-DD")}
                    </Option>
                  ))}
                </Select>
              </Form.Item>{" "}
            </Form>
          </Col>
        </Row>
        {cards?.StatusCard?.Status === "Reserved" ? (
          renderReservedForm() // แสดงฟอร์มนี้เมื่อ statuscard เป็น reserved
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              {Array.isArray(zones) &&
                zones.map((zone, index) => (
                  <Card
                    hoverable
                    bordered={false}
                    key={zone.ID}
                    style={{
                      fontSize: "24px", // fontSize ใน Card
                      width: "300px",
                      border: "1px solid #d9d9d9",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "box-shadow 0.3s",
                      boxShadow:
                        selectedZone === index
                          ? "0 0 10px rgba(201, 175, 98, 0.5)"
                          : "none",
                    }}
                    onClick={() => handleZoneClick(index)}
                    cover={<img src={zone.Image} alt={zone.Name} />}
                  >
                    <Row justify={"space-around"}>
                      <Col>
                        <div style={{ textAlign: "left" }}>
                          <div
                            style={{
                              fontSize: "30px", // fontSize สำหรับ zone.Name
                            }}
                          >
                            {zone.Name}
                          </div>
                          <div
                            style={{
                              fontFamily: "Dongle, sans-serif",
                              fontSize: "16px",
                              color: "#757575",
                              lineHeight: "1.5",
                            }}
                          >
                            <div>Capacity: {zone.Capacity}</div>
                            <div>Available: {zone.AvailableZone}</div>
                          </div>
                        </div>
                      </Col>
                      <Col
                        style={{
                          fontFamily: "Dongle, sans-serif",
                          fontSize: "21.6px",
                        }}
                      >
                        <Progress
                          type="circle"
                          strokeColor="#E8D196"
                          size={80}
                          percent={
                            ((zone.AvailableZone || 0) / (zone.Capacity || 0)) *
                            100
                          }
                          format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
                          style={{
                            marginTop: "10px",
                          }}
                        />
                      </Col>
                    </Row>
                  </Card>
                ))}
            </div>{" "}
            <Row justify="center" style={{ marginTop: "25px" }}>
              <Col span={8}>
                <Form layout="horizontal" form={form}>
                  <div>Car Picture</div>
                  <Upload
                    fileList={fileList}
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                    beforeUpload={(file) => {
                      setFileList([...fileList, file]);
                      return false;
                    }}
                    maxCount={1}
                    multiple={false}
                    listType="picture-card"
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                  <Form.Item
                    name="LicensePlate"
                    label="License Plate"
                    rules={[
                      {
                        required: true,
                        message: "Please input the license plate!",
                      },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      value={carLicensePlate}
                      onChange={(e) => setCarLicensePlate(e.target.value)}
                      placeholder="Enter license plate"
                    />
                  </Form.Item>

                  <Form.Item
                    name="CarColor"
                    label="Car Color"
                    rules={[
                      {
                        required: true,
                        message: "Please input the car color!",
                      },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      value={carColor}
                      onChange={(e) => setCarColor(e.target.value)}
                      placeholder="Enter car color"
                    />
                  </Form.Item>

                  <Form.Item
                    name="CarMake"
                    label="Car Make"
                    rules={[
                      { required: true, message: "Please input the car make!" },
                    ]}
                    className="custom-form-item"
                  >
                    <Input
                      value={carMake}
                      onChange={(e) => setCarMake(e.target.value)}
                      placeholder="Enter car make"
                    />
                  </Form.Item>
                  <Button type="primary" onClick={() => handlePreOk()} block>
                    Confirm Reservation
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        )}
        <Modal
          open={isModalVisible}
          title="Confirm Reservation"
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>
            <strong>Date:</strong> {selectedDate}
          </p>
          <QRCode
            errorLevel="H"
            value={cardID || ""}
            icon="D:\university\2_2567\SE\ShoppingMall\frontend\src\assets\icon\LOGOS.png"
          />
          <p>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "20px auto",
                }}
              />
            ) : (
              <Typography.Text type="secondary">
                No image uploaded
              </Typography.Text>
            )}
          </p>
          <p>
            <strong>ID Card:</strong> {cardID}
          </p>
          <p>
            <strong>Zone:</strong>{" "}
            {zones.length > 0
              ? zones[selectedZone || 0]?.Name
              : "Zone not available"}
          </p>
          <p>
            <strong>License Plate:</strong> {carLicensePlate}
          </p>
          <p>
            <strong>Car Color:</strong> {carColor}
          </p>
          <p>
            <strong>Car Make:</strong> {carMake}
          </p>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default CustomerParkingBooking;
