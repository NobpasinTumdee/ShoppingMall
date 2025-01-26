import React, { useEffect, useState } from 'react';
//import { NavBar } from '../../../../Page/Component/NavBar';
import { useLocation, useNavigate } from 'react-router-dom';
import './SubStore.css'
import {UpdateStoreByid , BackUpStore , UserStoreByid , AddMessage, GetMembership} from '../../../../services/https/index';
import { StoreInterface , BackupStoreInterface, MembershipInterface} from '../../../../interfaces/StoreInterface';
import { InfoUserStoreInterface } from '../../../../interfaces/StoreInterface';
import { MessageBoardInterface } from '../../../../interfaces/UsersInterface';

import Store3 from '../../../../assets/icon/ForPage/Store/Store3.jpg';
import { message,Upload} from "antd";
import type {  UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const BookStore: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src && file.originFileObj) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as File);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    

    const location = useLocation();
    const {
        ID,
        NameStore,
        ProductTypeID
    } = location.state as {
        ID: number;
        NameStore: string;
        ProductTypeID: number;
    };
    //=================================select store================================
    const userIdstr = localStorage.getItem("id");
    const [isSelectStore, setSelectStore] = useState(false);
    const closeSelectStore = () => {
        setSelectStore(false)
    };
    useEffect(() => {
        if (userIdstr) {
            fetchUserStoreData(userIdstr);
            fetchMembership();
        }
    }, [userIdstr]);
    //=====================listStore===========================
    const [Storeu, setStoree] = useState<InfoUserStoreInterface[]>([]);
    const fetchUserStoreData = async (userIdstr: string ) => {
        try {
            const res = await UserStoreByid(userIdstr);
            if (res.status === 200) {
                setStoree(res.data);
                console.log(res.data); 

            }else {
                setStoree([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
                message.error("There is no Store on this floor.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Debug
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };
    const BookingDate = new Date(); // กำหนดเป็นวันที่ปัจจุบัน
    const LastDate = new Date(BookingDate); // คัดลอกค่า BookingDate
    LastDate.setDate(LastDate.getDate() + 10); // เพิ่ม วันให้กับ LastDate 10 สำหรับรออนุมัติ

    const SelectUserStore = async (SelectStore: InfoUserStoreInterface) => {
        const values: StoreInterface = {
            ID,
            PicStore: String(SelectStore.UserPicStore),
            SubPicOne: String(SelectStore.UserSubPicOne),
            SubPicTwo: String(SelectStore.UserSubPicTwo),
            SubPicThree: String(SelectStore.UserSubPicThree),
            MembershipID: Package,
            NameStore: SelectStore.UserNameStore,
            BookingDate:BookingDate,
            LastDay:LastDate,
            DescribtionStore: SelectStore.UserDescribStore,
            // StatusStore: 'WaitingForApproval',
            UserID: Number(userIdstr),
            StatusStoreID: 2,
            ProductTypeID
        };
        const valuesMessage: MessageBoardInterface = { 
            PicNews: 'https://cdn-icons-png.flaticon.com/512/4942/4942676.png',
            TextHeader: 'Store reservations' , 
            DescribtionNews: 'The system has now sent your booking information to the database. Please wait until the administrator verifies your information. and can check the movement at your message box',
            UserID: SelectStore.UserID
        };
        const valuesBackup: BackupStoreInterface = {
            PicStoreBackup: String(SelectStore.UserPicStore),
            PicOneBackup: String(SelectStore.UserSubPicOne),
            PicTwoBackup: String(SelectStore.UserSubPicTwo),
            PicThreeBackup: String(SelectStore.UserSubPicThree),
            MembershipBackup: Package, 
            NameBackup: SelectStore.UserNameStore,
            BookingBackup: BookingDate,
            LastDayBackup: LastDate,
            DescribtionStoreB: SelectStore.UserDescribStore,
            UserID: Number(userIdstr),
            ProductTypeIDB: ProductTypeID,
            StoreID:ID,
        };
        try {
            const res = await UpdateStoreByid(String(ID), values);
            if (res.status === 200) {
                // messageApi.open({
                //     type: "success",
                //     content: res.data.message,
                // });
                console.log(res.data.message)
                await BackUpStore(valuesBackup);
                closepopup1();
                setTimeout(() => {
                    SuccessPopup();
                }, 500);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "การจองไม่สำเร็จ",
            });
        }
        try {
            const res = await AddMessage(valuesMessage);
            if (res.status === 201) {
                setTimeout(() => {
                    messageApi.open({
                        type: "info",
                        content: 'You have a new Message !!',
                    });
                }, 3000);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "ไม่สำเร็จ",
            });
        }

    };

    //=============================================================================
    const [isPopup, setPopup] = useState(false);//popup Conditions
    const closepopupConditions = () => {
        setPopup(false);
    };
    const GotopopupinfoStore = () => {
        setPopup(false)
        setPopup1(true)
        setSelectStore(true)
    };
    const [Package, setPackage] = useState(0);//package
    //const [datePackage , setDatePackage] = useState(0);
    const savePackage = async (newMembershipID: number) => {
        setPackage(newMembershipID);
        setTimeout(() => {
            setPopup(true)
        }, 100);
    };
    const [isPopup1, setPopup1] = useState(false);//popup infostore
    const closepopup1 = () => {
        setPopup1(false);
        closeSelectStore();
    };
    const UpdateAndBackup = async (formData: any) => {
        UpdateStoreByidd(formData);
        BackupStoreF(formData);
        SuccessPopup();
        setPopup1(false)
    };
    const [Success,SetSuccess] = useState(false);//Popup Success
    const closeSuccess = () => {
        SetSuccess(false)
    }
    const navigate = useNavigate();
    const SuccessPopup = () => {
        SetSuccess(true);
        setTimeout(() => {
            SetSuccess(false);
            navigate('/Store');
        }, 5000);
    }
    const [messageApi, contextHolder] = message.useMessage();
    //================================= set date ========================
    const Booking = new Date(); // กำหนดเป็นวันที่ปัจจุบัน
    const Last = new Date(Booking); // คัดลอกค่า BookingDate
    Last.setDate(Last.getDate() + 10); // เพิ่ม วันให้กับ LastDay
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
            BookingDate:Booking,
            LastDay:Last,
            DescribtionStore: formData.description,
            // StatusStore: 'WaitingForApproval',
            UserID: Number(userIdstr),
            StatusStoreID: 2,
            ProductTypeID
        };
        const valuesMessage: MessageBoardInterface = { 
            PicNews: 'https://cdn-icons-png.flaticon.com/512/4942/4942676.png',
            TextHeader: 'Store reservations' , 
            DescribtionNews: 'The system has now sent your booking information to the database. Please wait until the administrator verifies your information. and can check the movement at your message box',
            UserID: Number(userIdstr)
        };
        try {
            const res = await UpdateStoreByid(String(ID), values);
            if (res.status === 200) {
                console.log(res.data.message)
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
        try {
            const res = await AddMessage(valuesMessage);
            if (res.status === 201) {
                setTimeout(() => {
                    messageApi.open({
                        type: "info",
                        content: 'You have a new Message !!',
                    });
                }, 3000);
            } else {
                messageApi.open({
                    type: "error",
                    content: res.data.error,
                });
            }
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "ไม่สำเร็จ",
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
            BookingBackup: Booking,
            LastDayBackup: Last,
            DescribtionStoreB: formData.description,
            UserID: Number(userIdstr),
            ProductTypeIDB: ProductTypeID,
            StoreID:ID,
        };
        try {
            const res = await BackUpStore(values);
            if (res.status === 201) {
                console.log(res.data.message)
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
    
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (formData.nameStore&&formData.description) {
            formData.picStore = await getImageURL(fileList[0]?.originFileObj);
            formData.subPicOne = await getImageURL(fileList[1]?.originFileObj);
            formData.subPicTwo = await getImageURL(fileList[2]?.originFileObj);
            formData.subPicThree = await getImageURL(fileList[3]?.originFileObj);
            console.log('Form data submitted:', formData);
            UpdateAndBackup(formData);
        }else if (formData.nameStore == '' || formData.description == '') {
            if (formData.nameStore == '') {
                message.error("Please enter the store name.");
            }else if (formData.description == '') {
                message.error("Please enter a description of the store.");  
            }else {
                message.error("Must fill out information completely.");
            }
        }
        else{
            messageApi.open({
                type: "error",
                content: "Must fill out information completely.",
            });
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
    

    //===========================================ดึงข้อมูลpackage===============================================GetMembership MembershipInterface
    const [Membership, setMembership] = useState<MembershipInterface[]>([]);
    const fetchMembership = async () => {
        try {
            const res = await GetMembership();
            if (res.status === 200) {
                setMembership(res.data);
                console.log(res.data); 
            }else {
                setMembership([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
                message.error("can't found Membership data.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Debug
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };

    return (
        <>
            {contextHolder}
            {isPopup && 
                <>
                    <div onClick={closepopupConditions} style={{backgroundColor: 'rgba(0, 0, 0, 0.315)',width: '100%',height:'100%',position: 'fixed',zIndex: '1005'}}></div>
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
                    <div className='Accept' onClick={GotopopupinfoStore}>Accept all terms</div>
                    </div>
                </>
            }

            {isSelectStore &&
                <>
                    <div className='SelectStore'>
                        <h1>Select Your Store</h1>
                        <div className='contentSelectStore'>
                        {Storeu.length > 0 ? (
                            Storeu.map((data) => 
                                <>
                                    <div className='cardUserStoreSelect' key={data.ID} onClick={() => SelectUserStore(data)}>
                                        <img src={data.UserPicStore || Store3} alt="Store3" />
                                        <p className='cardUserStoreSelectName'>{data.UserNameStore || 'No Name!!!'}</p>
                                        <p className='cardUserStoreSelectinfo'>{data.UserDescribStore || 'No info!!!'}</p>
                                    </div>
                                </>
                            )) : (
                                <>
                                    <div className='NoStore' onClick={closeSelectStore}>You don't have any store information yet. <br />Go to the data entry page</div>
                                </>
                            )}
                        </div>
                        <div className='ExitSelectStore' onClick={closepopup1}></div>
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
                                    style={{width:'100%',border: '1px solid #22222234',borderRadius:'5px',height:'30px'}}
                                />
                                <label htmlFor="picStore">Preview Store</label>
                                <p style={{fontSize: '20px',margin: '0px'}}>You can upload up to 4 sample images of your store.</p>
                                <Upload id="Pic" fileList={fileList} onChange={onChange} onPreview={onPreview} beforeUpload={(file) => { setFileList([...fileList, file]); return false;}} 
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
                                    style={{width:'100%',border: '1px solid #22222234',borderRadius:'5px'}}
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
            {Success && 
                <>
                    <div onClick={closeSuccess} style={{ backgroundColor: 'rgba(0, 0, 0, 0.315)', width: '100%', height: '100%', position: 'fixed', zIndex: '1005' }}></div>
                        <div className='success'>
                            <h1>🎉SUCCESS🎉</h1>
                            Thank you for your reservation. We have successfully received your information, and we will review it shortly.
                        </div>
                </>
            }

            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Store">Store Directory /</a>
                {NameStore}
            </div>

            <h1 className='H1'>Book A Sales Stall</h1>
            <div className='Package'>
                {Membership.length > 0 ? (
                    Membership.map((data,index) => (
                        <span key={index} className='Packagespan' ><div>{data.PackageName}</div><p>{data.Day} Days</p><p>- PWA {(data.Pwa || 'No data').toLocaleString()} Bath</p><p>- PEA  {(data.Pea || 'No data').toLocaleString()} Bath</p><p>- Rent  {(data.RentalFee || 'No data').toLocaleString()} Bath</p><div className='PromotionBtn'onClick={() => savePackage(Number(data.ID))}>Use this promotion</div></span>
                    ))
                ) : (
                    <>
                        <div style={{margin:'0 auto'}}>
                            <img src="https://media.tenor.com/lVhFnY9tc94AAAAi/anime-dance.gif" alt="anime gif" width={250} />
                            <div style={{textAlign: 'center',width:'100%'}}>Loading . . .</div>
                        </div>
                    </>
                )}
            </div>            
        </>

    );

};

export default BookStore;