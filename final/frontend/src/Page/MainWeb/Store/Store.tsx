import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FloorMenu } from './Floor/Floor';
import './StoreAndPay.css'
// import PicNoStore from '../../../assets/icon/ForPage/Store/Store3.jpg';
import { message , Upload , Select } from "antd";


import market from "../../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../../assets/icon/ForPage/MainIcon/LaptopSettings.png"
import add from "../../../assets/icon/ForPage/Store/Add.png"

import Award1 from "../../../assets/icon/ForPage/MainIcon/Award1.png"
import Award2 from "../../../assets/icon/ForPage/MainIcon/Award2.png"
import Award3 from "../../../assets/icon/ForPage/MainIcon/Award3.png"
import Award4 from "../../../assets/icon/ForPage/MainIcon/Award4.png"
import Award5 from "../../../assets/icon/ForPage/MainIcon/Award5.png"


//API
import {GetStoreByFloor,GetUserAll,GetStoreByFloorPreload,GetMembership, GetUserById, BackUpStore, GetStatusAll, GetMembershipByid, AddPayment, DeleteInformation} from '../../../services/https/index'
import {StoreInterface,MembershipInterface, BackupStoreInterface, StatusStoreAllInterface, PaymentInterface} from '../../../interfaces/StoreInterface'
import { UsersInterface } from '../../../interfaces/UsersInterface';

import {UpdateStoreByid , DeleteCommentFromStore} from '../../../services/https/index';

import Loader from '../../Component/Loader';

