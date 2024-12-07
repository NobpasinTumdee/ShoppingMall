import React, { useEffect, useState } from "react";
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
import {
  BookCarParkInterface,
  ParkingCardInterface,
} from "./../../../../interfaces/Carpark";
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
  onChange: (value: string) => void;
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
  onChange,
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

  // ฟังก์ชันคำนวณเวลาระหว่าง IN และ OUT
  useEffect(() => {
    if (selectedCard?.EntryTime && selectedCard?.ExitTime) {
      const { totalTime, totalAmount, discount } = calculateTimeDifference(
        selectedCard.EntryTime,
        selectedCard.ExitTime,
        selectedCard.Hourly_rate || "0",
        selectedCard.Fee || 0
      );
      setTotalTime(totalTime);
      setAmount(totalAmount);
      setDiscount(discount);
      setTotalAmount(totalAmount - discount); // คำนวณยอดเงินหลังหักส่วนลด
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
      {selectedCard?.TypePark?.Type}
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
  <div style={{ fontSize: "18px" }}> {/* กำหนด fontSize ของเนื้อหาภายใน Modal */}
    <strong>Membership:</strong> {selectedCard?.MembershipCustomerID || "N/A"}
    <br />
    <strong>Card Type:</strong> {selectedCard?.ID}
    <br />
    <strong>IN:</strong> {selectedCard?.EntryTime}
    <br />
    <strong>OUT:</strong> {selectedCard?.ExitTime}
    <br />
    <strong>Total Time:</strong> {totalTime}
    <br />
    <strong>Amount:</strong> {amount}
    <br />
    <strong>Discount (20%):</strong> {discount}
    <br />
    <strong>Total Amount:</strong> {totalAmount}
    <br />
    <Button onClick={handlePayment}>Pay Now</Button>
  </div>
</Modal>

  );
};

export default OUT;

export const calculateTimeDifference = (
  entryTime: string,
  exitTime: string,
  hourlyRate: string,
  fee: number
) => {
  const entry = new Date(entryTime);
  const exit = new Date(exitTime);
  const timeDiff = (exit.getTime() - entry.getTime()) / (1000 * 3600); // เวลาเป็นชั่วโมง

  const totalAmount = timeDiff * parseFloat(hourlyRate);
  const discount = totalAmount * 0.2; // สมมติว่ามีส่วนลด 20%

  const totalTime = `${Math.floor(timeDiff)} hr ${Math.round(
    (timeDiff % 1) * 60
  )} min`;

  return { totalTime, totalAmount, discount };
};
