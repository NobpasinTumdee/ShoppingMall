import React, { useEffect, useState } from "react";
import { message } from "antd";
import {
  PaymentHallInterface,
  BookingHallInterface,
  
} from "../../../../interfaces/HallInterface";
import {
  PaymentMethodStoreInterface,
  
} from "../../../../interfaces/StoreInterface";
import {
  CreatePaymentHall,
  GetBookingByID,
  GetBookingWithTotalPrice,
  GetPaymentMethod,
  UpdateStatusHall,
  // CreateInvoice,
  
} from "../../../../services/https/index";
import { useParams, useNavigate } from "react-router-dom";
import "./PaymentHall.css";

const PaymentHall: React.FC = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingHallInterface>();
  // const [payment, setPayment] = useState<PaymentHallInterface>();
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [method, setMethod] = useState<PaymentMethodStoreInterface[]>([]);
  const [selectMethod, setSelectMethod] = useState<number | null>(null);
  const [receiptBase64, setReceiptBase64] = useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  // const [haveTax, setHaveTax] = useState<number>(0);
  // const [taxUser, setTaxUser] = useState<TaxUserInterface | null>(null);
  // const [taxIconic, setTaxIconic] = useState<TaxUserInterface | null>(null);

  // const userId = localStorage.getItem("id");
// //==================================================ตรวจสอบสลิป=========================================================
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [processing, setProcessing] = useState(false);
//     const [extractedText, setExtractedText] = useState("");
//     const [Evidence, setEvidence] = useState("");

//     const handleFileChange = async (e: any) => {
//         setSelectedFile(e.target.files[0]);
//         const file = e.target.files?.[0];
//         const base64String = await getImageURL(file);
//         setEvidence(base64String)
//         setExtractedText(""); // Reset extracted text
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             alert("กรุณาเลือกไฟล์สลิป!");
//             return;
//         }

//         setProcessing(true);
//         try {
//             const result = await Tesseract.recognize(selectedFile, "tha", {
//                 logger: (info) => console.log(info),
//             });
//             setExtractedText(result.data.text);
//             // setpaysuccessful(true)
//         } catch (error) {
//             console.error("Error during OCR processing:", error);
//             alert("เกิดข้อผิดพลาดในการตรวจสอบสลิป");
//         } finally {
//             setProcessing(false);
//         }
//     };

//     const getImageURL = async (file?: File): Promise<string> => {
//         if (!file) return '';
//         return new Promise((resolve) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result as string);
//         });
//     };


//     const [isPopup, setPopup] = useState(false);
//     const [paysuccessful, setpaysuccessful] = useState(false);
//     const OpenPopup = () => {
//         setPopup(true);
//     };
//     const ClosePopup = () => {
//         setPopup(false);
//     };
//     const successful = () => {
//         setpaysuccessful(true);
//         setPopup(false);
//     };
//   useEffect(() => {
//     if (userId) {
//       fetchTax(userId);
//     }
//   }, [userId]);

