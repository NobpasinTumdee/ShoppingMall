// Updated IN Component for Parking Management System
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  GetProp,
  Input,
  message,
  Modal,
  Progress,
  Row,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  //GetParkingCardWithZoneByID,
  CreateParkingTransaction,
  UpdateParkingCard,
  UpdateParkingZone,
  GetParkingCardByID,
  UpdateParkingTransaction,
  GetZoneDailyByZoneID,
  UpdateZoneDailyByZoneID,
  CreateZoneDaily,
  GetListZoneDaily,
  UpdateZoneDailyByID,
} from "../../../../../services/https";
//import "./../Carpark.css";
import {
  ParkingCardInterface,
  ParkingZoneDailyInterface,
} from "../../../../../interfaces/Carpark";

import Tesseract from "tesseract.js";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const today = dayjs();
const dateOnly = today?.format("YYYY-MM-DD"); // เอาแค่วันที่
const dateWithTime = `${dateOnly}T00:00:00+07:00`;

interface InProps {
  getParkingCards: () => Promise<void>;
  selectedCard: ParkingCardInterface | null;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<ParkingCardInterface | null>
  >;
  onChange: (value: string) => void;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  isModalInVisible: boolean;
  setIsModalInVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedButtonInOutDefault: React.Dispatch<React.SetStateAction<string>>;
  setFilteredData: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  cards: ParkingCardInterface[];
}

