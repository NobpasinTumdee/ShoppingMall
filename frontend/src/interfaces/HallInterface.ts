import { UsersInterface } from "./UsersInterface";

export interface HallInterface {
    ID?: number;               // รหัสของ Hall
    HallName?: string;         // ชื่อของ Hall
    Capacity?: number;         // ความจุของ Hall
    Location?: string;         // สถานที่ตั้งของ Hall
    ImageHall?: string;        // URL ของรูปภาพ Hall
    Description?: string;      // คำอธิบายเกี่ยวกับ Hall
    PricePerHour?: number;     // ราคาเช่าต่อชั่วโมงของ Hall
}

export interface BookingHallInterface {
    
    ID?: number;
    User?: UsersInterface;
    HallID?: number;
    Hall?: HallInterface;
    StartDateTime?: string;
    EndDateTime?: string;
    StatusPaymentHallID?: string;
    CustomerName?: string;
    CustomerEmail?: string;
    CustomerPhone?: string;
    CustomerAddress?: string;
    FacilitiesID?:    number;
    QuantityF?: number;
}

export interface FacilityInterface {
    ID?: number;               // รหัสสิ่งอำนวยความสะดวก
    FacilitiesName?: string;   // รหัสรายการสิ่งอำนวยความสะดวก
}

export interface PaymentHallInterface { 
    ID?: number;                 // รหัสการชำระเงิน
    BookingHallID?: number;      // รหัสการจองที่เกี่ยวข้อง
    BookingHall?: BookingHallInterface; // ข้อมูลการจองที่เกี่ยวข้อง
    Amount?: number;             // จำนวนเงินที่ชำระ
    PaymentDate?: Date;          // วันที่ชำระเงิน
    PaymentMethod?: string;      // วิธีการชำระเงิน
    IssueDate?: Date;            // วันที่ออกใบเสร็จ
    TaxAmount?: number;          // จำนวนภาษี
    TotalAmount?: number;        // ยอดรวม
    IssuedBy?: string;           // ผู้ออกใบเสร็จ
    StatusPaymentHallID?: number; // รหัสสถานะการชำระเงิน (ชำระเงินแล้ว / ยังไม่ชำระเงิน)
    StatusPayment?: string;      // สถานะการชำระเงิน ("ชำระเงินแล้ว", "ยังไม่ชำระเงิน")
    Taxinvoice?: TaxinvoiceInterface[]; // รายการใบกำกับภาษีที่เกี่ยวข้อง
}


export interface TaxinvoiceInterface {
    ID?: number;                  // รหัสใบกำกับภาษี
    UserTaxID?: number;           // รหัสผู้เสียภาษี
    PaymentHallID?: number;       // รหัสการชำระเงินที่เกี่ยวข้อง
    InvoiceNumber?: string;       // หมายเลขใบกำกับภาษี
    IssueDate?: Date;             // วันที่ออกใบกำกับภาษี
    TotalAmount?: number;         // ยอดรวม
    TaxAmount?: number;           // จำนวนภาษี
}

export interface StatusPaymentHallInterface {
    ID?: number;               // รหัสสถานะการชำระเงิน
    StatusName?: string;       // ชื่อสถานะ (เช่น "ยังไม่ชำระเงิน", "ชำระเงินแล้ว")
}