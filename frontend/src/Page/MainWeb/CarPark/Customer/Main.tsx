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
  CreateParkingUsageCard,
  CreateParkingZoneDailyAndUsageCard,
  CreateVehicle,
  GetListCardAndCheckExpiredCardtoUpdate,
  GetListStatusCard,
  GetListZoneDaily,
  GetUserDetails,
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

const { Title } = Typography;
const { Option } = Select;
const userid = localStorage.getItem("id");
const today = dayjs();

const CustomerParkingBooking: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
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
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs);
  const [selectedZone, setSelectedZone] = useState<number | null>(null);
  const [carLicensePlate, setCarLicensePlate] = useState<string>();
  const [carColor, setCarColor] = useState<string>();
  const [carMake, setCarMake] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const imageUrl = fileList[0]?.thumbUrl || null;
  const [reload, setReload] = useState(false); // สถานะใหม่สำหรับกระตุ้น useEffect
  const [isModalCreateCardVisible, setIsModalCreateCardVisible] =
    useState(false);

  const dateOnly = selectedDate?.format("YYYY-MM-DD"); // เอาแค่วันที่
  const dateWithTime = `${dateOnly}T00:00:00+07:00`;

  useEffect(() => {
    fetchUserDetails();
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
          const zonedaily = listZoneDailyRes.data.find((zoneDaily: any) => {
            const zoneDate = new Date(zoneDaily.Date)
              .toISOString()
              .split("T")[0]; // แปลงเป็นวันที่ในรูปแบบ YYYY-MM-DD
            const selectedDateStr = selectedDate?.toISOString().split("T")[0]; // แปลง selectedDate เป็นวันที่ในรูปแบบ YYYY-MM-DD
            return zoneDate === selectedDateStr;
          });

          if (!zonedaily) {
            setZoneDailyData(zonedaily);
            setSelectedZoneDaily(zonedaily ?? null);
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
  const [formCreateVehicle] = Form.useForm();
  const handleCreateCardOk = async () => {
    try {
      await formCreateVehicle.validateFields();

      // สร้างข้อมูลสำหรับการสร้างบัตรจอดรถ
      const newCardData = {
        ID: (Number(listcards[listcards.length - 1].ID) + 1)
          .toString()
          .padStart(4, "0"),
        IsPermanent: true,
        UserID: Number(userid),
        StatusCardID: Number(
          status?.find((state: any) => state.Status === "IN")?.ID || null
        ),
      };

      const resCreateCard = await CreateParkingCard(newCardData);
      if (resCreateCard.status === 201) {
        const vehicleData = {
          LicensePlate: carLicensePlate,
          Image: imageUrl === null ? fileList[0].url : imageUrl,
          Color: carColor,
          Make: carMake,
          UserID: Number(userid),
        };

        if (cards?.StatusCard?.Status !== "Expired") {
          const resCreateVehicle = await CreateVehicle(vehicleData);
          if (resCreateVehicle.status === 201) {
            console.log("Parking card and vehicle created successfully.");
            setIsModalCreateCardVisible(false);
            setReload(!reload);
            message.success("Parking card and vehicle created successfully.");
          } else {
            message.error("Failed to create vehicle.");
          }
        } else {
          await handleEditCarOk();
          setIsModalCreateCardVisible(false);
          setReload(!reload);
        }
      } else {
        message.error("Failed to create parking card.");
      }
    } catch (errorInfo) {
      // หาก validateFields ล้มเหลวหรือมีข้อผิดพลาดในการสร้าง
      console.log("Failed to submit form Create Vehicle:", errorInfo);
      message.error("Please fill in all the required fields.");
    }
  };

  const handleCreateCardCancle = () => {
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

  const handleCancel = () => {
    setSelectedZone(null);
    setIsModalEditVisible(false);
    setIsModalVisible(false);
    setIsModalCreateCardVisible(false);
    setUser(user);
    setReload(!reload);
  };

  const handleZoneClick = (index: any) => {
    setSelectedZone(index === selectedZone ? null : index);
  };

  /***************************    สร้าง UsageCard    ******************************** */
  const [formReservedParkingLot] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handlePreOk = async () => {
    formReservedParkingLot
      .validateFields()
      .then((values) => {
        console.log("Form Reserved Parking Lot values: ", values);
        // ดำเนินการยืนยันฟอร์มแรก
      })
      .catch((errorInfo) => {
        console.log("Failed to submit Form Reserved Parking Lot:", errorInfo);
      });

    if (selectedZone === null) {
      message.error("Please select zone!");
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedZone === void 0 || selectedZone === null) {
      message.error("Selected zone is not valid.");
      return;
    }
    if (!selectedDate || isNaN(selectedDate.toDate().getTime())) {
      message.error("Selected date is not valid.");
      return;
    }

    try {
      console.log("zoneDailyData:", zoneDailyData);

      // ตรวจสอบว่า zoneDailyData มีข้อมูลหรือไม่ก่อนที่จะใช้ find()
      let selectZoneDaily = zoneDailyData?.find((zoneDaily) => {
        /*         console.log("zoneDaily: ", zoneDaily);
        console.log("zoneDaily.ParkingZoneID: ", zoneDaily.ParkingZoneID);
        console.log(
          "cards?.ParkingZone?.[selectedZone]?.ID: ",
          cards?.ParkingZone?.[selectedZone]?.ID
        );
        console.log(
          "zoneDaily.ParkingZoneID === cards?.ParkingZone?.[selectedZone]?.ID: ",
          zoneDaily.ParkingZoneID === cards?.ParkingZone?.[selectedZone]?.ID
        ); */
        const zoneDate = zoneDaily.Date
          ? new Date(zoneDaily.Date).toISOString().split("T")[0]
          : "";
        const selectedDateStr = selectedDate?.toISOString().split("T")[0];
        return (
          zoneDate === selectedDateStr &&
          zoneDaily.ParkingZoneID === cards?.ParkingZone?.[selectedZone]?.ID
        );
      });

      // ถ้าไม่พบ selectZoneDaily จะสร้างใหม่
      if (!selectZoneDaily) {
        const combinedData = {
          ParkingZoneDaily: {
            Date: dateWithTime,
            AvailableZone: cards?.ParkingZone?.[selectedZone]?.MaxCapacity,
            ReservedAvailable:
              (cards?.ParkingZone?.[selectedZone]?.MaxReservedCapacity || 0) -
              1,
            ParkingZoneID: cards?.ParkingZone?.[selectedZone]?.ID,
          },
          ParkingUsageCard: {
            ReservationDate: dateWithTime,
            IsReservedPass: false,
            LicensePlate: carLicensePlate,
            Image: imageUrl === null ? fileList[0].url : imageUrl,
            Color: carColor,
            Make: carMake,
            UserID: Number(userid),
            ParkingCardID: cards?.ID,
          },
        };

        const response = await CreateParkingZoneDailyAndUsageCard(
          combinedData
        );
        if (response.status === 201) {
          message.success("ZoneDaily and UsageCard created successfully.");
          handleCancel();
        }
      } else if (selectZoneDaily) {
        // ถ้ามีข้อมูลใน selectZoneDaily ทำการอัปเดต
        const updatedZoneDaily = {
          ...selectZoneDaily,
          ReservedAvailable: (selectZoneDaily?.ReservedAvailable || 0) - 1,
        };
        const updateResponse = await UpdateZoneDailyByID(
          selectZoneDaily?.ID || 0,
          updatedZoneDaily
        );
        if (updateResponse.status === 200) {
          message.success("ZoneDaily updated successfully.");
        } else {
          message.error("Failed to update ZoneDaily.");
        }
        createParkingUsageCard(selectZoneDaily); // ใช้ selectZoneDaily ต่อไป
        handleCancel();
      } else {
        message.error("Zone daily data is not available.");
      }
    } catch (error) {
      message.error("Error creating usageCard.");
      console.error("Error:", error);
    }
  };

  // ฟังก์ชันสำหรับสร้างการจองที่จอดรถ
  const createParkingUsageCard = async (
    selectZoneDaily: ParkingZoneDailyInterface | undefined
  ) => {
    if (!carLicensePlate || !carColor || !carMake) {
      message.error("Please fill in all required fields!");
      return;
    }

    console.log("ฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟฟ:");
    console.log("selectZoneDaily:", selectZoneDaily);

    const CardTransData = {
      ReservationDate: dateWithTime,
      IsReservedPass: false,
      LicensePlate: carLicensePlate,
      Image: imageUrl === null ? fileList[0].url : imageUrl,
      Color: carColor,
      Make: carMake,
      UserID: Number(userid),
      ParkingCardID: cards?.ID,
      ParkingZoneDailyID: selectZoneDaily?.ID,
    };

    try {
      const resTrans = await CreateParkingUsageCard(CardTransData);

      if (resTrans.status === 201) {
        message.success("Parking booking successful!");
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
      message.open({
        type: "success",
        content: res.data.message,
      });
    } else {
      message.open({
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

  /***************************    Choose Date    ******************************** */
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
          components: {
            Button: {
              colorTextLightSolid: "#000000",

              textTextHoverColor: "#000000",
              textTextColor: "#000000",
              primaryShadow: "0 2px 0 rgba(5, 145, 255, 0.1)",
              colorBgContainer: "#fbe8af",
            },
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
        <div>
          {loading && !isModalCreateCardVisible ? (
            <p>Loading...</p>
          ) : isModalCreateCardVisible ? (
            /**************************     สมัครบัตรจอดรถ     ***************************/
            <div
              style={{
                marginTop: "20px",
                width: "50%",
                gap: "16px",
                justifySelf: "center",
              }}
            >
              <div>
                The parking card is valid for one year from the date of
                issuance. It provides access to the parking facility, allowing
                users to reserve parking spaces easily through the online
                system.
              </div>
              <div className="line-in-modal"></div>
              <Form layout="horizontal" form={formCreateVehicle}>
                <div>Please provide details of your car</div>
                <Form.Item
                  name="Image"
                  label="Upload Image"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => (e && e.fileList) || []}
                  rules={[
                    {
                      required: true,
                      message: "Please upload an image!",
                    },
                  ]}
                >
                  <Upload
                    id="Image"
                    fileList={fileList}
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                    beforeUpload={(file) => {
                      setFileList([...fileList, file]);
                      return false; // ห้ามอัพโหลดไฟล์ทันที
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
                </Form.Item>
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
              <div
                className="carpark-button-ok-cancle"
                style={{ marginTop: "20px", textAlign: "center" }}
              >
                <div
                  className="carpark-button-cancle"
                  onClick={handleCreateCardCancle}
                  style={{ marginRight: "10px" }}
                >
                  Cancel
                </div>
                <div
                  className="carpark-button-ok"
                  onClick={handleCreateCardOk} // เพิ่มฟังก์ชันการยืนยัน
                >
                  Confirm
                </div>
              </div>
            </div>
          ) : (
            /****************************   จองที่จอดรถ ***************************/
            <div
              style={{
                justifyItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Form
                layout="horizontal"
                form={formReservedParkingLot}
                initialValues={{
                  LicensePlate: carLicensePlate,
                  Color: carColor,
                  Make: carMake,
                  Image:
                    fileList.length > 0 && fileList[0]?.url
                      ? fileList[0].url
                      : imageUrl,
                  ReservationDate: dayjs(),
                }}
              >
                <div>
                  <div style={{ justifySelf: "center" }}>
                    <Form.Item
                      label="Reservation Date"
                      name="ReservationDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select a reservation date!",
                        },
                      ]}
                    >
                      <DatePicker
                        id="ReservationDate"
                        onChange={onChangeDatePicker}
                        disabledDate={(current) =>
                          current && current.isBefore(dayjs(), "day")
                        } // ไม่ให้เลือกวันที่ในอดีต
                      />
                    </Form.Item>
                  </div>
                  {cards?.StatusCard?.Status === "IN" &&
                  cards.ParkingUsageCard &&
                  cards.ParkingUsageCard.some((usageCard) => {
                    const reservationDate = usageCard.ReservationDate
                      ? new Date(
                          usageCard.ReservationDate
                        ).toLocaleDateString()
                      : null;

                    const selected = selectedDate
                      ? selectedDate.toDate().toLocaleDateString()
                      : null;

                    const isReservedPass = usageCard.IsReservedPass === false;
                    return reservationDate === selected && isReservedPass;
                  }) ? (
                    renderReservedForm() // แสดงฟอร์มเมื่อวันที่นั้นถูกจองแล้ว
                  ) : (
                    <div>
                      <div style={{ width: "auto", justifySelf: "end" }}>
                        <Button
                          type="primary"
                          onClick={() => handleOpenModalEdit()}
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
                            // ค้นหา zoneDaily ที่ตรงกับวันที่
                            const zoneDaily = zoneDailyData?.find(
                              (data: ParkingZoneDailyInterface) => {
                                const isMatchingID =
                                  data.ParkingZone?.ID === zone.ID;
                                const isMatchingDate =
                                  data.Date === dateWithTime;
                                return isMatchingID && isMatchingDate;
                              }
                            );
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
                            label="License Plate"
                            name="LicensePlate"
                            rules={[
                              {
                                required: true,
                                message: "Please input the license plate!",
                              },
                            ]}
                          >
                            <Input id="LicensePlate" disabled />
                          </Form.Item>

                          <Form.Item
                            label="Car Color"
                            name="Color"
                            rules={[
                              {
                                required: true,
                                message: "Please input the car color!",
                              },
                            ]}
                          >
                            <Input id="Color" disabled />
                          </Form.Item>

                          <Form.Item
                            label="Car Make"
                            name="Make"
                            rules={[
                              {
                                required: true,
                                message: "Please input the car make!",
                              },
                            ]}
                          >
                            <Input id="Make" disabled />
                          </Form.Item>
                          <div
                            className="carpark-confirm-button"
                            onClick={() => handlePreOk()}
                          >
                            Confirm Reservation
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}
                </div>
              </Form>
            </div>
          )}{" "}
        </div>

        {/**************************     ยืนยันการจอง     ***************************/}
        <Modal open={isModalVisible} title="Confirm Reservation" footer={null}>
          <p>
            <strong>Date:</strong> {dateOnly}
          </p>
          {/* <QRCode
            errorLevel="H"
            value={cards?.ID || ""}
            icon="D:\university\2_2567\SE\ShoppingMall\frontend\src\assets\icon\LOGOS.png"
          /> */}
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
          <div
            className="carpark-button-ok-cancle"
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <div
              className="carpark-button-cancle"
              onClick={handleCancel}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </div>
            <div
              className="carpark-button-ok"
              onClick={handleOk} // เพิ่มฟังก์ชันการยืนยัน
            >
              Confirm
            </div>
          </div>
        </Modal>

        {/**************************     สมัครบัตรจอดรถ     ***************************/}
        {/*        <Modal
          open={isModalCreateCardVisible}
          title="Card Registration"
          onOk={handleCreateCardOk}
          onCancel={() => setIsModalVisible(false)}
        > */}
        {/* {isModalCreateCardVisible && (
          <div
            style={{
              border: "1px solid #d9d9d9",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "20px",
            }}
          >
            <div>
              The parking card is valid for one year from the date of issuance.
              It provides access to the parking facility, allowing users to
              reserve parking spaces easily through the online system.
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
          </div>
        )} */}
        {/* </Modal> */}

        {/****************************   แก้ไขข้อมูลรถ   ********************************/}
        <Modal
          title="Edit Car Information"
          open={isModalEditVisible}
          onOk={handleEditCarOk}
          onCancel={handleCancel}
          footer={null}
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
            <div
              className="carpark-button-ok-cancle"
              style={{ marginTop: "20px", textAlign: "center" }}
            >
              <div
                className="carpark-button-cancle"
                onClick={handleCancel}
                style={{ marginRight: "10px" }}
              >
                Cancel
              </div>
              <div
                className="carpark-button-ok"
                onClick={handleEditCarOk} // เพิ่มฟังก์ชันการยืนยัน
              >
                Confirm
              </div>
            </div>
          </Form>
        </Modal>
      </ConfigProvider>
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
      const typeCard = cards?.TypeCard?.Type ? cards.TypeCard.Type : "No Type Found";
      console.log("typeCard:", typeCard);      
      const res = await GetZoneByTypeCard(typeCard || "");
      //const res = await GetZoneByTypeCard(getTypeCardByStatus());
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
