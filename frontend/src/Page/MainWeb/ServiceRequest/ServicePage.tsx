import React, { useEffect, useState } from 'react';
import {Select } from "antd";
import "./ServicePage.css"
import { StoreInterface } from '../../../interfaces/StoreInterface';
import { ListRepairman, ListStoreService } from '../../../services/https';
import { UsersInterface } from '../../../interfaces/UsersInterface';
const ServicePage: React.FC = () => {
    //=====================================API==================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    const [Repairman, setRepairman] = useState<UsersInterface[]>([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const res = await ListStoreService();
            if (res.status === 200 && res.data) {
                setStore(res.data);
            }
        } catch (error) {
            setStore([]);
        }
        try {
            const res = await ListRepairman();
            if (res.status === 200 && res.data) {
                setRepairman(res.data);
            }
        } catch (error) {
            setRepairman([]);
        }
    };
    //===================================selector===============================
    const selectStore = (value: string) => {
        console.log(`selected ${value}`);
    };
      
    const onSearchStore = (value: string) => {
        console.log('search:', value);
    };

    const selectRepairman = (value: string) => {
        console.log(`selected ${value}`);
    };
      
    const onSearchRepairman = (value: string) => {
        console.log('search:', value);
    };
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div>
                <form>
                    <Select
                        showSearch
                        placeholder="Store"
                        optionFilterProp="label"
                        onChange={selectStore}
                        onSearch={onSearchStore}
                        options={Store.map((data) => ({
                            value: data.ID?.toString() || "",
                            label: data.NameStore || "Unknown",
                            }))}
                    />
                    <Select
                        showSearch
                        placeholder="Repairman"
                        optionFilterProp="label"
                        onChange={selectRepairman}
                        onSearch={onSearchRepairman}
                        options={Repairman.map((data) => ({
                            value: data.ID?.toString() || "",
                            label: data.UserName || "Unknown",
                            }))}
                    />
                </form>
            </div>
        </>
    );

};

export default ServicePage;