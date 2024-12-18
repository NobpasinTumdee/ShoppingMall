import { UsersInterface } from "./UsersInterface";
export interface HallInterface {
    ID: number;               // รหัสของ Hall
    HallName: string;         // ชื่อของ Hall
    Capacity: number;         // ความจุของ Hall
    Location: string;         // สถานที่ตั้งของ Hall
    ImageHall: string;        // URL ของรูปภาพ Hall
    Description: string;      // คำอธิบายเกี่ยวกับ Hall
    PricePerHour: number;     // ราคาเช่าต่อชั่วโมงของ Hall
}
export interface BookingHallInterface {
    ID: number;
    User?: UsersInterface;
    Hall?: HallInterface;
    StartDateTime: Date;
    EndDateTime: Date;
    Status: string;
    CustomerName: string;
    CustomerEmail: string
    CustomerPhone:  string;
    CustomerAddress: string;
    CancelDate: Date;
    TotalCost: number;
}