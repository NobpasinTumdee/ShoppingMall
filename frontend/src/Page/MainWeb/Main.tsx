import React, { useEffect, useState } from 'react';
//import { NavBar } from '../Component/NavBar';
import Product from "../../assets/icon/ForPage/MainIcon/Product.png";
import Product1 from "../../assets/icon/ForPage/MainIcon/Product/PD1.png";
import Product2 from "../../assets/icon/ForPage/MainIcon/Product/PD2.png";
import Product3 from "../../assets/icon/ForPage/MainIcon/Product/PD3.png";
import Product4 from "../../assets/icon/ForPage/MainIcon/Product/PD4.png";

//Floor
import market from "../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../assets/icon/ForPage/MainIcon/LaptopSettings.png"
import st from "../../assets/icon/ForPage/Store/Store3.jpg"

//New
import Newtest from "../../assets/icon/ForPage/MainIcon/TestNew.png"
//import axios from 'axios';
import './Main.css';

import { GetStoreByFloor } from '../../services/https';
import { StoreInterface } from '../../interfaces/StoreInterface';
const Main: React.FC = () => {
    const images = [Product1, Product2, Product3, Product4, Product];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(true); 

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); 
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true); 
            }, 500); 
        }, 8000); 

        return () => clearInterval(interval);
    }, []);

    const testdata = [
        {
            id: 1,
            Name: "Product advertising",
            info: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 2,
            Name: "Product advertising",
            info: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 3,
            Name: "Product advertising",
            info: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
            id: 4,
            Name: "Product advertising",
            info: "loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
    ]
    // const gmail = {
    //     to: 'porporpor547@gmail.com',
    //     subject: 'test',
    //     message: 'test message',
    //   };
      
    //   const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //       const response = await axios.post('http://localhost:8000/send-email', gmail);
    //       alert(response.data.message);
    //     } catch (error) {
    //       console.error(error);
    //       alert('Failed to send email');
    //     }
    //   };
    const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
        if (1) {
            fetchStore('1');
        } else {
            
        }
    }, [1]);

    const fetchStore = async (id: string ) => {
        try {
            const res = await GetStoreByFloor(id);
            if (res.status === 200) {
                setStore(res.data);
            }else {
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
      
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='AdvertisingMain'>
                <img src={images[currentImageIndex]} alt="Product" className={`fade ${fade ? 'visible' : 'hidden'}`}  />
                <span className='advertisingtext'>
                    <h1>Product advertising</h1>
                    loremLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt  
                    mollit anim id est laborum.
                </span>
            </div>
            {/* <div onClick={handleSubmit}>Gmail</div> */}
            
            <div className='Floor'>
                <span className='subFloor'>
                    <img src={market} alt="market" />
                    <h4>NIGHT MARKET</h4>
                    <p>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit, sed <br />do eiusmod tempor incididunt <br />ut labore et dolore </p>
                </span>
                <span className='subFloor'>
                    <img src={Food} alt="Food" />
                    <h4>FOOD CENTER</h4>
                    <p>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit, sed <br />do eiusmod tempor incididunt <br />ut labore et dolore </p>
                </span>
                <span className='subFloor'>
                    <img src={Decorations} alt="Decorations" />
                    <h4>DECORATIONS</h4>
                    <p>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit, sed <br />do eiusmod tempor incididunt <br />ut labore et dolore </p>
                </span>
                <span className='subFloor'>
                    <img src={Computer} alt="Computer" />
                    <h4>COMPUTER EQUIPMENT</h4>
                    <p>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit, sed <br />do eiusmod tempor incididunt <br />ut labore et dolore </p>
                </span>
            </div>

            <div className='NEWS'>
                <span></span>
                <p>STORE</p>
                <span></span>
            </div>
            <div className='Store1'> 
                <div ><img src={Store[1]?.PicStore||st} alt="" /></div>
                <div ><img src={Store[2]?.PicStore||st} alt="" /></div>
                <div ><img src={Store[3]?.PicStore||st} alt="" /></div>
                <div ><img src={Store[4]?.PicStore||st} alt="" /></div>
                <div ><img src={Store[5]?.PicStore||st} alt="" /></div>
                <div ><img src={Store[6]?.PicStore||st} alt="" /></div>
                <div ><img src={Store[7]?.PicStore||st} alt="" /></div>
                <div ><img src={Store[8]?.PicStore||st} alt="" /></div>
            </div>
            <div className='NEWS'>
                <span></span>
                <p>NEWS</p>
                <span></span>
            </div>
            <div className='NewInfo'>
                {testdata.length > 0 ? (
                    testdata.map((data) => (
                        <div className='SubInfo' key={data.id}>
                            <img src={Newtest} alt="Newtest" />
                            <span>
                                <h4>{data.Name}</h4>
                                <p>{data.id} {data.info} </p>
                            </span>
                        </div>
                    ))
                ) : (
                    <div>No data!</div>
                )}
            </div>


            <footer>
                <span>1</span>
                <span>1</span>
                <span>1</span>
            </footer>

        </>
    );
};
export default Main;