//   const fetchTax = async (userId: string) => {
//     try {
//       const res = await GetTaxById(userId);
//       const iconicRes = await GetTaxById("1");
//       if (res.status === 200) {
//         setTaxUser(res.data);
//         setHaveTax(1); // แสดงว่ามีข้อมูล Tax User
//       }
//       if (iconicRes.status === 200) {
//         setTaxIconic(iconicRes.data);
//       }
//     } catch (error) {
//       console.error("เกิดข้อผิดพลาดในการดึงข้อมูล Tax:", error);
//     }
//   };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (id) {
          const bookingRes = await GetBookingByID(id);
          setBooking(bookingRes.data);

          const totalPriceRes = await GetBookingWithTotalPrice(id);
          if (totalPriceRes.status === 200) {
            setTotalPrice(totalPriceRes.data.totalPrice);
          }
        }
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      }
    };

    const fetchMethod = async () => {
      try {
        const methodRes = await GetPaymentMethod();
        if (methodRes.status === 200) {
          setMethod(methodRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch payment methods:", error);
      }
    };

    fetchBookings();
    fetchMethod();
  }, [id]);

  const SelectPaymentMethod = (data: PaymentMethodStoreInterface) => {
    setSelectMethod(data.ID || null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const approve = async (approval: BookingHallInterface) => {
    if (!selectMethod) {
      messageApi.open({
        type: "error",
        content: "กรุณาเลือกวิธีการชำระเงิน",
      });
      return;
    }

    if (!receiptBase64) {
      messageApi.open({
        type: "error",
        content: "กรุณาอัปโหลดสลิปการชำระเงิน",
      });
      return;
    }

    const Pdate = new Date().toISOString();
    const valuesPaymentHall: PaymentHallInterface = {
      BookingHallID: approval.ID,
      PaymentDate: Pdate,
      TotalAmount: totalPrice || 0,
      ReceiptImageURL: receiptBase64,
      StatusPaymentHallID: 1,
      PayMethodStoreID: selectMethod,
    };

    try {
      const paymentResponse = await CreatePaymentHall(valuesPaymentHall);
      if (paymentResponse.status === 201) {
        messageApi.open({
          type: "success",
          content: "การชำระเงินสำเร็จ!",
        });

        // const invoiceData: TaxInvoiceInterface = {
        //   UserTaxID: taxIconic?.ID || 0,
        //   PaymentHallID: paymentResponse?.ID,
        //   IssueDate: Pdate,
        //   TaxAmount: totalPrice || 0,
        // };

        // try {
        //   const invoiceResponse = await CreateInvoice(invoiceData);
        //   if (invoiceResponse.status === 201) {
        //     messageApi.open({
        //       type: "success",
        //       content: "สร้างใบกำกับภาษีสำเร็จ!",
        //     });
        //   }
        // } catch (error) {
        //   console.error("Failed to create invoice:", error);
        //   messageApi.open({
        //     type: "error",
        //     content: "ไม่สามารถสร้างใบกำกับภาษีได้",
        //   });
        // }

        const valuebook: BookingHallInterface = {
          ID: approval.ID,
          Status: true,
        };

        try {
          const statusResponse = await UpdateStatusHall(String(valuebook.ID), valuebook);
          if (statusResponse.status === 200) {
            messageApi.open({
              type: "success",
              content: "สถานะยืนยันแล้ว",
            });
            navigate(`/Hall`);
          }
        } catch (error) {
          console.error("Failed to update status:", error);
          messageApi.open({
            type: "error",
            content: "ไม่สามารถอัปเดตสถานะได้",
          });
        }
      }
    } catch (error) {
      console.error("Failed to create payment:", error);
      messageApi.open({
        type: "error",
        content: "ไม่สามารถสร้างข้อมูลการชำระเงินได้",
      });
    }
  };

  return (
    <div className="payment-hall-container">
      {contextHolder}
      <h2 className="payment-hall-title">รายละเอียดการชำระเงิน</h2>
      {booking && (
        <div className="payment-hall-content">
          <h3 className="payment-hall-customer">ชื่อผู้จอง: {booking.CustomerName}</h3>
          <h4 className="payment-hall-total">
            ยอดรวม: {totalPrice ? `${totalPrice} บาท` : "กำลังโหลด..."}
          </h4>
          <div className="payment-hall-methods">
            <h4 className="payment-hall-method-title">เลือกวิธีการชำระเงิน:</h4>
            {method.map((m) => (
              <button
                key={m.ID}
                onClick={() => SelectPaymentMethod(m)}
                className={`payment-hall-method ${selectMethod === m.ID ? "selected" : ""}`}
              >
                {m.MethodName}
              </button>
            ))}
          </div>
          <div className="payment-hall-upload">
            <h4 className="payment-hall-upload-title">อัปโหลดสลิปการชำระเงิน:</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="payment-hall-file-input"
            />
          </div>
          <button onClick={() => approve(booking)} className="payment-hall-confirm-button">
            ยืนยันการชำระเงิน
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentHall;
