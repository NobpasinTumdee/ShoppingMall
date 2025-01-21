import React, { useEffect, useState } from "react";
import {
  ParkingCardInterface,
  ParkingPaymentInterface,
  ParkingUsageCardInterface,
} from "../../../../../interfaces/Carpark";
import LOGO from "./../../../../../assets/icon/LOGOS.png";
import "./../../CarPark.css";
import { TaxUserInterface } from "../../../../../interfaces/StoreInterface";
import {
  GetParkingPaymentByUsageCardID,
  GetTaxUserICONIC,
} from "../../../../../services/https";

interface ReceiptProps {
  existingUsageCard?: ParkingUsageCardInterface;
  selectedCard: ParkingCardInterface | null;
}

const ReceiptCard: React.FC<ReceiptProps> = ({
  existingUsageCard,
  selectedCard,
}) => {
  const [payment, setPayment] = useState<ParkingPaymentInterface>();
  const [taxUser, setTaxUser] = useState<TaxUserInterface>();
  const totalTimeInDecimal = existingUsageCard?.TotalHourly || 0;
  const totalMinutes = totalTimeInDecimal * 60;
  const totalSeconds = totalTimeInDecimal * 3600; // 60 * 60
  const hours = Math.floor(totalTimeInDecimal);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restax = await GetTaxUserICONIC();
        const respayment = await GetParkingPaymentByUsageCardID(
          existingUsageCard?.ID || 0
        );
        if (respayment.status == 200 && restax.status === 200) {
          setPayment(respayment.data);
          setTaxUser(restax.data);
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

  return (
    <>
      <div
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
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  textAlign: "left",
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <h1>Receipt / Tax Invoice (ABB)</h1>
                <img src={LOGO} alt="Logo" />
              </div>
              <div className="AdressCard">
                <p className="P1Card">FROM</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontSize: "13px" }}>
                    <p>{taxUser?.CompanyName} REALTY SERVICES CO.,LTD</p>
                    <p>
                      Address: 111, University Road, Suranaree <br />
                      Subdistrict, Mueang Nakhon Ratchasima <br />
                      District, Nakhon Ratchasima 30000 <br />
                    </p>
                    <p>Address: {taxUser?.Residencee}</p>
                  </p>
                </div>
              </div>

              <div className="Adress2Card">
                <p className="P1Card">BILL TO</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontSize: "13px", width: "250px" }}>
                    Card ID:{" "}
                    {selectedCard?.ID
                      ? selectedCard.ID.toString().padStart(4, "0")
                      : "0000"}
                  </p>
                  <p style={{ marginRight: "20px", fontSize: "13px" }}>
                    User Name: {payment.User?.UserName} <br />
                    Full Name: {payment.User?.FirstName}{" "}
                    {payment.User?.LastName} <br />
                    Tel: {payment.User?.Tel}
                  </p>
                </div>
              </div>

              <div className="UsageCardInfo">
                <p>
                  License Plate: {existingUsageCard?.LicensePlate || "N/A"}
                </p>
                <p>
                  Entry Time:{" "}
                  {existingUsageCard?.EntryTime
                    ? new Date(existingUsageCard.EntryTime).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  Exit Time:{" "}
                  {existingUsageCard?.ExitTime
                    ? new Date(existingUsageCard.ExitTime).toLocaleString()
                    : "N/A"}
                </p>
                <p>Duration: {formattedTime}</p>
              </div>

              <div className="listpayment1Card">
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                >
                  <p>DESCRIPTION</p>
                  <p>AMOUNT</p>
                </div>
                <hr />
                <div className="SublistCard">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <p style={{ width: "auto" }}>
                      Amount (Discount : {payment.DiscountAmount} %)
                    </p>
                    <p>{payment.Amount} ฿</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <p style={{ width: "auto" }}>Cash Received</p>
                    <p>{payment.CashReceived} ฿</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      textAlign: "left",
                    }}
                  >
                    <p style={{ width: "auto" }}>Change</p>
                    <p>{payment.Change} ฿</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "left",
                  }}
                >
                  <p style={{ width: "auto" }}>Net Amount</p>
                  <p>{payment.NetAmount} ฿</p>
                </div>
                <hr />
              </div>

              <div className="PaymentMethodCard">
                <p>Payment Method: {payment.IsCash ? "Cash" : "QR Payment"}</p>
              </div>

              <div className="bottoninfoCard">
                ICONIC <br />
                THANK YOU.
              </div>
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
