import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Typography,
  Form,
  Upload,
  Card,
  Progress,
  ConfigProvider,
  message,
  Button,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { NavBar } from "../../../Component/NavBar";
import { GetListCard, GetListZone } from "../../../../services/https";
import {
  MembershipCustomerInterface,
  ParkingCardInterface,
  ParkingZoneInterface,
} from "../../../../interfaces/Carpark";
import { Link } from "react-router-dom";

const { Title } = Typography;

const CustomerParkingBooking: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(true);
  const [zones, setZones] = useState<ParkingZoneInterface[]>([]);
  const [cards, setCards] = useState<ParkingCardInterface[]>([]);
  const [selectedZoneIndex, setSelectedZoneIndex] = useState<number | null>(
    null
  );
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [carColor, setCarColor] = useState<string>("");
  const [imageFile, setImageFile] = useState<any>(null);
  const [idStore, setIdStore] = useState<string>("");
  const [isMember, setIsMember] = useState<boolean>(false);
  const [cardInput, setCardInput] = useState<string>("");
  const [isModalRequiredVisible, setIsModalRequiredVisible] = useState(false);
  const [isModalCardVisible, setIsModalCardVisible] = useState(false);
  const [isModalMembershipVisible, setIsModalMembershipVisible] =
    useState(false); // Added missing state

  useEffect(() => {
    GetZone();
    GetCard();
  }, []);

  const GetZone = async () => {
    try {
      const res = await GetListZone();
      if (res.status === 200) {
        setZones(res.data);
      } else {
        messageApi.error("Failed to fetch parking zones.");
      }
    } catch (error) {
      console.error("Error fetching zones:", error);
      messageApi.error("An error occurred while fetching zones.");
    } finally {
      setLoading(false);
    }
  };

  const GetCard = async () => {
    try {
      const res = await GetListCard();
      if (res.status === 200) {
        setCards(res.data);
      } else {
        messageApi.error("Failed to fetch parking zones.");
      }
    } catch (error) {
      console.error("Error fetching zones:", error);
      messageApi.error("An error occurred while fetching zones.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (index: number) => {
    setSelectedZoneIndex(index === selectedZoneIndex ? null : index);
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
              paddingTop: "3%",
            }}
          >
            Zone
          </h1>
        </Row>
        <Card style={{ justifySelf: "center", width: "64%" }}>
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
                  boxShadow:
                    selectedZoneIndex === index
                      ? "0 0 10px rgba(201, 175, 98, 0.5)"
                      : "none",
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
                      percent={
                        ((zone.AvailableZone || 0) / (zone.Capacity || 0)) * 100
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
          </div>
          <Row justify={"end"} style={{ marginRight: "22px" }}>
            <Link to="/CarPark/Booking">
              <Button>Next</Button>
            </Link>
          </Row>
          {/* <Form
            name="parking-form"
            layout="horizontal"
            style={{
              columnRuleWidth: "150px",
              marginTop: 16,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              {" "}
              Please upload a photo of your car
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
            </div>
            <Form.Item
              label="License Plate"
              name="licensePlate"
              rules={[
                { required: true, message: "Please input your license plate!" },
              ]}
            >
              <Input
                placeholder="Please enter your license plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Car Color"
              name="CarColor"
              rules={[
                { required: true, message: "Please input your car make!" },
              ]}
            >
              <Input
                placeholder="Please enter car make"
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
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
            open={isModalRequiredVisible}
            onOk={handleRequiredOk}
            onCancel={handleRequiredCancel}
          >
            <p>Not a member? Please register!</p>
          </Modal>

          <Modal
            title="ID Card Verification"
            open={isModalRequiredVisible}
            onOk={handleCardModalOk}
            onCancel={handleCardModalCancel}
          >
            <Input
              placeholder="Enter your 4-digit ID"
              value={cardInput}
              onChange={(e) => setCardInput(e.target.value)}
            />
          </Modal> */}
        </Card>
        {/* <Modal
          title="Membership Registration"
          open={isModalMembershipVisible}
          onOk={handleCardModalOk}
          onCancel={handleMembershipCancel} // Now it's defined
        >
          <Form
            name="membership-form"
            layout="vertical"
            onFinish={() => {
              message.success("Registration successful!");
              setIsMember(true);
              setIsModalMembershipVisible(false); // Fixed here
            }}
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form>
        </Modal> */}
      </ConfigProvider>
    </>
  );
};

export default CustomerParkingBooking;
