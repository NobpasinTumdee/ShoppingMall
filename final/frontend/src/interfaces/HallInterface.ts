// HallInterface.ts
import { PaymentMethodStoreInterface, TaxUserInterface } from "./StoreInterface";
import { UsersInterface } from "./UsersInterface";

export interface HallInterface {
    ID?: number;                   // รหัสของ Hall
    HallName?: string;             // ชื่อของ Hall
    Capacity?: number;             // ความจุของ Hall
    Location?: string;             // สถานที่ตั้งของ Hall
    ImageHall?: string;            // URL ของรูปภาพ Hall
    Description?: string;          // คำอธิบายเกี่ยวกับ Hall
    PricePerHour?: number;         // ราคาเช่าต่อชั่วโมงของ Hall
}

export interface BookingHallInterface {
    ID?: number;

    User?: UsersInterface;         // ข้อมูลผู้จอง
    UserID?: number;               // รหัสผู้จอง

    Hall?: HallInterface;          // ข้อมูลของ Hall
    HallID?: number;               // รหัส Hall
              
    Facilities?: FacilityInterface  // ข้อมูลสิ่งอำนวยความสะดวก
    FacilitiesID?: number;         // รหัสของสิ่งอำนวยความสะดวก

    StartDateTime?: string;        // วันที่เริ่มต้นการจอง
    EndDateTime?: string;          // วันที่สิ้นสุดการจอง
    Status?: boolean;
    CustomerName?: string;         // ชื่อลูกค้า
    CustomerEmail?: string;        // อีเมลลูกค้า
    CustomerPhone?: string;        // เบอร์โทรศัพท์ลูกค้า
    CustomerAddress?: string;      // ที่อยู่ลูกค้า
    
    QuantityF?: number;            // จำนวนสิ่งอำนวยความสะดวก
    
}

export interface FacilityInterface {
    ID?: number;                   // รหัสสิ่งอำนวยความสะดวก
    FacilitiesName?: string;       // ชื่อสิ่งอำนวยความสะดวก
    Price?: number;                // ราคาของสิ่งอำนวยความสะดวก
}

export interface PaymentHallInterface {
    ID?: number;                    // รหัสการชำระเงิน

    BookingHall?: BookingHallInterface;
    BookingHallID?: number;         // รหัสการจองห้องที่เกี่ยวข้อง

    PaymentDate?: string;           // วันที่ชำระเงิน (รูปแบบ ISO string)
    TotalAmount?: number;           // จำนวนเงินทั้งหมดที่ต้องชำระ
    
    StatusPaymentHall?: StatusPaymentHallInterface;
    StatusPaymentHallID?: number;                   // รหัสสถานะการชำระเงิน

    PayMethodStore?: PaymentMethodStoreInterface;
    PayMethodStoreID?: number;      // รหัสสถานที่ชำระเงิน (ถ้ามี)
    
    ReceiptImageURL?: string;       // URL ของรูปภาพใบเสร็จ
}

export interface StatusPaymentHallInterface {
    ID?: number;                   // รหัสสถานะการชำระเงิน
    StatusName?: string;           // ชื่อสถานะการชำระเงิน
}

export interface TaxInvoiceInterface {
    ID?: number;                   // รหัสใบกำกับภาษี

    UserTax?: TaxUserInterface
    UserTaxID?: number;            // รหัสผู้ใช้ที่เกี่ยวข้องกับใบกำกับภาษี

    PaymentHall?: PaymentHallInterface
    PaymentHallID?: number;        // รหัสการชำระเงินที่เกี่ยวข้อง
    
    IssueDate?: string;            // วันที่ออกใบกำกับภาษี
    
    TaxAmount?: number;            // จำนวนภาษีที่ต้องชำระ
}
