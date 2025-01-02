import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  message,
} from "antd";
import { ParkingCardInterface } from "../../../../../interfaces/Carpark";

interface OutProps {
  setCards: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  cards: ParkingCardInterface[];
  getParkingCards: () => void;
  selectedCard: ParkingCardInterface | null;
  selectedButtonInOutDefault: string;
  carLicensePlate: string;
  setCarLicensePlate: React.Dispatch<React.SetStateAction<string>>;
  selectedCardIndex: number | null;
  setSelectedCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setSelectedCard: React.Dispatch<React.SetStateAction<ParkingCardInterface | null>>;
  setFilteredData: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setIsModalOutVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOutVisible: boolean;
  handleCancel: () => void;
}

const OUT: React.FC<OutProps> = ({
  setCards,
  cards,
  getParkingCards,
  selectedCard,
  selectedButtonInOutDefault,
  carLicensePlate,
  setCarLicensePlate,
  selectedCardIndex,
  setSelectedCardIndex,
  setSelectedCard,
  setFilteredData,
  setSearchValue,
  searchValue,
  setIsModalOutVisible,
  isModalOutVisible,
  handleCancel,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<string>("Calculating...");
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
        // คำนวณค่าจอดรถ (ตัวอย่างการคำนวณ)
        const calculatedAmount = 50 + (Math.random() * 100); // คำนวณตามเวลาจอด
        setAmount(calculatedAmount);
      }
    }
  }, [selectedCard]);

  const handlePayment = () => {
    message.success("Payment Successful");
    setIsModalOutVisible(false);
  };

  return (
    <Modal
      title="ICONIC REALTY SERVICES CO.,LTD."
      open={isModalOutVisible}
      onOk={handlePayment}
      onCancel={handleCancel}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
        fontSize: "16px",
        fontFamily: "Dongle, sans-serif",
      }}
    >
      <div style={{ fontFamily: "Dongle, sans-serif", fontSize: "30px" }}>
        {amount.toFixed(2)} ฿
      </div>
      <div style={{ fontSize: "20px", marginTop: "10px" }}>
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
