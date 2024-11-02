import React, { useState } from 'react';
import './Floor.css'

//Floor
import market from "../../../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../../../assets/icon/ForPage/MainIcon/LaptopSettings.png"
import map from "../../../../assets/icon/ForPage/MainIcon/Map.png"


export const FloorMenu: React.FC = () => {
    const [isFloor, setFloor] = useState(false);
    const FloorSet = () => {
        setFloor(!isFloor)
    };

    const [isMap, setMap] = useState(false);
    const MapSet = () => {
        setMap(true)
    };
    const MapExit = () => {
        setMap(false)
    };

    return (
        <>
            <div className='FloorMap' onClick={FloorSet}><img src={map} alt="map" /><span>Floor</span></div>
            {isFloor && 
                <div className='FloorContaner'>
                    <div className='SubFloor' onClick={MapSet}><img src={Computer} alt="Computer" /></div>
                    <div className='SubFloor' onClick={MapSet}><img src={Decorations} alt="Decorations" /></div>
                    <div className='SubFloor' onClick={MapSet}><img src={Food} alt="Food" /></div>
                    <div className='SubFloor' onClick={MapSet}><img src={market} alt="market" /></div>
                </div>
            }
            {isMap && 
                <>
                <div className='BGMap' onClick={MapExit}></div>
                <div className='Map'>
                    <div className='ExitMap'onClick={MapExit}>X</div>
                    <h1>Map</h1>
                </div>
                </>
            }
        </>
    );

};
