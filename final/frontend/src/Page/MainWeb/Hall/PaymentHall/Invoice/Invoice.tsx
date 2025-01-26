// import React, { useEffect, useRef, useState } from "react";
// import LOGO from "../../../../../assets/icon/LOGO.png";
// import {
//     GetInvoice,
//     GetBookingWithTotalPrice,
// } from "../../../../../services/https/index";
// import { TaxInvoiceInterface } from "../../../../../interfaces/HallInterface";

// import { useParams } from "react-router-dom";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { Button, message } from "antd";
// const Taxinvoice: React.FC = () => {
//     const { id } = useParams();
//     const [ invoice, setInvoice] = useState<TaxInvoiceInterface | null>(null);
//     const [ totalPrice, setTotalPrice] = useState<number | null>(null);
    
//     useEffect(() =>{
//         fetchInvoice(String(id))
//     })
//     const fetchInvoice = async (id: string) => {
//         try {
//             const res = await GetInvoice(id);
//             if (res.status == 200){
//                 setInvoice(res.data);
//             }
//         }   catch (error) {
//                 console.log("Generate Fail: ",error);
//         }
//     const res = await GetBookingWithTotalPrice(id);
//         if (res.status === 200) {
//             setTotalPrice(res.data.totalPrice);
//         }
//     }
    
//     //======================================PDF==============================================
//     const receiptRef = useRef<HTMLDivElement>(null);

//     // ฟังก์ชันสำหรับดาวน์โหลด PDF
//     const downloadPDF = async () => {
//         if (receiptRef.current) {
//         try {
//             const canvas = await html2canvas(receiptRef.current, {
//             scale: 3,
//             useCORS: true,
//             });

//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('p', 'mm', 'a5');
//             const pdfWidth = pdf.internal.pageSize.getWidth();
//             const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//             pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
//             pdf.save('Receipt/Tax invoice.pdf');
//         } catch (error) {
//             message.error('ไม่สามารถดาวน์โหลด PDF ได้: ' + error);
//         }
//         } else {
//         message.error('ไม่พบใบเสร็จที่ต้องการดาวน์โหลด');
//         }
//     };
//     return (
//         <div>
//             {/* ส่วนแสดงใบกำกับภาษี */}
//             <div ref={receiptRef} style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", margin: "20px auto", maxWidth: "600px", background: "#fff" }}>
//                 <div style={{ textAlign: "center", marginBottom: "20px" }}>
//                     <img src={LOGO} alt="LOGO" style={{ width: "100px" }} />
//                     <h2>ใบเสร็จรับเงิน / ใบกำกับภาษี</h2>
//                 </div>
//                 <div>
//                     {/* <p><strong>วันที่ออก:</strong> {invoice?.DateReceipt || "N/A"}</p> */}
//                     <p><strong>ชื่อผู้ใช้:</strong> {invoice?.UserTaxID || "N/A"}</p>
//                     <p><strong>ที่อยู่:</strong> {invoice?.UserTaxID || "N/A"}</p>
//                     <p><strong>เลขประจำตัวผู้เสียภาษี:</strong> {invoice?.UserTaxID || "N/A"}</p>
//                 </div>
//                 <hr />
//                 <div>
//                     {/* <p><strong>รายละเอียดการจอง:</strong></p>
//                     <p>{invoice?.PaymentHallID || "N/A"}</p> */}
//                     <p><strong>ราคารวมทั้งหมด:</strong> {totalPrice ? `${totalPrice.toLocaleString()} บาท` : "N/A"}</p>
//                 </div>
//             </div>

//             {/* ปุ่มดาวน์โหลด PDF */}
//             <div style={{ textAlign: "center", marginTop: "20px" }}>
//                 <Button type="primary" onClick={downloadPDF}>
//                     ดาวน์โหลด PDF
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default Taxinvoice;