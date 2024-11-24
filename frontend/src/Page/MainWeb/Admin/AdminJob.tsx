import React, { useEffect, useState } from 'react';
import '../Main.css'
import PicB from '../../../assets/icon/ForPage/Store/Store3.jpg'
import PicP from '../../../assets/icon/ForPage/MainIcon/HuTaopic.jpg'

import { GetUserByStatus , UpdateUserByid , ListUser} from '../../../services/https';
import { UsersInterface } from '../../../interfaces/UsersInterface';
const AdminJob: React.FC = () => {
    const [user,setuser] = useState<UsersInterface[]>([]);
    //const [Alluser,setAlluser] = useState<UsersInterface[]>([]);
    useEffect(() => {
        //fetchData('Admin');
        fetchAlluser();
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
    const fetchAlluser = async () => {
        try {
            const res = await ListUser()
            if (res.status === 200 ) {
                setuser(res.data)
                console.log("succes!!!")
            }else {
                setuser([])
            }
        } catch (error) {
            setuser([])
            console.error("Error fetching all user data:", error);
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
        }else{
            window.location.reload();
        }
    }
    //================================== update status ===================================
    const UpdateStatus = async (userdata : UsersInterface, newStatus: string) => {
        const values : UsersInterface = {...userdata , Status: newStatus}
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
        //const newStatus = "Admin";
        if (data.Status == "WaitEmployee") {
            const newStatus = "Employee";
            UpdateStatus(data,newStatus);
        }else if(data.Status == "WaitMember"){
            const newStatus = "Member";
            UpdateStatus(data,newStatus);
        }else if(data.Status == "WaitCleaning"){
            const newStatus = "Cleaning";
            UpdateStatus(data,newStatus);
        }else if(data.Status == "WaitRepairman"){
            const newStatus = "Repairman";
            UpdateStatus(data,newStatus);
        }
    }
    const Notapproved = (data : UsersInterface) => {
        const newStatus = "User";
        UpdateStatus(data,newStatus);
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
                <p onClick={() => setBtn(5)}>All</p>
            </div>
            <div style={{margin: '0px 20%'}}>
                <div className='JobRQ' >
                {user.length > 0 ? (
                    user.map((data) => (
                            <div className='cardUser'key={data.ID}>
                                <img src={data.ProfileBackground||PicB} alt="" className='backgroundUserJob' />
                                <img src={data.Profile||PicP} alt="" className='ProfileUserJob' />
                                <div className='infoUser'>
                                    <p style={{fontSize: '16px' ,fontWeight: '900'}}>{data.UserName}</p>
                                    <p>{data.FirstName} {data.LastName}</p>
                                    <p>{data.Email}</p>
                                    <p>{data.Tel}</p>
                                </div>
                                <div className='StatusUser'>{data.Status}</div>
                                <div className='setButton'>
                                    {(data?.Status === 'WaitEmployee' || data?.Status === 'WaitMember' || data?.Status === 'WaitCleaning' || data?.Status === 'WaitRepairman') &&
                                    <>
                                        <p onClick={() => setData(data)}>Approve</p>
                                        <p onClick={() => Notapproved(data)}>Not approved</p>
                                    </>
                                    }
                                </div>
                            </div>
                    ))
                ) : (
                    <>
                        <h1 style={{textAlign: 'center'}}>No applicants</h1>
                    </>
                )}
                </div>
            </div>
        </>
    );
};

export default AdminJob;