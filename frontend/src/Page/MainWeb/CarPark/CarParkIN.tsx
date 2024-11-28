import { Link } from "react-router-dom";
import { Card } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "../../Component/NavBar";
import "./../Store/StoreAndPay.css";
import "./CarPark.css";

const CarParkIn: React.FC = () => {
  const [cardTypes, setCardTypes] = useState<string[]>([]); // ประเภทการ์ด
  const [selectedType, setSelectedType] = useState<string>(""); // การ์ดที่เลือก
  const [zones, setZones] = useState<any[]>([]); // โซนที่ดึงมาจาก API

  // ดึงประเภทการ์ดตอนโหลดหน้า
  useEffect(() => {
    const fetchCardTypes = async () => {
      try {
        const response = await axios.get("/cards/types");
        setCardTypes(response.data);
      } catch (error) {
        console.error("Error fetching card types:", error);
      }
    };

    fetchCardTypes();
  }, []);

  
  return (
    <>
      <NavBar />
      <div style={{ height: "110px" }}></div>
      <div className="route">
        <a href="/Main">Home /</a> Parking IN
      </div>

      <Card style={{ paddingLeft: "10%", paddingRight: "10%" }}>
        <div className="header-title">Car Parking</div>
        {/* <div className="sub-title">Specify customer type</div> */}
        <div className="card-container">
          {/* Card สำหรับ MEMBERSHIP */}
          <Card hoverable bordered={false} className="card-item card-general">
            <Link to="/CarParking-In-Zone?type=MEMBERSHIP">
              <img
                src="/src/assets/CarPark/card_black.png"
                alt="PicStore"
                style={{ width: "100%" }}
              />
              <div className="text-select-card">MEMBERSHIP</div>
            </Link>
          </Card>
          <Card hoverable bordered={false} className="card-item card-general">
            <Link to="/CarParking-In-Zone?type=STORE">
              <img
                src="/src/assets/CarPark/card_gold.png"
                alt="PicStore"
                style={{ width: "100%" }}
              />
              <div className="text-select-card">STORE</div>
            </Link>
          </Card>
          <Card hoverable bordered={false} className="card-item card-general">
            <Link to="/CarParking-In-Zone?type=GENERAL">
              <img
                src="/src/assets/CarPark/user.png"
                alt="PicStore"
                style={{ width: "100%" }}
              />
              <div className="text-select-card">GENERAL</div>
            </Link>
          </Card>
        </div>
      </Card>
    </>
  );
};

export default CarParkIn;
