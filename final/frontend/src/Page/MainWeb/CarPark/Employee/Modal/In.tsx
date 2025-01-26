import React, { useState, useEffect } from "react";
import {
  Card,
  Col,
  ConfigProvider,
  Form,
  Input,
  message,
  Modal,
  Progress,
  Row,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  CreateParkingUsageCard,
  UpdateParkingCard,
  GetParkingCardByID,
  UpdateParkingUsageCard,
  GetListZoneDaily,
  UpdateZoneDailyByID,
  CreateParkingZoneDailyAndUsageCard,
} from "../../../../../services/https";
import {
  ParkingCardInterface,
  ParkingUsageCardInterface,
  ParkingZoneDailyInterface,
  StatusCardInterface,
} from "../../../../../interfaces/CarparkInterface";

import dayjs from "dayjs";

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
  setCards: React.Dispatch<React.SetStateAction<ParkingCardInterface[]>>;
  cards: ParkingCardInterface[];
  status: StatusCardInterface[];
}

const IN: React.FC<InProps> = ({
  getParkingCards,
  onChange,
  setOtp,
  selectedCard,
  setSelectedCard,
  isModalInVisible,
  setIsModalInVisible,
  status,
}) => {
  const [form] = Form.useForm();
  const [selectedZoneIndex, setSelectedZoneIndex] = useState<
    number | null | undefined
  >(undefined);
  const [carLicensePlate, setCarLicensePlate] = useState<string>();
  const [carColor, setCarColor] = useState<string>();
  const [carMake, setCarMake] = useState<string>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [zoneDailyData, setZoneDailyData] = useState<
    ParkingZoneDailyInterface[]
  >([]);
  const [selectedZoneDaily, setSelectedZoneDaily] =
    useState<ParkingZoneDailyInterface>();
  const [existingUsageCard, setExistingUsageCard] =
    useState<ParkingUsageCardInterface>();
  const [reload, setReload] = useState(false); // สถานะใหม่สำหรับกระตุ้น useEffect
  const imageUrl = fileList[0]?.thumbUrl || null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rescard, listZoneDailyRes] = await Promise.all([
          GetParkingCardByID(selectedCard?.ID || ""),
          GetListZoneDaily(),
        ]);

        setSelectedCard(rescard.data);

        if (listZoneDailyRes.status === 200) {
          setZoneDailyData(listZoneDailyRes.data);
          const today = dayjs();
          const selectedDateStr = today.format("YYYY-MM-DD");
          const zonedaily = listZoneDailyRes.data.find((zoneDaily: any) => {
            const zoneDate = new Date(zoneDaily.Date).toLocaleDateString(
              "en-CA"
            );

            return zoneDate === selectedDateStr;
          });

          if (!zonedaily) {
            setZoneDailyData(zonedaily);
            setSelectedZoneDaily(zonedaily ?? null);
          }
        }

        const existingTrans = rescard.data.ParkingUsageCard?.find(
          (usageCard: any) =>
            !usageCard?.IsReservedPass &&
            usageCard?.ReservationDate === dateWithTime &&
            rescard.data.ParkingUsageCard?.length > 0 &&
            rescard.data.IsPermanent
        );

        setExistingUsageCard(existingTrans);
        console.log("existingTrans: ", existingTrans);

        if (existingTrans) {
          const zoneIndex = selectedCard?.ParkingZone?.findIndex(
            (zone: any) =>
              zone.ID === existingTrans.ParkingZoneDaily.ParkingZone.ID
          );

          setSelectedZoneIndex(zoneIndex !== -1 ? zoneIndex : null);

          setCarLicensePlate(existingTrans.LicensePlate);
          setCarColor(existingTrans.Color);
          setCarMake(existingTrans.Make);
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: existingTrans.Image,
            },
          ]);
          form.setFieldsValue({
            Image: [
              {
                uid: "-1",
                name: "image.png",
                status: "done",
                url: existingTrans.Image,
              },
            ],
            LicensePlate: existingTrans.LicensePlate,
            Color: existingTrans.Color,
            Make: existingTrans.Make,
          });
        } else {
          form.resetFields();
        }
      } catch (error) {
        message.error("Failed to fetch parking card data.");
      }
    };

    if (isModalInVisible) fetchData();
  }, [isModalInVisible, reload, selectedZoneDaily]);

  const handleCardClick = (index: any) => {
    setSelectedZoneIndex(index === selectedZoneIndex ? null : index);
  };

  const handleCancel = () => {
    setCarLicensePlate("");
    setCarColor("");
    setCarMake("");
    setSelectedZoneDaily(undefined);
    setSelectedCard(null);
    setSelectedZoneIndex(null);
    setIsModalInVisible(false);
    setFileList([]);
    form.resetFields();
    setReload(!reload);
  };

  const handleOk = async () => {
    if (selectedZoneIndex === null) {
      message.error("Please select a parking zone!");
      return;
    }

    const zone = selectedCard?.ParkingZone?.[selectedZoneIndex || 0];

    if (!zone) {
      message.error("This parking zone is not found.");
      return;
    }

    const updateCardData = {
      StatusCardID: Number(
        status?.find((state: any) => state.Status === "OUT")?.ID || null
      ),
    };

    // Convert today to the start of the day (00:00:00)
    const DayToday = new Date(today.toDate());
    DayToday.setHours(0, 0, 0, 0);

    const isSameDate = (
      date1: Date | null | undefined,
      date2: Date | null | undefined
    ): boolean => {
      if (!date1 || !date2) {
        return false;
      }
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    try {
      await form.validateFields();
      console.log("Form values: ", form.getFieldsValue());
    } catch (error) {
      console.error("Error details:", error);
      return;
    }

    try {
      // **ส่วนที่ 1: ดึงข้อมูล ZoneDaily**
      const ZoneDaily =
        zoneDailyData && zoneDailyData.length > 0
          ? zoneDailyData.find((zoneDaily: ParkingZoneDailyInterface) => {
              if (!zoneDaily.Date) return false;
              const DatezoneDaily = new Date(zoneDaily.Date).toISOString();
              const dateToday = DayToday.toISOString();
              return (
                zone.ID === zoneDaily.ParkingZoneID &&
                DatezoneDaily === dateToday
              );
            })
          : {}; // Fallback to an empty object if `zoneDailyData` is empty or undefined

      const zoneDailyDate = ZoneDaily?.Date ? new Date(ZoneDaily.Date) : null;

      // **ส่วนที่ 2: เตรียมข้อมูลสำหรับการอัปเดตหรือสร้าง ZoneDaily**
      const updateZoneDailyData = {
        ID: ZoneDaily?.ID,
        Date: dateWithTime,
        TotalVisitors: (ZoneDaily?.TotalVisitors || 0) + 1,
        AvailableZone:
          ZoneDaily !== undefined && Object.keys(ZoneDaily).length > 0
            ? (ZoneDaily?.AvailableZone || 0) - 1
            : (zone?.MaxCapacity || 0) - 1,
        ReservedAvailable:
          ZoneDaily === undefined || Object.keys(ZoneDaily).length === 0
            ? zone?.MaxReservedCapacity || 0 // ถ้าไม่มี ZoneDaily หรือ ZoneDaily ว่าง ให้ใช้ MaxReservedCapacity
            : existingUsageCard !== undefined &&
              ZoneDaily !== undefined &&
              Object.keys(ZoneDaily).length > 0
            ? Math.max(
                0, // ค่าไม่ต่ำกว่า 0
                (ZoneDaily?.ReservedAvailable || 0) ??
                  (zone?.MaxReservedCapacity || 0) // ถ้าไม่มี ReservedAvailable จะใช้ MaxReservedCapacity
              )
            : Math.min(
                zone?.MaxReservedCapacity || 0, // ค่าไม่เกิน MaxReservedCapacity
                (ZoneDaily?.ReservedAvailable || 0) ?? zone?.MaxReservedCapacity // ถ้าไม่มี ReservedAvailable จะใช้ MaxReservedCapacity
              ),
        ParkingZoneID: zone.ID,
      };

      const UsageCardData = {
        EntryTime: new Date().toISOString(),
        LicensePlate: carLicensePlate,
        Image: imageUrl === null ? fileList[0].url : imageUrl,
        Color: carColor,
        Make: carMake,
        ParkingCardID: selectedCard?.ID,
        ParkingZoneID: zone.ID,
        UserID: Number(localStorage.getItem("id")),
        ParkingZoneDailyID: ZoneDaily?.ID,
      };

      const combinedData = {
        ParkingZoneDaily: updateZoneDailyData,
        ParkingUsageCard: UsageCardData,
      };

      // **ส่วนที่ 3: ถ้ามี UsageCard ที่ตรงเงื่อนไข**
      if (existingUsageCard && ZoneDaily?.ID === existingUsageCard.ParkingZoneDailyID) {
        const usageCardID = Number(existingUsageCard.ID);
        if (isNaN(usageCardID)) {
          message.error("Invalid usageCard ID.");
          return;
        }

        try {
          const resTrans = await UpdateParkingUsageCard(
            usageCardID,
            UsageCardData
          );
          const resCard = await UpdateParkingCard(
            selectedCard?.ID || "",
            updateCardData
          );
          const resZoneDaily =
            zoneDailyDate &&
            isSameDate(zoneDailyDate, DayToday) &&
            (ZoneDaily?.ID || 0) > 0
              ? await UpdateZoneDailyByID(
                  ZoneDaily?.ID || 0,
                  updateZoneDailyData
                )
              : await CreateParkingZoneDailyAndUsageCard(combinedData);

          if (
            resCard.status === 200 &&
            resTrans.status === 200 &&
            resZoneDaily.status === 200
          ) {
            message.success("Parking usageCard updated successfully!");
            getParkingCards();
            handleCancel();
            onChange("");
            setOtp("");
            setReload(!reload);
          } else {
            throw new Error("Update failed");
          }
        } catch (error) {
          message.error("Error updating parking usageCard.");
          console.error("Error details:", error);
        }
      } else {
        // **ส่วนที่ 4: ถ้าไม่มี UsageCard ที่ตรงกับเงื่อนไข (กรณีใหม่ทั้งหมด)**
        try {
          const resZoneDaily =
            zoneDailyDate &&
            isSameDate(zoneDailyDate, DayToday) &&
            (ZoneDaily?.ID || 0) > 0
              ? await UpdateZoneDailyByID(
                  ZoneDaily?.ID || 0,
                  updateZoneDailyData
                )
              : await CreateParkingZoneDailyAndUsageCard(combinedData);

          const resCard = await UpdateParkingCard(
            selectedCard?.ID || "",
            updateCardData
          );

          let resTrans;
          let checkResTransStatus = false;
          if (resZoneDaily.status !== 201) {
            // ถ้า resZoneDaily เป็นผลจากการ UpdateZoneDailyByID ให้สร้าง UsageCard
            resTrans = await CreateParkingUsageCard(UsageCardData);
            checkResTransStatus = true;
          } else {
            // ถ้า resZoneDaily มาจาก CreateParkingZoneDailyAndUsageCard จะไม่ต้องสร้าง UsageCard ใหม่
            resTrans = { status: 200 }; // สามารถกำหนดสถานะให้สำเร็จได้หากไม่จำเป็นต้องสร้าง UsageCard ใหม่
          }
          if (
            resCard.status === 200 &&
            ((checkResTransStatus && resTrans.status === 201) || // ถ้า checkResTransStatus เป็นจริง ให้ตรวจสอบว่า resTrans มีสถานะ 201 (สร้าง UsageCard สำเร็จ)
              (!checkResTransStatus && resZoneDaily.status === 201)) // ถ้า checkResTransStatus เป็นเท็จ ให้ตรวจสอบว่า resZoneDaily มีสถานะ 200 (สร้างหรืออัปเดต ZoneDaily สำเร็จ)
          ) {
            getParkingCards();
            handleCancel();
            onChange("");
            setOtp("");
            setReload(!reload);
            message.success(
              "Parking card, zone, and usageCard updated successfully!"
            );
          } else {
            throw new Error("Update failed");
          }
        } catch (error) {
          message.error("Error updating parking card or zone.");
          console.error("Error details:", error);
        }
      }
    } catch (error) {
      message.error("Error processing parking usageCard.");
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
          fontSize: 28,
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
        width={"fit-content"}
        onCancel={handleCancel}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "16px",
          padding: "16px",
        }}
        footer={null}
      >
        <div style={{ textAlign: "left", marginBottom: "16px" }}>
          <p style={{ fontSize: "28px", fontWeight: "normal", margin: 0 }}>
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
              let zoneDaily = null;
              if (Array.isArray(zoneDailyData)) {
                zoneDaily = zoneDailyData.find((data) => {
                  const isMatch =
                    data.ParkingZone?.ID === zone.ID &&
                    data.Date === dateWithTime;
                  return isMatch;
                });
              }

              console.log("zoneDaily: ", zoneDaily);
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
                      selectedZoneIndex === index
                        ? "0 0 10px rgba(201, 175, 98, 0.5)"
                        : "none",
                  }}
                  onClick={() => handleCardClick(index)}
                  cover={<img src={zone.Image} alt={zone.Name} />}
                >
                  <Row justify={"space-around"}>
                    <Row justify={"space-around"}>
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
                            {zoneDaily?.AvailableZone ?? zone?.MaxCapacity}
                          </div>
                        </div>
                      </div>
                    </Row>
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
                          zone.MaxCapacity
                            ? ((zoneDaily?.AvailableZone ?? zone?.MaxCapacity) /
                                zone.MaxCapacity) *
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
          <Form.Item
            name="Image"
            label="Upload Image"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
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
          </Form.Item>

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
            <Input
              id="LicensePlate"
              onChange={(e) => setCarLicensePlate(e.target.value)}
            />
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
            <Input id="Color" onChange={(e) => setCarColor(e.target.value)} />
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
            <Input
              id="Make"
              value={carMake}
              onChange={(e) => setCarMake(e.target.value)}
            />
          </Form.Item>
          <div className="carpark-button-ok-cancle">
            <div className="carpark-button-cancle" onClick={handleCancel}>
              Cancel
            </div>
            <div className="carpark-button-ok" onClick={handleOk}>
              Confirm
            </div>
          </div>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default IN;