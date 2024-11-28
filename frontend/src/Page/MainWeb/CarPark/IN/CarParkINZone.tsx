import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Input, Flex, Typography } from "antd";
import { NavBar } from "../../../Component/NavBar";
import MembershipZone from "../IN/MembershipZone";
import GeneralZone from "../IN/GeneralZone";
import StoreZone from "../IN/StoreZone";
import "../../Store/StoreAndPay.css";
import type { GetProps } from 'antd';

const { Title } = Typography;
type OTPProps = GetProps<typeof Input.OTP>;

const CarParkINZone: React.FC = () => {
  const location = useLocation();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [licensePlate, setLicensePlate] = useState<string>("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");
    setSelectedType(type);
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicensePlate(e.target.value);
  };

  const handleSubmit = () => {
    console.log("ทะเบียนรถที่กรอก:", licensePlate);
  };

  return (
    <>
      <NavBar />
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
            paddingTop: "3%",
          }}
        >
          Zone
        </h1>
      </Row>
      <Row justify="center" className="card-container" gutter={[16, 16]}>
        {selectedType === "MEMBERSHIP" && (
          <><Row gutter={[16, 16]} justify="center" wrap={true}>
            <Col xs={12} sm={6} md={4}>
              <MembershipZone />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <GeneralZone />
            </Col>
          </Row><Row gutter={[16, 16]} justify="center" wrap={true}>
              <Col xs={12} sm={6} md={4}>
                <CardID />
              </Col>
            </Row></>
        )}
        {selectedType === "STORE" && (
          <Row gutter={[16, 16]} justify="center" wrap={true}>
            <Col xs={10} sm={10} md={6}>
              <StoreZone />
            </Col>
            <Col xs={10} sm={10} md={6}>
              <GeneralZone />
            </Col>
          </Row>
        )}
        {selectedType === "GENERAL" && (
          <Row gutter={[16, 16]} justify="center" wrap={true}>
            <Col sm={12} md={6}>
              <GeneralZone />
            </Col>
          </Row>
        )}
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <input
          type="text"
          value={licensePlate}
          onChange={handleInputChange}
          placeholder=""
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

      </Row>
    </>
  );
};

export default CarParkINZone;

const CardID: React.FC = () => {
  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    console.log('onInput:', value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };

  return (
    <Flex gap="middle" align="center" justify="center" style={{ textAlign: 'center' }}>
      <div
        style={{
          fontFamily: "Dongle, sans-serif",
          fontSize: "25px",
          fontWeight: 400,
          width: "auto"
        }}
      >
        ID CARD
      </div>
      <Input.OTP length={4} {...sharedProps} />
    </Flex>
  );
};
