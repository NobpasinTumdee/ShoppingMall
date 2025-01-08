import React from "react";
import {
  ParkingCardInterface,
  ParkingPaymentInterface,
  ParkingTransactionInterface,
} from "../../../../../interfaces/Carpark";
import LOGO from "./../../../../../assets/icon/LOGOS.png";
import "./../../CarPark.css";

interface ReceiptProps {
  payment: ParkingPaymentInterface;
  existingTransaction?: ParkingTransactionInterface;
  selectedCard: ParkingCardInterface | null;
}

const ReceiptCard: React.FC<ReceiptProps> = ({
  payment,
  existingTransaction,
  selectedCard,
}) => {
  const totalTimeInDecimal = existingTransaction?.TotalHourly || 0;
  const totalMinutes = totalTimeInDecimal * 60;
  const totalSeconds = totalTimeInDecimal * 3600; // 60 * 60
  const hours = Math.floor(totalTimeInDecimal);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedTime = `${hours} hr ${minutes} min ${seconds} sec`;

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
                    <p>ICONIC REALTY SERVICES CO.,LTD</p>
                    <p>
                      Address: 111, University Road, Suranaree <br />
                      Subdistrict, Mueang Nakhon Ratchasima <br />
                      District, Nakhon Ratchasima 30000 <br />
                    </p>
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

              <div className="TransactionInfo">
                <p>
                  License Plate: {existingTransaction?.LicensePlate || "N/A"}
                </p>
                <p>
                  Entry Time:{" "}
                  {existingTransaction?.EntryTime
                    ? new Date(existingTransaction.EntryTime).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  Exit Time:{" "}
                  {existingTransaction?.ExitTime
                    ? new Date(existingTransaction.ExitTime).toLocaleString()
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