const IN: React.FC<InProps> = ({
  getParkingCards,
  onChange,
  setOtp,
  selectedCard,
  setSelectedCard,
  isModalInVisible,
  setIsModalInVisible,
  setSelectedButtonInOutDefault,
  setFilteredData,
  cards,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [carLicensePlate, setCarLicensePlate] = useState<string>();
  const [carColor, setCarColor] = useState<string>();
  const [carMake, setCarMake] = useState<string>();
  /*const [image, setImage] = useState<string | null>(null); // กำหนดให้รองรับทั้ง string หรือ null
  const [loading, setLoading] = useState(false); */
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [zoneDailyData, setZoneDailyData] = useState<
    ParkingZoneDailyInterface[]
  >([]);
  const [selectedZoneDaily, setSelectedZoneDaily] =
    useState<ParkingZoneDailyInterface>();
  const [reload, setReload] = useState(false); // สถานะใหม่สำหรับกระตุ้น useEffect
  useEffect(() => {
    console.log("Requesting with ID:", selectedCard?.ID);
    const fetchData = async () => {
      try {
        const rescard = await GetParkingCardByID(selectedCard?.ID || "");
        setSelectedCard(rescard.data);

        console.log("ParkingTransaction: ", rescard.data.ParkingTransaction);
        console.log("IsPermanent: ", rescard.data.IsPermanent);
        console.log("ParkingZone: ", rescard.data.ParkingZone);
        const existingTransaction = rescard.data.ParkingTransaction?.find(
          (transaction: any) => {
            console.log("Transaction: ", transaction);
            return (
              transaction?.IsReservedPass === false &&
              transaction?.ReservationDate === String(today) &&
              rescard.data.ParkingTransaction?.length > 0 &&
              rescard.data.IsPermanent === true
            );
          }
        );
        console.log("existingTransaction: ", existingTransaction);

        if (existingTransaction !== undefined && existingTransaction === true) {
          setCarLicensePlate(existingTransaction.LicensePlate || "");
          setCarColor(existingTransaction.Color || "");
          setCarMake(existingTransaction.Make || "");
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: existingTransaction.Image,
            },
          ]);
        }
      } catch (error) {
        message.error("Failed to fetch parking card data.");
      }
    };
    if (isModalInVisible) fetchData();
    console.log("carLicensePlate: ", carLicensePlate);
    console.log("carColor: ", carColor);
    console.log("carMake: ", carMake);
    console.log("fileList: ", fileList);
    console.log("fileList.length: ", fileList.length);
    if (selectedZoneDaily) {
      console.log("Updated selectedZoneDaily: ", selectedZoneDaily);
    }
  }, [isModalInVisible, reload, selectedZoneDaily]);

  const handleCardClick = (index: any) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };

  const handleCancel = () => {
    setCarLicensePlate("");
    setCarColor("");
    setCarMake("");
    setSelectedZoneDaily(undefined);
    setSelectedCard(null);
    setSelectedCardIndex(null);
    setIsModalInVisible(false);
    setFileList([]);
    form.resetFields();
  };

  const handleOk = async () => {
    if (selectedCardIndex === null) {
      message.error("Please select a parking zone and input all!");
      return;
    }

    const zone = selectedCard?.ParkingZone?.[selectedCardIndex];

    if (!zone) {
      message.error("This parking zone is not found.");
      return;
    }

    const imageUrl = fileList[0]?.thumbUrl || null;

    if (
      !carLicensePlate ||
      !carColor ||
      !carMake ||
      (imageUrl === null && fileList.length === 0)
    ) {
      message.error("Please select a parking zone and input all!");
      return;
    }

    const existingTransaction = selectedCard?.ParkingTransaction?.find(
      (transaction) =>
        transaction.IsReservedPass === false &&
        transaction.ReservationDate === dateWithTime
    );

    const updateCardData = {
      StatusCardID: 2, // เปลี่ยนสถานะบัตรให้เป็นใช้งานอยู่
    };

    // Convert today to the start of the day (00:00:00)
    const DayToday = new Date(today.toDate());
    DayToday.setHours(0, 0, 0, 0);

    const isSameDate = (date1: Date, date2: Date): boolean => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    try {
      // **ส่วนที่ 1: ดึงข้อมูล ZoneDaily**
      const resZoneDaily = await GetListZoneDaily();
      if (resZoneDaily.status === 200) {
        const ZoneDaily = resZoneDaily.data.find((zoneDaily: any) => {
          const DatezoneDaily = new Date(zoneDaily.Date).toISOString();
          const dateToday = DayToday.toISOString();
          return (
            zone.ID === zoneDaily.ParkingZoneID && DatezoneDaily === dateToday
          );
        });
        console.log("ZoneDaily: ", ZoneDaily);

        // **ส่วนที่ 2: เตรียมข้อมูลสำหรับการอัปเดตหรือสร้าง ZoneDaily**
        const updateZoneDailyData = {
          ID: ZoneDaily?.ID,
          Date: dateWithTime,
          TotalVisitors: (ZoneDaily?.TotalVisitors || 0) + 1,
          AvailableZone:
            existingTransaction !== undefined
              ? (ZoneDaily?.AvailableZone || 0) - 1
              : (zone?.MaxCapacity || 0) - 1,
          ReservedAvailable:
            existingTransaction !== undefined
              ? Math.max(
                  0,
                  ((ZoneDaily?.ReservedAvailable || 0) ??
                    zone?.MaxReservedCapacity) - 1
                )
              : Math.min(
                  zone?.MaxReservedCapacity || 0,
                  (ZoneDaily?.ReservedAvailable || 0) ??
                    zone?.MaxReservedCapacity
                ),
          ParkingZoneID: zone.ID,
        };

        /* const ZoneDailyDate = ZoneDaily ? new Date(ZoneDaily?.Date) : null;
        if (ZoneDailyDate && !isNaN(ZoneDailyDate.getTime())) {
          ZoneDailyDate.setHours(0, 0, 0, 0);
        } else {
          console.error("Invalid ZoneDailyDate:", ZoneDailyDate);
        } */
        const ZoneDailyDate = new Date(ZoneDaily?.Date);
        ZoneDailyDate.setHours(0, 0, 0, 0);

        console.log("ZoneDaily:", ZoneDaily);
        /*  if (isNaN(selectedZoneDate.getTime())) {
          console.log("selectedZoneDate:", selectedZoneDate);
          console.error("Invalid selectedZoneDate:", selectedZoneDate);
          return;
        }
        if (isNaN(DayToday.getTime())) {
          console.error("Invalid DayToday:", DayToday);
          return;
        } */

        // **ส่วนที่ 3: ถ้ามี Transaction ที่ตรงเงื่อนไข**
        if (existingTransaction) {
          const transactionID = Number(existingTransaction.ID);
          if (isNaN(transactionID)) {
            message.error("Invalid transaction ID.");
            return;
          }

          const updateTransactionData = {
            LicensePlate: carLicensePlate,
            Image: imageUrl || "",
            Color: carColor,
            Make: carMake,
            ParkingCardID: selectedCard?.ID,
            ParkingZoneID: zone.ID,
            UserID: Number(localStorage.getItem("id")),
          };

          try {
            const resTrans = await UpdateParkingTransaction(
              transactionID,
              updateTransactionData
            );
            const resCard = await UpdateParkingCard(
              selectedCard?.ID || "",
              updateCardData
            );
            console.log("passsssssssssssssssssssssssssssssss");
            console.log("selectedZoneDate.toISOString(): ", ZoneDailyDate);
            console.log("DayToday.toISOString(): ", DayToday);
            console.log("selectedZone?.ID || 0: ", ZoneDaily?.ID || 0);
            console.log("isSameDate(ZoneDailyDate, DayToday): ",isSameDate(ZoneDailyDate, DayToday));
            console.log("(selectedZone?.ID || 0) > 0: ",(ZoneDaily?.ID || 0) > 0);
            const resZoneDaily =
              isSameDate(ZoneDailyDate, DayToday) && (ZoneDaily?.ID || 0) > 0
                ? await UpdateZoneDailyByID(
                    ZoneDaily?.ID || 0,
                    updateZoneDailyData
                  )
                : await CreateZoneDaily(updateZoneDailyData);

            if (
              resCard.status === 200 &&
              resTrans.status === 200 &&
              resZoneDaily.status === 200
            ) {
              message.success("Parking transaction updated successfully!");
              getParkingCards();
              handleCancel();
              onChange("");
              setOtp("");
              setReload(!reload);
            } else {
              throw new Error("Update failed");
            }
          } catch (error) {
            message.error("Error updating parking transaction.");
            console.error("Error details:", error);
          }
        } else {
          // **ส่วนที่ 4: ถ้าไม่มี Transaction ที่ตรงกับเงื่อนไข (กรณีใหม่ทั้งหมด)**
          const CardTransData = {
            EntryTime: new Date().toISOString(),
            LicensePlate: carLicensePlate,
            Image: imageUrl || "",
            Color: carColor,
            Make: carMake,
            ParkingCardID: selectedCard?.ID,
            ParkingZoneID: zone.ID,
            UserID: Number(localStorage.getItem("id")),
          };

          try {
            const resCard = await UpdateParkingCard(
              selectedCard?.ID || "",
              updateCardData
            );
            const resTrans = await CreateParkingTransaction(CardTransData);
            console.log("not passssssssssssssssssssssssssss");
            console.log("selectedZoneDate.toISOString(): ", ZoneDailyDate);
            console.log("DayToday.toISOString(): ", DayToday);
            console.log("selectedZone?.ID || 0: ", ZoneDaily?.ID || 0);
            console.log("isSameDate(ZoneDailyDate, DayToday): ",isSameDate(ZoneDailyDate, DayToday));
            console.log(
              "(selectedZone?.ID || 0) > 0: ",
              (ZoneDaily?.ID || 0) > 0
            );

            const resZoneDaily =
              isSameDate(ZoneDailyDate, DayToday) && (ZoneDaily?.ID || 0) > 0
                ? await UpdateZoneDailyByID(
                    ZoneDaily?.ID || 0,
                    updateZoneDailyData
                  )
                : await CreateZoneDaily(updateZoneDailyData);

            if (
              resCard.status === 200 &&
              resTrans.status === 201 &&
              resZoneDaily.status === 200
            ) {
              message.success(
                "Parking card, zone, and transaction updated successfully!"
              );
              getParkingCards();
              handleCancel();
              onChange("");
              setOtp("");
              setReload(!reload);
            } else {
              throw new Error("Update failed");
            }
          } catch (error) {
            message.error("Error updating parking card or zone.");
            console.error("Error details:", error);
          }
        }
      }
    } catch (error) {
      message.error("Error processing parking transaction.");
      console.error("Error details:", error);
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

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Dongle, sans-serif",
          fontSize: 24,
          colorPrimary: "#c9af62",
          borderRadius: 8,
        },
        components: { Progress: { circleTextFontSize: "larger" } },
      }}
    >
      <Modal
        title={
          <span style={{ fontSize: "30px", justifySelf: "center" }}>
            {selectedCard?.StatusCard?.Status === "IN"
              ? "Parking IN"
              : "Parking OUT"}
          </span>
        }
        open={isModalInVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"fit-content"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "16px",
          padding: "16px",
        }}
      >
        {contextHolder}
        <div style={{ textAlign: "left", marginBottom: "16px" }}>
          <p style={{ fontSize: "26px", fontWeight: "normal", margin: 0 }}>
            {" "}
            ID Card: {selectedCard?.ID}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {Array.isArray(selectedCard?.ParkingZone) &&
            selectedCard.ParkingZone.map((zone, index) => {
              const zoneDaily = zoneDailyData?.find(
                (data: ParkingZoneDailyInterface) => {
                  return (
                    data.ParkingZone?.ID === zone.ID &&
                    data.Date === dateWithTime
                  );
                }
              );
              return (
                <Card
                  id="Zone"
                  hoverable
                  bordered={false}
                  key={zone.ID}
                  style={{
                    width: "300px",
                    border: "1px solid #d9d9d9",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s",
                    boxShadow:
                      selectedCardIndex === index
                        ? "0 0 10px rgba(201, 175, 98, 0.5)"
                        : "none",
                  }}
                  onClick={() => handleCardClick(index)}
                  cover={<img src={zone.Image} alt={zone.Name} />}
                >
                  <Row justify={"space-around"}>
                    <Col>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: "30px" }}>{zone.Name}</div>
                        <div
                          style={{
                            fontFamily: "Dongle, sans-serif",
                            fontSize: "16px",
                            color: "#757575",
                            lineHeight: "1.5",
                          }}
                        >
                          <div>Capacity: {zone.MaxCapacity}</div>
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
                        format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
                        style={{ marginTop: "10px" }}
                      />
                    </Col>
                  </Row>
                </Card>
              );
            })}
        </div>
        <div></div>
        <Form
          form={form}
          name="parking-form"
          layout="horizontal"
          style={{ columnRuleWidth: "150px", marginTop: 16 }}
        >
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
            id="LicensePlate"
            name="LicensePlate"
            label="License Plate"
            rules={[
              { required: true, message: "Please input the license plate!" },
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
            id="CarColor"
            name="CarColor"
            label="Car Color"
            rules={[{ required: true, message: "Please input the car color!" }]}
            className="custom-form-item"
          >
            <Input
              value={carColor}
              onChange={(e) => setCarColor(e.target.value)}
              placeholder="Enter car color"
            />
          </Form.Item>
          <Form.Item
            id="CarMake"
            name="CarMake"
            label="Car Make"
            rules={[{ required: true, message: "Please input the car make!" }]}
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
    </ConfigProvider>
  );
};

export default IN;

{
  /* 
          {image && (
            <img
              src={image}
              alt="Uploaded"
              style={{ width: "300px", marginTop: "20px" }}
            />
          )}
          <Button
            onClick={handleImageOk} // This triggers OCR processing
            style={{ marginTop: "20px" }}
            disabled={!image} // Disable OCR button if no image uploaded
          >
            Perform OCR
          </Button> 

          <div style={{ marginTop: "20px" }}>
            <p>License Plate: {carLicensePlate}</p>
            <p>Car Color: {carColor}</p>
          </div>*/
}
