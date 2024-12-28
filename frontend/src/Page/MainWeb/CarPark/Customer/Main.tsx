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
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { NavBar } from "../../../Component/NavBar";
import {
  CreateParkingCard,
  CreateParkingTransaction,
  CreateVehicle,
  GetListCard,
  GetListZone,
  GetParkingCardByUserID,
  GetUserById,
  GetUserDetails,
  UpdateParkingCard,
  UpdateParkingZone,
  UpdateVehicle,
} from "../../../../services/https";
import {
  ParkingCardInterface,
  ParkingZoneInterface,
  VehicleInterface,
} from "../../../../interfaces/Carpark";
import dayjs from "dayjs";
import { CardInterface } from "antd/es/card";
import { UsersInterface } from "../../../../interfaces/UsersInterface";
import create from "@ant-design/icons/lib/components/IconFont";

const { Title } = Typography;
const { Option } = Select;
const userid = localStorage.getItem("id");
const today = dayjs();
const todayformat = dayjs().format("YYYY-MM-DD");

const CustomerParkingBooking: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  //const [zones, setZones] = useState<ParkingZoneInterface[]>([]);
  const [listcards, setListCards] = useState<ParkingCardInterface[]>([]);
  const [cards, setCards] = useState<ParkingCardInterface>();
  const [user, setUser] = useState<UsersInterface>();
  const [vehicles, setVehicles] = useState<VehicleInterface>();
  const [selectedDate, setSelectedDate] = useState<string | null>(todayformat);
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

  useEffect(() => {
    //fetchAllData();
    fetchUserDetails();
    console.log("selectedDate: ", selectedDate);
  }, [reload, selectedDate]);

  /*   const checkUserBooking = async () => {
    try {
      // เรียกข้อมูลการจองทั้งหมดของผู้ใช้จาก API
      const res = await GetListCard();
      if (res.status === 200) {
        console.log("booking.ReservationDate: ", res.data.ReservationDate);
        // ถ้าพบว่ามีการจองในวันนี้แล้ว
        if (res.data.ParkingTransaction.ReservationDate === selectedDate) {
          messageApi.error("คุณได้จองพื้นที่จอดรถไปแล้ว ไม่สามารถจองซ้ำได้");
          return true; // แจ้งสถานะว่าไม่สามารถจองซ้ำได้
        }
        return false; // ไม่มีการจองวันนี้
      } else {
        messageApi.error("ไม่สามารถดึงข้อมูลการจองได้");
      }
    } catch (error) {
      console.error("Error checking user booking:", error);
      return false;
    }
  }; */
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

  const fetchUserDetails = async () => {
    setLoading(true); // เริ่มโหลดข้อมูล
    try {
      const [listCardRes, userdetailRes] = await Promise.all([
        GetListCard(),
        GetUserDetails(Number(userid)),
      ]);
      if (listCardRes.status === 200) {
        setListCards(listCardRes.data);
        console.log("ListCard:", listCardRes.data);
      } else {
        message.error("Failed to fetch list card.");
      }

      if (userdetailRes.status === 200) {
        const { user, vehicle, parkingCard } = userdetailRes.data;

        setUser(user);
        setCards(parkingCard);
        setVehicles(vehicle);
        setCarLicensePlate(vehicle.LicensePlate);
        setCarColor(vehicle.Color);
        setCarMake(vehicle.Make);
        console.log("carLicensePlate: ", carLicensePlate);
        console.log("carColor: ", carColor);
        console.log("carMake: ", carMake);
        //console.log("Setting fileList with image: ", vehicle.Image);
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: vehicle.Image, // ที่นี่จะต้องเป็น base64 string ที่มาจากฐานข้อมูล
          },
        ]);
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
  const [isModalCreateCardVisible, setIsModalCreateCardVisible] =
    useState(false);
  const handleCreateCardOk = async () => {
    // ข้อมูลสำหรับสร้าง ParkingCard
    const newCardData = {
      ID: (Number(listcards[listcards.length - 1].ID) + 1).toString().padStart(4, '0'),
      IsPermanent: true,
      UserID: Number(userid),
      ExpiryDate: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString(),
      StatusCardID: 1,
    };

    try {
      // สร้าง ParkingCard
      const resCreateCard = await CreateParkingCard(newCardData);
      if (resCreateCard.status === 201) {
        // ข้อมูลสำหรับสร้าง Vehicle (ใช้ cardID จาก ParkingCard)
        const vehicleData = {
          LicensePlate: carLicensePlate,
          Image: imageUrl || "",
          Color: carColor,
          Make: carMake,
          UserID: Number(userid),
        };

        // สร้าง Vehicle
        const resCreateVehicle = await CreateVehicle(vehicleData);
        if (resCreateVehicle.status === 201) {
          console.log("Parking card and vehicle created successfully.");
          setIsModalCreateCardVisible(false);
          setReload(!reload); // เปลี่ยนค่า reload เพื่อกระตุ้น useEffect
        } else {
          message.error("Failed to create vehicle.");
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

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const handleZoneClick = (index: any) => {
    setSelectedZone(index === selectedZone ? null : index);
  };

  /***************************    บันทึก Transaction    ******************************** */
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
      messageApi.error("Please choose a zone.");
      return;
    }

    setIsModalVisible(true);
  };
  const handleOk = async () => {
    // ตรวจสอบว่ามีการเลือก zone หรือยัง
    if (selectedZone === null) {
      message.error("Please select a parking zone!");
      return;
    }

    if (!selectedDate || !carLicensePlate || !carColor || !carMake) {
      message.error("Please fill in all required fields!");
      return;
    }

    const CardTransData = {
      ReservationDate: selectedDate,
      IsReservedPass: false,
      LicensePlate: carLicensePlate,
      Image: imageUrl === null ? fileList[0].url : imageUrl,
      Color: carColor,
      Make: carMake,
      UserID: Number(userid),
      ParkingCardID: cards?.ID,
      StatusPaymentID: 1,
      ParkingZoneID:
        (cards?.ParkingZone && cards.ParkingZone[selectedZone]?.ID) || "",
    };

    const updateZoneData = {
      ReservedAvailable:
        ((cards?.ParkingZone &&
          cards?.ParkingZone[selectedZone].ReservedAvailable) ||
          0) - 1,
    };

    try {
      const resZone = await UpdateParkingZone(
        (cards?.ParkingZone && cards?.ParkingZone[selectedZone].ID) || 0,
        updateZoneData
      );
      const resTrans = await CreateParkingTransaction(CardTransData);

      if (resZone.status === 200 && resTrans.status === 201) {
        messageApi.success("Parking booking successful!");
        setIsModalVisible(false); // ปิด modal เมื่อสำเร็จ
        /* checkUserBooking(); */
        handleCancel();
        setReload(!reload); // เปลี่ยนค่า reload เพื่อกระตุ้น useEffect
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
  /***************************    Select วันที่    ******************************** */
  const generateAvailableDates = () => {
    const availableDates = [
      today.format("YYYY-MM-DD"),
      today.add(1, "day").format("YYYY-MM-DD"),
      today.add(2, "day").format("YYYY-MM-DD"),
    ];
    return availableDates;
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <Row justify="center">
                <Col span={8}>
                  <Form layout="horizontal" form={form}>
                    <Form.Item
                      name="ReservationDate"
                      label="Reservation Date"
                      rules={[
                        {
                          required: true,
                          message: "Please select the reservation date!",
                        },
                      ]}
                      className="custom-form-item"
                    >
                      <Select
                        placeholder="Choose a date"
                        onChange={handleDateChange}
                        value={selectedDate}
                        style={{ width: "100%" }}
                        defaultValue={selectedDate}
                      >
                        {generateAvailableDates().map((date) => (
                          <Option key={date} value={date}>
                            {dayjs(date).format("YYYY-MM-DD")}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>{" "}
                  </Form>
                </Col>
              </Row>
              {cards?.StatusCard?.Status === "IN" &&
              cards.ParkingTransaction &&
              cards.ParkingTransaction.some((transaction) => {
                const reservationDate = transaction.ReservationDate
                  ? new Date(transaction.ReservationDate).toLocaleDateString()
                  : null;
                const selected = selectedDate
                  ? new Date(selectedDate).toLocaleDateString()
                  : null;

                const isReservedPass = transaction.IsReservedPass === false;
                return reservationDate === selected && isReservedPass;
              }) ? (
                renderReservedForm() // แสดงฟอร์มเมื่อเงื่อนไขทั้งหมดตรง
              ) : (
                <div>
                  <Button type="primary" onClick={() => handleOpenModalEdit()}>
                    Edit Car Information
                  </Button>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      gap: "16px",
                    }}
                  >
                    {Array.isArray(cards?.ParkingZone) &&
                      cards?.ParkingZone.map((zone, index) => (
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
                                  <div>Capacity: {zone?.MaxReservedCapacity}</div>
                                  <div>Available: {zone.ReservedAvailable}</div>
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
                                  ((zone.ReservedAvailable || 0) /
                                    (zone.MaxReservedCapacity || 0)) *
                                  100
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
                      ))}
                  </div>{" "}
                  <Row justify="center" style={{ marginTop: "25px" }}>
                    <Col span={8}>
                      <Form layout="horizontal" form={form}>
                        <div>Car Picture</div>
                        <Upload
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
                            onChange={(e) => setCarLicensePlate(e.target.value)}
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
                        <Button
                          type="primary"
                          onClick={() => handlePreOk()}
                          block
                        >
                          Confirm Reservation
                        </Button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              )}
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
            <strong>Date:</strong> {selectedDate}
          </p>
          <QRCode
            errorLevel="H"
            value={cards?.ID || ""}
            icon="D:\university\2_2567\SE\ShoppingMall\frontend\src\assets\icon\LOGOS.png"
          />
          <p>
            {imageUrl ? (
              <img
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
              ? cards.ParkingZone[selectedZone || 0].ID
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