const Store: React.FC = () => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
            );
        }
        return stars;
    };

    const [isNameFloor, setNameFloor] = useState("NIGHT MARKET");
    const [isFloor1, setFloor1] = useState(0);const [isFloor2, setFloor2] = useState(0);const [isFloor3, setFloor3] = useState(0);const [isFloor4, setFloor4] = useState(0);
    const Floor1 = () => {
        fetchUserData(String(1));setFloor1(1);setFloor2(0);setFloor3(0);setFloor4(0);setNameFloor("NIGHT MARKET")
    };
    const Floor2 = () => {
        fetchUserData(String(2));setFloor1(0);setFloor2(1);setFloor3(0);setFloor4(0);setNameFloor("FOOD CENTER")
    };
    const Floor3 = () => {
        fetchUserData(String(3));setFloor1(0);setFloor2(0);setFloor3(1);setFloor4(0);setNameFloor("DECORATIONS")
    };
    const Floor4 = () => {
        fetchUserData(String(4));setFloor1(0);setFloor2(0);setFloor3(0);setFloor4(1);setNameFloor("COMPUTER EQUIPMENT")
    };


    //===========================================API==========================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
        if (1) {
            fetchUserData(String(1));
        } else {
            console.log("The ID was not found in localStorage.")//message.error("The ID was not found in localStorage.");
        }
    }, [1]);
    
    const fetchUserData = async (F: string) => {
        try {
            const res = await GetStoreByFloor(F);
            if (res.status === 200 && res.data) {
                setStore(res.data);
                //res.data.forEach((store : StoreInterface) => fetchRating(String(store.ID)));
            } else {
                setStore([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
                console.log("There is no Store on this floor.")
            }
        } catch (error) {
            setStore([]); // กำหนดให้เป็น array ว่างเมื่อมี error
            console.log("There is no Store on this floor.")
            //message.error("There is no Store on this floor.");
        }
    };
    //===========================================To page sub==========================================
    const navigate = useNavigate();
    const handleStoreClick = (SubStore: StoreInterface) => {
        if (userIdstr) {
            navigate('/SubStore', { 
              state: { 
                ID: SubStore.id,
                PicStore: SubStore.PicStore,
                SubPicOne: SubStore.SubPicOne,
                SubPicTwo: SubStore.SubPicTwo,
                SubPicThree: SubStore.SubPicThree,
                MembershipID: SubStore.MembershipID,
                NameStore: SubStore.NameStore,
                BookingDate: SubStore.BookingDate,
                LastDay: SubStore.LastDay,
                DescribtionStore: SubStore.DescribtionStore,
                UserID: SubStore.UserID,
                ProductTypeID: SubStore.ProductTypeID,
              } 
            });
        }else {
            message.info("Please login.")
        }
      };
    //============================================เช็ควันหมดอายุ==================================
    const currentDate = new Date(); // เวลาในปัจจุบัน
    const CheckExpiration = (data : any) => {
        if (currentDate > new Date(data.last_day)) {
            UpdateStoreByidd(data.id);
            return "Expired";
        }
        return data.status_store;
    };
    //================================= update ==========================
    const UpdateStoreByidd = async (storeID: any) => {
        const values: StoreInterface = {
            ID: storeID,
            PicStore: '',
            SubPicOne: '',
            SubPicTwo: '',
            SubPicThree: '',
            MembershipID: 0,
            NameStore: 'no owner.',
            BookingDate: new Date(),
            LastDay:new Date('2042-01-01'),
            DescribtionStore: '',
            UserID: 0,
            StatusStoreID: 1,
        };
        try {
            const res = await UpdateStoreByid(String(storeID), values);
            if (res.status === 200) {
                await fetchUserData(String(1));
            }
            const resDeleteComment = await DeleteCommentFromStore(String(storeID));
            if (resDeleteComment.status === 200) {
                await fetchUserData(String(1));
            }
            const resDeleteInfo = await DeleteInformation(String(storeID));
            if (resDeleteInfo.status === 200) {
                await fetchUserData(String(1));
            }
        } catch (error) {
            
        }
    };
    //=======================================PopupBookingAdmin==============================
    const userIdstr = localStorage.getItem("id");
    const [userWatch, setUserWatch] = useState<UsersInterface | null>(null);
    const [BookingAdmin, setBooking] = useState(true);
    useEffect(() => {
        fetchUserWatching();
        if (userWatch?.Status === 'Admin' ) {
            setBooking(true);
        }else{
            setBooking(false);
        }
    }, [userWatch?.Status]);
    const fetchUserWatching = async () => {
        try {
            const resWatch = await GetUserById(String(userIdstr));
            if (resWatch.status === 200) {
                setUserWatch(resWatch.data);
            }
        } catch (error) {
            console.log("เกิดข้อผิดพลาดในการดึงข้อมูลUser");//message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };
    // การ map วนซ้ำ 10 ครั้ง สำหรับ loader
    const FirstTenItems = Array.from({ length: 12 }).map((_, index) => {
        return (
        <div key={index}>
            <Loader />
        </div>
        );
    });
    return (
        <>
            <FloorMenu />
            {BookingAdmin &&
                <BookingStoreAdmin />
            }
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='route'><a href="/Main">Home /</a>Store Directory</div>
            <div className='StoreMainContent'>
                <h1>{isNameFloor}</h1>
                <div className='L'><span style={{width: "40%",backgroundColor: "#ffffff"}}></span><span></span><span style={{width: "40%",backgroundColor: "#ffffff"}}></span></div>
                <div className='AllbuttonFloor'>
                    <span style={{width: "40%",backgroundColor: "#ffffff"}}></span>
                    <span onClick={Floor1} className={`buttonFloor ${isFloor1 ? "active" : ""}`}>
                        <div><img src={market} alt="market" /></div>
                        <div>NIGHT MARKET</div>
                    </span>
                    <span onClick={Floor2} className={`buttonFloor ${isFloor2 ? "active" : ""}`}>
                        <div><img src={Food} alt="market" /></div>
                        <div>FOOD CENTER</div>
                    </span>
                    <span onClick={Floor3} className={`buttonFloor ${isFloor3 ? "active" : ""}`}>
                        <div><img src={Decorations} alt="market" /></div>
                        <div>DECORATIONS</div>
                    </span>
                    <span onClick={Floor4} className={`buttonFloor ${isFloor4 ? "active" : ""}`}>
                        <div><img src={Computer} alt="market" /></div>
                        <div>COMPUTER</div>
                    </span>
                    <span style={{width: "40%",backgroundColor: "#ffffff"}}></span>
                </div>
                <div className='ContanerStore'>
                    <span style={{width: "20%"}}></span>
                    <span style={{width: "100%"}} className='Store'>
                        {Store.length > 0 ? (
                            Store.map((data,index) => {
                                const status = CheckExpiration(data);
                                if (status !== 'Expired') {
                                    return (
                                        <span key={index} className={`cardStore ${data.status_name === "This store is already taken." ? "active" : data.status_name === "WaitingForApproval" ? "inactive" : data.status_name === "Waiting for Payment." ? "WaitingPayment" : ""}`} >
                                            <div onClick={() => handleStoreClick(data)}>
                                                <div><img src={data.pic_store || "https://www.chapmantaylor.com/uploads/Futureland-Shopping-Mall-at-Tianjin.jpg"} alt="PicNoStore" /></div>
                                                <div><p style={{fontSize: '24px' , color: '#000',fontWeight:'600'}}>{data.name_store}</p></div>
                                                <div className='lineStore'></div>
                                                {data.total_rating ? (
                                                    <div className='rating'>{renderStars(data.total_rating || 5)} {data.total_rating.toFixed(2)} Point</div>
                                                ) : (
                                                    <div className='rating' style={{fontSize: '20px'}}>No Rating...</div>
                                                )}
                                                <div className='lineStore'></div>
                                                <div className='DescribtionStore'>{data.booking_date ? new Intl.DateTimeFormat('en-GB').format(new Date(data.booking_date)) : 'No Date'}
                                                <br />{data.last_day ? new Intl.DateTimeFormat('en-GB').format(new Date(data.last_day)) : 'No Date'}
                                                </div>
                                            </div>
                                            <div className={`ViewStore ${data.status_name === "This store is already taken." ? "active" : data.status_name === "WaitingForApproval" ? "inactive" : data.status_name === "Waiting for Payment." ? "WaitingPayment" : ""}`} >{data.status_name}</div>
                                        </span>
                                    );
                                }
                                return null
                            })
                        ) : (
                            <>
                                {FirstTenItems}
                            </>
                        )}
                    </span>
                    <span style={{width: "20%"}}></span>
                </div>
                <footer>
                <div style={{display: 'flex', margin: '0 100px',fontFamily:'"Trirong", serif'}}>
                    <span>
                        <div style={{color: '#fff'}}>
                            Getting here <br />
                            Upadate News <br />
                            7 Wondrous <br />
                            About us <br />
                            Vision & Mission <br />
                            Privacy policy <br />
                        </div>
                    </span>
                    <span>
                        <div style={{color: '#fff'}}>
                            Board of Director <br />
                            Award <br /> 
                            Contact us <br /> 
                            Tenant services <br />
                        </div>
                    </span>
                </div>
                <div>
                    <div>
                        <span><img src={Award1} alt="Award1" width={80}/></span>
                        <span><img src={Award3} alt="Award3" width={70}/></span>
                        <span><img src={Award3} alt="Award3" width={70}/></span>
                        <span><img src={Award3} alt="Award3" width={70}/></span>
                        <span><img src={Award3} alt="Award3" width={70}/></span>
                        <span><img src={Award2} alt="Award2" width={100}/></span>
                    </div>
                    <div>
                        <span><img src={Award4} alt="Award4" width={250}/></span>
                        <span><img src={Award5} alt="Award5" width={150}/></span>
                    </div>
                </div>
            </footer>
            </div>
        </>

    );

};
export default Store;


import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import type {  UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export const BookingStoreAdmin: React.FC = () => {
    //===============================================list User && Membership================================================
    const [ListUser, setUser] = useState<UsersInterface[]>([]);
    const fetchUserAll = async () => {
        try {
            const res = await GetUserAll();
            if (res.status === 200 && res.data) {
                setUser(res.data);
            }
        } catch (error) {
            setStore([]);
        }
    };
    const [Membership, setMembership] = useState<MembershipInterface[]>([]);
    const [MembershipSelect, setMembershipSelect] = useState<MembershipInterface | null>(null);
    const fetchMembership = async () => {
        try {
            const res = await GetMembership();
            if (res.status === 200 && res.data) {
                setMembership(res.data);
            }
        } catch (error) {
            setMembership([]);
        }
    };
    //======================================================table=============================================
    const columns: TableColumnsType<StoreInterface> = [
        {
          title: 'Store',
          dataIndex: 'NameStore',
          width: 100,
        },
        {
            title: 'Start',
            dataIndex: 'BookingDate',
            width: 110,
            ellipsis: true,
        },
        {
            title: 'End',
            dataIndex: 'LastDay',
            width: 110,
            ellipsis: true,
        },
        {
            title: 'Describtion',
            dataIndex: 'DescribtionStore',
            ellipsis: true,
        },
        {
            title: 'Owner',
            dataIndex: 'UserID',
            width: 60,
            ellipsis: true,
            render: (_,data) => <a style={{color:'#000'}}>{data.User?.UserName}</a>
        },
        {
            title: '',
            dataIndex: 'UserID',
            width: 50,
            ellipsis: true,
            render: (_,data) => <img style={{borderRadius:'50%',boxShadow:'0 0 5px #C9AF62'}} src={data.User?.Profile} height={30} />
        },
        {
            title: 'Status',
            dataIndex: 'StatusStoreID',
            width: 200,
            ellipsis: true,
            render: (_,data) => <a style={{color:'#000'}}>{data.StatusStoreAll?.StatusName}</a>
        },
        {
            title: 'Reserve space',
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (_, data) => <a style={{color: '#a78f48'}}>{data.StatusStoreAll?.ID != 1 ? <p style={{cursor:'not-allowed',margin:'0'}}>Have Owner</p> : <p onClick={() => StateStore(data)} style={{cursor:'pointer',margin:'0'}}>Booking</p>}</a>,
          },
      ];
      
    //===========================================ดึงข้อมูลstore=======================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    const [StoreID, setStateStore] = useState('');
    const StateStore = async (Storedata: StoreInterface) => {
        setStateStore(String(Storedata.ID));
        setAddBookingpopup(true);
    }
    useEffect(() => {
        fetchData(String(1));
        fetchUserAll();
        fetchMembership();
        fetchstatus();
    }, []);
    
    const fetchData = async (F: string) => {
        try {
            const res = await GetStoreByFloorPreload(F);
            if (res.status === 200 && res.data) {
                setStore(res.data);
            }
        } catch (error) {
            setStore([]);
        }
    };
    //================================= status store name ==================================
    const [StatusName, setStatusName] = useState<StatusStoreAllInterface[]>([]);
    const fetchstatus = async () => {
        try {
            const res = await GetStatusAll();
            if (res.status === 200) {
                setStatusName(res.data);
            }
        } catch (error) {
            console.error("Error fetching status data:", error);
        }
    };
    //==========================================popup=================================
    const [addbooking, setAdd] = useState(false);
    const [addBookingpopup, setAddBookingpopup] = useState(false);
    //=======================================Booking Store input======================
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
        const getImageURL = async (file?: File): Promise<string> => {
            if (!file) return '';
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
            });
        };
        const [formData, setFormData] = useState({
            store_name: '',
            store_pic: '',
            sub_pic_one: '',
            sub_pic_two: '',
            sub_pic_three: '',
            store_description: '',
            UserID: 0,
            MembershipID: 0,
            TotalDate: 0,
            StatusStoreID: 0,
        });
        const handleChange = (e: any) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };
        const handleSubmitEdit = async (e: any) => {
            e.preventDefault();
            formData.store_pic = await getImageURL(fileList[0]?.originFileObj);
            formData.sub_pic_one = await getImageURL(fileList[1]?.originFileObj);
            formData.sub_pic_two = await getImageURL(fileList[2]?.originFileObj);
            formData.sub_pic_three = await getImageURL(fileList[3]?.originFileObj);
            console.log('Form data submitted:', formData);
            BookStore(formData);
            setAddBookingpopup(false);
        };
        //คำนวนวัน
        const BDate = new Date(); // กำหนดเป็นวันที่ปัจจุบัน
        const LDate = new Date(BDate); // คัดลอกค่า BookingDate
        const BookStore = async (formData: any) => {
            if (formData.StatusStoreID == 1) {
                message.error("ไม่ควรใช้สเตตัสนี้ในการจอง");
                console.log("ทำไม่ได้");
            }else if (formData.store_name == '' || formData.store_description == '' || formData.UserID == 0 || formData.MembershipID == 0 || formData.StatusStoreID == 0){
                // ตรวจสอบข้อมูลว่าครบไหม
                if (formData.store_name == '') {
                    message.error("Please enter the store name.");
                }else if (formData.store_description == '') {
                    message.error("Please enter a description of the store.");          
                }else if (formData.UserID == 0) {
                    message.error("Please select the shop reservation person.");          
                }else if (formData.MembershipID == 0) {
                    message.error("Please select the desired package.");          
                }else if (formData.StatusStoreID == 0) {
                    message.error("Please specify store status.");          
                }else {
                    message.error("There was an error filling in the information.");    
                }
            }else{
                LDate.setDate(LDate.getDate() + formData.TotalDate); // เพิ่ม วันให้กับ LastDate
                console.log(`date last ${LDate}`);
                //เติมข้อมูลร้านค้าเพื่อรออัพเดท
                const valuesWithpic: StoreInterface = {
                    NameStore: formData.store_name,
                    PicStore: formData.store_pic,
                    SubPicOne: formData.sub_pic_one,
                    SubPicTwo: formData.sub_pic_two,
                    SubPicThree: formData.sub_pic_three,
                    DescribtionStore: formData.store_description,
                    UserID: formData.UserID,
                    MembershipID: formData.MembershipID,
                    BookingDate: BDate,
                    LastDay: LDate,
                    StatusStoreID: formData.StatusStoreID,
                };
                //สร้างประวัติการจอง
                const values: BackupStoreInterface = {
                    PicStoreBackup: formData.store_pic,
                    PicOneBackup: formData.sub_pic_one,
                    PicTwoBackup: formData.sub_pic_two,
                    PicThreeBackup: formData.sub_pic_three,
                    MembershipBackup: formData.MembershipID, 
                    NameBackup: formData.nameStore,
                    BookingBackup: BDate,
                    LastDayBackup: LDate,
                    DescribtionStoreB: formData.store_description,
                    UserID: formData.UserID,
                    ProductTypeIDB: 1,
                    StoreID: Number(StoreID),
                };
                //สร้าง payment
                console.log(MembershipSelect?.PackageName)
                const valuesPayment: PaymentInterface = { 
                    PayStoreName: formData.store_name,
                    PayStorePackage: MembershipSelect?.PackageName,
                    PayStorePwa: MembershipSelect?.Pwa,
                    PayStorePea: MembershipSelect?.Pea,
                    PayStoreRental: MembershipSelect?.RentalFee,
                    PayStoreBook: BDate,
                    PayStoreLast: LDate,
                    UserID: formData.UserID,
                    StoreID: Number(StoreID)
                };
                try {
                    const res = await UpdateStoreByid(StoreID,valuesWithpic);
                    if (res.status === 200) {
                        await fetchData(String(1));
                        message.success("booking success!");
                        if (valuesWithpic.StatusStoreID === 3) {
                            createpaymentfuc(valuesPayment);
                            console.log("ส่งข้อมูลไป create payment แล้ว");
                        }
                        const resB = await BackUpStore(values);
                        if (resB.status === 201) {
                            console.log(resB.data.message);
                        } else {
                            console.log("error");
                        }
                    }
                } catch (error) {
                    console.error("Error Edit:", error);
                }
            }
        }
        const createpaymentfuc = async (payment: PaymentInterface) => {
            try {
                const res = await AddPayment(payment);
                if (res.status === 201) {
                    console.log("Create Payment Success!");
                } else {
                    console.log("error!");
                }
            } catch (error) {
                console.log("error!");
            }
        }
        //selector
        const selectUser = (value: string) => {
            formData.UserID = Number(value);
            console.log(`User selected ${value}`);
        };
          
        const onSearch = (value: string) => {
            console.log('User search:', value);
        };
        //Membership
        const selectMembership = (value: string) => {
            formData.MembershipID = Number(value);
            fetchMembershipfuc(value);
            console.log(`Package selected ${value}`);
        };
          
        const onSearchMembership = (value: string) => {
            console.log('Package search:', value);
        };

        const fetchMembershipfuc = async (id: string ) => {
            //ดึงข้อมูล package
            try{
                const res = await GetMembershipByid(id);
                if (res.status === 200) {
                    setMembershipSelect(res.data);
                    formData.TotalDate = res.data.Day;
                    console.log(`Total date ${formData.TotalDate}`);
                    console.log(res.data);
                }
            }catch{
                console.log("ดึงข้อมูลแพ็คเกจโดยไอดีไม่ได้")
            }
        };

        //status
        const selectStatus = (value: string) => {
            formData.StatusStoreID = Number(value);
            console.log(`Status selected ${value}`);
        };
          
        const onStatus = (value: string) => {
            console.log('Status search:', value);
        };
    return (
        <>
            <img className='BookingStoreAdminicon' src={add} alt="" width={60} onClick={() => setAdd(!addbooking)} />
            {addbooking &&
                <div className='BookingStoreAdmin'>
                    <div style={{margin:'30px 0 20px',textAlign: 'center',fontSize:'40px'}}>Store Management</div>
                    <div className='FloorStoreAdmin'>
                        <span onClick={() => fetchData(String(1))}>NIGHT MARKET</span>
                        <span onClick={() => fetchData(String(2))}>FOOD CENTER</span>
                        <span onClick={() => fetchData(String(3))}>DECORATIONS</span>
                        <span onClick={() => fetchData(String(4))}>EQUIPMENT</span>
                    </div>
                    <Table<StoreInterface> columns={columns} dataSource={Store} size="middle" style={{width:"80%",margin:'auto',border: '3px solid #eadcb2'}} />
                    {addBookingpopup && 
                    <>
                        <div className='addBookingpopup'>
                            <p style={{fontSize:'25px',textAlign: 'center'}}>Booking</p>
                            <form onSubmit={handleSubmitEdit}>
                                <div style={{display: 'flex',justifyContent:'center'}}>
                                    <div style={{margin:'0 20px',width:'300px'}}>
                                        <p>Name Store</p>
                                        <input
                                            style={{width:'100%',border: '1px solid #22222234',borderRadius:'5px',height:'30px'}}
                                            type="text"
                                            id="store_name"
                                            name="store_name"
                                            value={formData.store_name}
                                            onChange={handleChange}
                                        />
                                        <p>Description</p>
                                        <textarea
                                            style={{width:'100%',height:'100px',border: '1px solid #22222234',borderRadius:'5px'}}
                                            id="store_description"
                                            name="store_description"
                                            value={formData.store_description}
                                            onChange={handleChange}
                                        />
                                        <p>Picture</p>
                                        <Upload id="Pic" fileList={fileList} onChange={onChange} onPreview={onPreview} beforeUpload={(file) => { setFileList([...fileList, file]); return false;}} 
                                            maxCount={4} multiple={false} listType="picture-card" >
                                            <div><PlusOutlined /><div style={{ marginTop: 8 , fontWeight: '100'}}>Upload</div></div>
                                        </Upload>
                                        <div style={{margin: '20px 0'}}>
                                            <button className='SubmitEdit' style={{backgroundColor:'#E8D196'}}>Confirm</button>
                                            <button className='SubmitEdit' onClick={() => setAddBookingpopup(false)}>Close</button>
                                        </div>
                                    </div>
                                    <div style={{width:'200px'}}>
                                        <p>Member</p>
                                        <Select
                                            showSearch
                                            style={{width:'100%'}}
                                            placeholder="Select a person"
                                            optionFilterProp="label"
                                            onChange={selectUser}
                                            onSearch={onSearch}
                                            options={ListUser.map((user) => ({
                                                value: user.ID?.toString() || "",
                                                label: user.UserName || "Unknown User",
                                              }))}
                                        />
                                        <p>Package</p>
                                        <Select
                                            showSearch
                                            style={{width:'100%'}}
                                            placeholder="Select a package"
                                            optionFilterProp="label"
                                            onChange={selectMembership}
                                            onSearch={onSearchMembership}
                                            options={Membership.map((mem) => ({
                                                value: mem.ID?.toString() || "",
                                                label: mem.PackageName || "Unknown",
                                              }))}
                                        />
                                        <p>Status</p>
                                        <Select
                                            showSearch
                                            style={{width:'100%'}}
                                            placeholder="Select a Status"
                                            optionFilterProp="label"
                                            onChange={selectStatus}
                                            onSearch={onStatus}
                                            options={StatusName.map((status) => ({
                                                value: status.ID?.toString() || "",
                                                label: status.StatusName || "Unknown",
                                              }))}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className='backgroundevent' onClick={() => setAddBookingpopup(false)}></div>
                    </>
                    }
                </div>
            }
        </>
    );

};
