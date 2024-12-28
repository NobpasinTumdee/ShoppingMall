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
  const [zoneDaily, setZoneDaily] = useState<ParkingZoneDailyInterface>();
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
  }, [isModalInVisible, reload]);

  const handleCardClick = (index: any) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };

  const handleCancel = () => {
    setCarLicensePlate("");
    setCarColor("");
    setCarMake("");
    setSelectedCard(null);
    setSelectedCardIndex(null);
    setIsModalInVisible(false);
    setFileList([]);
    form.resetFields();
  };

  const handleOk = async () => {
    // ตรวจสอบว่าเลือกโซนจอดรถหรือยัง
    if (selectedCardIndex === null) {
      message.error("Please select a parking zone and input all!");
      return;
    }

    const zone = selectedCard?.ParkingZone?.[selectedCardIndex];

    // ตรวจสอบว่าโซนจอดรถที่เลือกมีอยู่จริงหรือไม่
    if (!zone) {
      message.error("This parking zone is not found.");
      return;
    }

    const imageUrl = fileList[0]?.thumbUrl || null;

    // ตรวจสอบว่ากรอกข้อมูลทั้งหมด (ป้ายทะเบียน สีรถ ยี่ห้อรถ และรูปภาพ) หรือยัง
    if (
      !carLicensePlate ||
      !carColor ||
      !carMake ||
      (imageUrl === null && fileList.length === 0)
    ) {
      message.error("Please select a parking zone and input all!");
      return;
    }

    // ค้นหา Transaction ที่มีวันที่ตรงกับวันนี้และยังไม่ได้ผ่านการจอง
    const existingTransaction = selectedCard?.ParkingTransaction?.find(
      (transaction) =>
        transaction.IsReservedPass === false &&
        transaction.ReservationDate === String(today)
    );

    // เตรียมข้อมูลสำหรับอัปเดตสถานะบัตรจอดรถ
    const updateCardData = {
      StatusCardID: 2, // เปลี่ยนสถานะบัตรให้เป็นใช้งานอยู่
    };

    try {
      // **ส่วนที่ 1: ดึงข้อมูล ZoneDaily เพื่อเช็คว่ามีข้อมูลอยู่แล้วหรือไม่**
      let zoneDaily;
      try {
        const resZoneDaily = await GetZoneDailyByZoneID(zone.ID || 0);

        if (resZoneDaily.status === 200 && resZoneDaily.data && Array.isArray(resZoneDaily.data) && resZoneDaily.data.length > 0) {
          zoneDaily = resZoneDaily.data;
          console.log("zoneDailypass: ", zoneDaily)
        } else {
          zoneDaily = undefined;
          console.log("zoneDailyfail: ", zoneDaily)
        }
      } catch (error) {
        console.error("Error fetching Zone Daily:", error);
      }

      // **ส่วนที่ 2: เตรียมข้อมูลสำหรับอัปเดตหรือสร้าง ZoneDaily**
      const updateZoneDailyData = {
        Date: today.toISOString(), // วันที่ปัจจุบัน
        TotalVisitors: (zoneDaily?.TotalVisitors || 0) + 1, // เพิ่มจำนวนผู้เข้าพื้นที่จอด
        AvailableZone:
          ((zoneDaily?.AvailableZone ?? zone?.MaxCapacity) || 0) - 1, // ลดจำนวนที่จอดรถที่ว่าง
        ReservedAvailable:
          ((zoneDaily?.ReservedAvailable ?? zone?.MaxReservedCapacity) || 0) + 1, // เพิ่มจำนวนที่จอง
        ParkingZoneID: zone.ID, // ID ของโซนจอด
      };

      
      console.log("zone: ",zone);   
      console.log("zoneDaily?.TotalVisitors: ",zoneDaily?.TotalVisitors);
      console.log("zone?.Capacity: ",zone?.MaxCapacity);
      console.log("zoneDaily?.AvailableZone: ",zoneDaily?.AvailableZone);
      console.log("zone?.ReservedCapacity: ",zone.MaxCapacity);
      console.log("zoneDaily?.ReservedAvailable: ",zoneDaily?.ReservedAvailable);
      console.log("zoneDaily?.AvailableZone ?? zone?.Capacity: ",zoneDaily?.AvailableZone ?? zone?.MaxCapacity);
      console.log("zoneDaily?.ReservedAvailable ?? zone?.ReservedCapacity: ",zoneDaily?.ReservedAvailable ?? zone?.MaxReservedCapacity);

      // **ส่วนที่ 3: หากมี Transaction ที่ตรงเงื่อนไข (กรณีมีการจองแล้ว)**
      if (existingTransaction) {
        const transactionID = Number(existingTransaction.ID);

        // ตรวจสอบว่า Transaction ID เป็นตัวเลขที่ถูกต้อง
        if (isNaN(transactionID)) {
          message.error("Invalid transaction ID.");
          return;
        }

        // เตรียมข้อมูลสำหรับอัปเดต Transaction
        const updateTransactionData = {
          LicensePlate: carLicensePlate,
          Image: imageUrl || "",
          Color: carColor,
          Make: carMake,
          ParkingCardID: selectedCard?.ID,
          ParkingZoneID: zone.ID,
          UserID: Number(localStorage.getItem("id")),
        };

        // เตรียมข้อมูลสำหรับอัปเดตโซนจอด
        const updateZoneData = {
          AvailableZone: (zone.AvailableZone || 0) - 1,
        };

        try {
          // อัปเดตข้อมูล Transaction, Card, Zone และ ZoneDaily
          const resTrans = await UpdateParkingTransaction(
            transactionID,
            updateTransactionData
          );
          const resCard = await UpdateParkingCard(
            selectedCard?.ID || "",
            updateCardData
          );
          const resZone = await UpdateParkingZone(zone.ID || 0, updateZoneData);

          const resZoneDaily =
            zoneDaily?.Date === String(today)
              ? await UpdateZoneDailyByZoneID(zone.ID || 0, updateZoneDailyData) // หากมี ZoneDaily แล้ว อัปเดต
              : await CreateZoneDaily(updateZoneDailyData); // หากไม่มี ให้สร้างใหม่

          // ตรวจสอบว่าทุก API สำเร็จ
          if (
            resCard.status === 200 &&
            resZone.status === 200 &&
            resTrans.status === 200 &&
            resZoneDaily.status === 200
          ) {
            messageApi.success("Parking transaction updated successfully!");
            getParkingCards(); // โหลดข้อมูลบัตรจอดรถใหม่
            handleCancel(); // ปิด Modal
            onChange(""); // รีเซ็ตค่า input
            setOtp(""); // ลบ OTP
            setReload(!reload); // โหลดข้อมูลใหม่
          } else {
            throw new Error("Update failed");
          }
        } catch (error) {
          message.error("Error updating parking transaction.");
          console.error("Error details:", error);
        }
      } else {
        // **ส่วนที่ 4: หากไม่มี Transaction ที่ตรงกับเงื่อนไข (กรณีใหม่ทั้งหมด)**
        const CardTransData = {
          ReservationDate: new Date().toISOString(),
          EntryTime: new Date().toISOString(),
          LicensePlate: carLicensePlate,
          Image: imageUrl || "",
          Color: carColor,
          Make: carMake,
          ParkingCardID: selectedCard?.ID,
          ParkingZoneID: zone.ID,
          UserID: Number(localStorage.getItem("id")),
        };

        const updateZoneData = {
          AvailableZone: (zone.AvailableZone || 0) - 1,
        };

        try {
          // สร้าง Transaction ใหม่ และอัปเดตข้อมูลอื่นๆ
          const resCard = await UpdateParkingCard(
            selectedCard?.ID || "",
            updateCardData
          );
          const resTrans = await CreateParkingTransaction(CardTransData);
          const resZone = await UpdateParkingZone(zone.ID || 0, updateZoneData);

          const resZoneDaily =
            zoneDaily?.Date === String(today)
              ? await UpdateZoneDailyByZoneID(zone.ID || 0, updateZoneDailyData) // หากมี ZoneDaily แล้ว อัปเดต
              : await CreateZoneDaily(updateZoneDailyData); // หากไม่มี ให้สร้างใหม่

          // ตรวจสอบว่าทุก API สำเร็จ
          if (
            resCard.status === 200 &&
            resTrans.status === 201 &&
            resZone.status === 200 &&
            resZoneDaily.status === 200
          ) {
            messageApi.success(
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
    } catch (error) {
      message.error("Error processing parking transaction.");
      console.error("Error details:", error);
    }
  };

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
          // Seed Token
          fontFamily: "Dongle, sans-serif",
          fontSize: 24,
          colorPrimary: "#c9af62",
          borderRadius: 8,
        },
        components: {
          Progress: {
            circleTextFontSize: "larger",
          },
        },
      }}
    >
      <Modal
        title={
          <span
            style={{
              fontSize: "30px",
              justifySelf: "center",
            }}
          >
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
          <p
            style={{
              fontSize: "26px",
              fontWeight: "normal",
              margin: 0,
            }}
          >
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
            selectedCard.ParkingZone.map((zone, index) => (
              <Card
                hoverable
                bordered={false}
                key={zone.ID}
                style={{
                  fontSize: "24px", // fontSize ใน Card
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
                        <div>Capacity: {zone.MaxCapacity}</div>
                        <div>Available: {zone.AvailableZone}</div>
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
                        ((zone.AvailableZone || 0) / (zone.MaxCapacity || 0)) *
                        100
                      }
                      format={(percent) => `${(percent ?? 0).toFixed(2)}%`}
                      style={{
                        marginTop: "10px",
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            ))}
        </div>
        <div>
          {/* 
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
          </div>*/}
        </div>
        <Form
          form={form}
          name="parking-form"
          layout="horizontal"
          style={{
            columnRuleWidth: "150px",
            marginTop: 16,
          }}
        >
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
              { required: true, message: "Please input the license plate!" },
            ]}
            className="custom-form-item"
          >
            <Input
              value={carLicensePlate}
              //defaultValue={carLicensePlate}
              onChange={(e) => setCarLicensePlate(e.target.value)}
              placeholder="Enter license plate"
            />
          </Form.Item>

          <Form.Item
            name="CarColor"
            label="Car Color"
            rules={[{ required: true, message: "Please input the car color!" }]}
            className="custom-form-item"
          >
            <Input
              value={carColor}
              //defaultValue={carColor}
              onChange={(e) => setCarColor(e.target.value)}
              placeholder="Enter car color"
            />
          </Form.Item>

          <Form.Item
            name="CarMake"
            label="Car Make"
            rules={[{ required: true, message: "Please input the car make!" }]}
            className="custom-form-item"
          >
            <Input
              value={carMake}
              //defaultValue={carMake}
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
