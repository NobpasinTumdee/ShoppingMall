import React, { useEffect, useRef, useState } from 'react';
//import { NavBar } from '../Component/NavBar';
import Product from "../../assets/icon/ForPage/MainIcon/Product.png";
import Product1 from "../../assets/icon/ForPage/MainIcon/Product/PD1.png";
import Product2 from "../../assets/icon/ForPage/MainIcon/Product/PD2.png";
import Product3 from "../../assets/icon/ForPage/MainIcon/Product/PD3.png";
import Product4 from "../../assets/icon/ForPage/MainIcon/Product/PD4.png";
import { Image } from 'antd';

//Floor
import market from "../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../assets/icon/ForPage/MainIcon/LaptopSettings.png"
import st from "../../assets/icon/ForPage/Store/Store3.jpg"
import Award1 from "../../assets/icon/ForPage/MainIcon/Award1.png"
import Award2 from "../../assets/icon/ForPage/MainIcon/Award2.png"
import Award3 from "../../assets/icon/ForPage/MainIcon/Award3.png"
import Award4 from "../../assets/icon/ForPage/MainIcon/Award4.png"
import Award5 from "../../assets/icon/ForPage/MainIcon/Award5.png"
import promotion from "../../assets/icon/ForPage/MainIcon/promotion.png"

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
                
            <div className='AdvertisingMain' id='#Top'>
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
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus odit ipsam earum recusandae dolor id eius velit, non amet alias pariatur tempora dolores itaque voluptatum ullam, beatae quae officia? Earum!</p>
                </span>
                <span className='subFloor'>
                    <img src={Food} alt="Food" />
                    <h4>FOOD CENTER</h4>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus odit ipsam earum recusandae dolor id eius velit, non amet alias pariatur tempora dolores itaque voluptatum ullam, beatae quae officia? Earum!</p>
                </span>
                <span className='subFloor'>
                    <img src={Decorations} alt="Decorations" />
                    <h4>DECORATIONS</h4>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus odit ipsam earum recusandae dolor id eius velit, non amet alias pariatur tempora dolores itaque voluptatum ullam, beatae quae officia? Earum!</p>
                </span>
                <span className='subFloor'>
                    <img src={Computer} alt="Computer" />
                    <h4>COMPUTER</h4>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus odit ipsam earum recusandae dolor id eius velit, non amet alias pariatur tempora dolores itaque voluptatum ullam, beatae quae officia? Earum!</p>
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
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70px',margin:"20px 10% 40px"}}>
                <div style={{backgroundColor:"#B0946F",height:'4px',width:'70%'}}></div>
                <h1 style={{fontFamily:'"Trirong", serif',textAlign:'center',width:'100%'}}>WHAT DO YOU WANT TO WEAR!</h1>
                <div style={{backgroundColor:"#B0946F",height:'4px',width:'70%'}}></div>
            </div>
            <div className="marquee-section">
                <div className="marquee-div">
                    <div className="marquee">
                        94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑 94 NEW STYLES JUST LANDED. SHOP NOW. 👑
                    </div>
                </div>
            </div>
            <div className='PreviewProduct'>
                <img src={promotion} alt="promotion" />
                <img src="https://media.bergdorfgoodman.com/f_auto,q_auto:good,ar_5:7,c_fill,dpr_1.0,w_720/01/bg_4889534_100244_m" alt="Product" width={250} />
                <img src="https://media.bergdorfgoodman.com/f_auto,q_auto:good,ar_5:7,c_fill,dpr_1.0,w_720/01/bg_4889534_100244_a" alt="Product" width={250} />
                <img src="https://media.bergdorfgoodman.com/f_auto,q_auto:good,ar_5:7,c_fill,dpr_1.0,w_720/01/bg_4314237_100313_m" alt="Product" width={250} />
                <img src="https://media.bergdorfgoodman.com/f_auto,q_auto:good,ar_5:7,c_fill,dpr_1.0,w_720/01/bg_4314237_100313_a" alt="Product" width={250} />
                <img src="https://media.bergdorfgoodman.com/f_auto,q_auto:good,ar_5:7,c_fill,dpr_1.0,w_720/01/bg_4889559_100106_m" alt="Product" width={250} />
                <img src="https://media.bergdorfgoodman.com/f_auto,q_auto:good,ar_5:7,c_fill,dpr_1.0,w_720/01/bg_4889559_100106_a" alt="Product" width={250} />
            </div>

            <div className='NEWS'>
                <span></span>
                <p>NEWS</p>
                <span></span>
            </div>
            <div className='NewInfo'>
                {Event.length > 0 ? (
                    Event.map((data,index) => (
                        <div className='SubInfo' key={index}>
                            <Image src={data.event_pic} alt="Newtest"  width={350} height={200} />
                            <span style={{width:'65%'}}>
                                <h4>{data.event_topic}</h4>
                                <p>{data.ID} {data.event_description || 'No description'}</p>
                            </span>
                        </div>
                    ))
                ) : (
                    <div>No data!</div>
                )}
            </div>

            <div className='Ad2'>
                <div className='Ad2sub'>
                    <h1>We Will Always Have London</h1>
                    <h3 style={{fontSize:'22px', fontWeight:'100',opacity:'0.7'}}>Stories of places, people and moments – Debbie Harry and Kelsey Lu star in a new campaign by creative director Sabato De Sarno and shot by Nan Goldin, showcasing the Gucci Blondie bag and Cruise 2025 collection.</h3>
                </div>
                <img src="https://media.gucci.com/content/DiaryArticleDouble_Standard_2800x1788/1727279103/DiaryArticleDouble_Gucci-Blondie-Sept24-B0002041-v5-online_001_Default.jpg" alt="" />
                <p style={{fontSize:'16px', fontWeight:'100',opacity:'0.8',textAlign:'center'}}>Turn the volume on to listen to the campaign's soundtrack.</p>
            </div>
            <div className='Store1'> 
                <div ><img src='https://download.logo.wine/logo/Gucci/Gucci-Logo.wine.png' alt="" /></div>
                <div ><img src='https://blog.logomaster.ai/hs-fs/hubfs/Apple-logo-iPhone.jpg?width=672&height=448&name=Apple-logo-iPhone.jpg' alt="" /></div>
                <div ><img src='https://style.katexoxo.com/wp-content/uploads/2020/09/1-23-1024x576.jpg' alt="" /></div>
                <div ><img src='https://static.vecteezy.com/system/resources/thumbnails/020/336/375/small/nike-logo-nike-icon-free-free-vector.jpg' alt="" /></div>
                <div ><img src='https://mbluxury1.s3.amazonaws.com/2022/02/25172616/chanel-1.jpg' alt="" /></div>
                <div ><img src='https://www.logo.wine/a/logo/Puma_(brand)/Puma_(brand)-Logo.wine.svg' alt="" /></div>
                <div ><img src='https://mbluxury1.s3.amazonaws.com/2022/02/25172711/versace.jpg' alt="" /></div>
                <div ><img src='https://img.edvido.com/lamborghini-logo-61f5d.png' alt="" /></div>
            </div>
            <div style={{margin:'50px 0'}}>
                <img style={{margin:'0 10%',width:'80%'}} src="https://media.gucci.com/content/DiaryArticleDouble_Standard_2800x1788/1727279107/DiaryArticleDouble_Gucci-Blondie-Sept24-B0003182-v5-online_001_Default.jpg" alt="" />
            </div>
            <div style={{margin:'50px 10%',display:'flex',justifyContent:'space-between'}}>
                <img style={{width:"49%"}} src="https://media.gucci.com/content/DiaryArticleSingle_Standard_1536x2150/1728985548/DiaryArticleSingle_Gucci-Blondie-Oct24-001_001_Default.jpg" alt="" />
                <img style={{width:"49%"}} src="https://media.gucci.com/content/DiaryArticleSingle_Standard_1536x2150/1728985551/DiaryArticleSingle_Gucci-Blondie-Oct24-LMK00335_001_Default.jpg" alt="" />
            </div>
            <p style={{fontSize:'16px', fontWeight:'100',opacity:'0.8',textAlign:'center',fontFamily:'Arial, Helvetica, sans-serif'}}>The new We Will Always Have London campaign is presented in exclusive locations and Gucci Art Walls around the world.</p>
            
            <div style={{textAlign:'center',margin:'40px'}}>
                <a href="#Top" className='RTTOP'>Return to Top</a>
            </div>

            <footer>
                <div style={{display: 'flex', margin: '0 100px',fontFamily:'"Trirong", serif'}}>
                    <span>
                        <div style={{color: '#fff'}}>
                            Getting here <br />
                            Upadate News <br />
                            7 Wondrous <br />
                            About us <br />
                            Vision & Mission <br />
                            Privacy policy <br />
                        </div>
                    </span>
                    <span>
                        <div style={{color: '#fff'}}>
                            Board of Director <br />
                            Award <br /> 
                            Contact us <br /> 
                            Tenant services <br />
                        </div>
                    </span>
                </div>
                <div>
                    <div>
                        <span><Image src={Award1} alt="Award1" width={80}/></span>
                        <span><Image src={Award3} alt="Award3" width={70}/></span>
                        <span><Image src={Award3} alt="Award3" width={70}/></span>
                        <span><Image src={Award3} alt="Award3" width={70}/></span>
                        <span><Image src={Award3} alt="Award3" width={70}/></span>
                        <span><Image src={Award2} alt="Award2" width={100}/></span>
                    </div>
                    <div>
                        <span><Image src={Award4} alt="Award4" width={250}/></span>
                        <span><Image src={Award5} alt="Award5" width={150}/></span>
                    </div>
                </div>
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