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
import box from "../../assets/icon/ForPage/MainIcon/GmailLogin.png"
import background from "../../assets/icon/ForPage/Store/Store3.jpg"
import commpany from "../../assets/icon/ForPage/MainIcon/BusinessBuilding.png";
import './NavBar.css';
// import { useNavigate } from 'react-router-dom';
import { Messagesbox } from '../MainWeb/Inbox/Inbox';


//API
import { UsersInterface } from "../../interfaces/UsersInterface";
import { GetUserById , AddStore , UserStoreByid , DeleteUserStoreByID , UpdateUserByid , GetTaxById , UpdateTaxByid , AddTax} from '../../services/https';
import { InfoUserStoreInterface , TaxUserInterface} from '../../interfaces/StoreInterface';
import { Link } from 'react-router-dom';



export const NavBar: React.FC = () => {
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
            fetchUserStoreData(userIdstr);
        }
    }, [userIdstr]);

    const fetchUserData = async (userIdstr: string ) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
                setFormUser({
                    Email: res.data.Email,
                    Profile: res.data.Profile,
                    ProfileBackground: res.data.ProfileBackground,
                    FirstName: res.data.FirstName,
                    LastName: res.data.LastName,
                    Tel: res.data.Tel,
                    Age: res.data.Age,
                });
                //message.success("พบข้อมูลUser");
            }else {
                console.log("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
            }
        } catch (error) {
            console.error("Error fetching user data:", error); // Debug
            console.log("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
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
            console.log("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
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
    //=====================inbox=======================
    // const navigate = useNavigate();
    const GotoInbox = () => {
        // navigate('/Inbox');
        setMessages(!Messages);
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
        setProfile(true);
        fetchUserTax(String(userIdstr));
        if (user?.Status == 'Admin') {
            setcard(3);
        }else if (user?.Status == 'Employee'){
            setcard(2);
        }else{
            setcard(1);
        }
    };
    const CloseProfile = () => {
        setProfile(false);
        closeCard();
        setEditProfile(false);
        setTaxpopup(false)
        setUserStore(false)
        setAddstore(false)
    };
    const closeCard = () => {
        setcard(0);
    };
    //=========================================Edit profile===========================
    const [isEditProfile, setEditProfile] = useState(false);
    const OpenEditProfile = () => {
        setEditProfile(!isEditProfile)
    };
    const [formUser, setFormUser] = useState({
        Email: "",
        Profile: "",
        ProfileBackground: "",
        FirstName: "",
        LastName: "",
        Tel: "",
        Age: 0,
    });
    
    const [fileListProfile, setFileListProfile] = useState<UploadFile[]>([]);
    const [fileListBackground, setFileListBackground] = useState<UploadFile[]>([]);

    const getImageURLEDIT = async (file?: File): Promise<string> => {
        if (!file) return '';
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
        });
    };

    const onPreviewEDIT = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src && file.originFileObj) {
            src = await getImageURLEDIT(file.originFileObj);
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleChangeEditUser = (e : any) => {
        const { name, value } = e.target;
        setFormUser({ ...formUser, [name]: name === "Age" ? Number(value) : value });
    };

    const onChangeProfile: UploadProps['onChange'] = ({ fileList }) => {
        setFileListProfile(fileList);
        // Update Profile image URL in formUser
        if (fileList.length > 0 && fileList[0].originFileObj) {
            getImageURLEDIT(fileList[0].originFileObj).then((url) => {
                setFormUser({ ...formUser, Profile: url });
            });
        }
    };

    const onChangeBackground: UploadProps['onChange'] = ({ fileList }) => {
        setFileListBackground(fileList);
        // Update Background image URL in formUser
        if (fileList.length > 0 && fileList[0].originFileObj) {
            getImageURLEDIT(fileList[0].originFileObj).then((url) => {
                setFormUser({ ...formUser, ProfileBackground: url });
            });
        }
    };

    const handleSubmitEdit = async (e : any) => {
        e.preventDefault();
        try {
            const res = await UpdateUserByid(String(userIdstr), formUser);
            if (res.status === 200) {
                message.success(res.data.message);
                await fetchUserData(String(userIdstr));
            } else {
                message.error(res.data.error);
            }
        } catch (error) {
            message.error("การอัพเดทข้อมูลไม่สำเร็จ");
        }
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
                await fetchUserStoreData(String(userIdstr));
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
        UpdateStoreByidd(formData);
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
    //===============================Delete your store========================================
    const handleDelete = async (id: number | undefined) => {
        if (id) {
          try {
            const res = await DeleteUserStoreByID(String(id));
            if (res.status === 200) {
              setStoree((prevStoree) => prevStoree.filter(item => item.ID !== id));
              message.success("🗑️ deleted.");
            } else {
              message.error("Unable to delete 🥹");
            }
          } catch (error) {
            message.error("An error occurred while deleting 😭");
          }
        } else {
          message.error("The ID is invalid.🫥");
        }
      };
    //=========================================Tax===========================
    const [Tax, setTax] = useState<TaxUserInterface | null>(null);
    const [formTax, setformTax] = useState({
        CompanyName: '',
        Residencee: '',
        IdentificationNumber: '',
        UserID: ''
    });
    const [isTaxpopup, setTaxpopup] = useState(false);
    const handleChangeTax = (e: any) => {
        const { name, value } = e.target;
        setformTax({ ...formTax, [name]: name === "IdentificationNumber" ? Number(value) : value });
    };
    const fetchUserTax = async (userIdstr: string ) => {
        try {
            const res = await GetTaxById(userIdstr);
            if (res.status === 200) {
                setTax(res.data);
                console.log(res.data); 
                setformTax({
                    CompanyName: res.data.CompanyName,
                    Residencee: res.data.Residencee,
                    IdentificationNumber: res.data.IdentificationNumber,
                    UserID: res.data.UserID
                })

            }else {
                setTimeout(() => {
                    message.info("You can store tax invoice information at Your profile if you need.");
                }, 2000);
            }
        } catch (error) {
            console.error("Error fetching user Tax data:", error); // Debug
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUserTax");
        }
    };
    //create

    const handleSubmitCreatetax = async (e: any) => {
        e.preventDefault();
        CreateTax(formTax);
    };
    const CreateTax = async (formTax: any) => {
        const values: TaxUserInterface = {
            CompanyName: formTax.CompanyName,
            Residencee: formTax.Residencee,
            IdentificationNumber: formTax.IdentificationNumber,
            UserID: Number(userIdstr)
        };
        try {
            const res = await AddTax(values);
            if (res.status === 201) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                });
                await fetchUserTax(String(userIdstr));
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
    //update
    const handleSubmitUpdatetax = async (e: any) => {
        e.preventDefault();
        UpdateTax(formTax);
    };
    const UpdateTax = async (formTax: any) => {
        const values: TaxUserInterface = {
            CompanyName: formTax.CompanyName,
            Residencee: formTax.Residencee,
            IdentificationNumber: formTax.IdentificationNumber,
            UserID: formTax.UserID
        };
        try {
            const res = await UpdateTaxByid(String(Tax?.ID),values);
            if (res.status === 200) {
                messageApi.open({
                    type: "success",
                    content: res.data.message,
                });
                await fetchUserTax(String(userIdstr));
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
    //======================================================MessagesBox===========================================
    const [Messages, setMessages] = useState(false);
    return (
        <>
            {contextHolder}
            
                <>
                    <div className={`inboxpopup ${Messages ? 'fade-in' : 'fade-out'}`} onClick={() => setMessages(!Messages)}>
                        <Messagesbox />
                    </div>


                    <div className={`back ${isProfile ? 'fade-in' : 'fade-out'}`} onClick={CloseProfile} ></div>
                    <div className={`ProfileContaner ${isProfile ? 'fade-in' : 'fade-out'}`}>
                        <div><img src={user?.ProfileBackground || background} alt="ProfileBackground" /></div>
                        <div><img src={user?.Profile || Hutao} alt="Profile" /></div>
                        <div>{user?.Status}</div>
                        <div>{user?.UserName}</div>
                        <div>Gmail : {user?.Email}</div>
                        <div>Name : {user?.FirstName} {user?.LastName}</div>
                        <div>Age : {user?.Age} Tel : {user?.Tel || 'No Phone Number'}</div>
                        <div onClick={CloseProfile}>back to main ▶</div>
                        <div onClick={OpenEditProfile}>🛠️</div>
                        <div onClick={OpenUserStore}>your store</div>
                        <div onClick={OpenAddStore}>Create your store</div>
                        <div onClick={() => setTaxpopup(true)}>info tax</div>
                    </div>

                    {Tax ? (
                        <>
                            <div className={`TaxContaner ${isTaxpopup ? 'fade-in' : 'fade-out'}`}>
                                <div className='TaxContannersub'>
                                    <h1 style={{textAlign: 'center'}}>Tax info</h1>
                                    {Tax &&
                                        <div style={{display:'flex',justifyContent: 'flex-start' ,backgroundColor: '#fff' ,margin: '20px',padding: '10px',borderRadius: '10px' , boxShadow: '0 0 20px #0001'}}>
                                            <img src={commpany} alt="commpany" style={{width: '80px'}} /><div style={{overflowY: 'scroll',height: '60px'}}>Company: {Tax.CompanyName} <br />Residecnee: {Tax.Residencee} <br />ID: {Tax.IdentificationNumber}</div>
                                        </div>
                                    }
                                    <div >
                                        <form onSubmit={handleSubmitUpdatetax}>
                                            <label>Company Name</label><br />
                                            <input type="text" name="CompanyName" value={formTax.CompanyName} onChange={handleChangeTax} required /><br />
                                            <label>Identification Number</label><br />
                                            <input type="Number" name="IdentificationNumber" value={formTax.IdentificationNumber} onChange={handleChangeTax} required /><br />
                                            <label>Residencee</label><br />
                                            <textarea name="Residencee" value={formTax.Residencee} onChange={handleChangeTax} required />

                                            <button type="submit" className='Taxsubmit'>Save Changes</button>
                                        </form>
                                        <div onClick={() => setTaxpopup(false)} className='closeTax'>X</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={`TaxContaner ${isTaxpopup ? 'fade-in' : 'fade-out'}`}>
                                <div className='TaxContannersub'>
                                    <h1 style={{textAlign: 'center'}}>Tax info</h1>
                                    <div >
                                        <form onSubmit={handleSubmitCreatetax}>
                                            <div style={{display:'flex'}}>
                                                <div style={{margin:'0 20px 0 0 '}}>
                                                    <label>Company Name</label><br />
                                                    <input type="text" name="CompanyName" value={formTax.CompanyName} onChange={handleChangeTax} required /><br />
                                                </div>
                                                <div>
                                                    <label>Identification Number</label><br />
                                                    <input type="Number" name="IdentificationNumber" value={formTax.IdentificationNumber} onChange={handleChangeTax} required /><br />
                                                </div>
                                            </div>
                                            <label>Residencee</label><br />
                                            <textarea name="Residencee" value={formTax.Residencee} onChange={handleChangeTax} required />

                                            <button type="submit" className='Taxsubmit'>Save Changes</button>
                                        </form>
                                        <div onClick={() => setTaxpopup(false)} className='closeTax'>X</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className={`EditProfileContaner ${isEditProfile ? 'fade-in' : 'fade-out'}`}>
                        <div className='EditContaner'>
                            <h1 style={{textAlign: "center"}}>Edit Your Profile</h1>
                            <form onSubmit={handleSubmitEdit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div className='uploadEdit'>
                                    <Upload
                                        fileList={fileListProfile}
                                        onChange={onChangeProfile}
                                        onPreview={onPreview}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                        listType="picture-card"
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Profile</div>
                                        </div>
                                    </Upload>

                                    <Upload
                                        fileList={fileListBackground}
                                        onChange={onChangeBackground}
                                        onPreview={onPreviewEDIT}
                                        beforeUpload={() => false}
                                        maxCount={1}
                                        listType="picture-card"
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Background</div>
                                        </div>
                                    </Upload><div></div>
                                </div>
                                <label>Email</label>
                                <input type="email" name="Email" value={formUser.Email} onChange={handleChangeEditUser} required />

                                <div style={{display:'flex'}}>
                                    <div>
                                        <label>First Name</label>
                                        <input style={{width:'90%',marginTop:'10px'}} type="text" name="FirstName" value={formUser.FirstName} onChange={handleChangeEditUser} required />
                                    </div>
                                    <div>
                                        <label>Last Name</label>
                                        <input style={{width:'90%',marginTop:'10px'}} type="text" name="LastName" value={formUser.LastName} onChange={handleChangeEditUser} required />
                                    </div>
                                </div>

                                <label>Tel</label>
                                <input type="tel" name="Tel" value={formUser.Tel} onChange={handleChangeEditUser} />

                                <label>Age</label>
                                <input type="text" name="Age" value={formUser.Age} onChange={handleChangeEditUser} />

                                <button type="submit" className='Editsubmit'>Save Changes</button>
                            </form>
                            <div onClick={OpenEditProfile} className='EditBtn'>🛠️</div>
                        </div>
                    </div>

                    <div className='CardMember'>
                        <div className={`Platinum ${card === 1 ? 'fade-in' : 'fade-out'}`} onClick={closeCard}><img src={card1} alt="ProfileBackground" /></div>
                        <div className={`Gold ${card === 2 ? 'fade-in' : 'fade-out'}`} onClick={closeCard}><img src={card2} alt="ProfileBackground" /></div>
                        <div className={`Dimond ${card === 3 ? 'fade-in' : 'fade-out'}`} onClick={closeCard}><img src={card3} alt="ProfileBackground" /></div>
                    </div>
                    
                    <div className={`CreateStore ${isAddstore ? 'fade-in' : 'fade-out'}`}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px' }}>
                            <div className="BookinfoPopupNav">
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
                    


                    <div className={`UserStoreSelect ${isUserStore ? 'fade-in' : 'fade-out'}`} >
                        <h1>Your Store</h1>
                        <div className='E' onClick={closeUserStore}></div>
                        <div className='cardStoreUser'>
                            {Storeu.length > 0 ? (
                                Storeu.map((data) => 
                                    <div className='CardInfoUser' key={data.ID}>
                                        <img src={data.UserPicStore || background} alt="background" />
                                        <div className='N'>{data.UserNameStore}</div>
                                        <div className='D'>{data.UserDescribStore}</div>
                                        <div className='bin' onClick={() => handleDelete(data.ID)}>🗑️</div>
                                    </div>
                                )
                            ) : (
                                <>
                                    <div></div>
                                    <div style={{margin:'0 auto'}}>
                                        <img src="https://media.tenor.com/lVhFnY9tc94AAAAi/anime-dance.gif" alt="anime gif" width={250} />
                                        <h2 style={{textAlign:'center'}}>You have no store!!!</h2>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    

                    
                </>
            
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
                    <span className='SubNab2'><Link to="/Main"><img style={{ width: '200px', height: '30px' }}  src={LOGO} alt="LOGO" /></Link></span>
                    <span className='SubNab3'>
                        <span className='welcome'>Hello! {user?.UserName} Welcome to ICONIC🎉</span>
                        {userIdstr &&
                            <img className='box' src={box} alt="box" onClick={GotoInbox} />
                        }
                        <img style={{ width: '45px', height: '45px', borderRadius: '50px', cursor: 'pointer' }} className='profileButton' src={user?.Profile || Hutao} alt="User" onClick={OpenMenu}></img>
                        
                            <div className={`dropboxMenu ${isMenuOpen ? 'fade-in' : 'fade-out'}`}>
                                {userIdstr ? (
                                    <a onClick={OpenProfile} ><p className='dropboxMenuP'>Your Profile</p></a>
                                ) : (
                                    <a><p className='dropboxMenuP'>Logging in as a guest</p></a>
                                )}
                                {userIdstr &&
                                    <Link to="/Recruitment"><a><p className='dropboxMenuP'>Recruitment</p></a></Link>
                                }
                                {(user?.Status === 'Employee' || user?.Status === 'Admin') &&
                                    <Link to="/CarPark-Attendant"><a><p className='dropboxMenuP'>Car Parking</p></a></Link>
                                }
                                {user?.Status === 'Admin' && 
                                    <Link to="/Admin"><a><p className='dropboxMenuP'>Management</p></a></Link>
                                }
                                {userIdstr &&
                                    <Link to="/Inbox"><a><p className='dropboxMenuP'>Payment</p></a></Link>
                                }
                                <div className='lineMenu'></div>
                                <p className='dropboxMenuP' onClick={Logout}>Log Out</p>
                            </div>
                        
                    </span>
                </nav> 
                <nav className='NavComponentMenu'>
                    <div></div>
                    <div>
                        <Link to="/Main"><a><span className={`MenuHover ${location.pathname === "/Main" ? "active" : ""}`}>NEWS</span></a></Link>
                        <Link to="/Store"><a><span className={`MenuHover ${location.pathname === "/Store" ? "active" : ""}`}>STORE</span></a></Link>
                        {(user?.Status === 'Admin' || user?.Status === 'Employee') && 
                            <Link to="/Hall"><a><span className={`MenuHover ${location.pathname === "/Hall" ? "active" : ""}`}>BOOK A HALL</span></a></Link>
                        }
                        {(user?.Status === 'Repairman' || user?.Status === 'Admin'|| user?.Status === 'Employee') &&
                            <Link to="/service"><a><span className='MenuHover'>SERVICEREQUEST</span></a></Link>
                        }
                        {(user?.Status === 'Cleaning' || user?.Status === 'Admin') &&
                            <Link to="/Cleaning"><a><span className={`MenuHover ${location.pathname === "/Cleaning" ? "active" : ""}`}>CLEANING</span></a></Link>
                        }
                        {(user?.Status === 'Repairman' || user?.Status === 'Cleaning' || user?.Status === 'Admin'|| user?.Status === 'Employee') &&
                            <Link to="/Inventory"><a><span className={`MenuHover ${location.pathname === "/Inventory" ? "active" : ""}`}>INVENTORY</span></a></Link>
                        }
                        {(user?.Status === 'User' || user?.Status === 'Member' || user?.Status === 'Admin') &&
                            <Link to="/CarPark"><a><span className={`MenuHover ${location.pathname === "/CarPark" ? "active" : ""}`}>CAR PARKING</span></a></Link>
                        }
                        {(user?.Status === 'User' || user?.Status === 'Member' || user?.Status === 'Admin') &&
                            <Link to="/about"><a><span className={`MenuHover ${location.pathname === "/about" ? "active" : ""}`}>ABOUT US</span></a></Link>
                        }
                    </div>
                    <div></div>
                </nav>
            
            </nav>
        </>
    );
};



export const IntroWeb: React.FC = () => {
    // const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    // const userIdstr = localStorage.getItem("id");
    const user_name = localStorage.getItem("user_name");
    // useEffect(() => {
    //     if (userIdstr) {
    //         fetchUserData(userIdstr);
    //     } else {
            
    //     }
    // }, [userIdstr]);

    // const fetchUserData = async (userIdstr: string ) => {
    //     try {
    //         const res = await GetUserById(userIdstr);
    //         if (res.status === 200) {
    //             setUser(res.data);
    //             //message.success("พบข้อมูลUser");
    //         } else {
                
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user data:", error);
    //         message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
    //     }
    // };

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
                    <h1>Hello! {user_name}</h1>
                    <h2>WELCOME TO ICONIC</h2>
                    <p>Press anywhere to skip</p>
                </div>
            }
        </>

    );

};
