import React, { useEffect, useMemo, useState } from 'react';
import {Select ,Table ,message} from "antd";
import type { TableColumnsType } from 'antd';
import "./ServicePage.css"
import { StoreInterface } from '../../../interfaces/StoreInterface';
import { CreateEquipment, CreateService, DeleteEquipment, EquipmentByServiceID, ListInventory, ListRepairman, ListService, ListStoreService, UpdateInventory, UpdateService, UpdateStoreByid } from '../../../services/https';
import { UsersInterface } from '../../../interfaces/UsersInterface';
import { EquipmentInterface, ServiceInterface } from '../../../interfaces/ServiceInterface';
import { InventoryInterface } from '../../../interfaces/InventoryInterface';
const ServicePage: React.FC = () => {
    //=====================================API==================================
    const [Store, setStore] = useState<StoreInterface[]>([]);
    const [Repairman, setRepairman] = useState<UsersInterface[]>([]);
    const [Service, setService] = useState<ServiceInterface[]>([]);
    const [Inventory, setInventory] = useState<InventoryInterface[]>([]);
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
        try {
            const res = await ListInventory();
            if (res.status === 200 && res.data) {
                setInventory(res.data);
            }
        } catch (error) {
            setInventory([]);
        }
    };
    const fetchStatus = async (value: string) => {
        setcompleted(false)
        try {
            const res = await ListService(value);
            if (res.status === 200 && res.data) {
                setService(res.data);
            }
        } catch (error) {
            setService([]);
        }
    };
    //=============================== SPRINT#1 ==============================
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
            width: 80,
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
            width: 70,
            ellipsis: true,
        },
        {
            title: 'StatusService',
            dataIndex: 'StatusService',
            width: 70,
            ellipsis: true,
        },
        {
            title: 'Edit',
            key: 'operation',
            fixed: 'right',
            width: 60,
            render: (_,data) => <a onClick={() => StateService(String(data.ID),String(data.StatusService))} style={{color: '#a78f48'}}>Edit</a>
        },
    ];

    //=============================== SPRINT#2 ==============================
    const [Equipment, setEquipment] = useState<EquipmentInterface[]>([]);
    const [Popup, setPopup] = useState(false);
    const [completed, setcompleted] = useState(false);
    const [Maxnumberselect, setnumberselect] = useState(0);
    const [formData2, setFormData2] = useState({
        InventoryID: 0,
        Quantity: 0,
        ServiceID: 0,
    });
    const StateService = async (ServiceID: string , Status: string) => {
        setPopup(true);
        if (Status !== 'completed') {
            setcompleted(true);
        }
        formData2.ServiceID = Number(ServiceID);
        try {
            const res = await EquipmentByServiceID(ServiceID);
            if (res.status === 200 && res.data) {
                setEquipment(res.data);
            }
        } catch (error) {
            setEquipment([]);
        }
    }
    //Inventory
    const selectInventory = (value: number) => {
        // หา Quantity จาก options ที่ตรงกับ value ที่เลือก
        const selectedItem = Inventory.find((data) => data.ID === value);
        const Quantity = selectedItem?.QuantityInventory || 0;
    
        setnumberselect(Quantity);
        //formData2.InventoryID = value;
        setFormData2({ ...formData2, InventoryID: value });
        console.log(`selected ${value}, Quantity: ${Quantity}`);
    };
    const onSearchInventory = (value: string) => {
        console.log('search:', value);
    };

    const NumberSelect = ({ maxNumber }: { maxNumber: number }) => {
        const numberOptions = Array.from({ length: maxNumber }, (_, i) => ({
            value: i + 1,
            label: `${i + 1}`,
        }));
        
        const handleChangeNumber = (value: number) => {
            //formData2.Quantity = value;
            setFormData2({ ...formData2, Quantity: value });
            console.log('Selected number:', value);
        };
        
        return (
            <Select
            style={{ width: '30%' }}
            className="custom-ant-select"
            showSearch
            placeholder="Select a number"
            optionFilterProp="label"
            onChange={handleChangeNumber}
            options={numberOptions}
            />
        );
    };

    const handleSubmitEquipment = async (e: any) => {
        e.preventDefault();
        await sendCreateEquipmentRequest (formData2);
    };
    const sendCreateEquipmentRequest  = async (formData2: any) => {
        const values: EquipmentInterface = {
            Quantity: formData2.Quantity,
            DateEquipment: new Date(),
            InventoryID: formData2.InventoryID,
            ServiceRequestID: formData2.ServiceID,
        };
        const updatedQuantity = Maxnumberselect - formData2.Quantity; // จำนวนทั้งหมดลบ ที่เลือก
        const QuantityUpdate: InventoryInterface = {
            QuantityInventory: updatedQuantity,
        }
        try {
            const res = await CreateEquipment(values);
            if (res.status === 201) {
                message.success("ADD Success.");
                //fetch ข้อมูล Equipment อีกรอบ
                const res = await EquipmentByServiceID(formData2.ServiceID);
                if (res.status === 200 && res.data) {
                    setEquipment(res.data);
                }
            }
        } catch (error) {
            message.error("Send error.");
        }
        try {
            const res = await UpdateInventory(formData2.InventoryID,QuantityUpdate);
            if (res.status === 200) {
                message.success("Update Success.");
                await fetchData();
            }
        }catch (error) {
            message.error("Update error.");
        }
    }
    //คืนอุปกรณ์ update -> delete -> fetchEquipment
    const ReturnEquipment = async (data: EquipmentInterface) => {
        if (data.Inventory?.QuantityInventory && data.Quantity && data.ServiceRequestID) {
            const updatedQuantity = data.Inventory?.QuantityInventory + data.Quantity;
            const QuantityUpdate: InventoryInterface = {
                QuantityInventory: updatedQuantity,
            }
            if(data.InventoryID){
                try {
                    const res = await UpdateInventory(String(data.InventoryID),QuantityUpdate);
                    if (res.status === 200) {
                        message.success("Update Success.");
                        try {
                            const res = await DeleteEquipment(String(data.ID));
                            if (res.status === 200) {
                                message.success("delete Success.");
                                //fetch ข้อมูล Equipment อีกรอบ
                                const res = await EquipmentByServiceID(String(data.ServiceRequestID));
                                if (res.status === 200 && res.data) {
                                    setEquipment(res.data);
                                }
                            }
                        }catch (error){
                            message.error("can't delete.");
                        }
                        await fetchData();
                    }
                }catch (error) {
                    message.error("Update error.");
                }
            }else{
                message.error("No id inventory.");
            }
        }else{
            message.error("error");
        }
    }
    //service completed
    const ServiceCompleted = async () => {
        const value: ServiceInterface = {
            StatusService: 'completed'
        }
        const valueStore: StoreInterface = {
            StatusService: 'NoRequest',
        }
        try {
            const res = await UpdateService(String(formData2.ServiceID),value);
            if (res.status === 200 && res.data) {
                setService(res.data);
                window.location.reload();
            }
        } catch (error) {
            setService([]);
        }
        try {
            const selectedService = Service.find(Service => Service.ID === formData2.ServiceID);
            await UpdateStoreByid(String(selectedService?.StoreID),valueStore);
        } catch (error) {
            message.error("Send error.");
        }
    }
    return(
        <>
            {/* Sprint1 */}
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
            {/* Sprint2 */}
            {Popup && 
                <>
                    <div className='PopupService'>
                        <h1 style={{margin:'0 0 20px',textAlign:'center'}}>Request Equipment</h1>
                        <form onSubmit={handleSubmitEquipment}>
                            <Select
                                className="custom-ant-select"
                                style={{width:'60%'}}
                                showSearch
                                placeholder="Inventory"
                                optionFilterProp="label"
                                onChange={selectInventory}
                                onSearch={onSearchInventory}
                                options={Inventory.map((data) => ({
                                    value: data.ID || 0,
                                    label: data.InventoryName || "Unknown",
                                }))}
                            />
                            <NumberSelect maxNumber={Maxnumberselect} />
                            <button style={{padding: '5px 15px',margin:'0 5px'}} className='buttonConfirm'>ADD</button>
                        </form>
                        <div style={{margin: '5px 0'}}>InventoryID : {formData2.InventoryID} Quantity : {formData2.Quantity} ServiceID : {formData2.ServiceID}</div>
                        <div className='Equipment' style={{backgroundColor: '#bea66a',color:'#fff',fontWeight:'900',fontFamily:'"Abel", sans-serif'}}>
                            <p style={{paddingLeft:'10px'}}>No.</p>
                            <p>Code</p>
                            <p>Name</p>
                            <p>Date</p>
                            <p>Quantity</p>
                            <button style={{backgroundColor:'transparent',borderRadius:'20px',height:'35px',padding:'5px 10px',border:"2px solid #bea66a",color:'#bea66a',fontWeight:'700'}}>Return</button>
                        </div>
                        <div className='ListEquipment'>
                            {Equipment.map((data,index) => (
                                <>
                                    <div key={index} className='Equipment'>
                                        <p style={{paddingLeft:'10px'}}>{index+1}</p>
                                        <p>EQ-{data.ID}{data.InventoryID}{data.ServiceRequestID}</p>
                                        <p style={{height:'30px',overflowY:'scroll'}}>{data.Inventory?.InventoryName}</p>
                                        <p>{data.DateEquipment ? new Intl.DateTimeFormat('en-GB').format(new Date(data.DateEquipment)) : 'No Date'}</p>
                                        <p>{data.Quantity}</p>
                                        <button onClick={() => ReturnEquipment(data)} style={{backgroundColor:'#fff',borderRadius:'20px',height:'35px',padding:'5px 10px',border:"2px solid #bea66a",color:'#bea66a',fontWeight:'700',cursor:'pointer'}}>Return</button>
                                    </div>
                                    <hr />
                                </>
                            ))}
                        </div>
                        {completed && 
                            <div onClick={() => ServiceCompleted()} className='CompleteButton'>Completed</div>
                        }
                    </div>
                    <div className='overlay' onClick={() => setPopup(false)} />
                </>
            }
        </>
    );

};

export default ServicePage;