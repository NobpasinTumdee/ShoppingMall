import React from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Row,
} from "antd";
import {
  BookCarParkInterface,
  ParkingCardInterface,
} from "./../../../../interfaces/Carpark";
import "./../Carpark.css";
import layout from "antd/es/layout";

import { UpdateParkingCard } from "../../../../services/https";
import { UpdateParkingZone } from "../../../../services/https";

interface InProps {
  setCards: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  cards: ParkingCardInterface[];
  // fetchParkingCards: () => void;
  getParkingCards: () => void;
  selectedCard: ParkingCardInterface | null;
  selectedStatus: string;
  carLicensePlate: string;
  setCarLicensePlate: React.Dispatch<React.SetStateAction<string>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;

  setSelectedCard: React.Dispatch<
    React.SetStateAction<ParkingCardInterface | null>
  >;
  setFilteredData: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  onChange: (value: string) => void;
  setIsModalInVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalInVisible: boolean;
  setIsModalOutVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOutVisible: boolean;
  handleCancelIn: () => void;
  handleCancelOut: () => void;
}

const IN: React.FC<InProps> = ({
  setCards,
  cards,
  //fetchParkingCards,
  getParkingCards,
  selectedCard,
  selectedStatus,
  carLicensePlate,
  setCarLicensePlate,
  selectedCardIndex,
  setSelectedCardIndex,
  /* handleCancel, */
  setSelectedCard,
  setFilteredData,
  setSearchValue,
  searchValue,
  onChange,
  setIsModalInVisible,
  isModalInVisible,
  setIsModalOutVisible,
  isModalOutVisible,
  handleCancelOut,
  handleCancelIn,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
    //setSelectedCardIndex(index);
  };

  const handleCancel = () => {
    console.log(selectedCard?.ParkingZone);

    form.resetFields();
    setSelectedCard(null);
    setCarLicensePlate("");
    setSelectedCardIndex(null);
    setIsModalInVisible(false); // ปิด Modal

    // Reset filteredData
    setFilteredData([]); // Reset filtered data when closing modal
  };

  const handleOk = async () => {
    console.log("selectedCard?.ParkingZone: ", selectedCard?.ParkingZone);
    console.log("selectedCardIndex: ", selectedCardIndex);
    console.log("selectedCard: ", selectedCard);

    try {
      await form.validateFields(); // Validate required fields
    } catch (error) {
      message.error("Please fill in all required fields!");
      return;
    }

    if (selectedCardIndex === null || !carLicensePlate) {
      message.error(
        "Please select a parking card and input the license plate!"
      );
      return;
    }

    if (Array.isArray(selectedCard?.ParkingZone)) {
      const zone = selectedCard.ParkingZone[selectedCardIndex ?? 0];
      const zoneId = zone?.ID;
      const availableZone = zone?.AvailableZone || 0;

      // ตรวจสอบว่าที่จอดรถไม่ว่าง
      if (availableZone === 0) {
        message.error("This parking zone is full. Cannot update card!");
        return;
      }

      const licensePlate = carLicensePlate;
      const userID = localStorage.getItem("id");
      const parkingCardID = selectedCard?.ID;

      const usageCardData = {
        ID: parkingCardID,
        EntryTime: new Date().toISOString(),
        LicensePlate: licensePlate,
        UserID: Number(userID),
        StatusCardID: 2,
        StatusPaymentID: 1,
      };

      const updateZoneData = {
        ID: zoneId,
        AvailableZone: availableZone - 1,
      };

      try {
        const resCard = await UpdateParkingCard(parkingCardID, usageCardData);
        const resZone = await UpdateParkingZone(zoneId || 0, updateZoneData);

        if (resCard.status === 200 && resZone.status === 200) {
          messageApi.open({
            type: "success",
            content: "Parking card and zone updated successfully!",
          });

          handleCancel();
          getParkingCards();
          onChange(searchValue);
          setSearchValue("");
          setFilteredData([]);
          setIsModalInVisible(false);
        } else {
          message.error("Error updating parking card or zone.");
        }
      } catch (error) {
        message.error("Error updating parking card or zone.");
        console.error("Error details:", error);
      }
    } else {
      console.log("ParkingZone is not an array.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          fontFamily: "Dongle, sans-serif",
          fontSize: 24,
          colorPrimary: "#c9af62",
          borderRadius: 8,
        },
        components: {
          Progress: {
            circleTextFontSize: "larger",
          },
        },
      }}
    >
      <Modal
        title={
          <span
            style={{
              fontSize: "30px",
              justifySelf: "center",
            }}
          >
            {selectedStatus === "IN" ? "Parking IN" : "Parking OUT"}
          </span>
        }
        open={isModalInVisible}
        onOk={handleOk}
        onCancel={handleCancelIn}
        width={"fit-content"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "16px",
          padding: "16px",
        }}
      >
        {contextHolder}

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
            selectedCard.ParkingZone.map((zone, index) => (
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
                    selectedCardIndex === index
                      ? "0 0 10px rgba(201, 175, 98, 0.5)"
                      : "none",
                }}
                onClick={() => handleCardClick(index)}
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
                          fontFamily: "Dongle, sans-serif", // fontFamily สำหรับ Capacity
                          fontSize: "16px", // fontSize สำหรับ Capacity
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
        {/* License Plate Form Item with Validation */}
        <Form
          form={form}
          name="parking-form"
          layout="vertical"
          style={{
            marginTop: 16,
          }}
        >
          <Form.Item
            name="licenseplate"
            label="License Plate"
            rules={[
              { required: true, message: "Please input the license plate!" },
            ]}
            className="custom-form-item"
          >
            <Input
              value={carLicensePlate}
              onChange={(e) => setCarLicensePlate(e.target.value)}
              placeholder="Enter license plate"
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default IN;
