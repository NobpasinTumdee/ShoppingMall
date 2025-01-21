import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
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
  GetParkingUsageCardByID,
  GetTaxUserICONIC,
} from "../../../../../services/https";
import { message } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
  const [reload, setReload] = useState(false);
  const [payment, setPayment] = useState<ParkingPaymentInterface>();
  const [taxUser, setTaxUser] = useState<TaxUserInterface>();
  const navigate = useNavigate();

  const totalTimeInDecimal = existingUsageCard?.TotalHourly || 0;
  const totalMinutes = totalTimeInDecimal * 60;
  const totalSeconds = totalTimeInDecimal * 3600; // 60 * 60
  const hours = Math.floor(totalTimeInDecimal);
  const minutes = Math.floor(totalMinutes % 60);
  const seconds = Math.floor(totalSeconds % 60);

  /*   const formattedDate = `${hours}:${minutes}:${seconds}`; */
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
              <ArrowLeftOutlined
                onClick={() => navigate(-1)}
                style={{
                  color: "#c9af62",
                  fontSize: "22px",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  justifySelf: "center",
                  justifyItems: "center",
                  textAlign: "center",
                  width: "70%",
                  marginBottom: "30px",
                }}
              >
                <img src={LOGO} alt="Logo" style={{ width: "100px" }} />
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
                <div className="carpark-divider"></div>
                <p>
                  License Plate: {existingUsageCard?.LicensePlate || "N/A"}
                </p>
                <p>Car Color: {existingUsageCard?.Color || "N/A"}</p>
                <p>Car Make: {existingUsageCard?.Make || "N/A"}</p>
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
                <p style={{ width: "70%" }}>{payment.ParkingUsageCard?.ParkingCard?.ParkingFeePolicy?.Discount} %</p>
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
