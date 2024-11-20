export interface HallInterface {
    ID: number;               // รหัสของ Hall
    hallName: string;         // ชื่อของ Hall
    capacity: number;         // ความจุของ Hall
    location: string;         // สถานที่ตั้งของ Hall
    isAvailable: boolean;     // สถานะการใช้งาน Hall (พร้อมใช้งานหรือไม่)
    imageHall: string;        // URL ของรูปภาพ Hall
    description: string;      // คำอธิบายเกี่ยวกับ Hall
    pricePerHour: number;     // ราคาเช่าต่อชั่วโมงของ Hall
}
