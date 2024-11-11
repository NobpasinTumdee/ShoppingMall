import React from 'react';
import { Layout, Menu, Form, Input, Button, DatePicker, Select, message } from 'antd';
import {
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import './HallBookingPage.css';

const { /*Header,*/ Sider, Content } = Layout;
const { Option } = Select;

const HallBookingPage: React.FC = () => {
  const [form] = Form.useForm();

  // ฟังก์ชันเมื่อมีการส่งฟอร์ม
  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('Booking successfully submitted!');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Booking submission failed!');
  };

  return (
    <Layout style={{ minHeight: '750px' }}>
      {/* Header 
      <Header style={{ background: '#001529', color: '#fff', textAlign: 'center', fontSize: '18px' }}>
        Hall Booking System
      </Header>
      */}
      <Layout>
        {/* Sidebar */}
        <Sider width={250} theme="dark">
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="1" icon={<CalendarOutlined />}>
              ปฏิทินการใช้ห้อง
            </Menu.Item>
            <Menu.Item key="2" icon={<BookOutlined />}>
              สถานะการจองห้อง
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined />}>
              รายงานการจองห้องประชุม
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              ข้อมูลผู้ดูแล
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: '10px' }}>
          <Content style={{ padding: 24, margin: 0, background: '#fff' }}>
            <h2>จองห้องประชุม</h2>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              style={{ maxWidth: '600px' }}
            >
              <Form.Item
                label="ชื่อผู้จอง"
                name="name"
                rules={[{ required: true, message: 'กรุณากรอกชื่อผู้จอง' }]}
              >
                <Input placeholder="ชื่อผู้จอง" />
              </Form.Item>

              <Form.Item
                label="เลือกห้อง"
                name="room"
                rules={[{ required: true, message: 'กรุณาเลือกห้องประชุม' }]}
              >
                <Select placeholder="เลือกห้องประชุม">
                  <Option value="Room A">Room A</Option>
                  <Option value="Room B">Room B</Option>
                  <Option value="Room C">Room C</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="วันที่และเวลา"
                name="datetime"
                rules={[{ required: true, message: 'กรุณาเลือกวันที่และเวลา' }]}
              >
                <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' ,backgroundColor: "#E8D196" ,color: '#000'}}>
                  จองห้องประชุม
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default HallBookingPage;
