import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { message } from "antd";
import { GetUserById } from './services/https';
import { UsersInterface } from './interfaces/UsersInterface';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        // Redirect ไปที่หน้า login ถ้าไม่ได้เข้าสู่ระบบ
        message.info("Please login.");
        return <Navigate to="/" />;
    }
    // Render children ถ้าเข้าสู่ระบบแล้ว
    return <>{children}</>;
};


export const ProtectedRouteAdmin: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
    const userId = localStorage.getItem("id");
    const [userWatch, setUserWatch] = useState<UsersInterface | null>(null);
    const [isLoading, setIsLoading] = useState(true); // ใช้เพื่อตรวจสอบสถานะการโหลดข้อมูล

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const resWatch = await GetUserById(String(userId));
            if (resWatch.status === 200) {
                setUserWatch(resWatch.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูล User");
        } finally {
            setIsLoading(false); // ตั้งสถานะการโหลดเสร็จ
        }
    };

    // แสดง Loading ระหว่างดึงข้อมูล
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // ตรวจสอบสิทธิ์
    if (isAuthenticated && userWatch?.Status === 'Admin') {
        return <>{children}</>;
    } else {
        message.info("Admin only.");
        return <Navigate to="/Main" />;
    }
};

