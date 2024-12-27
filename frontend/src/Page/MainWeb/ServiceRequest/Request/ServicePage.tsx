import React from "react";
import { Layout, Form, Input, Button, Select, message, DatePicker } from "antd";
import "./ServicePage.css";
import { ServiceInterface } from "../../../../interfaces/ServiceInterface";
import { GetUserById } from "../../../../services/https";

const { Content } = Layout;

const ServicePage: React.FC = () => {
  const [form] = Form.useForm();
  // const 

  // เมื่อฟอร์มสำเร็จ
  const onFinish = async (values: ServiceInterface) => {
    try {
      // ส่งคำขอ POST ไปยัง backend
      const response = await fetch("/api/service-requests/create-service-request/id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Request successfully submitted!");
        form.resetFields(); // ล้างฟอร์ม
      } else {
        const errorData = await response.json();
        message.error(`Request failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      message.error("Request failed! Please try again.");
    }
  };

  // เมื่อฟอร์มล้มเหลว
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please check the form for errors!");
  };

  return (
    <Layout style={{ minHeight: "100px" }}>
      <Content
        style={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="form-container">
          <h1 className="form-title">Form for Service Request</h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ width: "100%" }}
          >
            {/* Date */}
            <Form.Item
              label="Date"
              name="RequestDate"
              rules={[{ required: true, message: "Please select the date!" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Select the Date"
              />
            </Form.Item>

            {/* User */}
            <Form.Item
              label="User"
              name="UserID"
              rules={[
                { required: true, message: "Please input the user name!" },
              ]}
            >
              <Input placeholder="Enter the user name" />
            </Form.Item>

            {/* Location */}
            <Form.Item
              label="Location"
              name="Location"
              rules={[
                { required: true, message: "Please input the location!" },
              ]}
            >
              <Input placeholder="Enter the location" />
            </Form.Item>

            {/* Problem */}
            <Form.Item
              label="Problem"
              name="ProblemDescription"
              rules={[
                { required: true, message: "Please describe the problem!" },
              ]}
            >
              <Input.TextArea placeholder="Describe the problem" rows={4} />
            </Form.Item>

            {/* Status */}
            <Form.Item
              label="Status"
              name="StatusService"
              rules={[
                { required: true, message: "Please specify the status!" },
              ]}
            >
              <Select placeholder="Select the status">
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="form-submit-button"
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default ServicePage;
