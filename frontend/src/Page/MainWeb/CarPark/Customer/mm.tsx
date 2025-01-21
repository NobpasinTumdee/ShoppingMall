import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Typography,
  Form,
  Button,
  Select,
  message,
  Modal,
  ConfigProvider,
  Card,
  Progress,
  Upload,
  UploadFile,
  UploadProps,
  QRCode,
  DatePickerProps,
  DatePicker,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { NavBar } from "../../../Component/NavBar";
import {
  CreateParkingCard,
  CreateParkingTransaction,
  CreateVehicle,
  CreateZoneDaily,
  GetListCardAndCheckExpiredCardtoUpdate,
  GetListStatusCard,
  GetListZone,
  GetListZoneDaily,
  GetParkingCardByUserID,
  GetUserById,
  GetUserDetails,
  UpdateParkingCard,
  UpdateParkingZone,
  UpdateVehicle,
  UpdateZoneDailyByID,
} from "../../../../services/https";
import {
  ParkingCardInterface,
  ParkingZoneDailyInterface,
  ParkingZoneInterface,
  StatusCardInterface,
  VehicleInterface,
} from "../../../../interfaces/Carpark";
import dayjs, { Dayjs } from "dayjs";
import { CardInterface } from "antd/es/card";
import { UsersInterface } from "../../../../interfaces/UsersInterface";
import create from "@ant-design/icons/lib/components/IconFont";
import "./../CarPark.css";

const { Title } = Typography;
const { Option } = Select;
const userid = localStorage.getItem("id");
const today = dayjs();

