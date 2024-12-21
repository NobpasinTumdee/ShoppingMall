import React, { useEffect, useState } from 'react';

import Home from '../../../assets/icon/ForPage/Admin/HomePage.png'
import History from '../../../assets/icon/ForPage/Admin/History.png'
import Store from '../../../assets/icon/ForPage/Admin/StoreSetting.png'
import Job from '../../../assets/icon/ForPage/Admin/JobSeeker.png'
import NoStore from '../../../assets/icon/ForPage/Store/Store3.jpg'
import '../Main.css';

import { useNavigate } from 'react-router-dom';

import {Upload} from "antd";
import type {  UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { GetStoreByFloor , GetEvent , DeleteEvent , AddEvent} from '../../../services/https';
import { StoreInterface } from '../../../interfaces/StoreInterface';
import { EventInterface } from '../../../interfaces/UsersInterface';

const Admin: React.FC = () => {
    const [isFloorPopup, setFloorPopup] = useState(false);
    const navigate = useNavigate();
    const handleClickToHistory = () => {
        setFloorPopup(!isFloorPopup)
    };
    const handleClickToStore = () => {
        navigate('/AdminStore');
    };
    const handleClickToJob = () => {
        navigate('/AdminJob');
    };
    const handleClickToEvent = () => {
        navigate('/AdminEvent');
    };
    //==============================ดึงข้อมูลร้านทั้งหมด================================
    const [isStore, setStore] = useState<StoreInterface[]>([]);
    const [isNumber, setNumber] = useState('');
    useEffect(() => {
        fetchStore(String(1))
    }, []);
    const fetchStore = async (F: string) => {
        try {
            const res = await GetStoreByFloor(F);
            if (res.status === 200 && res.data) {
                setStore(res.data);
                setNumber(F)
            }else{
                setStore([]);
            }
        } catch (error) {
            setStore([]);
        }
    }
    //============================ส่งข้อมูลไปอีกหน้า===================================
    const handleStoreClick = (SubStore: StoreInterface) => {
        navigate('/BackUpStore', { 
          state: { 
            ID: SubStore.id,
          } 
        });
    };

    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <h1 className='H1Management'>Welcome to Management</h1>
            <p className='PManagement'>What do you want to do?</p>
            <div className='Mainpage'>
                <p className='ManageMainPage' onClick={handleClickToEvent}><img src={Home} alt="Home" />Manage Event</p>
            </div>
            <div className='Management'>
                <span className='ManagementSpan' onClick={handleClickToHistory}>
                    <img src={History} alt="History" />
                    <span>Manage History</span>
                </span>
                <span className='ManagementSpan' onClick={handleClickToStore}>
                    <img src={Store} alt="Store" />
                    <span>Manage Store</span>
                </span>
                <span className='ManagementSpan' onClick={handleClickToJob} >
                    <img src={Job} alt="Job" />
                    <span>Manage Job</span>
                </span>
            </div>
            {isFloorPopup &&
                <div className='popupStore'>
                    <div className='popupheader'>
                        <h1>Store</h1>
                        <div>
                            <span className='BtnFloor' onClick={() => fetchStore(String(1))}>Floor 1</span>
                            <span className='BtnFloor' onClick={() => fetchStore(String(2))}>Floor 2</span>
                            <span className='BtnFloor' onClick={() => fetchStore(String(3))}>Floor 3</span>
                            <span className='BtnFloor' onClick={() => fetchStore(String(4))}>Floor 4</span>
                        </div>
                    </div>
                    <div className='AllStore'>
                        <div className='CardStore'>
                            {isStore.length > 0 ? (
                                isStore.map((data,index) => (
                                    <div className='CardSubStore' key={index} >
                                        <img src={data.pic_store} alt="" width={250} height={150} onClick={() => handleStoreClick(data)}/>
                                        <p className='NoStorecard'>No.{data.id}</p>
                                        <p className='FloorNumber'>F{isNumber}</p>
                                    </div>   
                                ))
                            ) : (
                                <>No Store...</>
                            )}
                        </div>
                    </div>
                    <div className='Exit' style={{textAlign: 'center' ,color: "#fff"}} onClick={handleClickToHistory}>X</div>
                </div>
            }

        </>

    );

};

