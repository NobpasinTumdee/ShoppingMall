import React, { useEffect, useState } from "react";
import { Layout, Menu, Card, List, Button, Typography, Spin } from "antd";
import { Content, Sider } from "antd/es/layout";
import axios from "axios";
import {Hall} from '../../../../interfaces/HallInterface';

const { Title, Text } = Typography;
const HallPage: React.FC = () => {
    const [halls, setHalls] = useState<Hall[]>([]);
    const [loading, setLoading] = useState(true);
  
    // ดึงข้อมูล hall จาก API เมื่อ component ถูก mount
    useEffect(() => {
      axios
        .get("/api/hall") // เปลี่ยนเป็น endpoint ของ API ของคุณ
        .then((response) => {
          setHalls(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hall data:", error);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return <Spin size="large" style={{ display: "block", margin: "auto" }} />;
    }
  
    return (
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider width={250} style={{ background: "#fff" }}>
          <Menu
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">Dashboard</Menu.Item>
            <Menu.Item key="2">Halls</Menu.Item>
            <Menu.Item key="3">Bookings</Menu.Item>
            <Menu.Item key="4">Facilities</Menu.Item>
            <Menu.Item key="5">Payments</Menu.Item>
          </Menu>
        </Sider>
  
        {/* Content Area */}
        <Layout>
          <Content style={{ padding: "20px" }}>
            <Title level={2}>Available Halls</Title>
  
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={halls}
              renderItem={(hall) => (
                <List.Item>
                  <Card
                    hoverable
                    cover={<img alt={hall.hallName} src={hall.imageHall} />}
                  >
                    <Title level={4}>{hall.hallName}</Title>
                    <Text strong>Location:</Text> {hall.location}
                    <br />
                    <Text strong>Capacity:</Text> {hall.capacity} people
                    <br />
                    <Text strong>Price per Hour:</Text> {hall.pricePerHour} THB
                    <br />
                    <Text strong>Status:</Text>{" "}
                    {hall.isAvailable ? (
                      <Text type="success">Available</Text>
                    ) : (
                      <Text type="danger">Unavailable</Text>
                    )}
                    <br />
                    <Button
                      type="primary"
                      style={{ marginTop: "10px" }}
                      onClick={() => alert(`Viewing details for ${hall.hallName}`)}
                    >
                      View Details
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default HallPage;