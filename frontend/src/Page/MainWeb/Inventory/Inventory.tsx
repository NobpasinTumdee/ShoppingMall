import React, { useEffect, useState } from 'react';
import './Inventory.css';

// API
import { InventoryInterface, CategoryInventoryInterface } from '../../../interfaces/InventoryInterface';
import { ListCategoryInventory, GetInventoryById } from '../../../services/https';

const Inventory: React.FC = () => {
    const [typeInventory, setTypeInventory] = useState<InventoryInterface[]>([]);
    const [categories, setCategories] = useState<CategoryInventoryInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);

    useEffect(() => {
        fetchCategories();
        fetchInventoryByCategory(selectedCategory);
    }, []);

    useEffect(() => {
        fetchInventoryByCategory(selectedCategory);
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const resCategory = await ListCategoryInventory();
            if (resCategory.status === 200) {
                setCategories(resCategory.data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            setCategories([]);
        }
    };

    const fetchInventoryByCategory = async (categoryId: number) => {
        try {
            const res = await GetInventoryById(String(categoryId));
            if (res.status === 200) {
                setTypeInventory(res.data);
            } else {
                setTypeInventory([]);
            }
        } catch (error) {
            setTypeInventory([]);
        }
    };

    const filter = (categoryId: number) => {
        setSelectedCategory(categoryId);
    };

    return (
        <>
            <div style={{ height: '110px', zIndex: '0' }}></div>
            <div className='headerInventory'>
                <h1>Inventory</h1>
            </div>
            <div className='Mode'>
                {categories.map((category) => (
                    <p key={category.ID} onClick={() => filter(Number(category.ID))}>
                        {category.CategoryName}
                    </p>
                ))}
            </div>
            <div className='tableInventory'>
                <div className='columntable'>
                    <p>ID</p>
                    <p>Name</p>
                    <p>Quantity</p>
                    <p>Category</p>
                </div>
                <div className='contanerRow'>
                    {typeInventory.length > 0 ? (
                        typeInventory.map((data) => (
                            <div key={data.ID} className='columntableSub'>
                                <p>{data.ID}</p>
                                <p>{data.InventoryName}</p>
                                <p>{data.QuantityInventory}</p>
                                <p>{data.CategoryInventory?.CategoryName}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Equipment</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Inventory;
