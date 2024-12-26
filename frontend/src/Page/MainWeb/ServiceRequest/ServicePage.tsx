import React, { useEffect, useMemo, useState } from 'react';
import {Select } from "antd";
import "./ServicePage.css"
import { StoreInterface } from '../../../interfaces/StoreInterface';
import { CreateService, ListRepairman, ListStoreService } from '../../../services/https';
import { UsersInterface } from '../../../interfaces/UsersInterface';
import { ServiceInterface } from '../../../interfaces/ServiceInterface';
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
    //===================================form===================================
    const [formData, setFormData] = useState({
        StoreID: 0,
        UserID: 0,
        Location: '',
        Describtion: '',
        StatusService: '',
    });
    //===================================selector===============================
    const [Location, setLocation] = useState<StoreInterface| null>(null);
    //store
    const selectStore = (value: number) => {
        const selectedStore = Store.find(store => store.ID === value);
        setLocation(selectedStore || null);
        formData.Location = LocationStr;
        formData.StoreID = value;
        console.log(`selected ${value}`);
    };
    const onSearchStore = (value: string) => {
        console.log('search:', value);
    };
    //repairman
    const selectRepairman = (value: number) => {
        formData.UserID = value;
        console.log(`selected ${value}`);
    };
    const onSearchRepairman = (value: string) => {
        console.log('search:', value);
    };
    //Status
    const onChangeStatus = (value: string) => {
        formData.StatusService = value;
        console.log(`selected ${value}`);
    };
    const onSearchStatus = (value: string) => {
        console.log('search:', value);
    };
    // Generate LocationStr
    const LocationStr = useMemo(() => {
        if (!Location) return "";
        return `Zone ${Location?.ProductType?.NameType || ""} Area ${Location?.ProductType?.NameType || ""}${Location?.ProductType?.ID || ""}${Location?.ID || ""}`;
    }, [Location]);
    //
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    //===================================Create=================================
    const handleSubmitEdit = async (e: any) => {
        e.preventDefault();
        CreateServicefuc(formData);
    };
    const CreateServicefuc = async (formData: any) => {
        const values: ServiceInterface = {
            StoreID: formData.StoreID,
            UserID: formData.UserID,
            Location: LocationStr,
            Describtion: formData.Describtion,
            StatusService: formData.StatusService,
            RequestDate: new Date(),
        };
        try {
            const res = await CreateService(values);
            if (res.status === 201) {
                await fetchData();
            }
        } catch (error) {
            console.error("Error Edit:", error);
        }
    }
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div>
                <form onSubmit={handleSubmitEdit}>
                    <Select
                        showSearch
                        placeholder="Store"
                        optionFilterProp="label"
                        onChange={selectStore}
                        onSearch={onSearchStore}
                        options={Store.map((data) => ({
                            value: data.ID || 0,
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
                            value: data.ID || 0,
                            label: data.UserName || "Unknown",
                            }))}
                    />
                    <p>Location</p>
                    <p>{LocationStr}</p>
                    <textarea 
                        name="Describtion" 
                        id="Describtion" 
                        value={formData.Describtion}
                        onChange={handleChange}
                        required={true}
                    />  
                    <Select
                        showSearch
                        placeholder="Select a Status"
                        optionFilterProp="label"
                        onChange={onChangeStatus}
                        onSearch={onSearchStatus}
                        options={[
                        {
                            value: 'pending',
                            label: 'pending',
                        },
                        {
                            value: 'completed',
                            label: 'completed',
                        },
                        ]}
                    />
                    <button>Confirm</button>
                </form>
                {/* {formData.StoreID}{formData.UserID}{formData.Location}{formData.Describtion}{formData.StatusService} */}
            </div>
        </>
    );

};

export default ServicePage;