import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Image, message , Modal, notification, Select} from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './StoreAndPay.css'

import { GetPaymentid, GetPaymentMethod, UpdatePaymentStatus, UpdateStoreByid, GetStoreById, GetMembershipByid, CreateBill, GetTaxById, AddMessage, ListAdditionalPackage, CreateAdditionalPay, GetAdditionalPayByID, GetTotalPricePackageByPayID, DeleteAdditional, GetFilterPackage } from '../../../services/https';
import { PaymentInterface, PaymentMethodStoreInterface, StoreInterface, MembershipInterface, ReceiptInterface, TaxUserInterface, AdditionalPackageInterface, AdditionalPayInterface } from '../../../interfaces/StoreInterface';

import PWA from '../../../assets/icon/ForPage/StorePayment/PWA.jpg'
import PEA from '../../../assets/icon/ForPage/StorePayment/PEA.jpg'
import storeicon from '../../../assets/icon/ForPage/StorePayment/storeicon.jpg'
import PaymentSucc from '../../../assets/icon/ForPage/StorePayment/PaymentSucc.gif'
//import Card from '../../../assets/icon/ForPage/StorePayment/CardPayment.png'
//import QRcode from '../../../assets/icon/ForPage/StorePayment/QrCode.png'

//ตรวจสอบสลิป
import Tesseract from "tesseract.js";
import { MessageBoardInterface } from '../../../interfaces/UsersInterface';

