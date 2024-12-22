import React, { useState, useEffect } from "react"; 
import { Row, Col, Input, Typography, Form, Upload, Card, Progress, ConfigProvider, message, Button, Modal } from "antd";
import { NavBar } from "../../../Component/NavBarCarPark";
import { PlusOutlined } from "@ant-design/icons";
import { GetListZone } from "../../../../services/https";
import { MembershipCustomerInterface, ParkingZoneInterface } from "../../../../interfaces/Carpark";

const { Title } = Typography;

const CustomerParkingBooking: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [imageFile, setImageFile] = useState<any>(null);
  const [zones, setZones] = useState<ParkingZoneInterface[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMember, setIsMember] = useState<boolean>(false); // เช็คสมาชิก
  const [idStore, setIdStore] = useState<string>("");
  const [cardInput, setCardInput] = useState<string>(""); // สำหรับกรอกเลข 4 ตัว
  const [isCardModalVisible, setIsCardModalVisible] = useState(false); // แสดง modal กรอกบัตร
  const [membershipData, setMembershipData] = useState<MembershipCustomerInterface | null>(null); // ข้อมูลสมาชิก

  useEffect(() => {
    GetZone();
  }, []);

  const GetZone = async () => {
    try {
      const res = await GetListZone();
      if (res.status === 200) {
        setZones(res.data);
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

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };

  const handleSubmit = () => {
    if (selectedCardIndex === null || !licensePlate || !carMake) {
      message.error("Please select a parking zone and input license plate and car make.");
      return;
    }
  
    const selectedZone = selectedCard?.ParkingZone[selectedCardIndex];
  
    // ตรวจสอบสถานะของ Zone
    if (selectedZone?.Status === "ON" || selectedZone?.Status === "Expire" || selectedZone?.Status === "Un Used") {
      message.error("This zone is not available for booking.");
      return;
    }
  
    // ตรวจสอบว่าผู้ใช้เป็นสมาชิกหรือไม่
    if (!isMember) {
      setIsModalVisible(true); // ถ้าไม่ใช่สมาชิกให้แสดง modal
      console.log("User is not a member, showing membership modal.");
      return;
    }
  
    // ตรวจสอบ id store
    if (!idStore) {
      message.error("Please enter a valid store ID.");
      return;
    }
  
    const transactionData = {
      LicensePlate: licensePlate,
      CarMake: carMake,
      ZoneName: selectedZone?.Name,
      ZoneID: selectedZone?.ID,
      Image: imageFile,
    };
  
    // ส่งข้อมูลการจองที่จอดรถไปยัง API หรือทำการอัพเดทข้อมูล
    console.log("Booking Data:", transactionData);
    message.success("Parking booking successful!");
  };
  

  const handleOk = () => {
    // ฟังก์ชันเมื่อคลิก "สมัครสมาชิก"
    setIsMember(true);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCardModalOk = () => {
    if (cardInput.length !== 4 || isNaN(Number(cardInput))) {
      message.error("Please enter a valid 4-digit ID.");
      return;
    }

    // ฟังก์ชันเมื่อคลิก "OK" หลังกรอกตัวเลข
    setIsCardModalVisible(false);
    message.success("ID Card validated successfully!");
  };

  const handleCardModalCancel = () => {
    setIsCardModalVisible(false);
  };

  const handleStoreSubmit = () => {
    if (!idStore) {
      message.error("Please enter a valid store ID.");
    } else {
      window.location.href = "/Store"; // ถ้ากรอก ID Store แล้วไม่ถูกต้อง ให้ไปหน้า /Store
    }
  };

  return (
    <>
      <NavBar />
      <ConfigProvider>
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
              paddingTop: "3%",
            }}
          >
            Zone
          </h1>
        </Row>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {zones?.map((zone: ParkingZoneInterface, index: number) => (
            <Card
              hoverable
              bordered={false}
              key={zone.ID}
              onClick={() => handleCardClick(index)}
              style={{
                fontSize: "24px",
                width: "300px",
                border: "1px solid #d9d9d9",
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow 0.3s",
                boxShadow: selectedCardIndex === index ? "0 0 10px rgba(201, 175, 98, 0.5)" : "none",
              }}
              cover={<img src={zone.Image} alt={zone.Name} />}
            >
              <Row justify={"space-around"}>
                <Col>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "30px" }}>{zone.Name}</div>
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
                    percent={((zone.AvailableZone || 0) / (zone.Capacity || 0)) * 100}
                    format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
                    style={{
                      marginTop: "10px",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          ))}
        </div>

        <Form
          name="parking-form"
          layout="horizontal"
          style={{
            columnRuleWidth: "150px",
            marginTop: 16,
          }}
        >
          <Form.Item label="Image Car" name="Image" valuePropName="fileList">
            <Upload
              beforeUpload={(file) => {
                setImageFile(file);
                return false; // Prevent auto upload
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
          </Form.Item>

          <Form.Item
            label="License Plate"
            name="licensePlate"
            rules={[{ required: true, message: "Please input your license plate!" }]}
          >
            <Input
              placeholder="Please enter your license plate"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Car Make"
            name="carMake"
            rules={[{ required: true, message: "Please input your car make!" }]}
          >
            <Input
              placeholder="Please enter car make"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Store ID"
            name="storeId"
            rules={[{ required: true, message: "Please input store ID!" }]}
          >
            <Input
              placeholder="Please enter store ID"
              value={idStore}
              onChange={(e) => setIdStore(e.target.value)}
            />
          </Form.Item>

          <Button type="primary" onClick={handleSubmit}>
            Book Parking
          </Button>
        </Form>

        <Modal
          title="Membership Required"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Not a member? Please register!</p>
        </Modal>

        <Modal
          title="ID Card Verification"
          visible={isCardModalVisible}
          onOk={handleCardModalOk}
          onCancel={handleCardModalCancel}
        >
          <Input
            placeholder="Enter your 4-digit ID"
            value={cardInput}
            onChange={(e) => setCardInput(e.target.value)}
          />
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default CustomerParkingBooking;
