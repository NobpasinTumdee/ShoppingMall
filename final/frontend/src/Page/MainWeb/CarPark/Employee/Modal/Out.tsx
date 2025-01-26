import React, { useEffect, useState } from "react";
import {
  Card,
  Modal,
  message,
  Row,
  Col,
  Spin,
  Typography,
  InputNumber,
  InputNumberProps,
} from "antd";
import {
  ParkingCardInterface,
  ParkingPaymentInterface,
  ParkingUsageCardInterface,
  ParkingZoneDailyInterface,
  ParkingZoneInterface,
  StatusCardInterface,
} from "../../../../../interfaces/CarparkInterface";
import dayjs from "dayjs";
import {
  CreateParkingPayment,
  GetParkingCardByID,
  GetParkingPaymentByUsageCardID,
  UpdateParkingCard,
  UpdateParkingUsageCard,
  GetParkingUsageCardByID,
  UpdateZoneDailyByID,
} from "../../../../../services/https";
import LOGO from "./../../../../../assets/icon/LOGOS.png";
import "./../../../Store/StoreAndPay.css";
import ReceiptCard from "./Receipt";

const today = dayjs();
const dateOnly = today?.format("YYYY-MM-DD"); // เอาแค่วันที่
const dateWithTime = `${dateOnly}T00:00:00+07:00`;

interface OutProps {
  status: StatusCardInterface[];
  selectedCard: ParkingCardInterface | null;
  selectedButtonInOutDefault: string;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<ParkingCardInterface | null>
  >;
  setIsModalOutVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOutVisible: boolean;
  setLoadAfterInOutModal: React.Dispatch<React.SetStateAction<boolean>>;
  loadAfterInOutModal: boolean;
}

