import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GetBackUpByid } from '../../../services/https';
import { BackupStoreInterface } from '../../../interfaces/StoreInterface';
import Nostore from '../../../assets/icon/ForPage/Store/Store3.jpg'
const BackUpStore: React.FC = () => {
    const location = useLocation();
    const {ID} = location.state as { ID: number; };
    useEffect(() => {
        fetchBackUp(String(ID))
    }, [])
    const [Store, setStore] = useState<BackupStoreInterface[]>([]);
    const fetchBackUp = async (Storeid: string ) => {
        try {
            const res = await GetBackUpByid(Storeid);
            if (res.status === 200) {
                setStore(res.data);
            }
        } catch (error) {
            setStore([]);
        }
    };

    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <h1 className='H1Management'>History Store</h1>
            <div className='BackUpC'>
                {Store.length > 0 ? (
                    Store.map((data,index) => (
                        <div key={index} className='BackUpCard'>
                            <img src={data.PicStoreBackup || Nostore} alt="" height={150} width={250}/>
                            <img className='UserPicBackup' style={{borderRadius: '50%'}} src={data.User?.Profile || "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"} alt="" height={40} width={40}/>
                            <div style={{marginLeft: '-30px'}}>
                                <p>{data.ID}.{data.NameBackup} "{data.User?.UserName}"</p>
                                <p style={{height: '60px',width: '300px' , overflowY: 'scroll' , lineHeight: '15px'}}>{data.DescribtionStoreB}</p>
                                <p>Start : {data.BookingBackup ? new Intl.DateTimeFormat('en-GB').format(new Date(data.BookingBackup)) : 'No Date'}</p>
                                <p>End : {data.LastDayBackup ? new Intl.DateTimeFormat('en-GB').format(new Date(data.LastDayBackup)) : 'No Date'}</p>
                            </div>
                            <img style={{margin: '0 5px',borderRadius:'10px'}} src={data.PicOneBackup|| 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="" height={100} width={200}/>
                            <img style={{margin: '0 5px',borderRadius:'10px'}} src={data.PicTwoBackup|| 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="" height={100} width={200}/>
                            <img style={{margin: '0 5px',borderRadius:'10px'}} src={data.PicThreeBackup|| 'https://theecommmanager.com/wp-content/uploads/sites/6/2022/11/what-is-a-shopping-cart-in-ecommerce-featured-image-01-1200x630.png'} alt="" height={100} width={200}/>
                        </div>
                    ))
                ) : (
                    <>
                        <div style={{textAlign:'center'}}>
                            <img src="https://media.tenor.com/lVhFnY9tc94AAAAi/anime-dance.gif" alt="anime gif" width={250} />
                        </div>
                        <h1 className='H1Management'>There is no history of space reservation.</h1>
                    </>
                )}
            </div>
        </>
    );
};
export default BackUpStore;