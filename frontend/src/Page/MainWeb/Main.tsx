import React, { useEffect, useRef, useState } from 'react';
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
//import axios from 'axios';
import './Main.css';

import { GetStoreByFloor , GetEvent } from '../../services/https';
import { StoreInterface } from '../../interfaces/StoreInterface';
import { EventInterface } from '../../interfaces/UsersInterface';
import STMB from '../../assets/Audio/SwayToMyBest.mp3'
import STMBpic from '../../assets/Audio/SwayToMyBeat.jpg'
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
    //==============================================ดึงข้อมูลร้านค้า========================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
        if (1) {
            fetchStore('1');
        }
    }, [1]);

    const fetchStore = async (id: string ) => {
        try {
            const res = await GetStoreByFloor(id);
            if (res.status === 200) {
                setStore(res.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
      
    const [popup, setpopup] = useState(false);
    const Openpopup = () => {
        setpopup(!popup)
    };
    //=================================================ดึงข้อมูลevent=====================================
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
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='ButtonMusic' onClick={Openpopup}>{popup ? "💛" : "🥳"}</div>
            <div className={`showMusic ${popup ? 'show' : 'notshow'}`}>
                <MusicPlayer />
            </div>
                
            <div className='AdvertisingMain'>
                <img src={images[currentImageIndex]} alt="Product" className={`fade ${fade ? 'visible' : 'hidden'}`}  />
                <span className='advertisingtext'>
                    {Event ? (
                        <>
                            <h1>{Event[0]?.event_topic || "Discover the Ultimate"}</h1>
                            {Event[0]?.event_description || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quia consequuntur, eos dolor officiis mollitia quae, molestiae numquam quisquam voluptatum dignissimos, fugit modi veniam. Consectetur error commodi voluptatem quam! Quas, commodi ad, harum consequatur tenetur esse ullam quisquam amet atque, veritatis vel odio magnam sunt provident aspernatur officia ipsa sed!"} 
                        </>
                    ) : (
                        <>
                            <h1>Product advertising</h1>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quia consequuntur, eos dolor officiis mollitia quae, molestiae numquam quisquam voluptatum dignissimos, fugit modi veniam. Consectetur error commodi voluptatem quam! Quas, commodi ad, harum consequatur tenetur esse ullam quisquam amet atque, veritatis vel odio magnam sunt provident aspernatur officia ipsa sed!
                        </>
                    )}
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

            {Store &&
                <>
                    <div className='NEWS'>
                        <span></span>
                        <p>STORE</p>
                        <span></span>
                    </div>
                        <div className='Store1'> 
                            <div ><img src={Store[0]?.pic_store||st} alt="" /></div>
                            <div ><img src={Store[1]?.pic_store||st} alt="" /></div>
                            <div ><img src={Store[2]?.pic_store||st} alt="" /></div>
                            <div ><img src={Store[3]?.pic_store||st} alt="" /></div>
                            <div ><img src={Store[4]?.pic_store||st} alt="" /></div>
                            <div ><img src={Store[5]?.pic_store||st} alt="" /></div>
                            <div ><img src={Store[6]?.pic_store||st} alt="" /></div>
                            <div ><img src={Store[7]?.pic_store||st} alt="" /></div>
                        </div>
                </>
            }
            <div className='NEWS'>
                <span></span>
                <p>NEWS</p>
                <span></span>
            </div>
            <div className='NewInfo'>
                {Event.length > 0 ? (
                    Event.map((data,index) => (
                        <div className='SubInfo' key={index}>
                            <img src={data.event_pic} alt="Newtest" width={350} height={200} />
                            <span>
                                <h4>{data.event_topic}</h4>
                                <p>{data.ID} {data.event_description || 'No description'}</p>
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



export const MusicPlayer: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // ค่าเริ่มต้นเสียง 100%
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
    return(
        <>
            <div className='Audio'>
                <div className='AudioTop'>
                    <img src={STMBpic} alt="STMBpic" width={60} height={60} style={{borderRadius: '5px'}} />
                    <div className='AudioTopP'>
                        <p>Sway To My Beat</p>
                        <p>Artist: miHoYo, Chevy</p>
                    </div>
                </div>
                <div className='Player'>
                    <audio ref={audioRef} src={STMB} onLoadedMetadata={handleLoadedMetadata} onTimeUpdate={handleTimeUpdate} ></audio>
                    <div>◀</div>
                    <button onClick={togglePlayPause}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <div>▶</div>
                </div>
                
                <div className='vol'>
                    <label>
                    🥳
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onChange={handleTimeChange}
                    />
                    </label>
                </div>

                <div className='vol'>
                    <label>
                    🔈
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    </label>
                </div>
                <div style={{textAlign:'right' ,marginRight: '20px',color: '#fff'}}>
                    <span>
                    {Math.floor(currentTime)} / {Math.floor(duration)} s
                    </span>
                </div>
            </div>
            <div className={`spin ${isPlaying === true ? 'active' : 'stop'}`}>
                <img src={STMBpic} alt="" width={70} height={70} style={{borderRadius:'50%'}} />
            </div>
        </>
    );
};