import React, { useEffect, useState } from "react";
import {
  Badge,
  Calendar,
  Modal,
  Button,
  message,
  Row,
  ConfigProvider,
} from "antd";
import type { BadgeProps, CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import { NavBar } from "../../../Component/NavBar";
import dayjs from "dayjs";
import { SelectInfo } from "antd/es/calendar/generateCalendar";
import {
  GetListCard,
  GetListTransaction,
  GetListZone,
} from "../../../../services/https";
import {
  ParkingTransactionInterface,
  ParkingZoneInterface,
} from "../../../../interfaces/Carpark";

const CustomerParkingBooking: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [transactions, setTransactions] = useState<
    ParkingTransactionInterface[]
  >([]);
  const [parkingZones, setParkingZones] = useState<ParkingZoneInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [transactionData, parkingZoneData] = await Promise.all([
        GetListTransaction(),
        GetListZone(),
      ]);

      console.log("Parking Zones:", parkingZoneData); // Log the response to inspect it

      if (transactionData.status === 200 && parkingZoneData.status === 200) {
        setParkingZones(parkingZoneData);

        setTransactions(transactionData);
      } else {
        message.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const getListData = (value: Dayjs) => {
    const listData: { type: string; content: string }[] = [];
    const dateString = value.format("YYYY-MM-DD");
  
    // ตรวจสอบว่า transactions เป็นอาร์เรย์ก่อนที่จะใช้ filter
    const dayTransactions = Array.isArray(transactions)
      ? transactions.filter((txn) => txn.ReservationDate === dateString)
      : [];  // หากไม่ใช่ ออกมาเป็นอาร์เรย์ว่าง
  
    // ตรวจสอบว่า parkingZones เป็นอาร์เรย์
    if (!Array.isArray(parkingZones)) {
      console.error("parkingZones is not an array:", parkingZones);
      return listData;  // Return empty list if not an array
    }
  
    const zone = parkingZones.find((zone) => zone.ID === 1);
  
    if (zone) {
      const reservedCount = dayTransactions.filter(
        (txn) => txn.IsReservedPass
      ).length;
      const availableCapacity = (zone.MaxReservedCapacity || 0) - reservedCount;
  
      if (reservedCount >= (zone.MaxReservedCapacity || 0)) {
        listData.push({
          type: "error",
          content: `Full (Reserved: ${reservedCount} / Max Capacity: ${zone.MaxReservedCapacity})`,
        });
      } else {
        listData.push({
          type: "success",
          content: `Available (Reserved: ${reservedCount} / Max Capacity: ${zone.MaxReservedCapacity})`,
        });
      }
    }
  
    return listData;
  };
  

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleDateClick = (date: Dayjs, selectInfo: SelectInfo) => {
    const reservationDetails = getListData(date); // No need to convert `date` to `dayjs`
    setModalContent(reservationDetails.map((item) => item.content).join("\n"));
    setModalVisible(true);
  };

  return (
    <>
      <NavBar />
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 8,
            colorPrimary: "#fbe8af",
            fontFamily: "Dongle, sans-serif",
            fontSize: 22,
            fontWeightStrong: 5,
            boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
            colorText: "#000000",
          },
        }}
      >
        <div style={{ height: "110px" }}></div>
        <div className="route">
          <a href="/Main">Home /</a>
          <a href="/CarParking-In">Parking IN /</a> Zone
        </div>
        <Row justify="center">
          <h1
            style={{
              textAlign: "center",
              fontFamily: "Dongle, sans-serif",
              fontSize: "80px",
              fontWeight: 400,
              color: "#62501a",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              margin: "0% 0",
              lineHeight: "70px",
              marginTop: "50px",
              marginBottom: "30px",
            }}
          >
            Parking Reservation
          </h1>
        </Row>
        <div style={{ width: "70%", justifySelf: "center" }}>
          <Calendar cellRender={dateCellRender} onSelect={handleDateClick} />
          <Modal
            title="Reservation Details"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button key="back" onClick={() => setModalVisible(false)}>
                Close
              </Button>,
            ]}
          >
            <pre>{modalContent}</pre>
          </Modal>
        </div>
      </ConfigProvider>
    </>
  );
};

export default CustomerParkingBooking;
