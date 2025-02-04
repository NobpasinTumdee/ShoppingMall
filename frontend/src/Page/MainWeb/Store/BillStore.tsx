import React, { useEffect, useState, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { GetBillByPayidPreload , GetTaxById} from '../../../services/https';
import { ReceiptInterface , TaxUserInterface} from '../../../interfaces/StoreInterface';
import {message} from 'antd'
import { useNavigate } from 'react-router-dom';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import Logo from '../../../assets/icon/LOGOS.png';
const BillStore: React.FC = () => {
    const location = useLocation();
    const { ID } = location.state as { ID: number; };
    const [Bill, setBill] = useState<ReceiptInterface | null>(null);
    useEffect(() => {
        if (1) {
            fetchBill(String(ID));
        }
    }, [1]);
    const fetchBill = async (ID: string ) => {//Payment
        try {
            const res = await GetBillByPayidPreload(ID);
            if (res.status === 200) {
                setBill(res.data);
                sethaveTax(res.data.UserTaxID)
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลPayment");
        }
    };
    const navigate = useNavigate();
    const Return = () => {
        navigate('/Inbox');
    };
    //=======================================total=========================================
    const [Total, setTotal] = useState(0);

    useEffect(() => {
        const Pwa = Number(Bill?.PaymentStore?.PayStorePwa || 0);
        const Pea = Number(Bill?.PaymentStore?.PayStorePea || 0);
        const RentalFee = Number(Bill?.PaymentStore?.PayStoreRental || 0);
        setTotal(Pwa + Pea + RentalFee);
    }, [Bill]);


    //=======================================tax=============================================
    const [haveTax, sethaveTax] = useState(0);
    const [Tax, setTax] = useState<TaxUserInterface | null>(null);
    const userIdstr = localStorage.getItem("id");
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
    //======================================PDF==============================================
    const receiptRef = useRef<HTMLDivElement>(null);

    // ฟังก์ชันสำหรับดาวน์โหลด PDF
    const downloadPDF = async () => {
        if (receiptRef.current) {
        try {
            const canvas = await html2canvas(receiptRef.current, {
            scale: 3,
            useCORS: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a5');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
            pdf.save('Receipt/Tax invoice.pdf');
        } catch (error) {
            message.error('ไม่สามารถดาวน์โหลด PDF ได้: ' + error);
        }
        } else {
        message.error('ไม่พบใบเสร็จที่ต้องการดาวน์โหลด');
        }
    };
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>  
            <div className='RE'><h1>Slip</h1></div>
            
            {Bill ? (
                <div className='Slip'>
                    <div ref={receiptRef}>
                    <h1>Receipt / Tax invoice</h1>
                    <img src={Logo} alt="" />
                    <div className='Adress'>
                        <p className='P1'>FROM</p>
                        <div style={{display: 'flex',justifyContent: 'space-between'}}>
                            <p style={{fontSize: '13px'}}>
                                111, University Road, Suranaree <br />
                                Subdistrict, Mueang Nakhon Ratchasima<br />
                                District, Nakhon Ratchasima 30000<br />
                            </p>
                            <p style={{marginRight: '20px',fontSize: '13px'}}>Receipt Date : {Bill.DateReceipt ? new Date(Bill.DateReceipt).toLocaleDateString() : 'No Date'}</p>
                        </div>
                    </div>
                    <div className='Adress2'>
                        <p className='P1'>BILL TO</p>
                        <div style={{display: 'flex',justifyContent: 'space-between'}}>
                            <p style={{fontSize: '13px' , width: '250px'}}>
                                {Tax?.Residencee}
                            </p>
                            <p style={{marginRight: '20px',fontSize: '13px'}}>User Name : {Bill.PaymentStore?.User?.UserName} <br /> FullName : {Bill.PaymentStore?.User?.FirstName} {Bill.PaymentStore?.User?.LastName} <br />Tel : {Bill.PaymentStore?.User?.Tel}</p>
                        </div>
                    </div>
                    <div className='listpayment1'>
                        <hr />
                        <div style={{display: 'flex',justifyContent: 'space-between',textAlign: 'left'}}>
                            <p>DESCRIPTION</p>
                            <p>PACKAGE</p>
                            <p>AMOUNT</p>
                        </div>
                        <hr />
                        <div className='Sublist'>
                            <div style={{display: 'flex',justifyContent: 'space-between',textAlign: 'left'}}><p style={{width:"70px"}}>PWA</p><p>{Bill.PaymentStore?.PayStorePackage}</p><p>{Bill.PaymentStore?.PayStorePwa} Bath</p></div>
                            <div style={{display: 'flex',justifyContent: 'space-between',textAlign: 'left'}}><p style={{width:"70px"}}>PEA</p><p>{Bill.PaymentStore?.PayStorePackage}</p><p>{Bill.PaymentStore?.PayStorePea} Bath</p></div>
                            <div style={{display: 'flex',justifyContent: 'space-between',textAlign: 'left'}}><p style={{width:"70px"}}>Rental Fee</p><p>{Bill.PaymentStore?.PayStorePackage}</p><p>{Bill.PaymentStore?.PayStoreRental} Bath</p></div>
                        </div>
                        <hr />
                    </div>
                    <div className='PaymentMethod'>
                        <p></p>
                        <p>PaymentMethod : {Bill.PaymentStore?.PaymentMethodStore?.MethodName || "Bro I have No your Payment Method WTF."}</p>
                    </div>
                    <div className='TotalAll'>
                        <p></p>
                        <p>Total : {Total}฿</p>
                    </div>
                    <div className='bottoninfo'>
                        ICONIC <br />
                        If you want to issue a tax invoice Please fill out your tax information before choosing to request a tax invoice.
                    </div>
                    </div>
                </div>
            ) : (
                <div className='Slip'>กำลังโหลดข้อมูล...</div>
            )}
            {haveTax !== 0 && 
                <div className='Print' onClick={downloadPDF}>Print tax invoice</div>
            }
            <div className='backtopayment' onClick={() => Return()}>◀ Return to Inbox</div>
        </>
    );
};
export default BillStore;




