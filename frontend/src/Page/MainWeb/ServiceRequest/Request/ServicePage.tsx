import React from "react";
import { Layout, Form, Input, Button, Select, message, DatePicker } from "antd";
import "./ServicePage.css";
import { ServiceInterface } from "../../../../interfaces/ServiceInterface";

const { Content } = Layout;

const ServicePage: React.FC = () => {
  const [form] = Form.useForm();
  // const [Service, setService] = useState<ServiceInterface[]>([]);

  const onFinish = (values: ServiceInterface) => {
    console.log("Success:", values);
    message.success("Request successfully");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Request failed!");
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