const CustomerParkingBooking: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [zones, setZones] = useState<ParkingZoneInterface[]>([]);
  const [listcards, setListCards] = useState<ParkingCardInterface[]>([]);
  const [cards, setCards] = useState<ParkingCardInterface>();
  const [user, setUser] = useState<UsersInterface>();
  const [vehicles, setVehicles] = useState<VehicleInterface>();
  const [zoneDailyData, setZoneDailyData] = useState<
    ParkingZoneDailyInterface[]
  >([]);
  const [selectedZoneDaily, setSelectedZoneDaily] =
    useState<ParkingZoneDailyInterface>();
  const [status, setStatus] = useState<StatusCardInterface[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>();
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [carLicensePlate, setCarLicensePlate] = useState<string>();
  const [carColor, setCarColor] = useState<string>();
  const [carMake, setCarMake] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null
  );
  const imageUrl = fileList[0]?.thumbUrl || null;
  const [reload, setReload] = useState(false); // สถานะใหม่สำหรับกระตุ้น useEffect
  const [isModalCreateCardVisible, setIsModalCreateCardVisible] =
    useState(false);

  const dateOnly = selectedDate?.format("YYYY-MM-DD"); // เอาแค่วันที่
  const dateWithTime = `${dateOnly}T00:00:00+07:00`;

  useEffect(() => {
    //fetchAllData();
    fetchUserDetails();
    console.log("selectedDate: ", selectedDate);
  }, [reload, selectedDate]);

  const renderReservedForm = () => (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f2f5",
        borderRadius: "8px",
      }}
    >
      <h2>This parking spot is already reserved.</h2>
      <p>You cannot make a reservation for this spot.</p>
    </div>
  );

  /***************************    สร้าง รายการจำนวนโซนคงเหลือรายวัน   ******************************** */
  /* const createZoneDaily = async () => {
    try {
      /* console.log("listcards.length: ",listcards.length);
      console.log("selectedZone: ",selectedZone);
      if (!listcards.length || !selectedZone) {
        message.error("Please select a zone to create ZoneDaily.");
        return null; // คืนค่า null หากไม่มีข้อมูล
      } */
  /*
      const card = listcards.find((card) =>
        card.ParkingZone?.some((zone) => zone.ID === selectedZone)
      );

      if (!card) {
        console.error("Card with the selected zone not found.");
        return null; // คืนค่า null หากไม่พบ card
      }

      const zone = card.ParkingZone?.find((z) => z.ID === selectedZone);

      if (!zone) {
        console.error("Zone not found in the selected card.");
        return null; // คืนค่า null หากไม่พบ zone
      }
      console.log("zone: ",zone);

      const newZoneDaily = {
        Date: new Date().toISOString(),
        TotalVisitors: 0,
        AvailableZone: zone.MaxCapacity,
        ReservedAvailable: zone.MaxReservedCapacity,
        ParkingZoneID: selectedZone,
      };

      const response = await CreateZoneDaily(newZoneDaily);

      if (response.status === 200) {
        message.success("ZoneDaily created successfully.");
        setZoneDailyData([...zoneDailyData, response.data]);
        return response.data; // คืนค่าที่สร้างสำเร็จ
      } else {
        message.error("Failed to create ZoneDaily.");
        return null; // คืนค่า null หากสร้างไม่สำเร็จ
      }
    } catch (error) {
      console.error("Error creating ZoneDaily:", error);
      message.error("An error occurred while creating ZoneDaily.");
      return null; // คืนค่า null หากเกิดข้อผิดพลาด
    }
  }; */

  // ฟังก์ชัน fetchUserDetails
  const fetchUserDetails = async () => {
    setLoading(true); // เริ่มโหลดข้อมูล
    try {
      const [listCardRes, userdetailRes, listZoneDailyRes, statusRes] =
        await Promise.all([
          GetListCardAndCheckExpiredCardtoUpdate(),
          GetUserDetails(Number(userid)),
          GetListZoneDaily(),
          GetListStatusCard(),
        ]);

      if (listCardRes.status === 200) {
        setListCards(listCardRes.data);
      } else {
        message.error("Failed to fetch list card.");
      }

      if (statusRes.status === 200) {
        setStatus(statusRes.data);
      } else {
        message.error("Failed to fetch list status card.");
      }

      if (userdetailRes.status === 200) {
        const { user, vehicle, parkingCard } = userdetailRes.data;

        setUser(user);
        setCards(parkingCard);
        setVehicles(vehicle);
        setCarLicensePlate(vehicle.LicensePlate);
        setCarColor(vehicle.Color);
        setCarMake(vehicle.Make);
        console.log("carLicensePlate: ", vehicle.LicensePlate);
        console.log("carColor: ", vehicle.Color);
        console.log("carMake: ", vehicle.Make);

        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: vehicle.Image, // ที่นี่จะต้องเป็น base64 string ที่มาจากฐานข้อมูล
          },
        ]);

        // ตรวจสอบสถานะการ์ด
        if (userdetailRes.data.parkingCard.StatusCard.Status === "Expired") {
          setIsModalCreateCardVisible(true);
        }

        // ตรวจสอบสถานะการตอบกลับของ ZoneDaily
        if (listZoneDailyRes.status === 200) {
          setZoneDailyData(listZoneDailyRes.data);
          const dateofZoneDaily = listZoneDailyRes.data.find(
            (zoneDaily: any) => {
              const zoneDate = new Date(zoneDaily.Date)
                .toISOString()
                .split("T")[0]; // แปลงเป็นวันที่ในรูปแบบ YYYY-MM-DD
              const selectedDateStr = selectedDate?.toISOString().split("T")[0]; // แปลง selectedDate เป็นวันที่ในรูปแบบ YYYY-MM-DD
              return zoneDate === selectedDateStr;
            }
          );

          // หา zoneDaily ที่ตรงกับ zone ID และ selectedDate
          const dateZones = parkingCard.ParkingZone.map((zone: any) => {
            return listZoneDailyRes.data.filter((zoneDaily: any) => {
              const zoneDate = new Date(zoneDaily.Date)
                .toISOString()
                .split("T")[0];
              const selectedDateStr = selectedDate?.toISOString().split("T")[0];
              return (
                zone.ID === zoneDaily.ParkingZoneID &&
                zoneDate === selectedDateStr
              );
            });
          }).flat();

          console.log("matchingZones:", dateZones);

          if (dateZones.length > 0) {
            setZoneDailyData(dateZones);
            setSelectedZoneDaily(dateZones ?? null);
          } else {
            setSelectedZoneDaily(dateofZoneDaily ?? null);
          }
        } else {
          message.error("Failed to fetch ZoneDaily data.");
        }
      } else {
        setIsModalCreateCardVisible(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      message.error("An error occurred while fetching user details.");
    } finally {
      setLoading(false); // หยุดโหลดข้อมูล
    }
  };

  /***************************    สร้างบัตรจอดรถใหม่    ******************************** */

  const handleCreateCardOk = async () => {
    if (imageUrl === null && fileList.length === 0) {
      message.error("Please input image!");
      return;
    }
    // ข้อมูลสำหรับสร้าง ParkingCard
    const newCardData = {
      ID: (Number(listcards[listcards.length - 1].ID) + 1)
        .toString()
        .padStart(4, "0"),
      IsPermanent: true,
      UserID: Number(userid),
      ExpiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString(),
      StatusCardID: Number(
        status?.find((state: any) => state.Status === "IN")?.ID || null
      ),
    };

    try {
      // สร้าง ParkingCard
      const resCreateCard = await CreateParkingCard(newCardData);
      if (resCreateCard.status === 201) {
        const vehicleData = {
          LicensePlate: carLicensePlate,
          Image: imageUrl || "",
          Color: carColor,
          Make: carMake,
          UserID: Number(userid),
        };

        if (cards?.StatusCard?.Status !== "Expired") {
          // สร้าง Vehicle
          const resCreateVehicle = await CreateVehicle(vehicleData);
          if (resCreateVehicle.status === 201) {
            console.log("Parking card and vehicle created successfully.");
            setIsModalCreateCardVisible(false);
            setReload(!reload); // เปลี่ยนค่า reload เพื่อกระตุ้น useEffect
            message.success("Parking card and vehicle created successfully.");
          } else {
            message.error("Failed to create vehicle.");
          }
        } else {
          await handleEditCarOk();
          setIsModalCreateCardVisible(false);
          setReload(!reload); // เปลี่ยนค่า reload เพื่อกระตุ้น useEffect
        }
      } else {
        message.error("Failed to create parking card.");
      }
    } catch (error) {
      message.error(
        "An error occurred while creating the parking card and vehicle."
      );
      console.error(error);
    }
  };

  const handleCancel = () => {
    setSelectedZone(null);
    setSelectedCardIndex(null);
    setIsModalEditVisible(false);
    setIsModalVisible(false);
    setIsModalCreateCardVisible(false);
    setUser(user);
    setCarLicensePlate("");
    setCarColor("");
    setCarMake("");
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: vehicles?.Image, // ที่นี่จะต้องเป็น base64 string ที่มาจากฐานข้อมูล
      },
    ]);
  };

  const handleZoneClick = (index: any) => {
    setSelectedZone(index === selectedZone ? null : index);
  };

  /***************************    สร้าง Transaction    ******************************** */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlePreOk = async () => {
    /* if (await checkUserBooking()) {
      return; // ถ้าผู้ใช้จองแล้วไม่สามารถจองใหม่ได้
    } */
    console.log("selectedDate: ", selectedDate);
    console.log("selectedZone: ", selectedZone);
    console.log("carLicensePlate: ", carLicensePlate);
    console.log("carColor: ", carColor);
    console.log("carMake: ", carMake);
    console.log("imageUrl: ", imageUrl);
    console.log("fileList: ", fileList);
    console.log("fileList.length: ", fileList.length);

    if (
      !selectedDate ||
      selectedZone == null ||
      !carLicensePlate ||
      !carColor ||
      !carMake ||
      (imageUrl === null && fileList.length === 0)
    ) {
      messageApi.error("Please choose a date or zone.");
      return;
    }

    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // แสดงค่า selectedZone และ selectedDate ใน console เพื่อดีบัก
    console.log("selectedZone: ", selectedZone);
    console.log("selectedDate: ", selectedDate);

    // ตรวจสอบว่า selectedZone ถูกเลือกหรือไม่
    if (selectedZone === undefined || selectedZone === null) {
      message.error("Selected zone is not valid.");
      return; // ถ้าไม่ได้เลือก zone ให้หยุดการทำงาน
    }

    // ตรวจสอบว่า selectedDate ถูกต้องหรือไม่ (เช็คว่าเป็นวันที่ที่ใช้งานได้)
    if (!selectedDate || isNaN(selectedDate.toDate().getTime())) {
      message.error("Selected date is not valid.");
      return; // ถ้า selectedDate ไม่ถูกต้องให้หยุดการทำงาน
    }

    try {
      // เรียก API เพื่อดึงข้อมูล ZoneDaily ทั้งหมด
      const listZoneDailyRes = await GetListZoneDaily();

      // ถ้าได้รับข้อมูลจาก API สำเร็จ (status 200)
      if (listZoneDailyRes.status === 200) {
        console.log("ListZoneDaily:", listZoneDailyRes.data);
        setZoneDailyData(listZoneDailyRes.data); // ตั้งค่า zoneDailyData

        // หาค่า ParkingZoneDailyID จากข้อมูล ZoneDaily ที่มีอยู่
        const selectZoneDaily = listZoneDailyRes.data.find((zoneDaily: any) => {
          const zoneDate = new Date(zoneDaily.Date); // แปลง Date เป็นรูปแบบ Date Object

          // แปลง selectedDate เป็น Date object พร้อมเวลา 00:00:00
          const selectedDateStart = selectedDate.toDate();
          selectedDateStart.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 00:00:00 ของวันเลือก

          // ตั้งเวลา zoneDate ให้เป็นเวลา 00:00:00 เพื่อให้การเปรียบเทียบตรงกัน
          const zoneDateStart = new Date(zoneDate);
          zoneDateStart.setHours(0, 0, 0, 0); // ตั้งเวลาเป็น 00:00:00 ของ zoneDate

          // เปรียบเทียบว่า ParkingZoneID กับ selectedZone ตรงกันไหม และ วันที่ตรงกับ selectedDate หรือไม่
          return (
            zoneDaily.ParkingZoneID ===
              cards?.ParkingZone?.[selectedZone]?.ID &&
            zoneDateStart.getTime() === selectedDateStart.getTime()
          );
        });

        // ถ้าไม่พบข้อมูล ZoneDaily ที่ตรงกับ selectedZone และ selectedDate
        if (!selectZoneDaily) {
          // สร้างข้อมูล ZoneDaily ใหม่
          const newZoneDaily = {
            Date: dateWithTime, // ตั้งวันที่เป็นวันที่ปัจจุบัน
            AvailableZone: cards?.ParkingZone?.[selectedZone]?.MaxCapacity, // จำนวนที่จอดรถทั้งหมดจาก zone
            ReservedAvailable:
              (cards?.ParkingZone?.[selectedZone]?.MaxReservedCapacity || 0) -
              1, // จำนวนที่จอดรถที่จองไว้
            ParkingZoneID: cards?.ParkingZone?.[selectedZone]?.ID, // รหัส Zone ที่เลือก
          };

          // เรียก API เพื่อสร้าง ZoneDaily ใหม่
          const response = await CreateZoneDaily(newZoneDaily);
          if (response.status === 200) {
            message.success("ZoneDaily created successfully.");
            setZoneDailyData([...zoneDailyData, response.data]);

            // หลังจากสร้าง ZoneDaily แล้ว จึงทำการสร้างการจองที่จอดรถ
            createParkingTransaction();
          }
        } else {
          // ถ้าเจอ ZoneDaily ที่ตรงกับ selectedZone และ selectedDate
          const updatedZoneDaily = {
            ...selectZoneDaily, // ใช้ข้อมูลเดิมของ ZoneDaily
            ReservedAvailable: selectZoneDaily.ReservedAvailable - 1,
          };

          // เรียก API เพื่ออัปเดต ZoneDaily
          const updateResponse = await UpdateZoneDailyByID(
            selectZoneDaily.ID,
            updatedZoneDaily
          );
          if (updateResponse.status === 200) {
            message.success("ZoneDaily updated successfully.");
            setZoneDailyData((prevData) =>
              prevData.map((zone) =>
                zone.ID === selectZoneDaily.ID ? updateResponse.data : zone
              )
            ); // อัปเดตข้อมูล ZoneDaily ใน state
          } else {
            message.error("Failed to update ZoneDaily.");
          }
          createParkingTransaction(); // เรียกฟังก์ชันการจองที่จอดรถ
        }
      } else {
        message.error("Failed to fetch ZoneDaily data.");
      }
    } catch (error) {
      message.error("Error creating transaction.");
      console.error("Error:", error);
    }
  };

  // ฟังก์ชันสำหรับสร้างการจองที่จอดรถ
  const createParkingTransaction = async () => {
    if (!carLicensePlate || !carColor || !carMake) {
      message.error("Please fill in all required fields!");
      return;
    }

    const CardTransData = {
      ReservationDate: dateWithTime,
      IsReservedPass: false,
      LicensePlate: carLicensePlate,
      Image: imageUrl === null ? fileList[0].url : imageUrl,
      Color: carColor,
      Make: carMake,
      UserID: Number(userid),
      ParkingCardID: cards?.ID,
      ParkingZoneDailyID: selectedZoneDaily?.ID,
    };

    try {
      const resTrans = await CreateParkingTransaction(CardTransData);

      if (resTrans.status === 201) {
        messageApi.success("Parking booking successful!");
        setIsModalVisible(false);
        handleCancel();
        setReload(!reload);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      message.error("Error updating parking card or zone.");
      console.error("Error details:", error);
    }
  };

  /***************************    แก้ไขข้อมูล Vehical    ******************************** */
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [formEditCar] = Form.useForm();
  const handleOpenModalEdit = () => {
    setIsModalEditVisible(true);
  };

  const handleEditCarOk = async () => {
    let updatedVehicle = {
      LicensePlate: carLicensePlate,
      Image: imageUrl === null ? fileList[0].url : imageUrl,
      Color: carColor,
      Make: carMake,
      UserID: Number(userid) || 0,
    };
    const res = await UpdateVehicle(Number(userid), updatedVehicle);
    if (res.status == 200) {
      setIsModalEditVisible(false);
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
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

  /***************************    Choode Date    ******************************** */
  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(date, dateString);
    setSelectedDate(date);
  };

  /*****************************     Code UI    ******************************** */
  return (
    <>
      <NavBar />
      {contextHolder}
      <div className="carpark-container">
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
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div
              style={{
                justifyItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {/* ส่วน 1: ฟอร์มข้อมูลรถ */}
              <div>
                <div style={{ justifySelf: "center" }}>
                  <DatePicker
                    id="ReservationDate"
                    onChange={onChangeDatePicker}
                    value={selectedDate}
                  />
                </div>
                {cards?.StatusCard?.Status === "IN" &&
                cards.ParkingTransaction &&
                cards.ParkingTransaction.some((transaction) => {
                  const reservationDate = transaction.ReservationDate
                    ? new Date(transaction.ReservationDate).toLocaleDateString()
                    : null;

                  const selected = selectedDate
                    ? selectedDate.toDate().toLocaleDateString()
                    : null;

                  const isReservedPass = transaction.IsReservedPass === false;
                  return reservationDate === selected && isReservedPass;
                }) ? (
                  renderReservedForm() // แสดงฟอร์มเมื่อเงื่อนไขทั้งหมดตรง
                ) : (
                  <div>
                    <div style={{ width: "auto", justifySelf: "end" }}>
                      <Button
                        className="carpark-button"
                        onClick={handleOpenModalEdit}
                      >
                        Edit Car Information
                      </Button>
                    </div>
                    <div
                      style={{
                        width: "500px",
                        justifyItems: "center",
                        display: "flex",
                        gap: "16px",
                      }}
                    >
                      {Array.isArray(cards?.ParkingZone) &&
                        cards?.ParkingZone.map((zone, index) => {
                          // ก่อนการค้นหา zoneDaily
                          console.log("Searching for zone:", zone.ID);
                          console.log(
                            "Selected Date:",
                            selectedDate?.toISOString().split("T")[0]
                          );

                          // ค้นหา zoneDaily ที่ตรงกับวันที่
                          const zoneDaily = zoneDailyData?.find(
                            (data: ParkingZoneDailyInterface) => {
                              const isMatchingID =
                                data.ParkingZone?.ID === zone.ID;
                              const isMatchingDate = data.Date === dateWithTime;

                              console.log(
                                "data.ParkingZone?.ID:",
                                data.ParkingZone?.ID
                              );
                              console.log("zone.ID:", zone.ID);
                              console.log("data.Date:", data.Date);
                              console.log("dateWithTime:", dateWithTime);
                              console.log(
                                "data.ParkingZone?.ID === zone.ID:",
                                isMatchingID
                              );
                              console.log(
                                "data.Date === selectedDate:",
                                isMatchingDate
                              );

                              return isMatchingID && isMatchingDate;
                            }
                          );

                          console.log("zoneDaily:", zoneDaily);

                          return (
                            <Card
                              hoverable
                              bordered={false}
                              key={zone.ID}
                              style={{
                                fontSize: "24px", // fontSize ใน Card
                                width: "70%",
                                border: "1px solid #d9d9d9",
                                textAlign: "center",
                                cursor: "pointer",
                                transition: "box-shadow 0.3s",
                                boxShadow:
                                  selectedZone === index
                                    ? "0 0 10px rgba(201, 175, 98, 0.5)"
                                    : "none",
                              }}
                              onClick={() => handleZoneClick(index)}
                              cover={<img src={zone.Image} alt={zone.Name} />}
                            >
                              <Row justify={"space-around"}>
                                <Col>
                                  <div style={{ textAlign: "left" }}>
                                    <div
                                      style={{
                                        fontSize: "30px", // fontSize สำหรับ zone.Name
                                      }}
                                    >
                                      {zone.Name}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: "Dongle, sans-serif",
                                        fontSize: "16px",
                                        color: "#757575",
                                        lineHeight: "1.5",
                                      }}
                                    >
                                      <div>
                                        Capacity: {zone?.MaxReservedCapacity}
                                      </div>
                                      <div>
                                        Available:{" "}
                                        {zoneDaily?.ReservedAvailable ??
                                          zone?.MaxReservedCapacity}
                                      </div>
                                    </div>
                                  </div>
                                </Col>
                                <Col
                                  style={{
                                    fontFamily: "Dongle, sans-serif",
                                    fontSize: "21.6px",
                                  }}
                                >
                                  <Progress
                                    type="circle"
                                    strokeColor="#E8D196"
                                    size={80}
                                    percent={
                                      zone.MaxReservedCapacity
                                        ? ((zoneDaily?.ReservedAvailable ??
                                            zone?.MaxReservedCapacity) /
                                            zone.MaxReservedCapacity) *
                                          100
                                        : 0
                                    }
                                    format={(percent) =>
                                      `${(percent ?? 0).toFixed(2)}%`
                                    }
                                    style={{
                                      marginTop: "10px",
                                    }}
                                  />
                                </Col>
                              </Row>
                            </Card>
                          );
                        })}
                    </div>{" "}
                    <Row
                      justify="center"
                      style={{ marginTop: "25px", width: "100%" }}
                    >
                      <Col
                        span={24}
                        style={{ maxWidth: "600px", width: "100%" }}
                      >
                        <Form layout="horizontal" form={form}>
                          <div>Car Picture</div>
                          <Upload
                            id="Image"
                            fileList={fileList}
                            onChange={onChangeUpload}
                            onPreview={onPreview}
                            beforeUpload={(file) => {
                              setFileList([...fileList, file]);
                              return false;
                            }}
                            disabled
                            maxCount={1}
                            multiple={false}
                            listType="picture-card"
                          >
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                          </Upload>
                          <Form.Item
                            name="LicensePlate"
                            label="License Plate"
                            rules={[
                              {
                                required: true,
                                message: "Please input the license plate!",
                              },
                            ]}
                            className="custom-form-item"
                          >
                            <Input
                              value={carLicensePlate}
                              defaultValue={carLicensePlate}
                              onChange={(e) =>
                                setCarLicensePlate(e.target.value)
                              }
                              placeholder="Enter license plate"
                              disabled
                            />
                          </Form.Item>
                          <Form.Item
                            name="CarColor"
                            label="Car Color"
                            rules={[
                              {
                                required: true,
                                message: "Please input the car color!",
                              },
                            ]}
                            className="custom-form-item"
                          >
                            <Input
                              value={carColor}
                              defaultValue={carColor}
                              onChange={(e) => setCarColor(e.target.value)}
                              placeholder="Enter car color"
                              disabled
                            />
                          </Form.Item>

                          <Form.Item
                            name="CarMake"
                            label="Car Make"
                            rules={[
                              {
                                required: true,
                                message: "Please input the car make!",
                              },
                            ]}
                            className="custom-form-item"
                          >
                            <Input
                              value={carMake}
                              defaultValue={carMake}
                              onChange={(e) => setCarMake(e.target.value)}
                              placeholder="Enter car make"
                              disabled
                            />
                          </Form.Item>
                          <div
                            className="carpark-confirm-button"
                            onClick={() => handlePreOk()}
                            style={{ marginBottom: "24px" }}
                          >
                            Confirm Reservation
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            </div>
          )}{" "}
        </div>

        {/**************************     ยืนยันการจอง     ***************************/}
        <Modal
          open={isModalVisible}
          title="Confirm Reservation"
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>
            <strong>Date:</strong> {dateOnly}
          </p>
          <QRCode
            errorLevel="H"
            value={cards?.ID || ""}
            icon="D:\university\2_2567\SE\ShoppingMall\frontend\src\assets\icon\LOGOS.png"
          />
          <p>
            {imageUrl ? (
              <img
                id="Image"
                src={imageUrl}
                alt="Uploaded"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "20px auto",
                }}
              />
            ) : fileList.length > 0 ? (
              <img
                id="Image"
                src={fileList[0].url} // ดึง URL จากไฟล์ใน fileList
                alt="Uploaded"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "20px auto",
                }}
              />
            ) : (
              <div>No image selected</div> // ถ้าไม่มี image หรือ fileList ว่าง
            )}
          </p>
          <p>
            <strong>ID Card:</strong> {cards?.ID}
          </p>
          <p>
            <strong>Zone:</strong>{" "}
            {cards?.ParkingZone && cards?.ParkingZone[selectedZone || 0]?.ID
              ? cards.ParkingZone[selectedZone || 0].Name
              : "No ID available"}
          </p>
          <p>
            <strong>License Plate:</strong> {carLicensePlate}
          </p>
          <p>
            <strong>Car Color:</strong> {carColor}
          </p>
          <p>
            <strong>Car Make:</strong> {carMake}
          </p>
        </Modal>

        {/**************************     สมัครบัตรจอดรถ     ***************************/}
        <Modal
          open={isModalCreateCardVisible}
          title="Card Registration"
          onOk={handleCreateCardOk}
          onCancel={() => setIsModalVisible(false)}
        >
          <div>
            The parking card is valid for one year from the date of issuance. It
            provides access to the parking facility, allowing users to reserve
            parking spaces easily through the online system.
          </div>
          <div className="line-in-modal"></div>
          <Form layout="horizontal" form={form}>
            <div>Please provide details of your car</div>
            <Upload
              id="Image"
              fileList={fileList}
              onChange={onChangeUpload}
              onPreview={onPreview}
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false;
              }}
              maxCount={1}
              multiple={false}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <Form.Item
              name="LicensePlate"
              label="License Plate"
              rules={[
                {
                  required: true,
                  message: "Please input the license plate!",
                },
              ]}
              className="custom-form-item"
            >
              <Input
                value={carLicensePlate}
                onChange={(e) => setCarLicensePlate(e.target.value)}
                placeholder="Enter license plate"
              />
            </Form.Item>

            <Form.Item
              name="CarColor"
              label="Car Color"
              rules={[
                {
                  required: true,
                  message: "Please input the car color!",
                },
              ]}
              className="custom-form-item"
            >
              <Input
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                placeholder="Enter car color"
              />
            </Form.Item>

            <Form.Item
              name="CarMake"
              label="Car Make"
              rules={[
                {
                  required: true,
                  message: "Please input the car make!",
                },
              ]}
              className="custom-form-item"
            >
              <Input
                value={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                placeholder="Enter car make"
              />
            </Form.Item>
          </Form>
        </Modal>

        {/****************************   แก้ไขข้อมูลรถ   ********************************/}
        <Modal
          title="Edit Car Information"
          open={isModalEditVisible}
          onOk={handleEditCarOk}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
        >
          <Form form={formEditCar} layout="vertical">
            <div>Car Picture</div>
            <Upload
              fileList={fileList}
              onChange={onChangeUpload}
              onPreview={onPreview}
              beforeUpload={(file) => {
                setFileList([...fileList, file]);
                return false;
              }}
              maxCount={1}
              multiple={false}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
            <Form.Item
              name="LicensePlate"
              label="License Plate"
              rules={[
                {
                  required: true,
                  message: "Please input the license plate!",
                },
              ]}
              className="custom-form-item"
            >
              <Input
                value={carLicensePlate}
                defaultValue={carLicensePlate}
                onChange={(e) => setCarLicensePlate(e.target.value)}
                placeholder="Enter license plate"
              />
            </Form.Item>
            <Form.Item
              name="CarColor"
              label="Car Color"
              rules={[
                {
                  required: true,
                  message: "Please input the car color!",
                },
              ]}
              className="custom-form-item"
            >
              <Input
                value={carColor}
                defaultValue={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                placeholder="Enter car color"
              />
            </Form.Item>

            <Form.Item
              name="CarMake"
              label="Car Make"
              rules={[
                {
                  required: true,
                  message: "Please input the car make!",
                },
              ]}
              className="custom-form-item"
            >
              <Input
                value={carMake}
                defaultValue={carMake}
                onChange={(e) => setCarMake(e.target.value)}
                placeholder="Enter car make"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default CustomerParkingBooking;

/*   const fetchAllData = async () => {
    setLoading(true); // เริ่มโหลดข้อมูล
    try {
      const [listCardRes, userRes, cardByIdRes] = await Promise.all([
        GetListCard(),
        GetUserById(userid || ""),
        GetParkingCardByUserID(userid || ""),
      ]);

      if (listCardRes.status === 200) {
        setListCards(listCardRes.data);
        console.log("ListCard:", listCardRes.data);
      } else {
        message.error("Failed to fetch list card.");
      }

      if (userRes.status === 200) {
        localStorage.setItem("status", userRes.data.Status);
        setUser(userRes.data);
        console.log("User data:", userRes.data);
      } else {
        message.error("Failed to fetch user.");
      }

      if (cardByIdRes.status === 200) {
        setCards(cardByIdRes.data);
        console.log("Cards by ID:", cardByIdRes.data);
      } else {
        setIsModalCreateCardVisible(true);
        console.log("No parking card found, creating one...");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("An error occurred while fetching data.");
    } finally {
      setLoading(false); // หยุดโหลดข้อมูล
    }
  }; */
/*   const GetZone = async () => {
    try {
      const typePark = cards?.TypePark?.Type ? cards.TypePark.Type : "No Type Found";
      console.log("typePark:", typePark);      
      const res = await GetZoneByTypePark(typePark || "");
      //const res = await GetZoneByTypePark(getTypeParkByStatus());
      if (res.status === 200) {
        localStorage.setItem("zoneid", res.data.ID);
        setZones(res.data);
        console.log("zone: ", res.data);
      } else {
        messageApi.error("Failed to fetch parking zones.");
      }
    } catch (error) {
      console.error("Error fetching zones:", error);
      messageApi.error("An error occurred while fetching zones.");
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };
 */
/*   const getCard = async () => {
    setLoading(true);
    try {
      const resCard = await GetListCard();

      // ตรวจสอบการตอบกลับจาก API
      if (resCard.status === 200) {
      } else {
        messageApi.error("Failed to fetch parking cards.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      messageApi.error("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }; */