const OUT: React.FC<OutProps> = ({
  status,
  selectedCard,
  setSelectedCard,
  setIsModalOutVisible,
  isModalOutVisible,
  setLoadAfterInOutModal,
  loadAfterInOutModal,
}) => {
  const [existingUsageCard, setExistingUsageCard] =
    useState<ParkingUsageCardInterface>();
  const [reservedUsageCard, setReservedUsageCard] =
    useState<ParkingUsageCardInterface>();
  const [payment, setPayment] = useState<ParkingPaymentInterface>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [reload, setReload] = useState(false);
  const [zoneDaily, setZoneDaily] = useState<ParkingZoneDailyInterface>();
  const [zone, setZone] = useState<ParkingZoneInterface>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedCard) return;
        const rescard = await GetParkingCardByID(selectedCard.ID || "");
        if (rescard.status !== 200) throw new Error("Card not found");

        const cardData = rescard?.data;
        if (!cardData) return;

        setSelectedCard(cardData);

        const Today = dayjs().startOf("day");
        const existingTrans = cardData.ParkingUsageCard?.find(
          (usageCard: ParkingUsageCardInterface) => {
            return (
              (dayjs(usageCard.EntryTime).isSame(Today, "day") &&
                !usageCard.ExitTime) || // ถ้าเป็นวันนี้และยังไม่มี ExitTime
              (dayjs(usageCard.EntryTime).isBefore(Today, "day") &&
                !usageCard.ExitTime) // ถ้าเป็นวันที่ก่อนหน้านี้และยังไม่มี ExitTime
            );
          }
        );
        const reservedTrans = rescard.data.ParkingUsageCard?.find(
          (usageCard: any) =>
            !usageCard?.IsReservedPass &&
            usageCard?.ReservationDate === dateWithTime &&
            usageCard?.ID === existingTrans.ID &&
            rescard.data.ParkingUsageCard?.length > 0 &&
            rescard.data.IsPermanent
        );
        console.log("existingTrans: ", existingTrans);
        console.log("reservedTrans: ", reservedTrans);
        if (existingTrans) {
          const entryTime = existingTrans.EntryTime || "";
          const exitTime = existingTrans.ExitTime || dayjs().toISOString();

          setExistingUsageCard(existingTrans);
          setReservedUsageCard(reservedTrans);

          try {
            await calculateAmount(entryTime, exitTime);
          } catch (calcError) {
            console.error("Error in calculateAmount:", calcError);
          }
          try {
            const respayment = await GetParkingPaymentByUsageCardID(
              existingTrans.ID || 0
            );
            if (respayment.status == 200) {
              setPayment(respayment.data);
            }
          } catch (error) {
            console.error(error);
          }
          try {
            const restran = await GetParkingUsageCardByID(
              existingTrans.ID || 0
            );
            if (restran.status == 200) {
              setZoneDaily(restran.data.ParkingZoneDaily);
              setZone(restran.data.ParkingZoneDaily.ParkingZone);
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch parking card data.");
      }
    };

    if (isModalOutVisible) fetchData();
    console.log("selectedCard: ", selectedCard);
  }, [isModalOutVisible, reload, paymentCompleted]);

  const handleCancel = () => {
    setSelectedCard(null);
    setPaymentMethod("");
    setCashReceived(0);
    setIsModalOutVisible(false);
    setReload(!reload);
    setPaymentCompleted(false);
    setExistingUsageCard(undefined);
    setPayment(undefined);
    setLoadAfterInOutModal(!loadAfterInOutModal);
  };
  const calculateAmount = (entryTime: string, exitTime: string) => {
    const initialFee = selectedCard?.ParkingFeePolicy?.InitialFee || 0;
    const addBaseFee = selectedCard?.ParkingFeePolicy?.AddBase_Fee || 0;
    const discount = selectedCard?.ParkingFeePolicy?.Discount || 0;
    const timeIncrement = selectedCard?.ParkingFeePolicy?.Time_Increment || 1;
  
    const entry = dayjs(entryTime);
    const exit = dayjs(exitTime);
  
    // คำนวณระยะเวลาในหน่วยชั่วโมงแล้วหารด้วย Time_Increment
    const durationInHours = Math.ceil(exit.diff(entry, "hour") / timeIncrement) * timeIncrement;
  
    // คำนวณค่าธรรมเนียมตามเวลาเพิ่ม
    const amount = initialFee + (addBaseFee * durationInHours) / timeIncrement;
    const netAmount = amount - (amount * discount) / 100;
  
    setPayment((prev) => ({
      ...prev,
      Amount: amount,
      DiscountAmount: (amount * discount) / 100,
      NetAmount: netAmount,
    }));
  };
  
  const handlePayment = async () => {
    if (!paymentMethod) {
      message.error("Please select a payment method");
      return;
    }

    if (paymentMethod === "Cash" || paymentMethod === "QR Payment") {
      if (paymentMethod === "Cash") {
        console.log("cashReceived: ", cashReceived);
        console.log("payment?.NetAmount: ", payment?.NetAmount);
        if (!cashReceived || cashReceived < (payment?.NetAmount || 0)) {
          message.error("Insufficient amount received from the customer.");
          return;
        }
      }

      setChange(cashReceived - (payment?.NetAmount || 0));
      setIsLoading(true);

      console.log("payment?.Amount: ", payment?.Amount);
      console.log("payment?.DiscountAmount: ", payment?.DiscountAmount);
      console.log("cashReceived: ", cashReceived);
      console.log("change: ", change);
      console.log(
        "cashReceived - (payment?.NetAmount || 0): ",
        cashReceived - (payment?.NetAmount || 0)
      );
      try {
        const respay = await CreateParkingPayment({
          PaymentDate: dayjs().toISOString(),
          Amount: payment?.Amount,
          DiscountAmount: payment?.DiscountAmount,
          NetAmount: payment?.NetAmount,
          IsCash: paymentMethod === "Cash" ? true : false,
          CashReceived: cashReceived,
          Change:
            paymentMethod === "Cash"
              ? cashReceived - (payment?.NetAmount || 0)
              : 0,
          ParkingUsageCardID: existingUsageCard?.ID,
          UserID: Number(localStorage.getItem("id")),
        });

        const totalTime = Number(
          dayjs()
            .diff(dayjs(existingUsageCard?.EntryTime), "hour", true)
            .toFixed(2)
        );

        const updateUsageCardData = {
          IsReservedPass: true,
          ExitTime: dayjs().toISOString(),
          TotalHourly: totalTime,
          UserID: Number(localStorage.getItem("id")),
        };

        const updateCardData = {
          StatusCardID: Number(
            status?.find((state: any) => state.Status === "IN")?.ID || null
          ),
        };

        setPayment((prev) => ({
          ...prev,
          Change: change,
          TotalHourly: totalTime,
        }));

        const resTrans = await UpdateParkingUsageCard(
          existingUsageCard?.ID || 0,
          updateUsageCardData
        );

        const resCard = await UpdateParkingCard(
          selectedCard?.ID || "",
          updateCardData
        );

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ");
        console.log(
          "(zoneDaily?.ReservedAvailable: ",
          zoneDaily?.ReservedAvailable
        );

        console.log(
          "existingUsageCard !== undefined: ",
          existingUsageCard !== undefined
        );
        console.log("zoneDaily !== undefined: ", zoneDaily !== undefined);
        console.log(
          "existingUsageCard !== undefined && zoneDaily !== undefined: ",
          existingUsageCard !== undefined && zoneDaily !== undefined
        );
        console.log(
          "max",
          Math.max(
            0 /*  ค่าไม่ต่ำกว่า 0  */,
            ((zoneDaily?.ReservedAvailable || 0) + 1 ||
              0) /*  ตรวจว่า ReservedAvailable มีค่าหรือไม่ ถ้ามีจะใช้ค่า ReservedAvailable ถ้าไม่มีก็จะใช้ค่า 0 */ ??
              (zone?.MaxReservedCapacity ||
                0 -
                  1) /* ถ้าค่า ReservedAvailable = 0 null undefined จะใช้ค่า MaxReservedCapacity  - 1 */
          )
        );
        console.log(
          "min",
          Math.min(
            zone?.MaxReservedCapacity ||
              0 /*  ค่าไม่เกิน MaxReservedCapacity  */,
            (zoneDaily?.ReservedAvailable ||
              0) /* ตรวจว่า MaxReservedCapacity มีค่าหรือไม่ ถ้าไม่มีก็ใช้ 0 */ ??
              zone?.MaxReservedCapacity /* ถ้า ReservedAvailable = 0 null undefined ก็จะใช้ MaxReservedCapacity */
          )
        );

        const updateZoneDailyData = {
          ID: zoneDaily?.ID,
          Date: dateWithTime,
          AvailableZone:
            zoneDaily !== undefined
              ? (zoneDaily?.AvailableZone || 0) + 1
              : (zone?.MaxCapacity || 0) - 1,
          ReservedAvailable:
            reservedUsageCard !== undefined &&
            (existingUsageCard !== undefined || zoneDaily !== undefined)
              ? Math.max(
                  0, // ค่าไม่ต่ำกว่า 0
                  (zoneDaily?.ReservedAvailable || 0) + 1 // ถ้ามีค่า ReservedAvailable ให้เพิ่ม 1
                )
              : existingUsageCard !== undefined || zoneDaily !== undefined
              ? zoneDaily?.ReservedAvailable || 0 // ถ้ามี existingUsageCard หรือ zoneDaily ใช้ค่า ReservedAvailable เดิม
              : Math.min(
                  zone?.MaxReservedCapacity || 0, // ค่าไม่เกิน MaxReservedCapacity
                  zone?.MaxReservedCapacity || 0 // ถ้าไม่มีค่า ใช้ MaxReservedCapacity
                ),

          ParkingZoneID: zone?.ID,
        };
        const resZoneDaily = await UpdateZoneDailyByID(
          zoneDaily?.ID || 0,
          updateZoneDailyData
        );
        if (
          respay.status === 201 &&
          resTrans.status === 200 &&
          resCard.status === 200 &&
          resZoneDaily.status === 200
        ) {
          setPaymentCompleted(true);
          message.success(`Payment successful with ${paymentMethod}`);
          setReload(!reload);
        } else {
          message.error("Payment failed, please try again");
        }
      } catch (error) {
        console.error("Payment error:", error);
        message.error("Payment failed, please try again");
      } finally {
        setIsLoading(false);
      }
    }
  };

  /***************************    ใส่จำนวนเงินที่รับจากลูกค้า    ******************************** */
  const onChangeCashReceived: InputNumberProps["onChange"] = (value) => {
    setCashReceived(Number(value));
    console.log("changed", value);
  };

  return (
    <>
      <Modal
        open={isModalOutVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        /* style={{ padding: "20px" }} */
        style={{ maxWidth: "100%", maxHeight: "100vh" }}
      >
        {isLoading ? (
          <div
            style={{
              textAlign: "center",
              height: "auto" /* , padding: "20px" */,
            }}
          >
            <Spin tip="Processing payment..." />
          </div>
        ) : payment && (paymentCompleted === true) ? (
          <ReceiptCard
            existingUsageCard={existingUsageCard}
            selectedCard={selectedCard}
            setExistingUsageCard={setExistingUsageCard}
          />
        ) : (
          <div>
            <img
              src={LOGO}
              alt="Parking Service Logo"
              style={{
                width: "120px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "end",
              }}
            />
            <Typography.Paragraph>
              <img
                src={existingUsageCard?.Image}
                alt="Car"
                style={{
                  width: "100px",
                  height: "60px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              />
            </Typography.Paragraph>
            <Typography.Paragraph>
              <strong>License Plate:</strong>{" "}
              {existingUsageCard?.LicensePlate || "N/A"}
              <br />
              <strong>Color:</strong> {existingUsageCard?.Color || "N/A"}
              <br />
              <strong>Make:</strong> {existingUsageCard?.Make || "N/A"}
              <br />
            </Typography.Paragraph>

            <Typography.Title level={4} style={{ marginTop: "20px" }}>
              Select Payment Method
            </Typography.Title>
            <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
              <Col span={12}>
                <Card
                  hoverable
                  onClick={() => setPaymentMethod("QR Payment")}
                  style={{
                    borderColor:
                      paymentMethod === "QR Payment" ? "#1890ff" : "#f0f0f0",
                    borderRadius: "8px",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <Typography.Title
                    level={5}
                    style={{ marginTop: "10px", height: "50px" }}
                  >
                    QR Payment
                  </Typography.Title>
                  <Typography.Text>Pay using mobile banking</Typography.Text>
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  hoverable
                  onClick={() => setPaymentMethod("Cash")}
                  style={{
                    borderColor:
                      paymentMethod === "Cash" ? "#1890ff" : "#f0f0f0",
                    borderRadius: "8px",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <Typography.Title
                    level={5}
                    style={{ marginTop: "10px", height: "50px" }}
                  >
                    Cash
                  </Typography.Title>
                  <Typography.Text>
                    Pay with cash at the counter
                  </Typography.Text>
                </Card>
              </Col>
            </Row>
            {paymentMethod === "QR Payment" && (
              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <img
                  src={`https://promptpay.io/0970306427.png/${
                    selectedCard?.ParkingPayment?.Amount || 0
                  }`}
                  width={150}
                  alt="QR Code for Payment"
                />
                <Typography.Paragraph>
                  Amount: {(payment?.NetAmount || 0).toFixed(2)} THB
                </Typography.Paragraph>
                <Typography.Text
                  style={{ display: "block", marginTop: "10px" }}
                >
                  Scan this QR Code to complete payment
                </Typography.Text>
              </div>
            )}
            {paymentMethod === "Cash" && (
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                <InputNumber
                  min={payment?.NetAmount}
                  value={cashReceived}
                  onChange={onChangeCashReceived}
                  style={{
                    width: "100%",
                    padding: "3px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                  }}
                  placeholder="Enter amount"
                />
                <Typography.Paragraph>
                  Amount: {(payment?.NetAmount || 0).toFixed(2)} THB
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Change:{" "}
                  {(cashReceived - (payment?.NetAmount || 0)).toFixed(2)} THB
                </Typography.Paragraph>
              </div>
            )}
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <div
                className={`carpark-confirm-button ${
                  !paymentMethod ||
                  (paymentMethod === "Cash" && cashReceived <= 0)
                    ? "disabled"
                    : ""
                }`}
                onClick={() => {
                  if (
                    paymentMethod &&
                    !(paymentMethod === "Cash" && cashReceived <= 0)
                  ) {
                    handlePayment();
                  }
                }}
                style={{ width: "100%", borderRadius: "8px" }}
              >
                Confirm Payment
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}; 

export default OUT;