const StorePayment: React.FC = () => {
    const location = useLocation();
    const userIdstr = localStorage.getItem("id");
    const [Payment, setPayment] = useState<PaymentInterface | null>(null);
    const [Store, setStore] = useState<StoreInterface | null>(null);
    const [Members, setMembers] = useState<MembershipInterface | null>(null);
    const { ID } = location.state as { ID: number; };
    const [api, contextHolder] = notification.useNotification();
    useEffect(() => {
        if (1) {
            fetchPayment(String(ID));
            fetchPaymentMethod();
            fetchPackageData(String(ID));
            fetchSelectPackage();
            fetchTotalprice();
        }
    }, [1]);
    const fetchPayment = async (ID: string) => {//Payment
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
    const fetchStore = async (ID: string) => {//Store
        try {
            const res = await GetStoreById(ID);
            if (res.status === 200) {
                setStore(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลStore");
        }
    };
    const fetchMember = async (ID: string) => {//Members
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
    const SelectPaymentMethod = (data: PaymentMethodStoreInterface) => {
        setselectMethod(Number(data.ID));
        setselectMethodName(String(data.MethodName));
    };
    //========================================total price============================================
    const [Total, setTotal] = useState(0);
    const [TotalPackage, setTotalPackage] = useState(0);

    useEffect(() => {
        const Pwa = Number(Payment?.PayStorePwa || 0);
        const Pea = Number(Payment?.PayStorePea || 0);
        const RentalFee = Number(Payment?.PayStoreRental || 0);
        setTotal(Pwa + Pea + RentalFee + TotalPackage);
    }, [Payment,TotalPackage]);
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
            const response = await axios.post('https://localhost:8000/send-email', gmail);
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
    const paid = async () => {
        if (selectMethodName == 'Mastercard') {
            const values: PaymentInterface = {
                PayMethodStoreID: selectMethod ,Evidence: formCard.Alldata ,StatusPaymentStoreID: 2
            };
            try {
                const res = await UpdatePaymentStatus(String(ID), values);
                if (res.status === 200) {
                    Cbill();
                    message.success(res.data.message);
                    updateStore();
                    SetPopupsuccessful();
                } else {message.error(res.data.message);}
            } catch (error) {
                message.error("payment error.");
            }
        }else if (selectMethodName == 'Promptpay') {
            const values: PaymentInterface = {
                PayMethodStoreID: selectMethod ,Evidence: Evidence ,StatusPaymentStoreID: 2
            };
            try {
                const res = await UpdatePaymentStatus(String(ID), values);
                if (res.status === 200) {
                    Cbill();
                    message.success(res.data.message);
                    updateStore();
                    SetPopupsuccessful();
                } else {message.error(res.data.message);}
            } catch (error) {
                message.error("payment error.");
            }
        }
    };
    //=========================================create bill================================================
    const Cbill = async () => {
        const valuesBill: ReceiptInterface = {
            DateReceipt: Booking, DescribtionBill: String(Store?.NameStore), PaymentStoreID: Payment?.ID, UserTaxID: TaxHld,Additional: TotalPackage ,TotalPrice: Total
        };
        const valuesMessage: MessageBoardInterface = { 
            PicNews: 'https://cdn-icons-png.flaticon.com/512/4272/4272841.png',
            TextHeader: 'Payment successful '+ " -" +Payment?.Store?.NameStore+ "-" , 
            DescribtionNews: 'Payment is complete, now your shop space is yours.',
            UserID: Payment?.UserID
        };
        try {
            const res = await CreateBill(valuesBill);
            if (res.status === 201) {
                console.log(res.data.message);
                await handleSubmitGmail(); //Gmail
                const resMessage = await AddMessage(valuesMessage);
                if (resMessage.status === 201) {message.info("Send Message Success!");}
                setTimeout(() => {
                    if (Payment) {
                        GotoBillPageClick(Payment);
                    } else { message.error("Payment ไม่สามารถเป็น null ได้"); }
                }, 200);
            } else {
                message.error(res.data.error);
            }
        } catch (error) {
            message.error("Can't Crate The Bill.");
        }
    }
    //=========================================updateStore================================================
    const updateStore = async () => {
        const values: StoreInterface = { BookingDate: Booking, LastDay: Last ,StatusStoreID: 4 };
        try {
            const res = await UpdateStoreByid(String(Payment?.StoreID), values);
            if (res.status === 200) {
                console.log("Payment Success!");
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
    const fetchTax = async (ID: string) => {//Payment
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
        } else if (checked == false) {
            setTaxHld(Number(Tax?.ID));
        }
    };
    //==================================================ตรวจสอบสลิป=========================================================
    const [selectedFile, setSelectedFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [extractedText, setExtractedText] = useState("");
    const [Evidence, setEvidence] = useState("");

    const handleFileChange = async (e: any) => {
        setSelectedFile(e.target.files[0]);
        const file = e.target.files?.[0];
        const base64String = await getImageURL(file);
        setEvidence(base64String)
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

    const getImageURL = async (file?: File): Promise<string> => {
        if (!file) return '';
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
        });
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

    //==============================UI payment successful========================
    const [issuccessful, setsuccessful] = useState(false);
    const SetPopupsuccessful = () => {
        setsuccessful(true);
        setTimeout(() => {
            setsuccessful(false);
        },5000)
    };
    //==============================form Mastercard==================================
    // const [Mastercard, setMastercard] = useState(true);
    const [formCard, setFormCard] = useState({
        Card_number: '',
        Card_name: '',
        Expiry_date: '',
        Card_security_code: '',
        Alldata: '',
    });
    const handleMastercard = (e: any) => {
        const { name, value } = e.target;
        setFormCard({ ...formCard, [name]: value });
    };
    const handleSubmitEdit = async (e: any) => {
        e.preventDefault();
        formCard.Alldata = 'Card Number : ' + formCard.Card_number + '\nCard Name : ' + formCard.Card_name + '\nExpiry : ' + formCard.Expiry_date + '\nCVV : ' + formCard.Card_security_code
        // message.success(formCard.Card_number);
        // message.success(formCard.Card_name);
        // message.success(formCard.Expiry_date);
        // message.success(formCard.Card_security_code);
        //message.success(formCard.Alldata);
        api.open({
            message: 'Your Mastercard.',
            description: formCard.Alldata,
            showProgress: true,
          });
    };

    //========================================AdditionalPackage===========================================
    const [AdditionalPackage, setAdditionalPackage] = useState<AdditionalPackageInterface[]>([]);
    const [AllPackage, setAllPackage] = useState<AdditionalPackageInterface[]>([]);
    const [PaymentSelectPackage, setPaymentSelectPackage] = useState<AdditionalPayInterface[]>([]);
    const fetchPackageData = async (PaymentID: string) => {
        try {
            const res = await GetFilterPackage(PaymentID);
            if (res.status === 200 ) {
                setAdditionalPackage(res.data);
            } else {
                setAdditionalPackage([]);
            }
            const packageall = await ListAdditionalPackage();
            if (packageall.status === 200 ) {
                setAllPackage(packageall.data);
            } else {
                setAllPackage([]);
            }
        } catch (error) {
            setAdditionalPackage([]);
        }
    };
    const fetchSelectPackage = async () => {
        try {
            const res = await GetAdditionalPayByID(String(ID));
            if (res.status === 200 ) {
                setPaymentSelectPackage(res.data);
            } else {
                setPaymentSelectPackage([]);
            }
        } catch (error) {
            setPaymentSelectPackage([]);
        }
    };
    const fetchTotalprice = async () => {
        try{
            const price = await GetTotalPricePackageByPayID(String(ID));
            if (price.status === 200 ) {
                setTotalPackage(price.data.total_price);
            } else {
                setTotalPackage(0);
            }
        }catch (error){

        }
    };




    //selector
    const [PackageSelect, setselectPackage] = useState(0);
    const selectPackage = (value: string) => {
        setselectPackage(Number(value))
        console.log(`Package selected ${value}`);
    };
    const onSearchPackage = (value: string) => {
        console.log('Package search:', value);
    };
    //add package
    const handleAddpackage = async (e: any) => {
        e.preventDefault();
        if (PackageSelect != 0) {
            CreateAdditional(Number(Payment?.ID),PackageSelect)
        }else{
            message.info("Select a Package!");
        }
    }




    //=============================create package====================================
    const CreateAdditional = async (paymentid: number,packageid: number) => {
        const valuesPackage: AdditionalPayInterface = {
            AdditionalPackageID: packageid,
            PaymentStoreID: paymentid,
        }
        try {
            const res = await CreateAdditionalPay(valuesPackage);
            if (res.status === 201) {
                await fetchSelectPackage();
                await fetchTotalprice();
                await fetchPackageData(String(ID));
                setselectPackage(0);
                message.success("add Package Success!");
            } else {
                message.error("can't add a package this time!");
            }
        } catch (error) {
            message.error("add Package error!");
        }
    }
    //=============================delete package====================================
    const Deletepackage = async (packageID: number) => {
        try {
            const Delete = await DeleteAdditional(String(packageID));
            if (Delete.status === 200) {
                await fetchSelectPackage();
                await fetchTotalprice();
                await fetchPackageData(String(ID));
                message.success("Deleted package!");
            }
        } catch (error) {
            message.error("can't remove this package!");
        }
    }
    //=============================popup all package================================
    const [open, setOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
        setLoading(false);
        }, 500);
    };

    return (
        <>
            {contextHolder}
            {/* ตรวจสอบสลิป */}
            {isPopup && (
                <>
                    <div className='extractedText'>
                        <div style={{ padding: "20px" }}>
                            <h1>Thai bank slip check system</h1>
                            <div style={{ marginBottom: "20px" }}>
                                <input id='Slip' type="file" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <button onClick={handleUpload} disabled={processing} className='ButtonSlip'>
                                {processing ? "Processing..." : "Upload and review"}
                            </button>
                            {extractedText ? (
                                <div style={{ margin: "20px 0" }}>
                                    <h2>result:</h2>
                                    <div className='resultpayment'>
                                        <pre>{extractedText}</pre>
                                        <img src={Evidence} alt="" width={200} />
                                    </div>
                                    <div style={{ backgroundColor: "#C9AF62", width: '70px', padding: '5px', color: '#fff', cursor: "pointer", textAlign: 'center', borderRadius:'20px',margin:'20px 0'}} onClick={successful}>Confirm</div>
                                </div>
                            ) : (
                                <div style={{margin:'20px 5px'}}>No information</div>
                            )}
                        </div>
                    </div>
                    <div className='backgroundextractedText' onClick={ClosePopup}></div>
                </>
            )}
            {/* payment successful UI */}
            {issuccessful &&
                <>
                    <div className='succ'>
                        <img src={PaymentSucc} width={150} />
                        <p>Payment Successful</p>
                    </div>
                </>
            }

            <div style={{ height: '110px', zIndex: '0' }}></div>
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
                    <div className='boxAdditional'>
                        <div className='PWA'>
                            <Image src={PWA} alt="PWA" height={120} width={120} />
                            <div style={{ marginLeft: '20px' , width: '320px'}}>
                                <p style={{ fontWeight: '900' }}>Provincial Waterworks Authority #{Payment?.PayStorePackage}</p>
                                <p>Booking Date : {String((Payment?.PayStoreBook ? new Date(Payment?.PayStoreBook).toLocaleDateString() : "No Date Available" ))} : {String((Payment?.PayStoreBook ? new Date(Payment?.PayStoreBook).toLocaleTimeString() : "" ))}</p>
                                <p>Last Day : {String((Payment?.PayStoreLast ? new Date(Payment?.PayStoreLast).toLocaleDateString() : "No Date Available" ))} : {String((Payment?.PayStoreLast ? new Date(Payment?.PayStoreLast).toLocaleTimeString() : "" ))}</p>
                            </div>
                            <div style={{ marginLeft: '150px', fontWeight: '900', display: 'flex', alignItems: 'center' }}>{Payment?.PayStorePwa} Bath</div>
                        </div>

                        <div className='PWA'>
                            <Image src={PEA} alt="PEA" height={120} width={120} />
                            <div style={{ marginLeft: '20px' , width: '320px' }}>
                                <p style={{ fontWeight: '900' }}>Provincial ELECTRICITY Authority #{Payment?.PayStorePackage}</p>
                                <p>Booking Date : {String((Payment?.PayStoreBook ? new Date(Payment?.PayStoreBook).toLocaleDateString() : "No Date Available" ))} : {String((Payment?.PayStoreBook ? new Date(Payment?.PayStoreBook).toLocaleTimeString() : "" ))}</p>
                                <p>Last Day : {String((Payment?.PayStoreLast ? new Date(Payment?.PayStoreLast).toLocaleDateString() : "No Date Available" ))} : {String((Payment?.PayStoreLast ? new Date(Payment?.PayStoreLast).toLocaleTimeString() : "" ))}</p>
                            </div>
                            <div style={{ marginLeft: '150px', fontWeight: '900', display: 'flex', alignItems: 'center' }}>{Payment?.PayStorePea} Bath</div>
                        </div>

                        <div className='PWA'>
                            <Image src={storeicon} alt="storeicon" height={120} width={120} />
                            <div style={{ marginLeft: '20px' , width: '320px'}}>
                                <p style={{ fontWeight: '900' }}>Rental Fee #{Payment?.PayStorePackage}</p>
                                <p>Booking Date : {String((Payment?.PayStoreBook ? new Date(Payment?.PayStoreBook).toLocaleDateString() : "No Date Available" ))} : {String((Payment?.PayStoreBook ? new Date(Payment?.PayStoreBook).toLocaleTimeString() : "" ))}</p>
                                <p>Last Day : {String((Payment?.PayStoreLast ? new Date(Payment?.PayStoreLast).toLocaleDateString() : "No Date Available" ))} : {String((Payment?.PayStoreLast ? new Date(Payment?.PayStoreLast).toLocaleTimeString() : "" ))}</p>
                            </div>
                            <div style={{ marginLeft: '150px', fontWeight: '900', display: 'flex', alignItems: 'center' }}>{Payment?.PayStoreRental} Bath</div>
                        </div>
                        

                        {PaymentSelectPackage.length > 0 ? (
                            PaymentSelectPackage.map((data,index) => (
                                <>
                                    <div className='PWA' key={index}>
                                        <Image src={data.AdditionalPackage?.AdditionalPicture || storeicon} alt="storeicon" height={120} width={120} />
                                        <div style={{ marginLeft: '20px' , width: '320px'}}>
                                            <p style={{ fontWeight: '900' }}>{data.AdditionalPackage?.AdditionalName}</p>
                                            <p style={{ maxHeight:'65px', overflowY:'scroll', margin:'0'}}>{data.AdditionalPackage?.DescribtionPackage}</p>
                                        </div>
                                        <div style={{ marginLeft: '150px', fontWeight: '900', display: 'flex', alignItems: 'center' }}>{data.AdditionalPackage?.PricePackage} Bath</div>
                                    </div>
                                    {(selectMethodName == '' && Payment?.StatusPaymentStoreID == 1) &&
                                        <p className='Deletepackage' onClick={() => Deletepackage(Number(data.ID))}>DELETE</p>
                                    }
                                </>
                        ))) : (
                            <>
                                <p>No package available.</p>
                            </>
                        )}
                    </div>
                    <div className='total'>
                        <p>
                            {(selectMethodName == '' && AdditionalPackage.length != 0 && Payment?.StatusPaymentStoreID == 1) ? (
                                <form onSubmit={handleAddpackage}>
                                    <Select
                                        showSearch
                                        style={{width:'60%'}}
                                        placeholder="Select a Additional Package"
                                        optionFilterProp="label"
                                        onChange={selectPackage}
                                        onSearch={onSearchPackage}
                                        options={AdditionalPackage.map((data) => ({
                                            value: data.ID?.toString() || "",
                                            label: data.AdditionalName || "Unknown Package",
                                            }))}
                                    />
                                    <button className='addpackageButton'>add package</button>
                                </form>
                            ) : (
                                <>
                                    <button className='addpackageButton' onClick={showLoading}>
                                        Package
                                    </button>
                                    <Modal
                                        title={<p style={{fontSize:'24px',fontWeight:'700'}}>Additional Package</p>}
                                        footer={
                                        <button className='addpackageButton' onClick={() => setOpen(false)}>
                                            Close
                                        </button>
                                        }
                                        loading={loading}
                                        open={open}
                                        onCancel={() => setOpen(false)}
                                        width={600}
                                    >
                                        {AllPackage.length > 0 ? (
                                            AllPackage.map((data,index) => (
                                                <div key={index} style={{display:'flex',margin:'10px 0'}}>
                                                    <Image src={data.AdditionalPicture} width={80} height={80} style={{boxShadow:'0 0 5px #22222234',width:'80px'}} />
                                                    <div style={{padding:'0 10px'}}>
                                                        <p style={{margin:'0',fontWeight:'600'}}>Package : {data.AdditionalName} Price : {data.PricePackage} Bath</p>
                                                        <p style={{margin:'0',fontWeight:'100',height:'60px',overflowY:'scroll'}}>{data.DescribtionPackage}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No data!</div>
                                        )}
                                    </Modal>
                                </>
                            )}
                        </p>
                        <p style={{borderBottom:'1px solid #0000004e'}}>Total : {Total.toLocaleString()} Bath</p>
                    </div>
                    {Payment?.StatusPaymentStoreID === 2 &&
                        <div className='Completed'>Payment completed</div>
                    }
                    {/* <pre>{formCard.Alldata}</pre> */}
                </div>
                <div className='listPayR'>
                    <div className='listPayRSub'>
                        <h2>Payment Info</h2>
                        <p>Payment options</p>
                        {PaymentMethod.map((data) => (
                            <div className='PaymentPaymentMethod' key={data.ID} onClick={() => SelectPaymentMethod(data)}><img src={data.MethodPic} alt="" />{data.MethodName}</div>
                        ))}
                        {selectMethodName && <p>Your Selection : {selectMethodName} </p>}
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
                        {Payment?.StatusPaymentStoreID === 1 &&
                            <>
                                {selectMethodName == 'Mastercard' && 
                                    <div style={{margin: '10px'}}>
                                        <div style={{textAlign:'right'}}><img  width={100} src="https://www.2010megastore.com/wp-content/uploads/2017/03/transparent-logo-visa.png" alt="visa Mastercard" /></div>
                                        <form onSubmit={handleSubmitEdit}>
                                            <div className='Mastercardinput'>
                                                <div style={{margin:'0 5% 0 0'}} className='Minput'>
                                                    <p style={{margin:'0 10px 10px', fontWeight:'500',color:'#000'}}>Card Number</p>
                                                    <input
                                                        type="text"
                                                        id="Card_number"
                                                        name="Card_number"
                                                        value={formCard.Card_number}
                                                        onChange={handleMastercard}
                                                        pattern="\d{16}"
                                                        placeholder="Enter 16-digit card number"
                                                        title="Please enter a valid 16-digit card number."
                                                        required
                                                    />
                                                </div>
                                                <div className='Minput'>
                                                    <p style={{margin:'0 10px 10px', fontWeight:'500',color:'#000'}}>Card Holder</p>
                                                    <input
                                                        type="text"
                                                        id="Card_name"
                                                        name="Card_name"
                                                        value={formCard.Card_name}
                                                        onChange={handleMastercard}
                                                        placeholder="Enter name on card"
                                                        pattern="[A-Za-z\s]+"
                                                        title="Please enter a valid card name."
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className='Mastercardinput'>
                                                <div style={{margin:'0 5% 0 0'}} className='Minput'>
                                                    <p style={{margin:'10px 10px 5px', fontWeight:'500',color:'#000'}}>Expiry Date</p>
                                                    <input
                                                        type="text"
                                                        id="Expiry_date"
                                                        name="Expiry_date"
                                                        value={formCard.Expiry_date}
                                                        onChange={handleMastercard}
                                                        pattern="(0[1-9]|1[0-2])\/\d{2}"
                                                        placeholder="MM/YY"
                                                        title="Please enter a valid expiry date in MM/YY format."
                                                        required
                                                    />
                                                </div>
                                                <div className='Minput'>
                                                    <p style={{margin:'10px 10px 5px', fontWeight:'500',color:'#000'}}>CVV</p>
                                                    <input
                                                        type="Password"
                                                        id="Card_security_code"
                                                        name="Card_security_code"
                                                        value={formCard.Card_security_code}
                                                        onChange={handleMastercard}
                                                        pattern="\d{3,4}"
                                                        placeholder="Enter 3-4 digit code"
                                                        title="Please enter a valid 3-4 digit security code."
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <button className='SubmitCard' onClick={successful} >Submit</button>
                                        </form>
                                    </div>
                                }
                                {selectMethodName == 'Promptpay' && 
                                    <div className={`QRCODE ${selectMethod ? 'Method' : 'NoMethod'}`}>
                                        <div className='QRCODESub1'>Promptpay</div>
                                        <Image src={`https://promptpay.io/0616918493.png/${Total}`|| "https://img.freepik.com/premium-vector/broken-credit-card-debt-bankruptcy-failed-money-transaction-vector-stock-illustration_100456-11684.jpg"} width={150} />
                                        <div className='QRCODESub2'></div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                    <div style={{margin: '10px 0'}}>
                        {Payment?.StatusPaymentStoreID === 1 &&
                            <>
                                {selectMethodName == 'Promptpay' && 
                                    <div className={`AttachSlip ${selectMethod ? 'Method' : 'NoMethod'}`} onClick={OpenPopup}>Attach payment slip</div>
                                }
                                <div className={`PayNow ${paysuccessful ? 'Method' : 'NoMethod'}`} onClick={() => paid()}>Pay Now!</div>
                            </>
                        }
                        {Payment?.StatusPaymentStoreID === 2 &&
                            <div className='PayNow' style={{ backgroundColor: '#0d9e00', opacity: "1" }} onClick={() => GotoBillPageClick(Payment)} >Paid Get bill</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );

};

export default StorePayment;