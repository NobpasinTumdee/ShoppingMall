import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Modal,
  message,
  Row,
  Col,
  Spin,
  QRCode,
  UploadFile,
  Typography,
  Divider,
  Input,
  Upload,
  UploadProps,
} from "antd";
import { CheckCircleOutlined, UploadOutlined } from "@ant-design/icons";
import {
  ParkingCardInterface,
  ParkingPaymentInterface,
  ParkingTransactionInterface,
  StatusCardInterface,
} from "../../../../../interfaces/Carpark";
import dayjs from "dayjs";
import {
  CreateParkingPayment,
  GetParkingCardByID,
  GetParkingPaymentByTransactionID,
  UpdateParkingCard,
  UpdateParkingTransaction,
} from "../../../../../services/https";
import LOGO from "./../../../../../assets/icon/LOGOS.png";
import "./../../../Store/StoreAndPay.css";
import ReceiptCard from "./Receipt";

interface OutProps {
  setCards: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  cards: ParkingCardInterface[];
  status: StatusCardInterface[];
  getParkingCards: () => void;
  selectedCard: ParkingCardInterface | null;
  selectedButtonInOutDefault: string;
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
  setCarLicensePlate: React.Dispatch<React.SetStateAction<string>>;
  carLicensePlate: string;
  setCarColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  carColor: string | undefined;
  setCarMake: React.Dispatch<React.SetStateAction<string | undefined>>;
  carMake: string | undefined;
}

