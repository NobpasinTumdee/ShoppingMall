import React, { useEffect, useState } from 'react';
import './Recruitment.css';
import { Image } from 'antd';
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

import Award1 from "../../assets/icon/ForPage/MainIcon/Award1.png"
import Award2 from "../../assets/icon/ForPage/MainIcon/Award2.png"
import Award3 from "../../assets/icon/ForPage/MainIcon/Award3.png"
import Award4 from "../../assets/icon/ForPage/MainIcon/Award4.png"
import Award5 from "../../assets/icon/ForPage/MainIcon/Award5.png"

import { UsersInterface } from '../../interfaces/UsersInterface';
import { GetUserById , UpdateUserByid} from '../../services/https';
const Recruitment: React.FC = () => {
    const images = [Stonk, Wow];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    const [Popup, setPopup] = useState(false);
    const SaveStatus = (S : any) => {
        if (S == 1) {
            setStatusHolder('WaitEmployee')
        }else if (S == 2) {
            setStatusHolder('WaitMember')
        }else if (S == 3) {
            setStatusHolder('WaitCleaning')
        }else if (S == 4) {
            setStatusHolder('WaitRepairman')
        }
        setPopup(true)
    };
    const ClosePopupState = () => {
        setPopup(false)
    }

    //====================================data user========================================
    const [user, setUser] = useState<UsersInterface | null>(null); // State to store user data
    const userIdstr = localStorage.getItem("id");
    useEffect(() => {
        if (userIdstr) {
            fetchUserData(userIdstr);
        } else {
            
        }
    }, [userIdstr]);
    const fetchUserData = async (userIdstr: string ) => {
        try {
            const res = await GetUserById(userIdstr);
            if (res.status === 200) {
                setUser(res.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const [checked, setChecked] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    }
    //================================== update status ===================================
    const UpdateStatus = async (user : UsersInterface) => {
        const values : UsersInterface = {...user , Status: StatusHolder}
        try {
            const res = await UpdateUserByid(String(userIdstr), values);
            if (res.status === 200) {
                setPopup(false)
                setTimeout(() => {
                    window.location.reload();
                }, 500); 
            } else {

            }
        } catch (error) {

        }
    }
    const [StatusHolder, setStatusHolder] = useState('');
    const SubmitStatus = () => {
        if (user) {
            UpdateStatus(user);
        }
    };
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='JobContenner'>
                <Image src={images[currentImageIndex]} width={300} height={400} />
                <div className='InfoJobPreview'>
                    <p>Role Overview Your dream job.</p>
                    <h1>Your dream job is waiting here!</h1>
                    <p>As a Member Employee at ICONIC, your primary responsibility is to provide <br /> an exceptional experience for our valued members. You serve as the face of the mall’s loyalty <br /> and membership program, ensuring that members feel valued</p>
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
                <div className='BoxJobC' onClick={() => SaveStatus(1)}>
                    <img src={E} width={100} />
                    <p>Employee</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Assist customers in registering for the ICONIC membership program. Provide guidance on the benefits.</p>
                </div>
                <div className='BoxJobC' onClick={() => SaveStatus(2)}>
                    <img src={M} width={100} />
                    <p>Member</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Act as a point of contact for member inquiries, addressing concerns related to membership benefits.</p>
                </div>
                <div className='BoxJobC' onClick={() => SaveStatus(3)}>
                    <img src={C} width={100} />
                    <p>Cleaning</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Perform scheduled cleaning tasks, including sweeping, mopping, vacuuming, and dusting throughout the mall premises.</p>
                </div>
                <div className='BoxJobC' onClick={() => SaveStatus(4)}>
                    <img src={t} width={100} />
                    <p>Repairman</p>
                    <p style={{fontSize: '14px' , fontWeight: '100', margin: '20px'}}>Conduct regular inspections of the mall’s systems, including electrical, plumbing, HVAC, and escalator systems.</p>
                </div>
            </div>

            <div className='MemberA'>
                <Image src={Bennett} width={400} height={400} />
                <div className='infoA'>
                    <h1>Member</h1>
                    <p>Role Overview : As a Member Employee at ICONIC, your primary responsibility is to provide an exceptional experience for our valued members. You serve as the face of the mall’s loyalty and membership program, ensuring that members feel valued, recognized, and appreciated during every interaction.</p>
                    <p>Ideal Candidate : A Member Employee should have excellent interpersonal and communication skills, a strong understanding of customer service principles, and the ability to remain calm and composed in high-pressure situations. Proficiency in handling technology-based loyalty systems is an added advantage.</p>
                </div>
            </div>
            <div className='MemberB'>
                <div className='infoB'>
                    <h1>Employee</h1>
                    <p>Exclusive Services Coordination : Coordinate access to VIP lounges, personalized shopping assistants, and exclusive events for members. Ensure members receive priority services, enhancing their overall experience at ICONIC.</p>
                    <p>Gather member feedback to help ICONIC continually improve its services and offerings. Communicate suggestions to the management team and contribute to refining member-focused strategies.</p>
                </div>
                <Image src={Jean} width={400} height={400} />
            </div>
            <div className='MemberA'>
                <Image src={Noelle} width={400} height={400} />
                <div className='infoA'>
                    <h1>Cleaning</h1>
                    <p>Role Overview : As a Cleaning Staff member at ICONIC, you play a vital role in maintaining the pristine, luxurious environment that defines the mall. Your work ensures that every corner of ICONIC reflects the high standards of cleanliness and hygiene our guests expect.</p>
                    <p>Ideal Candidate : The ideal Cleaning Staff member is detail-oriented, physically fit, and committed to maintaining cleanliness standards. A positive attitude, time management skills, and the ability to work independently or as part of a team are essential.</p>
                </div>
            </div>
            <div className='MemberB'>
                <div className='infoB'>
                    <h1>Repairman</h1>
                    <p>Role Overview : As a Repairman at ICONIC, your role is crucial in ensuring that the mall operates seamlessly. You are responsible for maintaining and repairing the mall's infrastructure, ensuring all facilities function safely and efficiently for both customers and staff.</p>
                    <p>Ideal Candidate : A Repairman should possess technical skills in electrical, mechanical, and general maintenance work. The ability to troubleshoot and solve problems efficiently, along with strong organizational and time management skills, is essential. Experience with building maintenance systems is preferred.</p>
                </div>
                <Image src={Klee} width={400} height={400} />
            </div>


            
                <div className={`Information ${Popup ? 'Open' : 'Close'}`}> 
                    <h1>Your information {StatusHolder}</h1>
                    <div className='Informationsub'>
                        <div className='datauser'>
                            <img src={user?.Profile || Klee} width={100} height={100} />
                            <div style={{marginLeft: '10px'}}>
                                <p>User Name : {user?.UserName}</p>
                                <p>First Name : {user?.FirstName}</p>
                                <p>Last Name : {user?.LastName}</p>
                            </div>
                            <div style={{marginLeft: '15px'}}>
                                <p>Gmail : {user?.Email}</p>
                                <p>Tel : {user?.Tel}</p>
                                <p>Age : {user?.Age}</p>
                            </div>
                            <div className='Status'>{user?.Status}</div>
                        </div>
                        <div style={{margin:'50px 5%'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis suscipit omnis voluptates iste accusantium, quibusdam nam? Cupiditate, nulla eius accusamus libero consectetur voluptatem molestiae sapiente ex accusantium alias consequatur deleniti excepturi saepe nemo similique reiciendis eos temporibus cum ea error quo nobis in facilis dolorem. Praesentium quis nesciunt atque iusto?</div>
                    </div>
                    <div style={{margin:'0px 5%'}}><label><input type="checkbox" checked={checked} onChange={handleChange} />Accept the terms and conditions of application</label></div>
                    <div className={`SubmitBB ${checked ? 'Open' : 'Close'}`} onClick={SubmitStatus}>Submit an application</div>
                </div>
            <div className={`backB ${Popup ? 'Open' : 'Close'}`}onClick={ClosePopupState}></div>


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
export default Recruitment;