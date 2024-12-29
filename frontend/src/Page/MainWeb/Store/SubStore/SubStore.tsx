import React, { useEffect, useState } from 'react';
import './SubStore.css';
import { useLocation } from 'react-router-dom';
import {message,Upload} from 'antd'
import type {  UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

//import { NavBar } from '../../../../Page/Component/NavBar';
import Pic from "../../../../assets/icon/ForPage/MainIcon/Userpic.jpg"
import PicFloor from "../../../../assets/icon/ForPage/Store/Reserve.png"
import PicNoStore from '../../../../assets/icon/ForPage/Store/Store3.jpg';
//API
import { UsersInterface } from "../../../../interfaces/UsersInterface";
import { RatingInterface , AverageRatingInterface , StoreInterface} from '../../../../interfaces/StoreInterface';
import { GetUserById , GetCommentByStore , CreateComment , GetAvgCommentByStore , GetStoreById , UpdateStoreByid} from '../../../../services/https';

const SubStore: React.FC = () => {
    const location = useLocation();
    const { 
        ID,
    } = location.state as { 
        ID: number;
    };

    //===========================================To page sub==========================================
    const navigate = useNavigate();
    const handleStoreClick = () => {
        navigate('/BookStore', { 
          state: { 
            ID: ID,NameStore: Store?.NameStore,ProductTypeID: Store?.ProductTypeID
          } 
        });
      };

    //=================================================================================================


    const [user, setUser] = useState<UsersInterface | null>(null);
    const [Store, setStore] = useState<StoreInterface | null>(null);
    const [userWatch, setUserWatch] = useState<UsersInterface | null>(null);
    useEffect(() => {
            fetchStoreData(String(ID));
            fetchComment(String(ID));
            fetchRating(String(ID));
            fetchUserWatching();
    }, []);

    const fetchStoreData = async (Storeid: string ) => {
        try {
            const res = await GetStoreById(Storeid);
            if (res.status === 200) {
                setStore(res.data);
                if (res.data.UserID) {
                    fetchUserData(String(res.data.UserID));
                }
                //message.success("พบข้อมูลUser");
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };
    const fetchUserData = async (userIdStore: string ) => {
        try {
            const res = await GetUserById(userIdStore);
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลUser");
        }
    };
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

    //======================================star========================================================
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
            );
        }
        return stars;
    };

    const [Rating, setRating] = useState<RatingInterface[]>([]);
    const fetchComment = async (ID: string ) => {
        try {
            const res = await GetCommentByStore(ID);
            if (res.status === 200) {
                setRating(res.data);
            }
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการดึงข้อมูลComment");
        }
    };
    const userIdstr = localStorage.getItem("id");
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment || !userIdstr || !ID) {
            message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        const commentData: RatingInterface = {
            Rating: newRating,
            Comment: newComment,
            UserID: Number(userIdstr),
            StoreID: ID,
        };

        try {
            const res = await CreateComment(commentData);
            if (res.status === 201) {
                message.success("เพิ่มความคิดเห็นสำเร็จ");
                fetchComment(String(ID));
                setNewComment('');
                setNewRating(0);
                fetchRating(String(ID))
            } else {
                message.error("เกิดข้อผิดพลาดในการเพิ่มความคิดเห็น");
            }
        } catch {
            message.error("เกิดข้อผิดพลาด");
        }
    };

    //=========================ตรวจสอบStatusStore============================================
    const [statusCanbook,setStatus] = useState(false);
    useEffect(() => {
        if (Store?.StatusStore === 'This store is available for reservation.' && (userWatch?.Status === 'Admin' || userWatch?.Status === 'Member' || userWatch?.Status === 'Employee')) {
                setStatus(true);
        }else{
            setStatus(false);
        }
        if (Store?.StatusStore !== 'This store is available for reservation.' && (userWatch?.Status === 'Admin' || userWatch?.UserName === Store?.User?.UserName)) {
            setStatusEdit(true);
            setServicePopup(true);
        }else{
            setStatusEdit(false);
            setServicePopup(false);
        }
    }, [Store?.StatusStore, userWatch?.Status]);
    const [statusCanEdit,setStatusEdit] = useState(false);
    const [ServicePopup,setServicePopup] = useState(false);
    const [Service,setService] = useState(false);

    //========================================review=========================================
    const [RatingAvg, setRatingAvg] = useState<AverageRatingInterface | null>(null);
    const fetchRating = async (StoreID: string) => {
        try {
            const res = await GetAvgCommentByStore(StoreID);
            if (res.status === 200) {
                setRatingAvg(res.data)
            } else {

            }
        } catch (error) {

        }
    };
    //=======================================Edit Store=====================================
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
        store_name: '',
        store_pic: '',
        sub_pic_one: '',
        sub_pic_two: '',
        sub_pic_three: '',
        store_description: '',
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
        EditStore(formData);
        setPopup(false);
    };
    const EditStore = async (formData: any) => {
        if (formData.store_pic) {
            const valuesWithpic: StoreInterface = {
                NameStore: formData.store_name,
                PicStore: formData.store_pic,
                SubPicOne: formData.sub_pic_one,
                SubPicTwo: formData.sub_pic_two,
                SubPicThree: formData.sub_pic_three,
                DescribtionStore: formData.store_description,
            };
            try {
                const res = await UpdateStoreByid(String(Store?.ID),valuesWithpic);
                if (res.status === 200) {
                    await fetchStoreData(String(Store?.ID));
                }
            } catch (error) {
                console.error("Error Edit:", error);
            }
        }else{
            const values: StoreInterface = {
                NameStore: formData.store_name,
                DescribtionStore: formData.store_description,
            };
            try {
                const res = await UpdateStoreByid(String(Store?.ID),values);
                if (res.status === 200) {
                    await fetchStoreData(String(Store?.ID));
                }
            } catch (error) {
                console.error("Error Edit:", error);
            }
        }
    }
    //============================================Service=====================================
    const ServiceRQ = async (data: string) => {
        if (data === "Request") {
            const valuesStoreUpdate: StoreInterface = {
                StatusService: 'Request',
            };
            try {
                const res = await UpdateStoreByid(String(ID),valuesStoreUpdate);
                if (res.status === 200) {
                    message.success("Store Request.");
                    await fetchStoreData(String(ID));;
                }
            } catch (error) {
                message.error("Send error.");
            }
        }else if (data === "NoRequest") {
            const valuesStoreUpdate: StoreInterface = {
                StatusService: 'NoRequest',
            };
            try {
                const res = await UpdateStoreByid(String(ID),valuesStoreUpdate);
                if (res.status === 200) {
                    message.success("Store NoRequest.");
                    await fetchStoreData(String(ID));;
                }
            } catch (error) {
                message.error("Send error.");
            }
        }
        
    }
    return (
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='route'>
                <a href="/Main">Home /</a>
                <a style={{ padding: '0px' }} href="/Store">Store Directory /</a>
                {Store?.NameStore}
            </div>
            {statusCanbook && 
                <div className='BookingBtn' onClick={() => handleStoreClick()}><p>Booking</p><span><img src={PicFloor} alt="PicFloor" /></span></div>
            }
            <div>
                <div className='picStore'><img src={Store?.PicStore ||  PicNoStore} alt="PicStore" /><span>The store is on floor F{Store?.ProductTypeID}.</span></div>
                <img className='ProfileUserStore' src={user?.Profile || Pic} alt="Profile" />
                <div style={{height: '120px'}}></div>
                <div className='gropInfoStoreUser'>
                    <h1 >{Store?.NameStore}</h1>
                    <p>Rating : {renderStars(Number(RatingAvg?.averageRating.toFixed(2)))}</p>
                </div>
                <div className='picstoresub' style={{justifyContent: 'center',margin: '0 10%' ,display: 'flex'}}>
                    <img style={{margin: '0 10px'}} src={Store?.SubPicOne || 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="PicStore" />
                    <img style={{margin: '0 10px'}} src={Store?.SubPicTwo || 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="PicStore" />
                    <img style={{margin: '0 10px'}} src={Store?.SubPicThree || 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="PicStore" />
                </div>
                <div className='infoSubStore'>
                    <h1>Store information</h1>
                    <p>The store is on floor F{ID}.</p>
                    <p>{Store?.DescribtionStore}</p>
                    <p>The store's contract starts on {new Date(String(Store?.BookingDate)).toLocaleDateString()}</p>
                    <p>The contract will end on {new Date(String(Store?.LastDay)).toLocaleDateString()}</p>
                    <p style={{fontSize: '36px'}}>Shop owner information</p>
                    <p>Owner : {Store?.User?.FirstName || "Not specified"} {Store?.User?.LastName || "Not specified"}<br />Email : {Store?.User?.Email || "Not specified"}<br />Tel : {Store?.User?.Tel || "Not specified"}<br />Floor : F{Store?.ProductTypeID}{Store?.ID || "Not specified"}<br />Membership : {Store?.Membership?.PackageName || "Not specified"} <br />Status Store : {Store?.StatusStore || "Not specified"} <br /> </p>
                    
                    <div className='picstoresub'>
                        <span className='infoPicStore'>
                            <img src={Store?.SubPicOne || 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="PicStore" />
                            <div>
                                <p style={{fontSize: '30px',fontWeight: '800'}}>Preview Product!</p>
                                <p style={{fontSize: '20px'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil expedita sunt sequi, corporis impedit magni cupiditate maxime optio fuga necessitatibus natus, similique consequatur laboriosam fugiat praesentium! Quo tenetur debitis quos velit aperiam consequuntur odit sunt rerum itaque magnam adipisci quae, culpa iusto sit doloremque, nisi dicta repellendus error eveniet in. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni soluta tenetur impedit ratione est nobis placeat esse, eaque totam provident?</p>
                            </div>
                        </span>
                        <span className='infoPicStore'>
                        <div>
                                <p style={{fontSize: '30px',fontWeight: '800',textAlign: 'right'}}>Preview Product!</p>
                                <p style={{fontSize: '20px',textAlign: 'right'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil expedita sunt sequi, corporis impedit magni cupiditate maxime optio fuga necessitatibus natus, similique consequatur laboriosam fugiat praesentium! Quo tenetur debitis quos velit aperiam consequuntur odit sunt rerum itaque magnam adipisci quae, culpa iusto sit doloremque, nisi dicta repellendus error eveniet in. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni soluta tenetur impedit ratione est nobis placeat esse, eaque totam provident?</p>
                            </div>
                            <img src={Store?.SubPicTwo || 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="PicStore" />
                        </span>
                        <span className='infoPicStore'>
                            <img src={Store?.SubPicThree || 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="PicStore" />
                            <div>
                                <p style={{fontSize: '30px',fontWeight: '800'}}>Preview Product!</p>
                                <p style={{fontSize: '20px'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil expedita sunt sequi, corporis impedit magni cupiditate maxime optio fuga necessitatibus natus, similique consequatur laboriosam fugiat praesentium! Quo tenetur debitis quos velit aperiam consequuntur odit sunt rerum itaque magnam adipisci quae, culpa iusto sit doloremque, nisi dicta repellendus error eveniet in. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni soluta tenetur impedit ratione est nobis placeat esse, eaque totam provident?</p>
                            </div>
                        </span>
                    </div>
                    <h1 >Rating and Feedback</h1>
                    {Store?.UserID !== 0 &&
                    <div className='commentContaner'>
                        <img src={userWatch?.Profile || Pic} width={50} height={50} />
                        <div className='inputComment'>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <label htmlFor="AddComment">Add Your Comment</label>
                                <div>
                                    <input
                                        type="text"
                                        id="AddComment"
                                        name="AddComment"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        required
                                    />
                                    <select
                                        name="Star"
                                        id="Star"
                                        value={newRating}
                                        onChange={(e) => setNewRating(Number(e.target.value))}
                                        style={{ marginLeft: '5px' }}
                                    >
                                        <option value={0}>0 Very bad</option>
                                        <option value={1}>1 Bad</option>
                                        <option value={2}>2 Not Bad</option>
                                        <option value={3}>3 Nice</option>
                                        <option value={4}>4 Good</option>
                                        <option value={5}>5 very Good</option>
                                    </select>
                                    <button type="submit">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>}
                    <div className='RatingandFeedback'>
                    {Rating.length > 0 ? (
                        Rating.map((data ,index) => (
                            <div className='cardFeedbackbox' key={index}>
                            <div className='cardFeedback'>
                                <img src={data.User?.Profile || Pic} alt="Pic" />
                                <span>{data.User?.UserName}</span>
                            </div>
                            <div className='rating'>{renderStars(Number(data.Rating))}</div>
                            <div className='comment'><p>{data.Comment || "No Comment. . ."}</p></div>
                        </div>))
                        ) : (
                            <>
                                <h3 style={{fontFamily: '"Parkinsans", sans-serif' ,fontWeight: '100'}}>No Comment. . .</h3>
                            </>
                        )}
                        
                    </div>
                </div>
                {statusCanEdit &&
                    <div onClick={() => setPopup(true)} style={{position: 'fixed' , bottom: '100px', right: '10px',padding: '10px 5px',backgroundColor:'#E8D196',margin:'10px 0',borderRadius: '5px 0 0 5px',borderRight: '5px solid #000',fontFamily:'"Abel", sans-serif',fontWeight:'500',cursor:'pointer'}}>
                        EDITING
                    </div>
                }
                {isPopup &&
                    <>
                        <div className='EditStore'>
                            EDITING YOUR STORE
                            <div>
                                <form onSubmit={handleSubmitEdit}>
                                    <div>
                                        <label style={{fontSize: '18px', margin: '0px',fontWeight: '100'}}>Name</label>
                                    </div>
                                    <input
                                        style={{borderRadius:'20px',border:'2px solid #C9AF62',padding: '5px 10px'}}
                                        type="text"
                                        id="store_name"
                                        name="store_name"
                                        value={formData.store_name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div>
                                        <label style={{fontSize: '18px', margin: '0px',fontWeight: '100'}}>Upload Photo</label>
                                    </div>
                                    <Upload id="Pic" fileList={fileList} onChange={onChange} onPreview={onPreview} beforeUpload={(file) => { setFileList([...fileList, file]); return false;}} 
                                        maxCount={4} multiple={false} listType="picture-card" >
                                        <div><PlusOutlined /><div style={{ marginTop: 8 , fontWeight: '100'}}>Upload</div></div>
                                    </Upload>
                                    <div>
                                        <label style={{fontSize: '18px', margin: '0px',fontWeight: '100'}}>Description</label>
                                    </div>
                                    <textarea
                                        style={{borderRadius:'10px',border:'2px solid #C9AF62', height: '100px',width:'500px',padding: '5px 10px'}}
                                        id="store_description"
                                        name="store_description"
                                        value={formData.store_description}
                                        onChange={handleChange}
                                        required={true}
                                    />
                                    <button className='SubmitEdit' style={{backgroundColor:'#E8D196'}}>Confirm</button>
                                    <button className='SubmitEdit' onClick={() => setPopup(false)}>Close</button>
                                </form>
                            </div>
                        </div>
                        <div className='backgroundevent' onClick={() => setPopup(false)}></div>
                    </>
                }
                {ServicePopup &&
                    <>
                        <div onClick={() => setService(true)} style={{cursor:"pointer",fontFamily:'"Abel", sans-serif',position:'fixed',right:'10px',bottom:'160px',backgroundColor:'#E8D196',padding:"10px 10px",borderRadius:'5px 0 0 5px',borderRight:"5px solid #000",fontWeight:'500'}}>
                            SERVICE
                        </div>
                        {Service &&
                            <>
                                <div className='servicestore' style={{fontFamily:'"Abel", sans-serif'}}>
                                    <h2 style={{textAlign:'center'}}>ServiceRequest</h2>
                                    <div style={{backgroundColor:'#fff',display:'flex',justifyContent:'start',boxShadow:"0 0 10px #e0e0e0",margin:'0 10px'}}>
                                        <img src={Store?.PicStore||PicNoStore} alt="PicStore" width={150} />
                                        <div style={{lineHeight:'5px'}}>
                                            <p style={{fontWeight:'800'}}>{Store?.NameStore}</p>
                                            <p>UserName: {Store?.User?.UserName} Name: {Store?.User?.FirstName || "Not set"} {Store?.User?.LastName}</p>
                                            <p>Gmail: {Store?.User?.Email || "No data."}</p>
                                            <p>Tel: {Store?.User?.Tel || "No data."}</p>
                                        </div>
                                        <p style={{margin:'auto',backgroundColor:"#E8D196",padding:'5px 10px',borderRadius:'20px',fontWeight:'700',color:"#fff",boxShadow:"0 0 10px #E8D196"}}>{Store?.StatusService}</p>
                                    </div>
                                    <div style={{margin:"20px 10px"}}>
                                        <button onClick={() => ServiceRQ('Request')} style={{marginRight:'10px'}} className='buttonConfirm'>REQUEST</button>
                                        <button onClick={() => ServiceRQ('NoRequest')}className='buttonConfirm'>NOT REQUEST</button>
                                    </div>
                                </div>
                                <div className='backgroundevent' onClick={() => setService(false)}></div>
                            </>
                        }
                    </>
                }
            </div>
        </>
    );
};

export default SubStore;
