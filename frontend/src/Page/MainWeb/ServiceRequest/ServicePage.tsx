import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Select } from 'antd';
import './ServicePage.css';

const { Content } = Layout;

const ServicePage: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="form-container">
                    <h1 className="form-title">Form for Service Request</h1>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ width: '100%' }}
                    >
                        {/* Date */}
                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[{ required: true, message: 'Please input the date!' }]}
                        >
                            <Input placeholder="Enter the date" />
                        </Form.Item>

                        {/* User */}
                        <Form.Item
                            label="User"
                            name="user"
                            rules={[{ required: true, message: 'Please input the user name!' }]}
                        >
                            <Input placeholder="Enter the user name" />
                        </Form.Item>

                        {/* Location */}
                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[{ required: true, message: 'Please input the location!' }]}
                        >
                            <Input placeholder="Enter the location" />
                        </Form.Item>

                        {/* Problem */}
                        <Form.Item
                            label="Problem"
                            name="problem"
                            rules={[{ required: true, message: 'Please describe the problem!' }]}
                        >
                            <Input.TextArea placeholder="Describe the problem" rows={4} />
                        </Form.Item>

                        {/* Status */}
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Please specify the status!' }]}
                        >
                            <Select placeholder="Select the status">
                                <Select.Option value="open">Open</Select.Option>
                                <Select.Option value="inProgress">In Progress</Select.Option>
                                <Select.Option value="resolved">Resolved</Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="form-submit-button">
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
