import React, { useEffect, useState } from 'react';
import './Inventory.css';

//api
import { InventoryInterface , CategoryInventoryInterface } from '../../../interfaces/InventoryInterface';
import { ListInventory , ListCategoryInventory} from '../../../services/https';

const Inventory: React.FC = () => {
    const [equipment,seteEquipment] = useState<InventoryInterface[]>([]);
    const [Category,seteCategory] = useState<CategoryInventoryInterface[]>([]);
    useEffect(() => {
        fetchEquipment();
    }, []);

    const fetchEquipment = async () => {
        try {
            const res = await ListInventory();
            if (res.status === 200) {
                seteEquipment(res.data); 
            } else {
                seteEquipment([]);
            }
            const resCategory = await ListCategoryInventory();
            if (resCategory.status === 200) {
                seteCategory(resCategory.data); 
            } else {
                seteCategory([]);
            }
        } catch (error) {
            seteEquipment([]); 
            seteCategory([]);
        }
    };

    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='headerInventory'>
                <h1>Inventory</h1>
            </div>
            <div className='tableInventory'>
                <div className='columntable'>
                    <p>ID</p>
                    <p>Name</p>
                    <p>Quatity</p>
                    <p>Categor</p>
                </div>
                <div className='contanerRow'>
                    {equipment.length > 0 ? (
                        equipment.map((data) => (
                            <div key={data.ID} className='columntableSub'>
                                <p>{data.ID}</p>
                                <p>{data.InventoryName}</p>
                                <p>{data.QuantityInventory}</p>
                                <p>{data.CategoryInventory?.CategoryName}</p>
                            </div>
                        ))
                    ) : (
                        <>No Equipment</>
                    )}
                </div>
            </div>
            <p style={{textAlign: 'center'}}>{Category[0]?.CategoryName} & {Category[1]?.CategoryName}</p>
        </>

    );

};

export default Inventory;