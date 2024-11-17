import React, { useEffect, useState } from 'react';
import './Inbox.css';
import { useNavigate } from 'react-router-dom';

//import { useNavigate } from 'react-router-dom';
import iconInbox from '../../../assets/icon/ForPage/Messenger/InBox.png';
import CardPayment from '../../../assets/icon/ForPage/StorePayment/CardPayment.png';
import OnlinePayment from '../../../assets/icon/ForPage/Messenger/OnlinePayment.png';
import Bill from '../../../assets/icon/ForPage/StorePayment/Bill.png';
import { GetMessageById , GetPaymentByuseridPreload} from '../../../services/https';
import { MessageBoardInterface } from '../../../interfaces/UsersInterface';
import { PaymentInterface } from '../../../interfaces/StoreInterface';

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
        setPaymentStore(false);
    };
    const closeInbox = () => {
        setInbox(false)
    };

    const [isPayment, setPayment] = useState(false);
    const OpenPayment = () => {
        setPayment(!isPayment);
        setPaymentStore(false);
    };
    const [isPaymentStore, setPaymentStore] = useState(false);
    const OpenPaymentStore = () => {
        setPaymentStore(!isPaymentStore);
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
    //================================getpayment====================================
    const [Payment, setPaymentData] = useState<PaymentInterface[]>([]);
    useEffect(() => {
        if (1) {
            fetchPayment(userIdstr);
        }
    }, [1]);
    
    const fetchPayment = async (userIdstr : any) => {
        try {
            const res = await GetPaymentByuseridPreload(userIdstr);
            if (res.status === 200 && res.data) {
                setPaymentData(res.data);
            } else {
                setPaymentData([]); 
            }
        } catch (error) {
            setPaymentData([]);
        }
    };
    //================================Go to payment page====================================
    const navigate = useNavigate();

    const GotoPaymentPageClick = (Payment: PaymentInterface) => {

        navigate('/StorePayment', { 
            state: { 
                ID: Payment.ID,
            } 
        });
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
                        Messeage.sort((a, b) => (b.ID || 0) - (a.ID || 0)).map((data) => (
                            <div className='Messagesbox' key={data.ID}>
                                <img src={data.PicNews || iconInbox} alt="iconInbox" />
                                <div className='Messagesboxtext'>
                                    <p>{data.TextHeader}</p>
                                    <div className='MessagesboxtextINFO'>
                                        <p>{data.DescribtionNews}</p>
                                    </div>
                                </div>
                            </div>
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
                <p className='Messages'>Payment</p>
                <div className='Paymentbox' onClick={OpenPaymentStore}><img src={OnlinePayment} />Booking Store Payment</div>
                <div className='Paymentbox'><img src="https://thumbs.dreamstime.com/b/city-hall-building-line-icon-city-hall-building-line-icon-outline-vector-sign-linear-style-pictogram-isolated-white-capitol-108563106.jpg" />Hall Payment</div>
                <div className='Paymentbox'><img src="https://st5.depositphotos.com/1432405/66271/v/450/depositphotos_662718742-stock-illustration-car-parking-place-icon-outline.jpg" />Car Parking Payment</div>
            </div>

            <div className={`PaymentStorebar ${isPaymentStore ? 'fade-in' : 'fade-out'}`}>
                <p className='Messages'>Booking Store Payment</p>
                {Payment.length > 0 ? (
                    Payment.map((data) => (
                        <div key={data.ID} className={`paymentgroup ${data.StatusPaymentStore !== "paid" ? 'notPaid' : 'paid'}`} onClick={() => GotoPaymentPageClick(data)} >
                            <img src={CardPayment} alt="CardPayment" />
                            <div key={data.Store?.ID} className='Paymentinfo'>
                                {data.StatusPaymentStore === "paid" &&
                                    <p>Payment successful</p>
                                }
                                {data.StatusPaymentStore !== "paid" &&
                                    <p>Waiting Payment</p>
                                }
                                <p >Store Name: {data.Store?.NameStore}<br />
                                Package: {data.Store?.Membership?.PackageName} <br />
                                Total Price: {data.Store?.Membership?.RentalFee} Bath</p>
                            </div>
                            {data.StatusPaymentStore === "paid" &&
                                <img src={Bill} alt="Bill" />
                            }
                        </div>
                    ))
                ) : (
                    <>
                        <div>No payment</div>
                    </>
                )}

                <p style={{position: "absolute",right: '0px',marginRight: '20px',cursor: 'pointer',bottom: '0px'}} onClick={OpenPaymentStore}>close</p>
            </div>
        </>

    );

};

export default Inbox;