import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Radio,
  Row,
  Tabs,
} from "antd";
import type { CheckboxProps } from "antd";
import { ParkingCardInterface } from "./../../../../interfaces/Carpark";
import layout from "antd/es/layout";
import "./../CarPark.css";
import { UpdateParkingCard } from "../../../../services/https";

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
  setIsModalOutVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOutVisible: boolean;
  handleCancelIn: () => void;
  handleCancelOut: () => void;
}

const OUT: React.FC<InProps> = ({
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
  setIsModalOutVisible,
  isModalOutVisible,
  handleCancelIn,
  handleCancelOut,
}) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [latestEntryTime, setLatestEntryTime] = useState<string>("");

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

  const calculateTimeDifference = (entryTime: string) => {
    const entry = new Date(entryTime);
    const now = new Date();
    const timeDiff = (now.getTime() - entry.getTime()) / (1000 * 3600); // ชั่วโมง

    const totalTime = `${Math.floor(timeDiff)} hr ${Math.round(
      (timeDiff % 1) * 60
    )} min`;
    return totalTime;
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  // ฟังก์ชันคำนวณเวลาระหว่าง IN และ OUT
  useEffect(() => {
    if (selectedCard?.ParkingTransaction?.length) {
      const latestEntry = selectedCard.ParkingTransaction.reduce(
        (latest, current) => {
          return new Date(current.EntryTime || "").getTime() >
            new Date(latest.EntryTime || "").getTime()
            ? current
            : latest;
        },
        selectedCard.ParkingTransaction[0]
      );

      if (latestEntry.EntryTime) {
        setLatestEntryTime(formatDate(new Date(latestEntry.EntryTime)));
        setTotalTime(calculateTimeDifference(latestEntry.EntryTime));
      }
    }
  }, [selectedCard]);

  const handlePayment = () => {
    message.success("Payment Successful");
    setIsModalOutVisible(false);
  };

  const handlePaymentOk = () => {
    handlePayment();
  };
  return (
    <Modal
      title={
        <span
          style={{
            fontSize: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
          }}
        >
          ICONIC REALTY SERVICES CO.,LTD.
        </span>
      }
      open={isModalOutVisible}
      onOk={handlePaymentOk}
      onCancel={handleCancelOut}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        fontSize: "16px", // กำหนด fontSize สำหรับ Modal ทั้งหมด
        fontFamily: "Dongle, sans-serif",
      }}
    >
      {contextHolder}
      <div
        style={{
          justifySelf: "center",
          fontFamily: "Dongle, sans-serif",
          fontSize: "30px",
        }}
      >
        {amount.toFixed(2)} {"฿"}
      </div>
      <div style={{ fontSize: "20px", marginTop: "10px" }}>
        {/* กำหนด fontSize ของเนื้อหาภายใน Modal */}
        <Row gutter={50}>
          <Col span={10}>{"License Plate"}</Col>
          <Col>{selectedCard?.ParkingTransaction?.[0]?.LicensePlate || "No Data"}</Col>
        </Row>
        <Row gutter={50}>
          <Col span={10}>{"IN"}</Col>
          <Col>{latestEntryTime || "No Data"}</Col>
        </Row>
        <Row gutter={50}>
          <Col span={10}>{"OUT"}</Col>
          <Col>{formatDate(new Date())}</Col>
        </Row>
        <Row gutter={50}>
          <Col span={10}>{"Total Time"}</Col>
          <Col>{totalTime || "Calculating..."}</Col>
        </Row>
        <Row gutter={50}>
          <Col span={10}>{"Amount"}</Col>
          <Col>{amount.toFixed(2)}</Col>
        </Row>
        <Row gutter={50}>
          <Col span={10}>{"Discount (%)"}</Col>
          <Col>{discount.toFixed(2)}</Col>
        </Row>
        <Row gutter={50}>
          <Col span={10}>{"Total Amount"}</Col>
          <Col>{(amount - discount).toFixed(2)}</Col>
        </Row>
        <Button onClick={handlePayment}>Pay Now</Button>
      </div>
    </Modal>
  );
};

export default OUT;
