import React, { useEffect, useState } from 'react';
import './Inbox.css';
//import { useNavigate } from 'react-router-dom';
import iconInbox from '../../../assets/icon/ForPage/Messenger/InBox.png';
import OnlinePayment from '../../../assets/icon/ForPage/Messenger/OnlinePayment.png';
import { GetMessageById } from '../../../services/https';
import { MessageBoardInterface } from '../../../interfaces/UsersInterface';

const Inbox: React.FC = () => {
    //const navigate = useNavigate();
    // const handleStoreClick = () => {
    //     navigate('/Inbox');
    // };

    //https://cdn-icons-png.flaticon.com/512/4272/4272841.png
    //https://www.shutterstock.com/image-vector/no-upload-sign-allowed-icon-600nw-2417466507.jpg
    //https://cdn-icons-png.flaticon.com/512/4942/4942676.png
    const [isInbox, setInbox] = useState(false);
    const OpenInbox = () => {
        setInbox(!isInbox);
    };
    const closeInbox = () => {
        setInbox(false)
    };

    const [isPayment, setPayment] = useState(false);
    const OpenPayment = () => {
        setPayment(!isPayment);
    };
    // const closePayment = () => {
    //     setPayment(false)
    // };

    //================================Messeage====================================
    const userIdstr = localStorage.getItem("id");
    const [Messeage, setMesseage] = useState<MessageBoardInterface[]>([]);
    useEffect(() => {
        if (1) {
            fetchMesseage(userIdstr);
        }
    }, [1]);
    
    const fetchMesseage = async (userIdstr : any) => {
        try {
            const res = await GetMessageById(userIdstr);
            if (res.status === 200 && res.data) {
                setMesseage(res.data);
            } else {
                setMesseage([]); 
            }
        } catch (error) {
            setMesseage([]);
        }
    };
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='MandP'><h1>Messenger & Payment</h1></div>
            <div className='twoicon'>
                <div className='boxMandP' onClick={OpenInbox}>
                    <img src={iconInbox} alt="iconInbox" />
                    <h1>In Box</h1>
                </div>
                <div className='boxMandP' onClick={OpenPayment}>
                    <img src={OnlinePayment} alt="OnlinePayment" />
                    <h1>Payment</h1>
                </div>
            </div>

            
            <div className={`Inbox ${isInbox ? 'fade-in' : 'fade-out'}`}>
                <p className='Messages'>Messages</p>
                <div className='AllMessagesbox'>
                    {Messeage.length > 0 ? (
                        Messeage.map((data) => (
                            <>
                                <div className='Messagesbox' key={data.ID}>
                                    <img src={data.PicNews || iconInbox} alt="iconInbox" />
                                    <div className='Messagesboxtext'>
                                        <p>{data.TextHeader}</p>
                                        <div className='MessagesboxtextINFO'>
                                            <p>{data.DescribtionNews}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    ) : (
                        <>
                            <h1 style={{margin: '20px'}}>No Messeage. . .</h1>
                        </>
                    )}
                    
                    
                </div>
                <p style={{position: "absolute",right: '0px',marginRight: '20px',cursor: 'pointer'}} onClick={closeInbox}>close</p>
            </div>
            <div className={`Paymentbar ${isPayment ? 'fade-in' : 'fade-out'}`}>
                Payment
            </div>

        </>

    );

};

export default Inbox;