import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//import { NavBar } from '../../Component/NavBar';
import { FloorMenu } from './Floor/Floor';
import './StoreAndPay.css'
import PicNoStore from '../../../assets/icon/ForPage/Store/Store3.jpg';
import { message , Upload , Select } from "antd";


import market from "../../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../../assets/icon/ForPage/MainIcon/LaptopSettings.png"
import add from "../../../assets/icon/ForPage/Store/Add.png"


//API
import {GetStoreByFloor,GetUserAll,GetStoreByFloorPreload,GetMembership, GetUserById} from '../../../services/https/index'
import {StoreInterface,MembershipInterface} from '../../../interfaces/StoreInterface'
import { UsersInterface } from '../../../interfaces/UsersInterface';

import {UpdateStoreByid , DeleteCommentFromStore} from '../../../services/https/index';


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
            message.error("The ID was not found in localStorage.");
            
        }
    }, [1]);
    
    const fetchUserData = async (F: string) => {
        try {
            const res = await GetStoreByFloor(F);
            if (res.status === 200 && res.data) {
                setStore(res.data); // กำหนดให้เป็น array ที่ได้จาก API
                //res.data.forEach((store : StoreInterface) => fetchRating(String(store.ID)));
            } else {
                setStore([]); // ถ้าไม่มีข้อมูล ให้กำหนดเป็น array ว่าง
                message.error("There is no Store on this floor.");
            }
        } catch (error) {
            setStore([]); // กำหนดให้เป็น array ว่างเมื่อมี error
            message.error("There is no Store on this floor.");
        }
    };
    //===========================================To page sub==========================================
    // const [ratings, setRatings] = useState<Record<string, number>>({});
    // const [SumRating, setSumRating] = useState<Record<string, number>>({});
    // const fetchRating = async (StoreID: string) => {
    //     try {
    //         const res = await GetAvgCommentByStore(StoreID);
    //         if (res.status === 200) {
    //             setRatings((prev) => ({ ...prev, [StoreID]: res.data.averageRating }));
    //             setSumRating((prev) => ({ ...prev, [StoreID]: res.data.totalRatings }));
    //         } else {
    //             setRatings((prev) => ({ ...prev, [StoreID]: 0 })); // ไม่มีคะแนน
    //             setSumRating((prev) => ({ ...prev, [StoreID]: 0 })); // ไม่มีคะแนน
    //         }
    //     } catch (error) {
    //         setRatings((prev) => ({ ...prev, [StoreID]: 0 })); // กรณี error
    //     }
    // };
    //===========================================To page sub==========================================
    const navigate = useNavigate();
    const handleStoreClick = (SubStore: StoreInterface) => {
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
            StatusStore: SubStore.StatusStore,
            UserID: SubStore.UserID,
            ProductTypeID: SubStore.ProductTypeID,
          } 
        });
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
    const UpdateStoreByidd = async (formData: any) => {
        const values: StoreInterface = {
            ID: formData,
            PicStore: '',
            SubPicOne: '',
            SubPicTwo: '',
            SubPicThree: '',
            MembershipID: 0,
            NameStore: 'The shop has no owner.',
            BookingDate: new Date(),
            LastDay:new Date('2030-01-01'),
            DescribtionStore: '',
            StatusStore: 'This store is available for reservation.',
            UserID: 0,
        };
        try {
            const res = await UpdateStoreByid(String(formData), values);
            if (res.status === 200) {
                fetchUserData(String(1));
            }
            const resDeleteComment = await DeleteCommentFromStore(String(formData));
            if (resDeleteComment.status === 200) {
                fetchUserData(String(1));
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
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };
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
                        <div>COMPUTER EQUIPMENT</div>
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
                                        <span key={index} className={`cardStore ${data.status_store === "This store is already taken." ? "active" : data.status_store === "WaitingForApproval" ? "inactive" : data.status_store === "Waiting for Payment." ? "WaitingPayment" : ""}`} >
                                            <div onClick={() => handleStoreClick(data)}>
                                                <div><img src={data.pic_store || PicNoStore} alt="PicNoStore" /></div>
                                                <div><p style={{fontSize: '28px' , color: '#000'}}>{data.name_store}</p></div>
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
                                            <div className={`ViewStore ${data.status_store === "This store is already taken." ? "active" : data.status_store === "WaitingForApproval" ? "inactive" : data.status_store === "Waiting for Payment." ? "WaitingPayment" : ""}`} >{data.status_store}  --</div>
                                        </span>
                                    );
                                }
                                return null
                            })
                        ) : (
                            <h1 style={{textAlign: 'center',width: '800px'}}>No Store On This Floor.</h1>
                        )}
                    </span>
                    <span style={{width: "20%"}}></span>
                </div>
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
          width: 150,
        },
        {
            title: 'Start',
            dataIndex: 'BookingDate',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'End',
            dataIndex: 'LastDay',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Describtion',
            dataIndex: 'DescribtionStore',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'StatusStore',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'Reserve space',
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: (_, data) => <a onClick={() => StateStore(String(data?.ID))} style={{color: '#a78f48'}}>Booking</a>,
          },
      ];
      
    //===========================================ดึงข้อมูลstore=======================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    const [StoreID, setStateStore] = useState('');
    const StateStore = async (StoreID: string) => {
        setStateStore(StoreID);
        setAddBookingpopup(true);
    }
    useEffect(() => {
        fetchData(String(1));
        fetchUserAll();
        fetchMembership();
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
        };
        //คำนวนวัน
        const BDate = new Date(); // กำหนดเป็นวันที่ปัจจุบัน
        const LDate = new Date(BDate); // คัดลอกค่า BookingDate
        LDate.setDate(LDate.getDate() + formData.TotalDate); // เพิ่ม วันให้กับ LastDate 
        const BookStore = async (formData: any) => {
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
                StatusStore: 'This store is already taken.',
            };
            try {
                const res = await UpdateStoreByid(StoreID,valuesWithpic);
                if (res.status === 200) {
                    await fetchData(String(1));
                }
            } catch (error) {
                console.error("Error Edit:", error);
            }
        }
        //selector
        const selectUser = (value: string) => {
            formData.UserID = Number(value);
            console.log(`selected ${value}`);
        };
          
        const onSearch = (value: string) => {
            console.log('search:', value);
        };
        //Membership
        const selectMembership = (value: string) => {
            formData.MembershipID = Number(value);
            if (formData.MembershipID === 1) {
                formData.TotalDate = 7;
            }else if(formData.MembershipID === 2){
                formData.TotalDate = 30;
            }else if(formData.MembershipID === 3){
                formData.TotalDate = 365;
            }
            console.log(`date ${formData.TotalDate}`);
            console.log(`selected ${value}`);
        };
          
        const onSearchMembership = (value: string) => {
            console.log('search:', value);
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
                        <div className='addBookingpopup'>
                            <p style={{fontSize:'25px',textAlign: 'center'}}>Booking</p>
                            <form onSubmit={handleSubmitEdit}>
                                <div style={{display: 'flex',justifyContent:'center'}}>
                                    <div style={{margin:'0 20px',width:'300px'}}>
                                        <p>Name Store</p>
                                        <input
                                            style={{width:'100%'}}
                                            type="text"
                                            id="store_name"
                                            name="store_name"
                                            value={formData.store_name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <p>Description</p>
                                        <textarea
                                            style={{width:'100%',height:'100px'}}
                                            id="store_description"
                                            name="store_description"
                                            value={formData.store_description}
                                            onChange={handleChange}
                                            required={true}
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
                                            placeholder="Select a package"
                                            optionFilterProp="label"
                                            onChange={selectMembership}
                                            onSearch={onSearchMembership}
                                            options={Membership.map((mem) => ({
                                                value: mem.ID?.toString() || "",
                                                label: mem.PackageName || "Unknown",
                                              }))}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            }
        </>
    );

};
