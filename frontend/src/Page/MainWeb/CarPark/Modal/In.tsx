import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Row,
} from "antd";
import { BookCarParkInterface } from "./../../../../interfaces/Carpark";
import layout from "antd/es/layout";
import { CreateUsageCard } from "../../../../services/https";

interface InProps {
  selectedCard: BookCarParkInterface | null;
  selectedStatus: string;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  carLicensePlate: string;
  setCarLicensePlate: React.Dispatch<React.SetStateAction<string>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /* handleCancel: () => void; */

  setSelectedCard: React.Dispatch<
    React.SetStateAction<BookCarParkInterface | null>
  >;
}

const IN: React.FC<InProps> = ({
  selectedCard,
  selectedStatus,
  isModalVisible,
  setIsModalVisible,
  carLicensePlate,
  setCarLicensePlate,
  selectedCardIndex,
  setSelectedCardIndex,
  handleInputChange,
  /* handleCancel, */
  setSelectedCard,
}) => {

  const [form] = Form.useForm();

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedCard(null);
    setCarLicensePlate("");
    setSelectedCardIndex(null);
    setIsModalVisible(false); // ปิด Modal
  };

  const handleOk = async () => {
    // Trigger form validation first
    try {
      await form.validateFields();  // This will trigger validation for required fields
    } catch (error) {
      message.error("Please fill in all required fields!");
      return;
    }
  
    // Ensure that License Plate and Card are selected
    if (selectedCardIndex === null || !carLicensePlate) {
      message.error("Please select a parking card and input the license plate!");
      return;
    }
  
    // Get ParkingZoneID based on the selected zone in the UI
    const zone = selectedCard?.NameZone[selectedCardIndex] ?? "defaultZone"; // Use selected zone ID
    const licensePlate = carLicensePlate;
    const userID = localStorage.getItem('id');
    const parkingCardID = selectedCard?.idcard;
  
    const usageCardData = {
      EntryTime: new Date().toISOString(),
      LicensePlate: licensePlate,
      UserID: Number(userID),
      ParkingCardID: Number(parkingCardID),
      ParkingZoneID: zone, // Use the selected zone ID
      StatusPaymentID: 1,
    };
  
    try {
      const response = await CreateUsageCard(usageCardData);
      if (response.status === 201) {
        message.success("UsageCard created successfully");
        setIsModalVisible(false);
  
        // Update the selected card's available parking spots
        setSelectedCard((prevCard) => {
          if (!prevCard) return null;
          
          const updatedCard = { ...prevCard };
          updatedCard.Available = updatedCard.Available ? updatedCard.Available - 1 : 0;
          updatedCard.idcard = updatedCard.idcard || "";
          return updatedCard;
        });
  
        message.success("Data recorded successfully");
      }
    } catch (error) {
      message.error("Error creating usage card.");
      console.error(error);
    }
  };
  
  
  const handleOkWithSubmit = async () => {
    if (selectedCardIndex === null || !carLicensePlate) {
      message.error("Please select a parking card and input the license plate!");
      return; // หยุดการทำงานหากยังไม่ได้เลือกบัตรหรือกรอกป้ายทะเบียน
    }
  
    try {
      // Trigger the form submission
      await form.submit();
    } catch (error) {
      console.error("Form submission failed:", error);
  };
}

  return (
    <Modal
      title={
        <span style={{ fontSize: "30px", justifySelf: "center" }}>
          {selectedStatus === "IN" ? "Parking IN" : "Parking OUT"}
        </span>
      }
      visible={isModalVisible}
      open={isModalVisible}
      onOk={handleOk} // Trigger form submission on OK
      onCancel={handleCancel}
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
      <div style={{ textAlign: "left", marginBottom: "16px" }}>
        <p style={{ fontSize: "25px", fontWeight: "normal", margin: 0 }}>
          ID Card: {selectedCard?.idcard}
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
        {selectedCard?.NameZone.map((zone: any, index: any) => (
          <Card
            hoverable
            bordered={false}
            key={index}
            style={{
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
            cover={
              <img
                src={selectedCard?.Image?.[index] || ""}
                alt={`Parking Zone ${selectedCard?.idzone?.[index]}`}
              />
            }
          >
            <Row justify={"space-around"}>
              <Col>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: "30px" }}>{zone}</div>
                  <div
                    style={{
                      fontSize: "18px",
                      color: "#757575",
                      lineHeight: "1.5",
                    }}
                  >
                    <div>Capacity: {selectedCard?.Capacity}</div>
                    <div>Available: {selectedCard?.Available}</div>
                  </div>
                </div>
              </Col>
              <Col>
                <Progress
                  type="circle"
                  strokeColor="#E8D196"
                  size={80}
                  percent={
                    (selectedCard?.Available / selectedCard?.Capacity) * 100
                  }
                  format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
                  style={{ marginTop: "10px" }}
                />
              </Col>
            </Row>
          </Card>
        ))}
      </div>

      {/* License Plate Form Item with Validation */}
      <Form {...layout} form={form} name="parking-form" layout="vertical">
        <Form.Item
          name="licenseplate"
          label="License Plate"
          rules={[
            { required: true, message: "Please input the license plate!" },
          ]}
        >
          <Input
            value={carLicensePlate}
            onChange={(e) => setCarLicensePlate(e.target.value)} // ควบคุมค่าให้ตรงกับ state
            placeholder="Enter license plate"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IN;
