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
import { RatingInterface , AverageRatingInterface} from '../../../../interfaces/StoreInterface';
import { GetUserById , GetCommentByStore , CreateComment , GetAvgCommentByStore} from '../../../../services/https';

const SubStore: React.FC = () => {
    const location = useLocation();
    const { 
        ID,
        PicStore,
        SubPicOne,
        SubPicTwo,
        SubPicThree,
        MembershipID,
        NameStore,
        BookingDate,
        LastDay,
        DescribtionStore,
        StatusStore,
        UserID,
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

    //===========================================To page sub==========================================
    const navigate = useNavigate();
    const handleStoreClick = () => {
        navigate('/BookStore', { 
          state: { 
            ID: ID,
            PicStore: PicStore,
            SubPicOne: SubPicOne,
            SubPicTwo: SubPicTwo,
            SubPicThree: SubPicThree,
            MembershipID: MembershipID,
            NameStore: NameStore,
            BookingDate: BookingDate,
            LastDay: LastDay,
            DescribtionStore: DescribtionStore,
            StatusStore: StatusStore,
            UserID: UserID,
            ProductTypeID: ProductTypeID,
          } 
        });
      };

    //=================================================================================================


    const [user, setUser] = useState<UsersInterface | null>(null);
    const [userWatch, setUserWatch] = useState<UsersInterface | null>(null);
    useEffect(() => {
        if (UserID) {
            fetchUserData(String(UserID));
            fetchComment(String(ID));
            fetchRating(String(ID));
        }
    }, [UserID]);

    const fetchUserData = async (userIdStore: string ) => {
        try {
            const res = await GetUserById(userIdStore);
            if (res.status === 200) {
                setUser(res.data);
                //message.success("พบข้อมูลUser");
            }
            const resWatch = await GetUserById(String(userIdstr));
            if (resWatch.status === 200) {
                setUserWatch(resWatch.data);
                //message.success("พบข้อมูลUser");
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
        if (StatusStore == 'This store is available for reservation.') {
            setStatus(true);
        }else{
            setStatus(false);
        }
    }, [UserID]);

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
                {NameStore}
            </div>
            {statusCanbook && 
                <div className='BookingBtn' onClick={() => handleStoreClick()}><p>Booking</p><span><img src={PicFloor} alt="PicFloor" /></span></div>
            }
            <div>
                <div className='picStore'><img src={PicStore ||  PicNoStore} alt="PicStore" /><span>The store is on floor F{ProductTypeID}.</span></div>
                <img className='ProfileUserStore' src={user?.Profile || Pic} alt="Profile" />
                <div style={{height: '120px'}}></div>
                <div className='gropInfoStoreUser'>
                    <h1 >{NameStore}</h1>
                    <p>Rating : {renderStars(Number(RatingAvg?.averageRating.toFixed(2)))}</p>
                </div>
                <div className='picstoresub' style={{justifyContent: 'center',margin: '0 10%' ,display: 'flex'}}>
                    <img style={{margin: '0 10px'}} src={SubPicOne || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                    <img style={{margin: '0 10px'}} src={SubPicTwo || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                    <img style={{margin: '0 10px'}} src={SubPicThree || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                </div>
                <div className='infoSubStore'>
                    <h1>Store information</h1>
                    <p>The store is on floor F{ID}.</p>
                    <p>{DescribtionStore} Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident fugit rem, est eum voluptatibus harum dolorem animi nobis esse quas voluptatem nostrum deserunt omnis numquam impedit tenetur et iure. Voluptate pariatur consequatur ipsa adipisci commodi obcaecati ratione illo officiis aut, optio earum doloremque aspernatur veniam molestiae vitae. Modi eaque cumque corporis ea? Quasi voluptas exercitationem consectetur facere ipsam ad fuga saepe distinctio molestiae nobis beatae quia asperiores error veritatis non, vel totam sunt cumque fugiat neque nisi corporis. Commodi neque est eligendi quis sunt itaque ipsa assumenda eius quod deserunt! Officiis tenetur libero rerum rem incidunt excepturi. Temporibus tenetur dicta omnis rerum sit. Officiis velit minus distinctio debitis, dicta dignissimos quod hic dolorum placeat doloremque omnis sunt. Soluta recusandae asperiores saepe. Quasi fuga nam, earum blanditiis id laudantium recusandae sit, iusto, aperiam aut voluptates incidunt veniam fugiat! Iste nihil porro libero officiis suscipit debitis, cupiditate possimus! Corrupti suscipit iste sunt enim! Odit harum velit facere tempore voluptatem non, molestias magni dolor eaque impedit unde debitis dicta, reprehenderit doloribus quidem ex! Repellat accusamus suscipit numquam excepturi velit illum blanditiis omnis cupiditate quo voluptatibus? Quis ullam ipsa inventore perspiciatis facilis necessitatibus illum, consectetur nobis deleniti, alias voluptatibus praesentium quaerat distinctio minus nisi!</p>
                    <p>The store's contract starts on {formattedBookingDate}</p>
                    <p>The contract will end on {formattedLastDay}</p>
                    <p>Status Store {StatusStore} <br /> from id user: {UserID}<br /> on the floor: {ProductTypeID}<br /> Membership: {MembershipID}</p>
                    
                    <div className='picstoresub'>
                        <span className='infoPicStore'>
                            <img src={SubPicOne || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
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
                            <img src={SubPicTwo || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                        </span>
                        <span className='infoPicStore'>
                            <img src={SubPicThree || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" />
                            <div>
                                <p style={{fontSize: '30px',fontWeight: '800'}}>Preview Product!</p>
                                <p style={{fontSize: '20px'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil expedita sunt sequi, corporis impedit magni cupiditate maxime optio fuga necessitatibus natus, similique consequatur laboriosam fugiat praesentium! Quo tenetur debitis quos velit aperiam consequuntur odit sunt rerum itaque magnam adipisci quae, culpa iusto sit doloremque, nisi dicta repellendus error eveniet in. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni soluta tenetur impedit ratione est nobis placeat esse, eaque totam provident?</p>
                            </div>
                        </span>
                    </div>
                    <h1 >Rating and Feedback</h1>
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
                    </div>
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
