import React from 'react';
import { NavBar } from '../../Component/NavBar';
import { FloorMenu } from './Floor/Floor';
import './StoreAndPay.css'
import PicNoStore from '../../../assets/icon/ForPage/Store/Store3.jpg';

const Store: React.FC = () => {
    const testdata = [
        {id: 1,Rating: 2},{id: 2,Rating: 5},{id: 3,Rating: 0},{id: 4,Rating: 3},
        {id: 5,Rating: 1},{id: 1,Rating: 1},{id: 2,Rating: 2},{id: 3,Rating: 2},
        {id: 4,Rating: 5},{id: 5,Rating: 2},{id: 1,Rating: 4},{id: 2,Rating: 5},
        {id: 3,Rating: 3},{id: 4,Rating: 4},{id: 5,Rating: 2},{id: 5,Rating: 4},
    ]

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
            );
        }
        return stars;
    };

    return (
        <>
            <NavBar />
            <FloorMenu />
            <div style={{height: '110px'}}></div>
            <div className='route'><a href="/Main">Home /</a>Store Directory</div>
            <div className='StoreMainContent'>
                <h1>Product advertising</h1>
                <div className='ContanerStore'>
                    <span style={{width: "20%"}}></span>
                    <span style={{width: "100%"}} className='Store'>
                        {testdata.length > 0 ? (
                            testdata.map((data) => (
                                <span key={data.id} className='cardStore'>
                                    <div><img src={PicNoStore} alt="PicNoStore" /></div>
                                    <div><p style={{fontSize: '28px' , color: '#000'}}>There are no stores yet.</p></div>
                                    <div className='lineStore'></div>
                                    <div className='rating'>{renderStars(data.Rating)}</div>
                                    <div className='lineStore'></div>
                                    <div><p>There are no stores yet.</p></div>
                                    <div className='ViewStore'>VIEW STORE  --</div>
                                </span>
                            ))
                        ) : (
                            <h1>No Data!</h1>
                        )}
                    </span>
                    <span style={{width: "20%"}}></span>
                </div>
            </div>
        </>

    );

};
export default Store;