import React, { useEffect, useState } from 'react';
import { message , Upload} from "antd";
import type {  UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import LOGO from "../../assets/icon/highLogo.jpg";
import LOGOSQ from "../../assets/icon/LOGOS.png";
import Clock from "../../assets/icon/ForPage/MainIcon/Clock.png";
import Address from "../../assets/icon/ForPage/MainIcon/Address.png";
//import UserIcon from "../../assets/icon/ForPage/MainIcon/UserProfile.jpg"
import Hutao from "../../assets/icon/ForPage/MainIcon/HuTaopic.jpg"
import card1 from "../../assets/icon/ForPage/MainIcon/cardp.png"
import card2 from "../../assets/icon/ForPage/MainIcon/cardg.png"
import card3 from "../../assets/icon/ForPage/MainIcon/cardd.png"
import background from "../../assets/icon/ForPage/Store/Store3.jpg"
import './NavBar.css';

//API
import { UsersInterface } from "../../interfaces/UsersInterface";
import { GetUserById , AddStore ,UserStoreByid} from '../../services/https';
import { InfoUserStoreInterface } from '../../interfaces/StoreInterface';



export const NavBar: React.FC = () => {
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
            fetchUserStoreData(userIdstr);
        } else {
            
        }
    }, [userIdstr]);

    const fetchUserData = async (userIdstr: string ) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            }else {
                message.error("error");
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Debug
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };
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

    //=====================Menu on Profile======================
    const [isMenuOpen, setMenu] = useState(false);
    const OpenMenu = () => {
        setMenu(!isMenuOpen);
    };

    //=====================Logout======================
    const Logout = () => {
        localStorage.clear();
        message.success("Logout successful");
        setTimeout(() => {
          location.href = "/";
        }, 1000);
    };
    //=====================time================================
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    const getFormattedDateTime = (date: Date): string => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = (date.getFullYear()).toString(); // to year พศ +543
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
      };
    //====================is open? ============================
    useEffect(() => {
        const hours = currentTime.getHours();
        if (hours >= 10 && hours <= 21) {
            //setOpen(true);
            settextOpen('OPEN NOW');
        } else {
            //setOpen(false);
            settextOpen('NOT OPEN NOW');
        }
    }, [currentTime]);
    //const [isOpen, setOpen] = useState(false);
    const [istextOpen, settextOpen] = useState('NOT OPEN NOW');
    //====================profile==============================
    const [isProfile, setProfile] = useState(false);
    const [card ,setcard] = useState(0);
    const OpenProfile = () => {
        setProfile(!isProfile);
        if (user?.Status == 'Admin') {
            setcard(3);
        }else if (user?.Status == 'Employee'){
            setcard(2);
        }else{
            setcard(1);
        }
    };
    const closeCard = () => {
        setcard(0);
    };
    //=========================================Add Store==============================
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const getImageURL = async (file?: File): Promise<string> => {
        if (!file) return '';
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
        });
    };

    const UpdateAndBackup = async (formData: any) => {
        UpdateStoreByidd(formData);
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
    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    

    const UpdateStoreByidd = async (formData: any) => {
        const values: InfoUserStoreInterface = {
            UserNameStore: formData.nameStore,
            UserPicStore: String(formData.picStore),
            UserSubPicOne: String(formData.subPicOne),
            UserSubPicTwo: String(formData.subPicTwo),
            UserSubPicThree: String(formData.subPicThree),
            UserDescribStore: formData.description,
            UserID: Number(userIdstr),
        };
        try {
            const res = await AddStore(values);
            if (res.status === 201) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                });
                setTimeout(() => {
                    setAddstore(false)
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
                content: "Can't Add your store",
            });
        }
    };
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
        formData.picStore = await getImageURL(fileList[0]?.originFileObj);
        formData.subPicOne = await getImageURL(fileList[1]?.originFileObj);
        formData.subPicTwo = await getImageURL(fileList[2]?.originFileObj);
        formData.subPicThree = await getImageURL(fileList[3]?.originFileObj);
        console.log('Form data submitted:', formData);
        UpdateAndBackup(formData);
    };

    
    //===============================popup add store============================================
    const [isAddstore, setAddstore] = useState(false);
    const OpenAddStore = () => {
        setAddstore(!isAddstore)
    };
    const closeAddStore = () => {
        setAddstore(false)
    };
    //===============================Popup your store==========================================
    const [isUserStore, setUserStore] = useState(false);
    const OpenUserStore = () => {
        setUserStore(!isUserStore)
    };
    const closeUserStore = () => {
        setUserStore(false)
    };
    return (
        <>
            {contextHolder}
            {isProfile && 
                <>
                    <div className='back' onClick={OpenProfile}></div>
                    <div className='ProfileContaner'>
                        <div><img src={user?.ProfileBackground || background} alt="ProfileBackground" /></div>
                        <div><img src={user?.Profile || Hutao} alt="Profile" /></div>
                        <div>{user?.Status}</div>
                        <div>{user?.UserName}</div>
                        <div>Gmail : {user?.Email}</div>
                        <div>Name : {user?.FirstName}{user?.LastName}</div>
                        <div>Age : {user?.Age} Tel : {user?.Tel || 'No Phone Number'}</div>
                        <div onClick={OpenProfile}>back to main ▶</div>
                        <div>🛠️</div>
                        <div onClick={OpenUserStore}>your store</div>
                        <div onClick={OpenAddStore}>Create your store</div>
                    </div>
                    <div className='CardMember'>
                        {card === 1 &&
                            <div className='Platinum' onClick={closeCard}><img src={card1} alt="ProfileBackground" /></div>
                        }
                        {card === 2 &&
                            <div className='Gold' onClick={closeCard}><img src={card2} alt="ProfileBackground" /></div>
                        }
                        {card === 3 &&
                            <div className='Dimond' onClick={closeCard}><img src={card3} alt="ProfileBackground" /></div>
                        }
                    </div>
                    {isAddstore && 
                        <div className='CreateStore'>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px' }}>
                                <div className="BookinfoPopup">
                                    <div className='Exit' onClick={closeAddStore}></div>
                                    <h2>Add Your Store</h2>
                                    <div className="insideinfopopup">
                                            <div className="left-section">
                                                <label htmlFor="nameStore">Name Store</label>
                                                <input type="text" id="nameStore" name="nameStore" value={formData.nameStore} onChange={handleChange} required />
                                                <label htmlFor="picStore">Preview Store</label>
                                                <p style={{fontSize: '20px',margin: '0px'}}>You can upload up to 4 sample images of your store.</p>
                                                <Upload fileList={fileList} onChange={onChange} onPreview={onPreview} beforeUpload={(file) => { setFileList([...fileList, file]); return false;}} 
                                                    maxCount={4} multiple={false} listType="picture-card" >
                                                    <div><PlusOutlined /><div style={{ marginTop: 8 }}>อัพโหลด</div></div>
                                                </Upload>
                                                
                                            </div>
                                            <div className="right-section">
                                                <label htmlFor="description">Description</label>
                                                <textarea id="description" name="description" rows={10} value={formData.description} onChange={handleChange} />
                                            </div>
                                    </div>
                                    <div  className='bottonn' ><hr />
                                        Your shop information will be stored here. If you wish to reserve a shop on a particular day, you can use the information from this section as needed.
                                    </div>
                                    <div className='submitbtn'>
                                        <div></div>
                                        <button type="submit" >Confirm</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }

                    {isUserStore && 
                        <div className='UserStoreSelect'>
                            <h1>Your Store</h1>
                            <div className='E' onClick={closeUserStore}></div>
                            <div className='cardStoreUser'>
                                {Storeu.length > 0 ? (
                                    Storeu.map((data) => 
                                        <div className='CardInfoUser' key={data.ID}>
                                            <img src={data.UserPicStore || background} alt="background" />
                                            <div className='N'>{data.UserNameStore}</div>
                                        </div>
                                    )
                                ) : (
                                    <>
                                        You have no store!!!
                                    </>
                                )}
                            </div>
                        </div>
                    }
                </>
            }
            <nav className='positionNav'>
                <nav className='NavComponent'>
                    <span className='SubNab1'>
                        <img style={{ width: '25px', height: '25px' }} className='Clock' src={Clock} alt="Clock" />
                        <p>{istextOpen} <br /> 10 AM - 9 PM <br /> Now {getFormattedDateTime(currentTime)}</p>
                        <div className='vertical-divider'></div>

                        <img style={{ width: '25px', height: '25px' }} className='Loclation' src={Address} alt="Address" />
                        <p>111, University Road, Suranaree<br /> Subdistrict, Mueang Nakhon Ratchasima<br />District, Nakhon Ratchasima 30000</p>
                        <div className='vertical-divider'></div>
                    </span>
                    <span className='SubNab2'><img style={{ width: '200px', height: '30px' }} src={LOGO} alt="LOGO" /></span>
                    <span className='SubNab3'>
                        <span>Hello! {user?.UserName} Welcome to ICONIC🎉</span>
                        <img style={{ width: '45px', height: '45px', borderRadius: '50px', cursor: 'pointer' }} src={user?.Profile || Hutao} alt="User" onClick={OpenMenu}></img>
                        {isMenuOpen && (
                            <div className='dropboxMenu'>
                                <a onClick={OpenProfile} ><p className='dropboxMenuP'>Your Profile</p></a>
                                <a href="" ><p className='dropboxMenuP'>Job Application</p></a>
                                <a href="" ><p className='dropboxMenuP'>Car Parking</p></a>
                                {user?.Status === 'Admin' && 
                                    <a href="/Admin" ><p className='dropboxMenuP'>Management</p></a>
                                }
                                <div className='lineMenu'></div>
                                <p className='dropboxMenuP' onClick={Logout}>Log Out</p>
                            </div>
                        )}
                    </span>
                </nav> 
                <nav className='NavComponentMenu'>
                    <div></div>
                    <div>
                        <a href="/Main" ><span className={`MenuHover ${location.pathname === "/Main" ? "active" : ""}`}>NEWS</span></a>
                        <a href="/Store" ><span className={`MenuHover ${location.pathname === "/Store" ? "active" : ""}`}>STORE</span></a>
                        {user?.Status === 'Admin' && 
                            <a href="/Hall" ><span className={`MenuHover ${location.pathname === "/Hall" ? "active" : ""}`}>BOOK A HALL</span></a>
                        }
                        <a href="#" ><span className='MenuHover'>SERVICEREQUEST</span></a>
                        <a href="#" ><span className='MenuHover'>CLEANING</span></a>
                    </div>
                    <div></div>
                </nav>
            
            </nav>
        </>
    );
};



export const IntroWeb: React.FC = () => {
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
        } else {
            
        }
    }, [userIdstr]);

    const fetchUserData = async (userIdstr: string ) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            } else {
                
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };

    const [intro, setIntro] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIntro(false)
        }, 10000);
    }, []);
    return (

        <>
            {intro && 
                <div className='introMainWeb'>
                    <img src={LOGOSQ} alt="LOGOSQ" />
                    <h1>Hello! {user?.UserName}</h1>
                    <h2>WELCOME TO ICONIC</h2>
                    <p>Press anywhere to skip</p>
                </div>
            }
        </>

    );

};
