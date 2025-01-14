import { useState, useEffect } from "react";
import { Layout, Form, Col, Button, DatePicker, Select, message, Card, Divider, Input, InputNumber } from "antd";
import "./HallBookingPage.css";
import { CreateBookingHall, GetFacility } from "../../../../services/https";
import { BookingHallInterface } from "../../../../interfaces/HallInterface";
import { FacilityInterface } from "../../../../interfaces/HallInterface";
import { useNavigate,useParams } from "react-router-dom";
import { NavBar } from "../../../Component/NavBar";
import SideBar from "../../../Component/SideBar";
import dayjs from "dayjs"; // import dayjs
import utc from "dayjs/plugin/utc"; // import plugin for UTC
dayjs.extend(utc); // use the plugin

const { Sider } = Layout;

function BookingHall() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [facilitys, setFacility] = useState<FacilityInterface[]>([]);
  const navigate = useNavigate();
  const getFacility = async () => {
    const res = await GetFacility();
    if (res.status) {
      setFacility(res.data);
    }
  };

  useEffect(() => {
    getFacility();
  }, [id]);

  const onFinish = async (values: BookingHallInterface) => {
    // แปลงวันที่ให้อยู่ในรูปแบบ ISO 8601 พร้อม offset
    const startDateTime = dayjs(values.StartDateTime).utcOffset(7).format("YYYY-MM-DDTHH:mm:ssZ");
    const endDateTime = dayjs(values.EndDateTime).utcOffset(7).format("YYYY-MM-DDTHH:mm:ssZ");

    const bookingData: BookingHallInterface = {
      ...values,
      StartDateTime: startDateTime,
      EndDateTime: endDateTime,
      HallID: Number(id),
    };

    console.log("Booking Data: ", bookingData);

    try {
      const res = await CreateBookingHall(bookingData);
      
      if (res.status === 409) {
        messageApi.open({
          type: "error",
          content: "ช่วงเวลานี้มีการจองแล้ว กรุณาเลือกเวลาอื่น",
        });
      } else if (res.status) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        console.log("booking ID: ",id);
        navigate(`/listbooking/${id}`);
      } else {
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        });
      }
    } catch (error) {
      console.error("Error occurred during booking creation:", error);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์",
      });
    }
  }

  const handleStartDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      console.log("Start Date changed:", value.format("YYYY-MM-DD HH:mm"));
    }
  };

  const handleEndDateChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      console.log("End Date changed:", value.format("YYYY-MM-DD HH:mm"));
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ height: "110px", zIndex: "0" }}></div>
      <div style={{ display: "flex" }}>
        <Sider width={250} theme="dark">
          <SideBar />
        </Sider>
        <div style={{ flex: 1, padding: "20px" }}>
          {contextHolder}
          <Card>
            <h2>เพิ่มรายละเอียดการจอง</h2>
            <Divider />
            <Form name="hallBooking" layout="vertical" onFinish={onFinish} autoComplete="off">
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="CustomerName"
                  label="ชื่อ-นามสกุลของผู้จอง"
                  rules={[{ required: true, message: "กรุณากรอกชื่อ!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="CustomerEmail"
                  label="อีเมลผู้จอง"
                  rules={[{ type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง!" }, { required: true, message: "กรุณากรอกอีเมล!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="CustomerPhone"
                  label="เบอร์โทรศัพท์"
                  rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์!" }, { pattern: /^[0]\d{9}$/, message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="CustomerAddress"
                  label="ที่อยู่"
                  rules={[{ required: true, message: "กรุณากรอกที่อยู่!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="StartDateTime"
                  label="วันที่เริ่มต้น"
                  rules={[{ required: true, message: "กรุณาเลือกวันที่เริ่มต้น!" }]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                    onChange={handleStartDateChange} // เพิ่มฟังก์ชัน handleStartDateChange
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="EndDateTime"
                  label="วันที่สิ้นสุด"
                  rules={[{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }]}
                >
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm"
                    style={{ width: "100%" }}
                    onChange={handleEndDateChange} // เพิ่มฟังก์ชัน handleEndDateChange
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="FacilitiesID"
                  label="เลือกฟอนิเจอร์ที่ต้องการ"
                  rules={[{ required: true, message: "กรุณาเลือกฟอนิเจอร์!" }]}
                >
                  <Select
                    options={facilitys.map((data) => ({
                      value: data.ID || 0,
                      label: data.FacilitiesName,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  name="QuantityF"
                  label="จำนวนฟอนิเจอร์ที่ต้องการ"
                  rules={[{ required: true, message: "กรุณากรอกจำนวนฟอนิเจอร์!" }]}
                >
                  <InputNumber min={1} max={100} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  // onClick={() => handlePaymentHallClick(id || "")}
                  style={{ width: "100%", backgroundColor: "#E8D196", color: "#000" }}
                >
                  จองห้องประชุม
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}

export default BookingHall;
