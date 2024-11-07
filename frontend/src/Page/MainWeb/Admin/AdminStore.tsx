import React from 'react';
import '../Main.css';
import picEx from '../../../assets/icon/ForPage/Store/Store3.jpg';
import Ap from '../../../assets/icon/ForPage/Admin/Approval.png';
import del from '../../../assets/icon/ForPage/Admin/DoNotDisturb.png';
const AdminStore: React.FC = () => {
    const testdata = [
        {id: 1},{id: 2},{id: 3},{id: 4},{id: 5}
    ]
    return (
        <>
            <div style={{ height: '110px' }}></div>
            <div className='route'><a href="/Admin">Management /</a>Store Management</div>
            <h1 className='H1Management'>Store Management</h1>
            <div className='Storewaitingforapproval'>
            {testdata.length > 0 ? (
                testdata.map((data) => (
                    <>
                        <div className='Storewaiting' key={data.id}>
                            <span className='Storewaitinginfo'>
                                <img src={picEx} alt="picEx" />
                                <div>
                                    <p style={{ fontSize: '34px', margin: 0 }}>Name Store</p>
                                    <p className='info'> ratione vel optio expedita! Modi, sed sint nesciunt ex sit harum porro quae voluptatum inventore ipsa odio amet qui quas ut nam animi, accusamus impedit asperiores, fugiat error! Laudantium eligendi incidunt, eum possimus sapiente numquam minima sed officiis repellat similique. Doloribus aliquid pariatur saepe ea consequatur, fugiat dolor possimus esse. Adipisci molestiae ea dolore quis deserunt vel illo fuga incidunt blanditiis. Esse, minima tempora corporis repellendus iste voluptas hic voluptatum ratione vitae quod placeat ex odit. Enim sit atque sunt cumque blanditiis! Ipsam, voluptatibus.</p>
                                </div>
                            </span>
                            <span className='StorewaitingBtn'>
                                <img style={{width: '40px' , cursor: 'pointer'}} src={Ap} alt="Ap" />
                                <img style={{width: '40px' , cursor: 'pointer'}} src={del} alt="del" />
                            </span>
                        </div>
                    </>
                ))) : (
                    <>
                        <h1 className='H1Management'>No Store approval...</h1>
                    </>
            )}
            </div> 
        </>
    );
};

export default AdminStore;
