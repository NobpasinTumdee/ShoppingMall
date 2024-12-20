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
  GetParkingCardWithZoneByID,
  CreateParkingTransaction,
  UpdateParkingCard,
  UpdateParkingZone,
} from "../../../../../services/https";
//import "./../Carpark.css";
import { ParkingCardInterface } from "../../../../../interfaces/Carpark";

import Tesseract from "tesseract.js";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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
}

const IN: React.FC<InProps> = ({
  getParkingCards,
  onChange,
  setOtp,
  selectedCard,
  setSelectedCard,
  isModalInVisible,
  setIsModalInVisible,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carMake, setCarMake] = useState("");
  const [image, setImage] = useState<string | null>(null); // กำหนดให้รองรับทั้ง string หรือ null
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Requesting with ID:", selectedCard?.ID);
    const fetchData = async () => {
      try {
        const response = await GetParkingCardWithZoneByID(
          selectedCard?.ID || ""
        );
        setSelectedCard(response.data);
      } catch (error) {
        message.error("Failed to fetch parking card data.");
      }
    };
    if (isModalInVisible) fetchData();
  }, [isModalInVisible]);

  const handleCardClick = (index: any) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index);
  };

  const handleCancel = () => {
    form.resetFields();
    setSelectedCard(null);
    setCarLicensePlate("");
    setSelectedCardIndex(null);
    setIsModalInVisible(false);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
    } catch {
      message.error("Please fill in all required fields!");
      return;
    }

    if (selectedCardIndex === null || !carLicensePlate) {
      message.error(
        "Please select a parking card and input the license plate!"
      );
      return;
    }

    const zone = selectedCard?.ParkingZone?.[selectedCardIndex];
    if (!zone || zone.AvailableZone === 0) {
      message.error("This parking zone is full. Cannot update card!");
      return;
    }

    const CardTransData = {
      EntryTime: new Date().toISOString(),
      LicensePlate: carLicensePlate,
      Color: carColor,
      Make: carMake,
      TransmissionImage: image, // Include transmission image here
      UserID: Number(localStorage.getItem("id")),
      ParkingCardID: selectedCard?.ID,
      StatusPaymentID: 1,
    };

    const updateCardData = {
      ID: selectedCard?.ID,
      IsActive: true,
      StatusCardID: 2,
    };

    const updateZoneData = {
      ID: zone.ID,
      AvailableZone: (zone.AvailableZone || 0) - 1,
    };

    try {
      const resCard = await UpdateParkingCard(
        selectedCard?.ID || "",
        updateCardData
      );
      const resZone = await UpdateParkingZone(zone.ID || 0, updateZoneData);
      const resTrans = await CreateParkingTransaction(CardTransData);

      if (
        resCard.status === 200 &&
        resZone.status === 200 &&
        resTrans.status === 201
      ) {
        messageApi.success("Parking card and zone updated successfully!");
        getParkingCards();
        handleCancel();
        onChange("");
        setOtp("");
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      message.error("Error updating parking card or zone.");
      console.error("Error details:", error);
    }
  };

  const handleImageOk = async () => {
    try {
      await form.validateFields();
    } catch {
      message.error("Please fill in all required fields!");
      return;
    }

    // Validation for license plate
    if (!carLicensePlate) {
      message.error("Please input the license plate!");
      return;
    }

    // Proceed with other operations...
  };

  /*   const ocrImage = (image: any) => {
    Tesseract.recognize(image, "eng", {
      logger: (m: any) => console.log(m),
      pageSegMode: 6, // Assume a single uniform block of text (might improve accuracy)
    } as any).then(({ data: { text } }) => {
      const licensePlate = extractLicensePlate(text.trim().replace(/\s+/g, " "));
      setCarLicensePlate(licensePlate);
    
      // Process color detection
      const color = extractCarColor(text);
      setCarColor(color);
    });    
  };
  
  const extractCarColor = (text: string) => {
    const colorRegex = /\b(white|black|red|blue|green|gray|silver|yellow|brown|orange)\b/i; // Expanded color set
    const match = text.match(colorRegex);
    return match ? match[0] : "Unknown"; // Return 'Unknown' if no color is detected
  };
  

  const extractLicensePlate = (text: string) => {
    // Update regex to capture the expected license plate format, e.g., P 688 CC
    const regex = /([A-Z0-9]{1,3}[\s\-]?[0-9]{1,4}[\s\-]?[A-Z]{1,2})/g;
    const match = text.match(regex);
    if (match && match[0]) {
      console.log("Detected License Plate:", match[0]);
      return match[0]; // Return the detected license plate
    } else {
      message.error("License plate could not be detected.");
      return "";
    }
  }; 
  
  const handleImageChange = (event: any) => {
    const file = event?.target?.files?.[0]; // เพิ่มการตรวจสอบว่า event.target และ files ไม่ใช่ undefined
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      //ocrImage(file);
    } else {
      message.error("No file selected!");
    }
  };*/

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeUpload: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    const file = newFileList[0]?.originFileObj as File;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      //ocrImage(file);
    }
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
                          fontFamily: "Dongle, sans-serif", // fontFamily สำหรับ Capacity
                          fontSize: "16px", // fontSize สำหรับ Capacity
                          color: "#757575",
                          lineHeight: "1.5",
                        }}
                      >
                        <div>Capacity: {zone.Capacity}</div>
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
                        ((zone.AvailableZone || 0) / (zone.Capacity || 0)) * 100
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
          <Upload
            fileList={fileList}
            onChange={onChangeUpload}
            onPreview={onPreview}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);
              return false;
            }}
            maxCount={4}
            multiple={false}
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>อัพโหลด</div>
            </div>
          </Upload>
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
