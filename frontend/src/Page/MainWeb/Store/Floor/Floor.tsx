import React from 'react';
import './Floor.css'

//Floor
import market from "../../../../assets/icon/ForPage/MainIcon/Market.png"
import Food from "../../../../assets/icon/ForPage/MainIcon/FoodBar.png"
import Decorations from "../../../../assets/icon/ForPage/MainIcon/Home.png"
import Computer from "../../../../assets/icon/ForPage/MainIcon/LaptopSettings.png"


export const FloorMenu: React.FC = () => {

    return (
        <>
            <div className='FloorContaner'>
                <div className='SubFloor'><img src={Computer} alt="Computer" /></div>
                <div className='SubFloor'><img src={Decorations} alt="Decorations" /></div>
                <div className='SubFloor'><img src={Food} alt="Food" /></div>
                <div className='SubFloor'><img src={market} alt="market" /></div>
            </div>
        </>
    );

};
