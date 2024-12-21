import React, { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import { Row, Col, Input, Typography, Form, Upload, Card, Progress, ConfigProvider } from "antd";
import { NavBar } from "../../../Component/NavBar";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CustomerParkingBooking: React.FC = () => {
  const location = useLocation();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<any>(null); // กำหนดตัวแปร selectedCard
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null); // กำหนดตัวแปร selectedCardIndex

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    setSelectedType(type);

    // ตัวอย่างการตั้งค่า selectedCard
    setSelectedCard({
      ID: "12345678",
      ParkingZone: [
        { ID: 1, Name: "Zone A", Capacity: 100, AvailableZone: 50, Image: "/path/to/image1.jpg" },
        { ID: 2, Name: "Zone B", Capacity: 80, AvailableZone: 20, Image: "/path/to/image2.jpg" },
      ],
    });
  }, [location]);

  const handleSubmit = () => {
    console.log("ทะเบียนรถที่กรอก:", licensePlate);
  };

  return (
    <ConfigProvider>
      <NavBar />
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
      <div style={{ textAlign: "left", marginBottom: "16px" }}>
        <p
          style={{
            fontSize: "26px",
            fontWeight: "normal",
            margin: 0,
          }}
        >
          ID Card: {selectedCard?.ID}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {Array.isArray(selectedCard?.ParkingZone) &&
          selectedCard.ParkingZone.map((zone: any, index: any) => (
            <Card
              hoverable
              bordered={false}
              key={zone.ID}
              style={{
                fontSize: "24px",
                width: "300px",
                border: "1px solid #d9d9d9",
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow 0.3s",
                boxShadow:
                  selectedCardIndex === index
                    ? "0 0 10px rgba(201, 175, 98, 0.5)"
                    : "none",
              }}
              cover={<img src={zone.Image} alt={zone.Name} />}
            >
              <Row justify={"space-around"}>
                <Col>
                  <div style={{ textAlign: "left" }}>
                    <div
                      style={{
                        fontSize: "30px",
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
              return false;
            }}
            maxCount={1}
            multiple={false}
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>อัพโหลด</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          name="LicensePlate"
          label="License Plate"
          rules={[{ required: true, message: "Please input the license plate!" }]}
        >
          <Input
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="Enter license plate"
          />
        </Form.Item>

        <Form.Item
          name="CarMake"
          label="Car Make"
          rules={[{ required: true, message: "Please input the car make!" }]}
        >
          <Input
            value={carMake}
            onChange={(e) => setCarMake(e.target.value)}
            placeholder="Enter car make"
          />
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

export default CustomerParkingBooking;
