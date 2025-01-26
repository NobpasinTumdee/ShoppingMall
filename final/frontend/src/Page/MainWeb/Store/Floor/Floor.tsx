import React, { useState } from 'react';
import './Floor.css'

//Floor
import market from "../../../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../../../assets/icon/ForPage/MainIcon/LaptopSettings.png"
import map from "../../../../assets/icon/ForPage/MainIcon/Map.png"

import F1 from "../../../../assets/Floor/F1.jpg"
import F2 from "../../../../assets/Floor/F2.jpg"
import F3 from "../../../../assets/Floor/F3.jpg"
import F4 from "../../../../assets/Floor/F4.jpg"

export const FloorMenu: React.FC = () => {
    const [isFloor, setFloor] = useState(false);
    const FloorSet = () => {
        setFloor(!isFloor)
    };

    //F1
    const [isMap, setMap] = useState(false);
    const MapSet = () => {
        setMap(true)
    };
    const MapExit = () => {
        setMap(false)
    };

    //F1
    const [isMap2, setMap2] = useState(false);
    const MapSet2 = () => {
        setMap2(true)
    };
    const MapExit2 = () => {
        setMap2(false)
    };

    //F3
    const [isMap3, setMap3] = useState(false);
    const MapSet3 = () => {
        setMap3(true)
    };
    const MapExit3 = () => {
        setMap3(false)
    };

    //F4
    const [isMap4, setMap4] = useState(false);
    const MapSet4 = () => {
        setMap4(true)
    };
    const MapExit4 = () => {
        setMap4(false)
    };

    return (
        <>
            <div className='FloorMap' onClick={FloorSet}><img src={map} alt="map" /><span>Floor</span></div>
            {isFloor && 
                <div className='FloorContaner'>
                    <div className='SubFloor' onClick={MapSet4}><img src={Computer} alt="Computer" /></div>
                    <div className='SubFloor' onClick={MapSet3}><img src={Decorations} alt="Decorations" /></div>
                    <div className='SubFloor' onClick={MapSet2}><img src={Food} alt="Food" /></div>
                    <div className='SubFloor' onClick={MapSet}><img src={market} alt="market" /></div>
                </div>
            }

                <div className={`BGMap ${isMap === true ? 'fade-in' : 'fade-out'}`} onClick={MapExit}></div>
                <div className={`Map ${isMap === true ? 'fade-in' : 'fade-out'}`}>
                    <div className='ExitMap'onClick={MapExit}>X</div>
                    <p>FLOOR I</p>
                    <img src={F1} alt="Floor1" />
                </div>


                <div className={`BGMap ${isMap2 === true ? 'fade-in' : 'fade-out'}`} onClick={MapExit2}></div>
                <div className={`Map ${isMap2 === true ? 'fade-in' : 'fade-out'}`}>
                    <div className='ExitMap'onClick={MapExit2}>X</div>
                    <p>FLOOR II</p>
                    <img src={F2} alt="Floor2" />
                </div>


                <div className={`BGMap ${isMap3 === true ? 'fade-in' : 'fade-out'}`} onClick={MapExit3}></div>
                <div className={`Map ${isMap3 === true ? 'fade-in' : 'fade-out'}`}>
                    <div className='ExitMap'onClick={MapExit3}>X</div>
                    <p>FLOOR III</p>
                    <img src={F3} alt="Floor3" />
                </div>

                <div className={`BGMap ${isMap4 === true ? 'fade-in' : 'fade-out'}`} onClick={MapExit4}></div>
                <div className={`Map ${isMap4 === true ? 'fade-in' : 'fade-out'}`}>
                    <div className='ExitMap'onClick={MapExit4}>X</div>
                    <p>FLOOR IV</p>
                    <img src={F4} alt="Floor4" />
                </div>

        </>
    );

};
