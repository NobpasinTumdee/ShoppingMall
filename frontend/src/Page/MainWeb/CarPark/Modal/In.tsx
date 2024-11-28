import React from "react";
import { Button, Card, Form, Input, message, Modal, Progress } from "antd";
import { BookCarParkInterface } from "./../../../../interfaces/Carpark";

interface InProps {
  selectedCard: BookCarParkInterface | null;
  selectedStatus: string;
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  carRegistration: string;
  setCarRegistration: React.Dispatch<React.SetStateAction<string>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOk: () => Promise<void>;
  handleCancel: () => void;
}

const IN: React.FC<InProps> = ({
  selectedCard,
  selectedStatus,
  isModalVisible,
  setIsModalVisible,
  carRegistration,
  setCarRegistration,
  selectedCardIndex,
  setSelectedCardIndex,
  handleInputChange,
  handleOk,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(selectedCardIndex === index ? null : index);
  };

  // Handle OK button click and validate if a card is selected
  const handleOkWithSubmit = async () => {
    if (selectedCardIndex === null) {
      // If no card is selected, show a validation alert
      message.error("Please select a parking card before proceeding.");
      return; // Prevent form submission
    }

    try {
      // Trigger the form submission
      await form.submit();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <Modal
      title={<span style={{ fontSize: "30px", justifySelf: "center" }}>{selectedStatus === "IN" ? "Parking IN" : "Parking OUT"}</span>}
      open={isModalVisible}
      onOk={handleOkWithSubmit} // Trigger form submission on OK
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
        <p style={{ fontSize: "25px", fontWeight: "normal", margin: 0 }}>ID Card: {selectedCard?.idcard}</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
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
              boxShadow: selectedCardIndex === index ? "0 0 10px rgba(201, 175, 98, 0.5)" : "none",
            }}
            onClick={() => handleCardClick(index)}
            cover={<img src={selectedCard?.Image?.[index] || ""} alt={`Parking Zone ${selectedCard?.idzone?.[index]}`} />}
          >
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "30px" }}>{zone}</div>
              <div style={{ fontSize: "18px", color: "#757575", lineHeight: "1.5" }}>
                <div>Capacity: {selectedCard?.Capacity}</div>
                <div>Available: {selectedCard?.Available}</div>
              </div>
            </div>
            <Progress
              type="circle"
              strokeColor="#E8D196"
              size={80}
              percent={(selectedCard?.Available[index] / selectedCard?.Capacity[index]) * 100}
              format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
              style={{ marginTop: "10px" }}
            />
          </Card>
        ))}
      </div>

      {/* License Plate Form Item with Validation */}
      <Form
        name="parking-form"
        layout="vertical"
        form={form} // Bind form instance
        onFinish={handleOk} // This is triggered on form submit
      >
        <Form.Item
          label="License Plate"
          name="licensePlate"
          rules={[{ required: true, message: "Please enter vehicle's license plate!" }]}
        >
          <Input
            value={carRegistration}
            onChange={handleInputChange}
            placeholder="Enter vehicle license plate"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IN;
