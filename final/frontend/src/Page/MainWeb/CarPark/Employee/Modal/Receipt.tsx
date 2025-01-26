import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  ParkingCardInterface,
  ParkingPaymentInterface,
  ParkingUsageCardInterface,
} from "../../../../../interfaces/CarparkInterface";
import LOGO from "./../../../../../assets/icon/LOGOS.png";
import "./../../CarPark.css";
import { TaxUserInterface } from "../../../../../interfaces/StoreInterface";
import {
  GetParkingPaymentByUsageCardID,
  GetParkingUsageCardByID,
  GetTaxUserICONIC,
} from "../../../../../services/https";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import printer from "./../../../../../assets/CarPark/printer_icon.png";

interface ReceiptProps {
  existingUsageCard?: ParkingUsageCardInterface;
  selectedCard: ParkingCardInterface | null;
  setExistingUsageCard: React.Dispatch<
    React.SetStateAction<ParkingUsageCardInterface | undefined>
  >;
}

const ReceiptCard: React.FC<ReceiptProps> = ({
  existingUsageCard,
  selectedCard,
  setExistingUsageCard,
}) => {
  const [payment, setPayment] = useState<ParkingPaymentInterface>();
  const [taxUser, setTaxUser] = useState<TaxUserInterface>();
  const navigate = useNavigate();

  const totalTimeInDecimal = existingUsageCard?.TotalHourly || 0;
  const totalMinutes = totalTimeInDecimal * 60;
  const totalSeconds = totalTimeInDecimal * 3600; // 60 * 60
  const hours = Math.floor(totalTimeInDecimal);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;

  const startDate = dayjs(existingUsageCard?.ExitTime || new Date())
    .add(hours, "hour")
    .add(minutes, "minute")
    .add(seconds, "second");

  const formattedDate = startDate.format("DD/MM/YYYY HH:mm:ss");

  console.log(formattedDate);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restax, respayment, restran] = await Promise.all([
          GetTaxUserICONIC(),
          GetParkingPaymentByUsageCardID(existingUsageCard?.ID || 0),
          GetParkingUsageCardByID(existingUsageCard?.ID || 0),
        ]);
        if (
          respayment.status == 200 &&
          restax.status === 200 &&
          restran.status === 200
        ) {
          setPayment(respayment.data);
          setTaxUser(restax.data);
          setExistingUsageCard(restran.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
    console.log("taxUser: ", taxUser);
    console.log("existingUsageCard: ", existingUsageCard);
    console.log("payment: ", payment);
    console.log("selectedCard: ", selectedCard);
  }, []);

  const handlePrint = () => {
    const printContent = document.getElementById(
      "receipt-content"
    ) as HTMLElement;

    // ซ่อนส่วนที่ไม่ต้องการพิมพ์
    const arrowsAndPrinter = document.querySelectorAll(
      ".no-print"
    ) as NodeListOf<HTMLElement>;
    arrowsAndPrinter.forEach((el) => (el.style.display = "none"));

    if (printContent) {
      const printWindow = window.open("", "", "width=800,height=600");

      if (printWindow) {
        printWindow.document.write(
          "<style>@media print {#receipt-content {font-size: 14px;} .no-print { display: none !important; }}</style>"
        );
        printWindow.document.write(printContent.innerHTML);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 500);
      } else {
        console.error("Failed to open print window");
      }
    }
  };

  return (
    <>
      <div
        id="receipt-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        {payment ? (
          <div className="SlipCard">
            <div
              style={{ textAlign: "left", width: "100%", maxWidth: "600px" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gridTemplateRows: "auto auto",
                  alignItems: "center",
                  justifyItems: "center",
                  gap: "20px", // ระยะห่างระหว่างแถวและคอลัมน์
                  height: "15vh", // ให้พื้นที่สูงเต็มหน้าจอ
                  position: "relative",
                }}
              >
                <ArrowLeftOutlined
                  onClick={() => navigate(-1)}
                  style={{
                    color: "#c9af62",
                    fontSize: "24px",
                    cursor: "pointer",
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                  }}
                  className="no-print"
                />
                <img
                  src={LOGO}
                  alt="Logo"
                  style={{ width: "150px", position: "absolute" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <img
                    src={printer}
                    alt="printer"
                    onClick={handlePrint}
                    style={{
                      width: "30px",
                      cursor: "pointer",
                    }}
                    className="no-print"
                  />
                  <p
                    style={{
                      cursor: "pointer",
                      color: "#c9af62",
                      fontSize: "12px",
                      margin: 0,
                    }}
                    onClick={handlePrint}
                    className="no-print"
                  >
                    Print
                  </p>
                </div>
              </div>
              <div
                style={{
                  justifySelf: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  width: "70%",
                  marginBottom: "30px",
                }}
              >
                <p>{taxUser?.CompanyName} REALTY SERVICES CO.,LTD</p>
                <p>{taxUser?.Residencee}</p>
                <p>Tel {taxUser?.User?.Tel}</p>
                <p>
                  TAX INVOICE (ABB)
                  <span />
                  {""}
                  ***VAT INCLUDE***
                </p>
              </div>
              <div className="AdressCard">
                <p>TAX ID. {taxUser?.IdentificationNumber}</p>

                <p>Date {formattedDate}</p>
                <p>Receipt # {payment?.ReceiptNo} </p>
                <div className="carpark-divider"></div>
                <p>Card ID: {existingUsageCard?.ParkingCardID || "N/A"}</p>
                <p>License Plate: {existingUsageCard?.LicensePlate || "N/A"}</p>
                <p>Car Color: {existingUsageCard?.Color || "N/A"}</p>
                <p>Car Make: {existingUsageCard?.Make || "N/A"}</p>
                <div className="carpark-divider"></div>
                <p>
                  Zone:{" "}
                  {existingUsageCard?.ParkingZoneDaily?.ParkingZone?.Name ||
                    "N/A"}
                </p>

                <div className="carpark-same-line">
                  <p>
                    IN:{" "}
                    {existingUsageCard?.EntryTime
                      ? new Date(existingUsageCard.EntryTime).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    OUT:{" "}
                    {existingUsageCard?.ExitTime
                      ? new Date(existingUsageCard.ExitTime).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
                <p>Duration: {formattedTime}</p>
                <div className="carpark-divider"></div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "left",
                }}
              >
                <p style={{ width: "auto" }}>Total Amount</p>
                <p>{payment.Amount} Baht</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "left",
                }}
              >
                <p style={{ width: "20%" }}>Discount</p>
                <p style={{ width: "70%" }}>
                  {
                    payment.ParkingUsageCard?.ParkingCard?.ParkingFeePolicy
                      ?.Discount
                  }{" "}
                  %
                </p>
                <p style={{ width: "auto" }}>{payment.DiscountAmount} Baht</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "left",
                }}
              >
                <p style={{ width: "auto" }}>Cash</p>
                <p>{payment.CashReceived} Baht</p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "left",
                }}
              >
                <p style={{ width: "auto" }}>Change</p>
                <p>{payment.Change} Baht</p>
              </div>
            </div>
            <div className="carpark-divider"></div>

            <p>Payment Method: {payment.IsCash ? "Cash" : "QR Payment"}</p>
            <br />
            <div className="bottoninfoCard">
              ICONIC <br />
              THANK YOU.
            </div>
          </div>
        ) : (
          <div className="SlipCard">กำลังโหลดข้อมูล...</div>
        )}
      </div>
    </>
  );
}; 

export default ReceiptCard;
