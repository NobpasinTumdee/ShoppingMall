import { useState, useEffect } from 'react';
import { Layout,Form, Col, Button, DatePicker, Select, message, Card, Divider, Input, InputNumber } from 'antd';
import './HallBookingPage.css';
import { CreateBookingHall, GetFacility } from '../../../../services/https';
import { BookingHallInterface } from '../../../../interfaces/HallInterface';
import { FacilityInterface } from '../../../../interfaces/HallInterface';
import { useParams } from "react-router-dom";
import { NavBar } from '../../../Component/NavBar';
import SideBar from '../../../Component/SideBar';
import moment from 'moment';
const { Sider } = Layout;

function BookingHall() {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [facilitys, setFacility] = useState<FacilityInterface[]>([]);

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
    const startDateTime = moment(values.StartDateTime).utcOffset(7, true).toDate(); // แปลงเป็น UTC+7
    const endDateTime = moment(values.EndDateTime).utcOffset(7, true).toDate(); // แปลงเป็น UTC+7

    const bookingData: BookingHallInterface = {
      ...values,
      StartDateTime: startDateTime,
      EndDateTime: endDateTime,
      HallID: Number(id),
    };

    const res = await CreateBookingHall(bookingData);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
  };

  return (
    <> <NavBar /> <div style={{ height: "110px", zIndex: "0" }}></div>
    <div style={{ display: "flex" }}>
        <Sider width={250} theme="dark">
              <SideBar />
          </Sider>
        <div style={{ flex: 1, padding: "20px" }}>
        {contextHolder}
        <Card>
          <h2>เพิ่มรายละเอียดการจอง</h2>
          <Divider />
          <Form
            name="hallBooking"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
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
                rules={[
                  { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง!" },
                  { required: true, message: "กรุณากรอกอีเมล!" }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="CustomerPhone"
                label="เบอร์โทรศัพท์"
                rules={[
                  { required: true, message: "กรุณากรอกเบอร์โทรศัพท์!" },
                  { pattern: /^[0]\d{9}$/, message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง!" }
                ]}
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
                    />
                </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="StartDateTime"
                label="วันที่เริ่มต้น"
                rules={[{ required: true, message: "กรุณาเลือกวันที่เริ่มต้น!" }]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col> */}

            {/* <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="EndDateTime"
                label="วันที่สิ้นสุด"
                rules={[{ required: true, message: "กรุณาเลือกวันที่สิ้นสุด!" }]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col> */}

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="FacilitiesID"
                label="เลือกฟอนิเจอร์ที่ต้องการ"
                rules={[{ required: true, message: "กรุณาเลือกฟอนิเจอร์!" }]}
              >
                <Select
                  options={facilitys.map(data => ({
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
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', backgroundColor: '#E8D196', color: '#000' }}
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
