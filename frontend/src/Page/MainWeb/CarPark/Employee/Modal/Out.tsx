import React, { useEffect, useState } from "react";
import { Button, Card, Modal, message, Row, Col, Spin, QRCode } from "antd";
import { ParkingCardInterface } from "../../../../../interfaces/Carpark";

interface InProps {
  setCards: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  cards: ParkingCardInterface[];
  // fetchParkingCards: () => void;
  getParkingCards: () => void;
  selectedCard: ParkingCardInterface | null;
  selectedButtonInOutDefault: string;
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
  handleCancel: () => void;
}

const OUT: React.FC<InProps> = ({
  setCards,
  cards,
  //fetchParkingCards,
  getParkingCards,
  selectedCard,
  selectedButtonInOutDefault,
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
  handleCancel,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [cashReceived, setCashReceived] = useState<number>(0);

  const handlePayment = async () => {
    if (!paymentMethod) {
      message.error("Please select a payment method");
      return;
    }

    if (
      paymentMethod === "Cash" &&
      cashReceived < (selectedCard?.ParkingPayment?.Amount || 0)
    ) {
      message.error("Insufficient cash amount");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate backend call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (paymentMethod === "Cash") {
        const change =
          cashReceived - (selectedCard?.ParkingPayment?.Amount || 0);
        console.log(`Change to give back: ${change}`);
      }

      setPaymentCompleted(true);
      message.success(`Payment successful with ${paymentMethod}`);
    } catch (error) {
      message.error("Payment failed, please try again");
    } finally {
      setIsLoading(false);
      setIsModalOutVisible(false);
    }
  };

  return (
    <Modal
      title="Payment Options"
      open={isModalOutVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      {isLoading ? (
        <Spin tip="Processing payment..." />
      ) : paymentCompleted ? (
        <div style={{ textAlign: "center" }}>
          <h3>Payment Successful!</h3>
          <p>Thank you for your payment.</p>
        </div>
      ) : (
        <>
          <h4>Select Payment Method</h4>
          <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
            <Col span={12}>
              <Card
                hoverable
                onClick={() => setPaymentMethod("QR Payment")}
                style={{
                  borderColor:
                    paymentMethod === "QR Payment" ? "#1890ff" : "#f0f0f0",
                }}
              >
                <h3>QR Payment</h3>
                <p>Pay using mobile banking</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                hoverable
                onClick={() => setPaymentMethod("Cash")}
                style={{
                  borderColor: paymentMethod === "Cash" ? "#1890ff" : "#f0f0f0",
                }}
              >
                <h3>Cash</h3>
                <p>Pay with cash at the counter</p>
              </Card>
            </Col>
          </Row>
          {paymentMethod === "QR Payment" && (
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <img
                src={
                  `https://promptpay.io/0970306427.png/${
                    selectedCard?.ParkingPayment?.Amount || 0
                  }` ||
                  "https://img.freepik.com/premium-vector/broken-credit-card-debt-bankruptcy-failed-money-transaction-vector-stock-illustration_100456-11684.jpg"
                }
                width={150}
                alt="QR Code for Payment"
              />
              <p>Scan this QR Code to complete payment</p>
            </div>
          )}
          {paymentMethod === "Cash" && (
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <h4>Enter Cash Received</h4>
              <input
                type="number"
                value={cashReceived}
                onChange={(e) => setCashReceived(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px",
                  margin: "8px 0",
                  border: "1px solid #d9d9d9",
                  borderRadius: "4px",
                }}
                placeholder="Enter amount"
              />
              <p>
                Total Amount:{" "}
                {(selectedCard?.ParkingPayment?.Amount || 0).toFixed(2)} THB
              </p>
            </div>
          )}

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Button
              type="primary"
              onClick={handlePayment}
              disabled={!paymentMethod}
            >
              Confirm Payment
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default OUT;