const OUT: React.FC<OutProps> = ({
  setCards,
  cards,
  status,
  getParkingCards,
  selectedCard,
  selectedCardIndex,
  setSelectedCardIndex,
  setSelectedCard,
  setFilteredData,
  setSearchValue,
  searchValue,
  setIsModalOutVisible,
  isModalOutVisible,
  setCarLicensePlate,
  carLicensePlate,

  setCarColor,
  carColor,
  setCarMake,
  carMake,
}) => {
  const [existingTransaction, setExistingTransaction] =
    useState<ParkingTransactionInterface>();
  const [payment, setPayment] = useState<ParkingPaymentInterface>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false);
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [change, setChange] = useState<number>(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [reload, setReload] = useState(false); // สถานะใหม่สำหรับกระตุ้น useEffect
  const [haveTax, sethaveTax] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedCard) return;

        const rescard = await GetParkingCardByID(selectedCard.ID || "");
        if (rescard.status !== 200) throw new Error("Card not found");

        const cardData = rescard?.data;
        if (!cardData) return;

        setSelectedCard(cardData);

        const today = dayjs().startOf("day");
        const existingTrans = cardData.ParkingTransaction?.find(
          (transaction: ParkingTransactionInterface) =>
            (dayjs(transaction.EntryTime).isSame(today, "day") &&
              !transaction.ExitTime) ||
            (dayjs(transaction.EntryTime).isBefore(today, "day") &&
              transaction.ExitTime === null)
        );

        setExistingTransaction(existingTrans);

        if (existingTrans) {
          const entryTime = existingTrans.EntryTime || "";
          const exitTime = existingTrans.ExitTime || dayjs().toISOString();

          try {
            await calculateAmount(entryTime, exitTime);
          } catch (calcError) {
            console.error("Error in calculateAmount:", calcError);
          }
          try {
            const respayment = await GetParkingPaymentByTransactionID(
              existingTrans.ID || 0
            );
            if (respayment.status == 200) {
              setPayment(respayment.data);
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
    setCarLicensePlate("");
    setCarColor("");
    setCarMake("");
    setSelectedCard(null);
    setSelectedCardIndex(null);
    setPaymentMethod("");
    setCashReceived(0);
    setFileList([]);
    setIsModalOutVisible(false);
    setReload(!reload);
    setPaymentCompleted(false);
    setExistingTransaction(undefined);
    setPayment(undefined);
  };

  const calculateAmount = (entryTime: string, exitTime: string) => {
    const initialFee = selectedCard?.ParkingFeePolicy?.InitialFee || 0;
    const addBaseFee = selectedCard?.ParkingFeePolicy?.AddBase_Fee || 0;
    const discount = selectedCard?.ParkingFeePolicy?.Discount || 0;

    const entry = dayjs(entryTime);
    const exit = dayjs(exitTime);

    const durationInHours = exit.diff(entry, "hour");
    const amount = initialFee + addBaseFee * durationInHours;
    const netAmount = amount - (amount * discount) / 100;

    setPayment((prev) => ({
      ...prev,
      Amount: amount,
      DiscountAmount: discount,
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
        if (!cashReceived || cashReceived <= (payment?.NetAmount || 0)) {
          message.error("Insufficient amount received from the customer.");
          return;
        }
      }
      const imageUrl =
        fileList.length > 0 ? fileList[0]?.thumbUrl || null : null;
      if (paymentMethod === "QR Payment") {
        if (!imageUrl && imageUrl === null && fileList.length === 0) {
          message.error("Please Upload Slip.");
          return;
        }
      }
      setChange(cashReceived - (payment?.NetAmount || 0));

      setIsLoading(true);
      try {
        const respay = await CreateParkingPayment({
          PaymentDate: dayjs().toISOString(),
          Amount: payment?.Amount,
          DiscountAmount: payment?.DiscountAmount,
          NetAmount: payment?.NetAmount,
          IsCash: paymentMethod === "Cash" ? true : false,
          IsPaid: true,
          CashReceived: cashReceived,
          Change: change,
          ParkingTransactionID: existingTransaction?.ID,
          ParkingCardID: selectedCard?.ID,
          UserID: Number(localStorage.getItem("id")),
        });

        const totalTime = Number(
          dayjs()
            .diff(dayjs(existingTransaction?.EntryTime), "hour", true)
            .toFixed(2)
        );

        const updateTransactionData = {
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

        const resTrans = await UpdateParkingTransaction(
          existingTransaction?.ID || 0,
          updateTransactionData
        );

        const resCard = await UpdateParkingCard(
          selectedCard?.ID || "",
          updateCardData
        );
        if (
          respay.status === 201 &&
          resTrans.status === 200 &&
          resCard.status === 200
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

  /***************************    Upload รูปภาพ    ******************************** */
  const onChangeUpload: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  /* 
// ฟังก์ชันสำหรับดาวน์โหลด PDF
const downloadPDF = async () => {
  if (receiptRef.current) {
  try {
      const canvas = await html2canvas(receiptRef.current, {
      scale: 3,
      useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a5');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save('Receipt/Tax invoice.pdf');
  } catch (error) {
      message.error('ไม่สามารถดาวน์โหลด PDF ได้: ' + error);
  }
  } else {
  message.error('ไม่พบใบเสร็จที่ต้องการดาวน์โหลด');
  }
};
 */
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
        ) : payment && (payment.IsPaid || paymentCompleted === true) ? (
          <ReceiptCard
            payment={payment}
            existingTransaction={existingTransaction}
            selectedCard={selectedCard}
          />
        ) : (
          <div /* style={{ padding: "20px" }} */>
            <img
              src={LOGO}
              alt="Parking Service Logo"
              style={{ width: "120px", marginBottom: "10px", display: "flex", justifyContent: "end" }}
            />
            <Typography.Paragraph>
              <img
                src={existingTransaction?.Image}
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
              {existingTransaction?.LicensePlate || "N/A"}<br/>
              <strong>Color:</strong>{" "}
              {existingTransaction?.Color || "N/A"}<br/>
              <strong>Make:</strong>{" "}
              {existingTransaction?.Make || "N/A"}<br/>
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
                  Amount: {(payment?.Amount || 0).toFixed(2)} THB
                </Typography.Paragraph>
                <Typography.Text
                  style={{ display: "block", marginTop: "10px" }}
                >
                  Scan this QR Code to complete payment
                </Typography.Text>
                <div style={{ marginTop: "16px" }}>
                  <Upload
                    fileList={fileList}
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                    beforeUpload={(file) => {
                      setFileList([...fileList, file]);
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Upload Payment Slip
                    </Button>
                  </Upload>
                </div>
              </div>
            )}
            {paymentMethod === "Cash" && (
              <div style={{ marginTop: "16px", textAlign: "center" }}>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                  }}
                  placeholder="Enter amount"
                />
                <Typography.Paragraph>
                  Amount: {(payment?.Amount || 0).toFixed(2)} THB
                </Typography.Paragraph>
                <Typography.Paragraph>
                  Change: {(cashReceived - (payment?.Amount || 0)).toFixed(2)}{" "}
                  THB
                </Typography.Paragraph>
              </div>
            )}
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <Button
                type="primary"
                onClick={handlePayment}
                disabled={
                  !paymentMethod ||
                  (paymentMethod === "Cash" && cashReceived <= 0)
                }
                style={{ width: "100%", borderRadius: "8px" }}
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default OUT;

/*           <div style={{ height: "110px", zIndex: "0" }}></div>
          <div className="RE">
            <h1>Slip</h1>
          </div>
  
          {Bill ? (
            <div className="Slip">
              <div ref={receiptRef}>
                <h1>Receipt / Tax invoice</h1>
                <img src={LOGO} alt="" />
                <div className="Adress">
                  <p className="P1">FROM</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "13px" }}>
                      111, University Road, Suranaree <br />
                      Subdistrict, Mueang Nakhon Ratchasima<br />
                      District, Nakhon Ratchasima 30000<br />
                    </p>
                    <p style={{ marginRight: "20px", fontSize: "13px" }}>
                      Receipt Date :{" "}
                      {Bill.DateReceipt
                        ? new Date(Bill.DateReceipt).toLocaleDateString()
                        : "No Date"}
                    </p>
                  </div>
                </div>
                <div className="Adress2">
                  <p className="P1">BILL TO</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "13px", width: "250px" }}>
                      {Tax?.Residencee}
                    </p>
                    <p
                      style={{
                        marginRight: "20px",
                        fontSize: "13px",
                      }}
                    >
                      User Name : {Bill.PaymentStore?.User?.UserName} <br />
                      FullName :{" "}
                      {Bill.PaymentStore?.User?.FirstName}{" "}
                      {Bill.PaymentStore?.User?.LastName} <br />
                      Tel : {Bill.PaymentStore?.User?.Tel}
                    </p>
                  </div>
                </div>
                <div className="listpayment1">
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <p>DESCRIPTION</p>
                    <p>PACKAGE</p>
                    <p>AMOUNT</p>
                  </div>
                  <hr />
                  <div className="Sublist">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "left",
                      }}
                    >
                      <p style={{ width: "70px" }}>PWA</p>
                      <p>{Bill.PaymentStore?.PayStorePackage}</p>
                      <p>{Bill.PaymentStore?.PayStorePwa.toFixed(2)} Bath</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "left",
                      }}
                    >
                      <p style={{ width: "70px" }}>PEA</p>
                      <p>{Bill.PaymentStore?.PayStorePackage}</p>
                      <p>{Bill.PaymentStore?.PayStorePea.toFixed(2)} Bath</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "left",
                      }}
                    >
                      <p style={{ width: "70px" }}>Rental Fee</p>
                      <p>{Bill.PaymentStore?.PayStorePackage}</p>
                      <p>{Bill.PaymentStore?.PayStoreRental.toFixed(2)} Bath</p>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="PaymentMethod">
                  <p></p>
                  <p>
                    PaymentMethod :{" "}
                    {Bill.PaymentStore?.PaymentMethodStore?.MethodName ||
                      "Bro I have No your Payment Method WTF."}
                  </p>
                </div>
                <div className="TotalAll">
                  <p></p>
                  <p>Total : {Total.toFixed(2)}฿</p>
                </div>
                <div className="bottoninfo">
                  ICONIC <br />
                  If you want to issue a tax invoice Please fill out your tax
                  information before choosing to request a tax invoice.
                </div>
              </div>
            </div>
          ) : (
            <div className="Slip">กำลังโหลดข้อมูล...</div>
          )}
          {haveTax !== 0 && (
            <div className="Print" onClick={downloadPDF}>
              Print tax invoice
            </div>
          )} */
