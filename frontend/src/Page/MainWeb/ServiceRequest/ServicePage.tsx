import React, { useEffect, useMemo, useState } from 'react';
import {Select ,Table ,message} from "antd";
import type { TableColumnsType } from 'antd';
import "./ServicePage.css"
import { StoreInterface } from '../../../interfaces/StoreInterface';
import { CreateService, ListRepairman, ListService, ListStoreService, UpdateStoreByid } from '../../../services/https';
import { UsersInterface } from '../../../interfaces/UsersInterface';
import { ServiceInterface } from '../../../interfaces/ServiceInterface';
const ServicePage: React.FC = () => {
    //=====================================API==================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    const [Repairman, setRepairman] = useState<UsersInterface[]>([]);
    const [Service, setService] = useState<ServiceInterface[]>([]);
    useEffect(() => {
        fetchData();
        fetchStatus('pending');
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
    const fetchStatus = async (value: string) => {
        try {
            const res = await ListService(value);
            if (res.status === 200 && res.data) {
                setService(res.data);
            }
        } catch (error) {
            setService([]);
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
        const valuesStoreUpdate: StoreInterface = {
            ID: formData.StoreID,
            StatusService: 'NoRequest',
        };
        if (formData.StatusService === 'pending') {
            try {
                const res = await CreateService(values);
                if (res.status === 201) {
                    message.success("Send Success.");
                    await fetchData();
                    await fetchStatus('pending');
                }
            } catch (error) {
                message.error("Send error.");
                console.error("Error Edit:", error);
            }
        }else if (formData.StatusService === 'completed') {
            try {
                const res = await CreateService(values);
                if (res.status === 201) {
                    message.success("Send completed.");
                    await fetchData();
                    await fetchStatus('pending');
                }
            } catch (error) {
                message.error("Send error.");
                console.error("Error Edit:", error);
            }
            try {
                const res = await UpdateStoreByid(String(formData.StoreID),valuesStoreUpdate);
                if (res.status === 200) {
                    message.success("Update store completed.");
                    await fetchData();
                }
            } catch (error) {
                message.error("Send error.");
            }
        }
    }
    //======================================table=======================================
    const columns: TableColumnsType<ServiceInterface> = [
        {
            title: 'StoreID',
            dataIndex: 'StoreID',
            width: 50,
        },
        {
            title: 'UserID',
            dataIndex: 'UserID',
            width: 50,
        },
        {
            title: 'Location',
            dataIndex: 'Location',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Describtion',
            dataIndex: 'Describtion',
            width: 150,
            ellipsis: true,
        },
        {
            title: 'RequestDate',
            dataIndex: 'RequestDate',
            width: 100,
            ellipsis: true,
        },
        {
            title: 'StatusService',
            dataIndex: 'StatusService',
            width: 70,
            ellipsis: true,
        },
    ];
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <div className='serviceanimation'>
            <h1 className='H1Management'>Service Request</h1>
            <div className='formService'>
                <form onSubmit={handleSubmitEdit}>
                    <p style={{fontWeight:'600'}}>Service Request</p>
                    <Select
                        className="custom-ant-select"
                        style={{width:'49%',marginRight: '1%'}}
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
                        className="custom-ant-select"
                        style={{width:'50%'}}
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
                    <p style={{fontWeight:'600'}}>Location</p>
                    <p style={{color:'#bea66a'}}>{LocationStr || "-- Please select Store --"}</p>
                    <label style={{fontWeight:'600'}}>Describtion</label>
                    <textarea 
                        style={{width:'97%',borderRadius: '10px',borderColor:'#CFCFCF',padding:'10px',height:'150px'}}
                        name="Describtion" 
                        id="Describtion" 
                        value={formData.Describtion}
                        onChange={handleChange}
                        required={true}
                    />  
                    <p style={{fontWeight:'600'}}>Status</p>
                    <div style={{display: 'flex',justifyContent:'space-between'}}>
                        <Select
                            style={{width:'50%'}}
                            className="custom-ant-select"
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
                        <button className='buttonConfirm'>Send</button>
                    </div>
                </form>
                {/* {formData.StoreID}{formData.UserID}{formData.Location}{formData.Describtion}{formData.StatusService} */}
            </div>
            <div style={{margin:'0 0 15%'}}>
                <h2 style={{margin:'0 20%',fontFamily:'"Abel", sans-serif'}}>Service Request List</h2>
                <div style={{display:'flex',justifyContent:'start',margin:'0 20%'}}>
                    <p className='selectStatusService' onClick={() => fetchStatus('pending')}>pending</p>
                    <p className='selectStatusService' onClick={() => fetchStatus('completed')}>completed</p>
                </div>
                <Table<ServiceInterface> columns={columns} dataSource={Service} size="middle" style={{width:"60%",margin:'auto'}} />
            </div>
            </div>
        </>
    );

};

export default ServicePage;