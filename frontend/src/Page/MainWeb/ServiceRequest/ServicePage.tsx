import React, { useState } from "react";
import "./ServicePage.css";

const ServiceRequest: React.FC = () => {
  // State สำหรับจัดการข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    date: "",
    user: "",
    location: "",
    problem: "",
    status: "",
  });

  // ฟังก์ชัน handle การเปลี่ยนแปลงค่าใน input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // ฟังก์ชัน handle การ submit ฟอร์ม
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="service-form-container">
      <h1 className="service-form-title">ฟอร์มแจ้งซ่อม</h1>
      <form onSubmit={handleSubmit}>
        <div className="service-form-group">
          <label htmlFor="date">วันที่แจ้ง</label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div className="service-form-group">
          <label htmlFor="user">ผู้ใช้</label>
          <input
            type="text"
            id="user"
            placeholder="Enter user name"
            value={formData.user}
            onChange={handleChange}
          />
        </div>
        <div className="service-form-group">
          <label htmlFor="location">สถานที่</label>
          <input
            type="text"
            id="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="service-form-group">
          <label htmlFor="problem">รายละเอียดปัญหา</label>
          <textarea
            id="problem"
            placeholder="Describe the problem"
            value={formData.problem}
            onChange={handleChange}
          />
        </div>
        <div className="service-form-group">
          <label htmlFor="status">สถานะ</label>
          <input
            type="text"
            id="status"
            placeholder="Enter status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>
        <button type="submit">ส่ง</button>
      </form>
      <div className="footer"></div>
    </div>
  );
};

export default ServiceRequest;
