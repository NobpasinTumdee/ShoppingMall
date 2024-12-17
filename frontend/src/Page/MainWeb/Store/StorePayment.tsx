import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {message} from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './StoreAndPay.css'

import { GetPaymentid , GetPaymentMethod , UpdatePaymentStatus , UpdateStoreByid , GetStoreById , GetMembershipByid , CreateBill , GetTaxById} from '../../../services/https';
import { PaymentInterface , PaymentMethodStoreInterface , StoreInterface , MembershipInterface , ReceiptInterface , TaxUserInterface} from '../../../interfaces/StoreInterface';

import PWA from '../../../assets/icon/ForPage/StorePayment/PWA.jpg'
import PEA from '../../../assets/icon/ForPage/StorePayment/PEA.jpg'
import storeicon from '../../../assets/icon/ForPage/StorePayment/storeicon.jpg'
//import Card from '../../../assets/icon/ForPage/StorePayment/CardPayment.png'
//import QRcode from '../../../assets/icon/ForPage/StorePayment/QrCode.png'

//ตรวจสอบสลิป
import Tesseract from "tesseract.js";

const StorePayment: React.FC = () => {
    const location = useLocation();
    const userIdstr = localStorage.getItem("id");
    const [Payment, setPayment] = useState<PaymentInterface | null>(null);
    const [Store, setStore] = useState<StoreInterface | null>(null);
    const [Members, setMembers] = useState<MembershipInterface | null>(null);
    const { ID } = location.state as { ID: number; };
    useEffect(() => {
        if (1) {
            fetchPayment(String(ID));
            fetchPaymentMethod();
        }
    }, [1]);
    const fetchPayment = async (ID: string ) => {//Payment
        try {
            const res = await GetPaymentid(ID);
            if (res.status === 200) {
                setPayment(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลPayment");
        }
    };
    useEffect(() => {
        if (Payment) {
            fetchStore(String(Payment?.StoreID))
        }
    }, [Payment]);
    useEffect(() => {
        if (Store) {
            fetchMember(String(Store.MembershipID))
        }
    }, [Store]);
    const fetchStore = async (ID: string ) => {//Store
        try {
            const res = await GetStoreById(ID);
            if (res.status === 200) {
                setStore(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลStore");
        }
    };
    const fetchMember = async (ID: string ) => {//Members
        try {
            const res = await GetMembershipByid(ID);
            if (res.status === 200) {
                setMembers(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลMembers");
        }
    };
    const [PaymentMethod, setPaymentMethod] = useState<PaymentMethodStoreInterface[]>([]);
    const fetchPaymentMethod = async () => {//PaymentMethod
        try {
            const res = await GetPaymentMethod();
            if (res.status === 200) {
                setPaymentMethod(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลPaymentMethod");
        }
    };
    const [selectMethod, setselectMethod] = useState(0);
    const [selectMethodName, setselectMethodName] = useState('');
    const SelectPaymentMethod = (data : PaymentMethodStoreInterface) => {
        setselectMethod(Number(data.ID));
        setselectMethodName(String(data.MethodName));
    };
    //========================================total price============================================
    const [Total, setTotal] = useState(0);

    useEffect(() => {
        const Pwa = Number(Payment?.PayStorePwa || 0);
        const Pea = Number(Payment?.PayStorePea || 0);
        const RentalFee = Number(Payment?.PayStoreRental || 0);
        setTotal(Pwa + Pea + RentalFee);
    }, [Payment]);
    //==================================Gmail============================
    const gmail = {
        to: Payment?.User?.Email,
        subject: 'Payment successful (' + Payment?.PayStoreName + ') 🎉',
        message: 
`เรียน ลูกค้าผู้มีอุปการคุณ,

ทางบริษัท ICONIC ขอขอบพระคุณที่ท่านได้ให้ความไว้วางใจและเลือกใช้บริการล็อคขายสินค้ากับเรา เรารู้สึกยินดีเป็นอย่างยิ่งที่ได้มีโอกาสต้อนรับท่านเป็นส่วนหนึ่งของครอบครัว ICONIC
การจองล็อคขายสินค้าของท่านได้รับการดำเนินการสำเร็จเรียบร้อยแล้ว ทางเราขอแจ้งให้ทราบว่า ท่านสามารถใช้พื้นที่ที่ท่านจองได้ตามรายละเอียดที่ท่านได้รับในเอกสารยืนยันการจอง
หากท่านมีคำถามเพิ่มเติม หรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับการใช้งานพื้นที่ ท่านสามารถติดต่อทีมงานของเราที่หมายเลข [044-265-9861] หรืออีเมล [shoppingmallse13@gmail.com] เรามีความยินดีที่จะช่วยเหลือและให้คำปรึกษาท่านในทุกขั้นตอน
อีกทั้งทาง ICONIC มุ่งมั่นที่จะสนับสนุนและสร้างสรรค์สภาพแวดล้อมที่เอื้อต่อความสำเร็จของธุรกิจของท่าน เราพร้อมที่จะร่วมเดินทางไปกับท่านเพื่อให้การดำเนินธุรกิจของท่านเต็มไปด้วยความราบรื่นและประสบความสำเร็จ
ขอแสดงความนับถือ,  
ทีมงาน ICONIC

Dear Valued Customer,

On behalf of ICONIC, we would like to extend our heartfelt gratitude for choosing our services and reserving a sales space with us. We are delighted to welcome you as a part of the ICONIC family.
Your booking has been successfully completed. We are pleased to inform you , as detailed in the confirmation documents provided.
If you have any further questions or require additional assistance regarding your space, please do not hesitate to contact our team at [044-265-9861] or via email at [shoppingmallse13@gmail.com]. We are more than happy to assist and guide you every step of the way.
At ICONIC, we are committed to supporting your business endeavors by fostering an environment conducive to success. We look forward to walking alongside you on your journey to achieve seamless operations and outstanding growth.

Sincerely,
[Sender's Name]
ICONIC Team
        `
    };
    
    
    const handleSubmitGmail = async () => {
    try {
        const response = await axios.post('http://localhost:8000/send-email', gmail);
        console.info(response);
    } catch (error) {
        console.error(error);
    }
    };


    //================================= set date ========================
    const Booking = new Date(); // กำหนดเป็นวันที่ปัจจุบัน
    const Last = new Date(Booking); // คัดลอกค่า BookingDate
    Last.setDate(Last.getDate() + Number(Members?.Day)); // เพิ่ม วันให้กับ LastDay
    //=========================================paynow================================================
    const paid = async (Data: any) => {
        const values = {
            ...Data , PayMethodStoreID: selectMethod  ,StatusPaymentStore: "paid" 
        };
        const valuesBill: ReceiptInterface = { 
            DateReceipt: Booking , DescribtionBill: String(Store?.NameStore) , PaymentStoreID: Payment?.ID , UserTaxID: TaxHld
        };
        try {
            const res = await UpdatePaymentStatus(String(ID),values);
            if (res.status === 200) {
                message.open({
                    type: "success",
                    content: res.data.message,
                });
                updateStore(Store);
                setTimeout(() => {
                    //navigate("/Store"); // นำทางกลับไปที่หน้า Store
                }, 2000);
            } else {
                message.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            message.open({
                type: "error",
                content: "การชำระเงินไม่สำเร็จ",
            });
        }
        try {
            const res = await CreateBill(valuesBill);
            if (res.status === 201) {
                message.open({
                    type: "success",
                    content: res.data.message,
                });
                await handleSubmitGmail(); //Gmail
                setTimeout(() => {
                    if (Payment) {
                        GotoBillPageClick(Payment);
                    } else {
                        message.error("Payment ไม่สามารถเป็น null ได้");
                    }
                }, 200);
            } else {
                message.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            message.open({
                type: "error",
                content: "สร้างใบเสร็จไม่สำเร็จ",
            });
        }
    };
    //=========================================updateStore================================================
    const updateStore = async (approval: any) => {
        const values = { ...approval, StatusStore: 'This store is already taken.' , BookingDate:Booking , LastDay:Last };
        try {
            const res = await UpdateStoreByid(String(Payment?.StoreID), values);
            if (res.status === 200) {
                message.open({
                    type: "success",
                    content: 'Payment Success!',
                });
            } else {
                message.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            message.open({
                type: "error",
                content: "การอัพเดทไม่สำเร็จ",
            });
        }
    };
    //======================================================bill==================================================
    const navigate = useNavigate();
    const GotoBillPageClick = (Payment: PaymentInterface) => {

        navigate('/BillStore', { 
            state: { 
                ID: Payment.ID,
            } 
        });
    };
    //==========================================================tax==================================================
    const [checked, setChecked] = useState(false);
    const [Tax, setTax] = useState<TaxUserInterface | null>(null);
    const [TaxHld, setTaxHld] = useState(0);
    useEffect(() => {
        if (userIdstr) {
            fetchTax(userIdstr);
        }
    }, [userIdstr]);
    const fetchTax = async (ID: string ) => {//Payment
        try {
            const res = await GetTaxById(ID);
            if (res.status === 200) {
                setTax(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลTax");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        if (checked == true) {
            setTaxHld(0);
        }else if (checked == false){
            setTaxHld(Number(Tax?.ID));
        }
    };
    //==================================================ตรวจสอบสลิป=========================================================
    const [selectedFile, setSelectedFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState("");
  
    const handleFileChange = (e : any) => {
      setSelectedFile(e.target.files[0]);
      setExtractedText(""); // Reset extracted text
    };
  
    const handleUpload = async () => {
      if (!selectedFile) {
        alert("กรุณาเลือกไฟล์สลิป!");
        return;
      }
  
      setProcessing(true);
      try {
        const result = await Tesseract.recognize(selectedFile, "tha", {
          logger: (info) => console.log(info),
        });
        setExtractedText(result.data.text);
        // setpaysuccessful(true)
      } catch (error) {
        console.error("Error during OCR processing:", error);
        alert("เกิดข้อผิดพลาดในการตรวจสอบสลิป");
      } finally {
        setProcessing(false);
      }
    };

    const [isPopup, setPopup] = useState(false);
    const [paysuccessful, setpaysuccessful] = useState(false);
    const OpenPopup = () => {
        setPopup(true);
    };
    const ClosePopup = () => {
        setPopup(false);
    };
    const successful = () => {
        setpaysuccessful(true);
        setPopup(false);
    };

    return(
        <>
            {/* ตรวจสอบสลิป */}
            {isPopup && (
                <>
                    <div className='extractedText'>
                        <div style={{ padding: "20px" }}>
                            <h1>Thai bank slip check system</h1>
                            <div style={{ marginBottom: "20px" }}>
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <button onClick={handleUpload} disabled={processing}>
                                {processing ? "Processing..." : "Upload and review"}
                            </button>
                            {extractedText ? (
                                <div style={{ margin: "20px 0" }}>
                                <h2>result:</h2>
                                <pre>{extractedText}</pre>
                                <div  style={{backgroundColor: "#C9AF62" , width: '70px' ,padding: '5px',color: '#fff' ,cursor:"pointer" , textAlign: 'center'}} onClick={successful}>Confirm</div>
                                </div>
                            ) : (
                                <div>No information</div>
                            )}
                        </div>
                    </div>
                    <div className='backgroundextractedText' onClick={ClosePopup}></div>
                </>
            )}

            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Inbox">Inbox /</a>
                {Payment?.Store?.NameStore}
            </div>
            {/* <div>{Payment?.ID}{Payment?.PayMethodStoreID}{Payment?.StatusPaymentStore}</div> */}
            <div className='PaymentContanerBox'>
                <div className='listPay'>
                    <h1>Total amount to be paid  "{Payment?.PayStoreName}"</h1>
                    <div className='PaymentContanerBoxSub'>
                        <div>Section</div>
                        <div>Price</div>
                    </div>
                    <hr />
                    <div className='PWA'>
                        <img src={PWA} alt="PWA" />
                        <div style={{marginLeft: '20px'}}>
                            <p style={{fontWeight: '900'}}>Provincial Waterworks Authority #{Payment?.PayStorePackage}</p>
                            <p>Booking Date : {String(Payment?.PayStoreBook)}</p>
                            <p>Last Day : {String(Payment?.PayStoreLast)}</p>
                        </div>
                        <div style={{marginLeft: '20%',fontWeight: '900' ,display: 'flex',alignItems: 'center'}}>{Payment?.PayStorePwa} Bath</div>
                    </div>

                    <div className='PWA'>
                        <img src={PEA} alt="PEA" />
                        <div style={{marginLeft: '20px'}}>
                            <p style={{fontWeight: '900'}}>Provincial ELECTRICITY Authority #{Payment?.PayStorePackage}</p>
                            <p>Booking Date : {String(Payment?.PayStoreBook)}</p>
                            <p>Last Day : {String(Payment?.PayStoreLast)}</p>
                        </div>
                        <div style={{marginLeft: '18%',fontWeight: '900' ,display: 'flex',alignItems: 'center'}}>{Payment?.PayStorePea} Bath</div>
                    </div>

                    <div className='PWA'>
                        <img src={storeicon} alt="storeicon" />
                        <div style={{marginLeft: '20px'}}>
                            <p style={{fontWeight: '900'}}>Rental Fee #{Payment?.PayStorePackage}</p>
                            <p>Booking Date : {String(Payment?.PayStoreBook)}</p>
                            <p>Last Day : {String(Payment?.PayStoreLast)}</p>
                        </div>
                        <div style={{marginLeft: '20%',fontWeight: '900' ,display: 'flex',alignItems: 'center'}}>{Payment?.PayStoreRental} Bath</div>
                    </div>
                    <hr />
                    <div className='total'><p></p><p>Total : {Total} Bath <hr /></p></div>
                </div>
                <div className='listPayR'>
                    <div className='listPayRSub'>
                        <h2>Payment Info</h2>
                        <p>Payment options</p>
                        {PaymentMethod.map((data) => (
                            <div className='PaymentPaymentMethod' key={data.ID} onClick={() => SelectPaymentMethod(data)}><img src={data.MethodPic} alt="" />{data.MethodName}</div>
                        ))}
                        <p>Your Selection : {selectMethodName} </p>
                        <hr />
                        <div>
                        <label>
                            <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleChange}
                            />
                            Receive a tax invoice
                        </label>
                        </div>
                        {Payment?.StatusPaymentStore !== 'paid' && 
                            <>
                                <div className={`QRCODE ${selectMethod ? 'Method' : 'NoMethod'}`}>
                                    <div className='QRCODESub1'>Promptpay</div>
                                    <img src={`https://promptpay.io/0616918493.png/${Total}`} width={200} />
                                    <div className='QRCODESub2'></div>
                                </div>
                                <div className={`AttachSlip ${selectMethod ? 'Method' : 'NoMethod'}`} onClick={OpenPopup}>Attach payment slip</div>
                                <div className={`PayNow ${paysuccessful ? 'Method' : 'NoMethod'}`} onClick={() => paid(Payment)}>Pay Now!</div>
                            </>
                        }
                        {Payment?.StatusPaymentStore === 'paid' && 
                            <div className='PayNow' style={{backgroundColor: '#0d9e00', opacity: "1"}} onClick={() => GotoBillPageClick(Payment)} >Paid Get bill</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );

};

export default StorePayment;