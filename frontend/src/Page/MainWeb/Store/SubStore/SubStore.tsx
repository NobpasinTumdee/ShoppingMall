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
import { GetUserById } from '../../../../services/https';

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


    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    //const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (UserID) {
            fetchUserData(String(UserID));
        }
    }, [UserID]);

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

    const testdata = [
         {id: 1,Rating: 2},{id: 2,Rating: 5},{id: 3,Rating: 0},{id: 4,Rating: 3},
         {id: 5,Rating: 1},{id: 1,Rating: 1},{id: 2,Rating: 2},{id: 3,Rating: 2},
         {id: 4,Rating: 5},{id: 5,Rating: 2},{id: 1,Rating: 4},{id: 2,Rating: 5},
         {id: 3,Rating: 3},{id: 4,Rating: 4},{id: 5,Rating: 2},{id: 5,Rating: 4},
    ]
    //=========================ตรวจสอบStatusStore============================================
    const [statusCanbook,setStatus] = useState(false);
    useEffect(() => {
        if (StatusStore == 'This store is available for reservation.') {
            setStatus(true);
        }else{
            setStatus(false);
        }
    }, [UserID]);
    return (
        <>
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
                    <h1 style={{marginLeft: '70px'}}>{NameStore} </h1>
                <div className='infoSubStore'>
                    <div className='picstoresub'>
                        <span><img src={SubPicOne || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" /></span>
                        <span><img src={SubPicTwo || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" /></span>
                        <span><img src={SubPicThree || 'https://habibza.in/wp-content/uploads/2021/08/404.png'} alt="PicStore" /></span>
                    </div>
                    <h1>Store information</h1>
                    <p>The store is on floor F{ID}.</p>
                    <p>{DescribtionStore} Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident fugit rem, est eum voluptatibus harum dolorem animi nobis esse quas voluptatem nostrum deserunt omnis numquam impedit tenetur et iure. Voluptate pariatur consequatur ipsa adipisci commodi obcaecati ratione illo officiis aut, optio earum doloremque aspernatur veniam molestiae vitae. Modi eaque cumque corporis ea? Quasi voluptas exercitationem consectetur facere ipsam ad fuga saepe distinctio molestiae nobis beatae quia asperiores error veritatis non, vel totam sunt cumque fugiat neque nisi corporis. Commodi neque est eligendi quis sunt itaque ipsa assumenda eius quod deserunt! Officiis tenetur libero rerum rem incidunt excepturi. Temporibus tenetur dicta omnis rerum sit. Officiis velit minus distinctio debitis, dicta dignissimos quod hic dolorum placeat doloremque omnis sunt. Soluta recusandae asperiores saepe. Quasi fuga nam, earum blanditiis id laudantium recusandae sit, iusto, aperiam aut voluptates incidunt veniam fugiat! Iste nihil porro libero officiis suscipit debitis, cupiditate possimus! Corrupti suscipit iste sunt enim! Odit harum velit facere tempore voluptatem non, molestias magni dolor eaque impedit unde debitis dicta, reprehenderit doloribus quidem ex! Repellat accusamus suscipit numquam excepturi velit illum blanditiis omnis cupiditate quo voluptatibus? Quis ullam ipsa inventore perspiciatis facilis necessitatibus illum, consectetur nobis deleniti, alias voluptatibus praesentium quaerat distinctio minus nisi!</p>
                    <p>The store's contract starts on {formattedBookingDate}</p>
                    <p>The contract will end on {formattedLastDay}</p>
                    <p>Status Store {StatusStore} from id user {UserID} on the floor {ProductTypeID} {MembershipID}</p>
                    <h1 >Rating and Feedback</h1>
                    
                    <div className='RatingandFeedback'>
                    {testdata.length > 0 ? (
                        testdata.map((data ,index) => (
                            <div className='cardFeedbackbox' key={index}>
                            <div className='cardFeedback'>
                                <img src={Pic} alt="Pic" />
                                <span>Name</span>
                            </div>
                            <div className='rating'>{renderStars(data.Rating)}</div>
                            <div className='comment'><p>Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit amet consectetur</p></div>
                        </div>))
                        ) : (
                            <>
                                <h1 >No Comment. . .</h1>
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubStore;