export default Admin;





export const AdminEvent: React.FC = () => {
    //==============================ดึงข้อมูลEvent================================
    const [Event, setEvent] = useState<EventInterface[]>([]);
    useEffect(() => {
        fetchEvent()
    }, []);
    const fetchEvent = async () => {
        try {
            const res = await GetEvent();
            if (res.status === 200 && res.data) {
                setEvent(res.data);
            }else{
                setEvent([]);
            }
        } catch (error) {
            setEvent([]);
        }
    }
    //============================ลบevent======================================
    const DeleteEventAdmin = async (id : number | undefined) => {
        try {
            const res = await DeleteEvent(String(id));
            if (res.status === 200) {
                setEvent((prev) => prev.filter(item => item.ID !== id));
            }else{
                setEvent([]);
            }
        } catch (error) {
            setEvent([]);
        }
    }
    //===========================สร้างevent=====================================
    const [isPopup, setPopup] = useState(false);
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
        event_pic: '',
        event_topic: '',
        event_description: '',
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        formData.event_pic = await getImageURL(fileList[0]?.originFileObj);
        console.log('Form data submitted:', formData);
        ADDEvent(formData);
        setPopup(false);
    };
    const ADDEvent = async (formData: any) => {
        const values: EventInterface = {
            event_pic: formData.event_pic,
            event_topic: formData.event_topic,
            event_description: formData.event_description,
            event_date: new Date(),
        };
        try {
            const res = await AddEvent(values);
            if (res.status === 201) {
                await fetchEvent();
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    }
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <h1 className='H1Management'>Event</h1>
            <div style={{margin: '0 10% 10%'}}>
                <div className='AddEvent' onClick={() => setPopup(true)}>+ Add Event</div>
                {Event.length > 0 ? (
                    Event.map((data,index) => (
                        <div className='cardEvent' key={index}>
                            <div style={{display: 'flex' , justifyContent: 'start' , padding: '5px'}}>
                                <img style={{borderRadius: '5px 0 0 5px'}} src={data.event_pic || NoStore} alt="" width={250} height={150} />
                                <div style={{margin:"0 10px",width: '70%'}}>
                                    <p style={{fontSize: '30px',margin: '0px',fontFamily:'"Parkinsans", sans-serif'}}>{data.event_topic}</p>
                                    <div style={{overflowY: 'scroll', height: '190px',color:'#4e3b00',fontFamily:'"Parkinsans", sans-serif',margin: '0'}}>
                                        <p>{data.event_description}</p>
                                    </div>
                                </div>
                            </div>
                            <div style={{margin: '70px 10px',cursor:'pointer'}} onClick={() => DeleteEventAdmin(data.ID)}>
                                🗑️
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No Event . . .</div>
                )}
            </div>
            {isPopup && 
                <>
                    <div className="popupevent" >
                        <div className='Exit' onClick={() => setPopup(false)}></div>
                        <form onSubmit={handleSubmit} className='forminputevent'>
                            <label>Event Topic</label>
                            <div>
                                <input
                                    style={{borderRadius:'20px',border:'2px solid #C9AF62'}}
                                    type="text"
                                    id="event_topic"
                                    name="event_topic"
                                    value={formData.event_topic}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <label>Event Photo</label>
                            <Upload id="Pic" fileList={fileList} onChange={onChange} onPreview={onPreview} beforeUpload={(file) => { setFileList([...fileList, file]); return false;}} 
                                maxCount={1} multiple={false} listType="picture-card" >
                                <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>
                            </Upload>
                            <label>Description</label>
                            <textarea
                                style={{borderRadius:'10px',border:'2px solid #C9AF62'}}
                                id="event_description"
                                name="event_description"
                                value={formData.event_description}
                                onChange={handleChange}
                                required={true}
                            />
                            <button className='SubmitEvent' type="submit">Confirm</button>
                        </form>
                    </div>
                    <div className='backgroundevent' onClick={() => setPopup(false)}></div>
                </>
            }
        </>
    );

};
