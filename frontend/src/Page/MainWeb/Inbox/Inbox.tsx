import React, { useState } from 'react';
import './Inbox.css';
import { useNavigate } from 'react-router-dom';
import iconInbox from '../../../assets/icon/ForPage/Messenger/InBox.png';
import OnlinePayment from '../../../assets/icon/ForPage/Messenger/OnlinePayment.png';

const Inbox: React.FC = () => {
    const navigate = useNavigate();
    const handleStoreClick = () => {
        navigate('/Inbox');
    };
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
    const closePayment = () => {
        setPayment(false)
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

                    <div className='Messagesbox'>
                        <img src={iconInbox} alt="iconInbox" />
                        <div className='Messagesboxtext'>
                            <p>test</p>
                            <div className='MessagesboxtextINFO'>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem neque minus harum esse error et voluptatum quibusdam, sapiente earum quia autem! Velit natus dicta iusto perspiciatis quasi eligendi dolorem expedita nesciunt. Minima officia voluptatibus exercitationem reprehenderit suscipit, accusamus officiis. Fugit debitis inventore eius natus voluptatum aliquid, adipisci repellendus eos repellat!</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className={`Paymentbar ${isPayment ? 'fade-in' : 'fade-out'}`}>
                Payment
            </div>

        </>

    );

};

export default Inbox;