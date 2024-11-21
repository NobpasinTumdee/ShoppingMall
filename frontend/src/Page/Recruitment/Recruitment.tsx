import React, { useEffect, useState } from 'react';
import './Recruitment.css';
import Stonk from '../../assets/icon/ForPage/Job/Stonk.png';
import Wow from '../../assets/icon/ForPage/Job/Wow.png';
import Bennett from '../../assets/icon/ForPage/Job/Bennett.png';
import Jean from '../../assets/icon/ForPage/Job/Jean.png';
import Noelle from '../../assets/icon/ForPage/Job/Noelle.png';
import Klee from '../../assets/icon/ForPage/Job/Klee.png';
import E from '../../assets/icon/ForPage/Job/NameTag.png';
import M from '../../assets/icon/ForPage/Job/UserGroups.png';
import C from '../../assets/icon/ForPage/Job/Housewife.png';
import t from '../../assets/icon/ForPage/Job/Plumber.png';
const Recruitment: React.FC = () => {
    const images = [Stonk, Wow];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='JobContenner'>
                <img src={images[currentImageIndex]} width={300} height={400} />
                <div className='InfoJobPreview'>
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                    <h1>Your dream job is waiting here!</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nesciunt laboriosam numquam <br /> nemo at ad corrupti. Quos aspernatur dolorum labore, voluptas non minus voluptatum libero <br /> laudantium! Totam quos dolores distinctio?</p>
                </div>
                
            </div>
            


            <div className='PreviewJob'>
                <h1>High Demand Jobs Categories Fratured</h1>
                <h1>Housekeeper position</h1>
                <h1>Employee</h1>
                <h1>Technician position</h1>
                <h1>Entrepreneur</h1>
            </div>

            <div className='NEWS'>
                <span></span>
                <p>JOB</p>
                <span></span>
            </div>

            {/* <div style={{width: 'auto' , height: '4px' , backgroundColor: '#E8D196', margin: '40px 150px'}}></div> */}

            <div className='BoxJob'>
                <div className='BoxJobC'>
                    <img src={E} width={100} />
                    <p>Employee</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic quod sapiente ab culpa ullam.</p>
                </div>
                <div className='BoxJobC'>
                    <img src={M} width={100} />
                    <p>Member</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic quod sapiente ab culpa ullam.</p>
                </div>
                <div className='BoxJobC'>
                    <img src={C} width={100} />
                    <p>Cleaning</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic quod sapiente ab culpa ullam.</p>
                </div>
                <div className='BoxJobC'>
                    <img src={t} width={100} />
                    <p>Repairman</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas hic quod sapiente ab culpa ullam.</p>
                </div>
            </div>

            <div className='MemberA'>
                <img src={Bennett} width={400} height={400} />
                <div className='infoA'>
                    <h1>Member</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel debitis repellat maiores cumque quidem consectetur soluta magni vitae, cupiditate necessitatibus explicabo vero saepe ut. Omnis incidunt vitae porro. Accusamus dolorum, expedita eligendi nostrum voluptates nam! Nulla sapiente tenetur in blanditiis ab architecto consequuntur nobis perferendis accusantium? Voluptate quia eaque delectus!</p>
                </div>
            </div>
            <div className='MemberB'>
                <div className='infoB'>
                    <h1>Employee</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel debitis repellat maiores cumque quidem consectetur soluta magni vitae, cupiditate necessitatibus explicabo vero saepe ut. Omnis incidunt vitae porro. Accusamus dolorum, expedita eligendi nostrum voluptates nam! Nulla sapiente tenetur in blanditiis ab architecto consequuntur nobis perferendis accusantium? Voluptate quia eaque delectus!</p>
                </div>
                <img src={Jean} width={400} height={400} />
            </div>
            <div className='MemberA'>
                <img src={Noelle} width={400} height={400} />
                <div className='infoA'>
                    <h1>Cleaning</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel debitis repellat maiores cumque quidem consectetur soluta magni vitae, cupiditate necessitatibus explicabo vero saepe ut. Omnis incidunt vitae porro. Accusamus dolorum, expedita eligendi nostrum voluptates nam! Nulla sapiente tenetur in blanditiis ab architecto consequuntur nobis perferendis accusantium? Voluptate quia eaque delectus!</p>
                </div>
            </div>
            <div className='MemberB'>
                <div className='infoB'>
                    <h1>Repairman</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel debitis repellat maiores cumque quidem consectetur soluta magni vitae, cupiditate necessitatibus explicabo vero saepe ut. Omnis incidunt vitae porro. Accusamus dolorum, expedita eligendi nostrum voluptates nam! Nulla sapiente tenetur in blanditiis ab architecto consequuntur nobis perferendis accusantium? Voluptate quia eaque delectus!</p>
                </div>
                <img src={Klee} width={400} height={400} />
            </div>
        </>

    );
};
export default Recruitment;