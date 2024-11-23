import React, { useEffect, useState } from 'react';
import '../Main.css'
import PicB from '../../../assets/icon/ForPage/Store/Store3.jpg'
import PicP from '../../../assets/icon/ForPage/MainIcon/HuTaopic.jpg'

import { GetUserByStatus , UpdateUserByid} from '../../../services/https';
import { UsersInterface } from '../../../interfaces/UsersInterface';
const AdminJob: React.FC = () => {
    const [user,setuser] = useState<UsersInterface[]>([]);
    useEffect(() => {
        fetchData('Admin');
    },[])
    const fetchData = async (Status : string) => {
        try {
            const res = await GetUserByStatus(Status)
            if (res.status === 200 ) {
                setuser(res.data)
                console.log("succes!!!")
            }else {
                setuser([])
            }
        } catch (error) {
            setuser([])
            console.error("Error fetching user data:", error);
        }
    }
    const setBtn = (state : any) => {
        if (state === 1) {
            fetchData("WaitMember");
        }else if (state === 2) {
            fetchData("WaitEmployee");
        }else if (state === 3) {
            fetchData("WaitCleaning");
        }else if (state === 4) {
            fetchData("WaitRepairman");
        }
        
    }
    //================================== update status ===================================
    const [userS,setuserS] = useState('');
    const UpdateStatus = async (userdata : UsersInterface) => {
        const values : UsersInterface = {...userdata , Status: userS}
        try {
            const res = await UpdateUserByid(String(userdata.ID), values);
            if (res.status === 200) {
                setTimeout(() => {
                    window.location.reload();
                }, 500); 
            } else {

            }
        } catch (error) {

        }
    }
    const setData = (data : UsersInterface) => {
        setuserS("Admin")
        setTimeout(() => {
            UpdateStatus(data); // เรียกฟังก์ชันหลังจากตั้งค่า
        }, 100);
    }
    return (
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <h1 className='headJob'>Job application results</h1>
            <div className='selcetStatus'>
                <p onClick={() => setBtn(1)}>Member</p>
                <p onClick={() => setBtn(2)}>Employee</p>
                <p onClick={() => setBtn(3)}>Cleaning</p>
                <p onClick={() => setBtn(4)}>Repairman</p>
            </div>
            <div style={{margin: '0px 20%'}}>
                <div className='JobRQ' >
                {user.length > 0 ? (
                    user.map((data) => (
                        <>
                            <div className='cardUser'key={data.ID}>
                                <img src={data.ProfileBackground||PicB} alt="" className='backgroundUserJob' />
                                <img src={data.Profile||PicP} alt="" className='ProfileUserJob' />
                                <div className='infoUser'>
                                    <p style={{fontSize: '16px' ,fontWeight: '900'}}>{data.UserName}</p>
                                    <p>{data.FirstName} {data.LastName}</p>
                                    <p>{data.Email}</p>
                                    <p>{data.Tel}</p>
                                </div>
                                <p onClick={() => setData(data)}>อนุมัติ</p>
                                <p >ไม่อนุมัติ</p>
                            </div>
                        </>
                    ))
                ) : (
                    <>
                        <h1 style={{textAlign: 'center'}}>No Data</h1>
                    </>
                )}
                </div>
            </div>
        </>
    );
};

export default AdminJob;