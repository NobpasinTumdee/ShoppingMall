import React, { useEffect, useState } from 'react';
import './SubStore.css';
import { useLocation } from 'react-router-dom';
import {message} from 'antd'
import { useNavigate } from 'react-router-dom';

//import { NavBar } from '../../../../Page/Component/NavBar';
import Pic from "../../../../assets/icon/ForPage/MainIcon/Userpic.jpg"
import PicFloor from "../../../../assets/icon/ForPage/Store/Reserve.png"
import PicNoStore from '../../../../assets/icon/ForPage/Store/Store3.jpg';
//API
import { UsersInterface } from "../../../../interfaces/UsersInterface";
import { RatingInterface , AverageRatingInterface , StoreInterface} from '../../../../interfaces/StoreInterface';
import { GetUserById , GetCommentByStore , CreateComment , GetAvgCommentByStore , GetStoreById} from '../../../../services/https';

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
    }, [Store?.StatusStore, userWatch?.Status]);

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
                    <img style={{margin: '0 10px'}} src={Store?.SubPicOne || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                    <img style={{margin: '0 10px'}} src={Store?.SubPicTwo || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                    <img style={{margin: '0 10px'}} src={Store?.SubPicThree || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                </div>
                <div className='infoSubStore'>
                    <h1>Store information</h1>
                    <p>The store is on floor F{ID}.</p>
                    <p>{Store?.DescribtionStore}</p>
                    <p>The store's contract starts on {new Date(String(Store?.BookingDate)).toLocaleDateString()}</p>
                    <p>The contract will end on {new Date(String(Store?.LastDay)).toLocaleDateString()}</p>
                    <p>Status Store {Store?.StatusStore} <br /> from id user: {Store?.UserID}<br /> on the floor: {Store?.ProductTypeID}<br /> Membership: {Store?.MembershipID}</p>
                    
                    <div className='picstoresub'>
                        <span className='infoPicStore'>
                            <img src={Store?.SubPicOne || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
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
                            <img src={Store?.SubPicTwo || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                        </span>
                        <span className='infoPicStore'>
                            <img src={Store?.SubPicThree || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
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
            </div>
        </>
    );
};

export default SubStore;
