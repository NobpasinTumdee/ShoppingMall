import { UsersInterface } from "./UsersInterface";
export interface HallInterface {
    ID: number;               // รหัสของ Hall
    HallName: string;         // ชื่อของ Hall
    Capacity: number;         // ความจุของ Hall
    Location: string;         // สถานที่ตั้งของ Hall
    ImageHall: string;        // URL ของรูปภาพ Hall
    Description: string;      // คำอธิบายเกี่ยวกับ Hall
    PricePerHour: number;     // ราคาเช่าต่อชั่วโมงของ Hall
    HallBookings?: BookingHallInterface[]; // การจองที่เกี่ยวข้องกับ Hall
    HallFacilities?: FacilityInterface[];  // สิ่งอำนวยความสะดวกที่เกี่ยวข้องกับ Hall
}

export interface BookingHallInterface {
    ID: number;
    User?: UsersInterface;
    Hall?: HallInterface;
    StartDateTime: Date;
    EndDateTime: Date;
    Status: string;
    CustomerName: string;
    CustomerEmail: string;
    CustomerPhone: string;
    CustomerAddress: string;
    TotalCost: number;
    PaymentHall?: PaymentHallInterface[]; // การชำระเงินที่เกี่ยวข้อง
}

export interface FacilityListInterface {
    ID: number;              // รหัสรายการสิ่งอำนวยความสะดวก
    FacilityName: string;    // ชื่อรายการสิ่งอำนวยความสะดวก
    Description: string;     // รายละเอียดของรายการ
    Facilities?: FacilityInterface[]; // สิ่งอำนวยความสะดวกในรายการนี้
}

export interface FacilityInterface {
    ID: number;               // รหัสสิ่งอำนวยความสะดวก
    HallID: number;           // รหัส Hall ที่เกี่ยวข้อง
    FacilityListID: number;   // รหัสรายการสิ่งอำนวยความสะดวก
    Quantity: number;         // จำนวนสิ่งอำนวยความสะดวก
}

export interface PaymentHallInterface {
    ID: number;                // รหัสการชำระเงิน
    BookingHallID: number;     // รหัสการจองที่เกี่ยวข้อง
    Amount: number;            // จำนวนเงินที่ชำระ
    PaymentDate: Date;         // วันที่ชำระเงิน
    PaymentMethod: string;     // วิธีการชำระเงิน
    TransactionID: string;     // รหัสธุรกรรม
    IssueDate: Date;           // วันที่ออกใบเสร็จ
    TaxAmount: number;         // จำนวนภาษี
    TotalAmount: number;       // ยอดรวม
    IssuedBy: string;          // ผู้ออกใบเสร็จ
}
