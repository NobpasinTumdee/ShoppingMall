import React, { useState } from 'react';
import { NavBar } from '../../../../Page/Component/NavBar';
import { useLocation } from 'react-router-dom';
import './SubStore.css'
import {UpdateStoreByid , BackUpStore} from '../../../../services/https/index';
import { StoreInterface , BackupStoreInterface} from '../../../../interfaces/StoreInterface';


import { message,Upload} from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const BookStore: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as FileType);
            reader.onload = () => resolve(reader.result as string);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const userIdstr = localStorage.getItem("id");
    const location = useLocation();
    const {
        ID,
        //PicStore,
        //SubPicOne,
        //SubPicTwo,
        //SubPicThree,
        //MembershipID,
        NameStore,
        BookingDate,
        LastDay,
        //DescribtionStore,
        //StatusStore,
        //UserID,
        ProductTypeID
    } = location.state as {
        ID: number;
        PicStore: string;
        SubPicOne: string;
        SubPicTwo: string;
        SubPicThree: string;
        MembershipID: number;
        NameStore: string;
        BookingDate: Date;
        LastDay: Date;
        DescribtionStore: string;
        StatusStore: string;
        UserID: number;
        ProductTypeID: number;
    };
    const bookingDateObj = new Date(BookingDate);
    const lastDayObj = new Date(LastDay);

    const formattedBookingDate = bookingDateObj.toLocaleDateString();
    const formattedLastDay = lastDayObj.toLocaleDateString();

    const [isPopup, setPopup] = useState(false);
    const closepopup = () => {
        setPopup(false)
        setPopup1(true)
    };
    const [Package, setPackage] = useState(0);
    const savePackage = async (newMembershipID: number) => {
        setPackage(newMembershipID);
        setTimeout(() => {
            setPopup(true)
        }, 100);
    };
    const [isPopup1, setPopup1] = useState(false);
    const closepopup1 = () => {
        setPopup1(false)
    };
    const UpdateAndBackup = async (formData: any) => {
        UpdateStoreByidd(formData);
        BackupStoreF(formData);
    };
    const [messageApi, contextHolder] = message.useMessage();
    //================================= update ==========================
    const UpdateStoreByidd = async (formData: any) => {
        const values: StoreInterface = {
            ID,
            PicStore: String(formData.picStore),
            SubPicOne: String(formData.subPicOne),
            SubPicTwo: String(formData.subPicTwo),
            SubPicThree: String(formData.subPicThree),
            MembershipID: Package,
            NameStore: formData.nameStore,
            BookingDate,
            LastDay,
            DescribtionStore: formData.description,
            StatusStore: 'WaitingForApproval',
            UserID: Number(userIdstr),
            ProductTypeID
        };
        try {
            const res = await UpdateStoreByid(String(ID), values);
            if (res.status === 200) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                });
                setTimeout(() => {
                    //navigate("/Store"); // นำทางกลับไปที่หน้า Store
                }, 2000);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "การอัพเดทไม่สำเร็จ",
            });
        }
    };
    //============================== backup ============================
    const BackupStoreF = async (formData: any) => {
        const values: BackupStoreInterface = {
            PicStoreBackup: String(formData.picStore),
            PicOneBackup: String(formData.subPicOne),
            PicTwoBackup: String(formData.subPicTwo),
            PicThreeBackup: String(formData.subPicThree),
            MembershipBackup: Package, 
            NameBackup: formData.nameStore,
            BookingBackup: BookingDate,
            LastDayBackup: LastDay,
            DescribtionStoreB: formData.nameStore,
            UserIDB: Number(userIdstr),
            ProductTypeIDB: ProductTypeID,
            StoreID:ID,
        };
        try {
            const res = await BackUpStore(values);
            if (res.status === 201) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                });
                setTimeout(() => {
                    //navigate("/Store"); // นำทางกลับไปที่หน้า Store
                }, 2000);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "การอัพเดทไม่สำเร็จ",
            });
        }
    };
    //========================================all input============================
    const [formData, setFormData] = useState({
        nameStore: '',
        picStore: '',
        subPicOne: '',     // ภาพย่อยที่ 1
        subPicTwo: '',     // ภาพย่อยที่ 2
        subPicThree: '',   // ภาพย่อยที่ 3
        description: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: any) => {
        const { name, files } = e.target;

        // เก็บไฟล์แต่ละไฟล์แยกกัน
        if (files.length > 0) {
            setFormData({ ...formData, [name]: files[0] }); 
        }
    };
    

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.picStore = String(fileList[0]?.thumbUrl || '');
        formData.subPicOne = String(fileList[1]?.thumbUrl || '');
        formData.subPicTwo = String(fileList[2]?.thumbUrl || '');
        formData.subPicThree = String(fileList[3]?.thumbUrl || '');
        console.log('Form data submitted:', formData);
        UpdateAndBackup(formData);
    };

    

    return (
        <>
            {contextHolder}
            {isPopup && 
                <>
                    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.315)',width: '100%',height:'100%',position: 'fixed',zIndex: '1005'}}></div>
                    <div className='Conditions '>
                        <h2>Terms and Conditions for Retail Space Rental in the Mall</h2>
                        <p> 1. Purpose of Rental <br />
                                - The retail space rental is intended solely for the purpose of selling goods or services.<br />
                                - The tenant agrees to use the rented space accordingly and shall not engage in any illegal activities or activities that may disrupt public order.<br />
                            2. Rental Payment and Security Deposit<br />  
                                - The tenant must pay the rental fee as specified in the contract and by the agreed-upon schedule.<br />  
                                - A security deposit will be held as collateral for any potential damages to the mall's property. The deposit will be returned at the end of the lease term if no damages are incurred. <br />

                            3. Rental Term  <br />
                                The rental period and start date are specified in the main agreement. If the tenant wishes to renew the lease, they must notify the mall management within the designated time frame.<br />

                            4. Maintenance of Rental Space <br />
                                - The tenant is responsible for maintaining the cleanliness and orderliness of the rental space throughout the lease term.  <br />
                                - The tenant will be liable for any damages to the rental space resulting from their usage.<br />

                            5. Usage Restrictions  <br />
                                - Alterations or modifications to the rental space are prohibited without prior consent.  <br />
                                - Activities that create excessive noise or disturbances to other tenants and mall customers are not permitted.  <br />
                                - The sale of illegal or unethical products or services is strictly prohibited.<br />

                            6. Repair and Maintenance  <br />
                                The mall management is responsible for the maintenance of common areas and repairs arising from normal wear and tear. The tenant must immediately notify the management if repairs are required.<br />

                            7. Liability for Damages and Safety  <br />
                                - The tenant is responsible for any damages caused by their own actions, including damages to third parties. <br /> 
                                - The mall will not be held liable for any damages arising from the tenant's activities or sale of goods and services.<br />

                            8. Termination of Lease  <br />
                                - If the tenant wishes to terminate the lease before the end of the rental term, they must provide advance notice as specified in the contract.  <br />
                                - The mall management reserves the right to terminate the lease immediately if the tenant violates any of the terms and conditions or engages in illegal activities.<br />

                            9. Acceptance of Terms and Conditions  <br />
                                The tenant agrees to accept and adhere to all terms and conditions outlined in this agreement, which serves as a legal contract between the tenant and the mall management.<br />
                                In the event of any disputes or uncertainties, both parties agree to seek mediation or negotiation before pursuing legal action.<br /></p>
                    <div className='Accept' onClick={closepopup}>Accept all terms</div>
                    </div>
                </>
            }

            {isPopup1 && <>
            <div onClick={closepopup1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.315)', width: '100%', height: '100%', position: 'fixed', zIndex: '1005' }}></div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px' }}>
            <div className="BookinfoPopup">
                <h2>Book a store</h2>
                    <div className="insideinfopopup">
                            <div className="left-section">
                                <label htmlFor="nameStore">Name Store</label>
                                <input
                                    type="text"
                                    id="nameStore"
                                    name="nameStore"
                                    value={formData.nameStore}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="picStore">Preview Store</label>
                                <Upload fileList={fileList} onChange={onChange} onPreview={onPreview} beforeUpload={(file) => { setFileList([...fileList, file]); return false;}} 
                                    maxCount={4} multiple={false} listType="picture-card" >
                                    <div><PlusOutlined /><div style={{ marginTop: 8 }}>อัพโหลด</div></div>
                                </Upload>
                                
                            </div>
                            <div className="right-section">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={10}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                    </div>
                    <div className='submitbtn'>
                        <div></div>
                        <button type="submit">Confirm</button>
                    </div>
            </div>
            </form>
            </>}





            <NavBar />
            <div style={{ height: '110px' }}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Store">Store Directory /</a>
                {NameStore}
            </div>

            <h1 className='H1'>Book A Sales Stall</h1>
            <div className='Package'>
                <span className='Packagespan' ><div>Week</div><p>7 Days</p><p>- PWA 350 Bath</p><p>- PEA  700 Bath</p><p>- Rent  150/day Bath</p><div className='PromotionBtn'onClick={() => savePackage(1)}>Use this promotion</div></span>
                <span className='Packagespan' ><div>Mount</div><p>30 Days</p><p>- PWA 1500 Bath</p><p>- PEA  3000 Bath</p><p>- Rent  120/day Bath</p><div className='PromotionBtn'onClick={() => savePackage(2)}>Use this promotion</div></span>
                <span className='Packagespan' ><div>Year</div><p>365 Days</p><p>- PWA 18,250 Bath</p><p>- PEA  35,600 Bath</p><p>- Rent  100/day Bath</p><div className='PromotionBtn'onClick={() => savePackage(3)}>Use this promotion</div></span>
            </div>
            
        </>

    );

};

export default BookStore;