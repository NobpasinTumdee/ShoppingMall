import React, { useState } from "react";
import { Card, Progress, Row, Col } from "antd";

const GeneralZone: React.FC = () => {
  const [capacity] = useState<number>(100);
  const [available] = useState<number>(50);
  const [isHoverable, setIsHoverable] = useState<boolean>(false); // State to toggle hoverable

  const handleClick = () => {
    setIsHoverable((prevState) => !prevState); // Toggle hoverable on click
  };


  return (
    <Card
      hoverable
      bordered={false}
      style={{
        margin: "10px auto", // ให้อยู่กึ่งกลางหน้าจอ
        border: "1px solid #d9d9d9", // กรอบบางๆ
        padding: "16px",
        cursor: "pointer",
        alignContent: "space-between",
        transition: "box-shadow 0.3s",
        boxShadow: isHoverable ? "0px 4px 12px rgba(0, 0, 0, 0.2)" : "none", // Optional hover effect
        
      }}
      onClick={handleClick} // Toggle hoverable on click
      cover={
        <img
          src="/src/assets/CarPark/carpark-general.webp"
          alt="Membership Zone"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      }
    >
      <Row justify="space-between" align="middle">
        <Col flex="auto" style={{ textAlign: "left" }}>
          <div
            style={{
              fontSize: "30px",
              marginBottom: "5px",
              fontFamily: "Dongle, sans-serif",
              color: "#1e1e1e",
            }}
          >
            GENERAL
          </div>
          <div
            style={{
              fontSize: "18px",
              color: "#757575",
              marginBottom: "20px",
              lineHeight: "1.5",
              fontFamily: "Dongle, sans-serif",
            }}
          >
            <div>Capacity: {capacity}</div>
            <div>Available: {available}</div>
          </div>
        </Col>
        <Col style={{ textAlign: "center" }}>
          <Progress
            type="circle"
            strokeColor="#E8D196"
            size={100}
            percent={(available / capacity) * 100}
            format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
            style={{
              fontFamily: "Dongle, sans-serif",
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default GeneralZone;
