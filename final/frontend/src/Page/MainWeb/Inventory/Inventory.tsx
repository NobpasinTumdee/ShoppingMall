import React, { useEffect, useState } from 'react';
import './Inventory.css';

// API ทำระบบลิสอุปกรณ์ทุกอย่างครบแล้ว
import { InventoryInterface, CategoryInventoryInterface } from '../../../interfaces/InventoryInterface';
import { ListCategoryInventory, GetInventoryById, CreateInventoryRequest, ListInventoryRequest, GetUserById, UpdateQuantityInventory, ListCreateInventoryRequest } from '../../../services/https';
import { message } from 'antd';
import { InventoryRequestInterface } from '../../../interfaces/InventoryRequestInterface';

const Inventory: React.FC = () => {
    const [typeInventory, setTypeInventory] = useState<InventoryInterface[]>([]);
    const [categories, setCategories] = useState<CategoryInventoryInterface[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [ CleaningInventory , setCleaningInventory ] = useState<InventoryInterface[]>([]);
    const [formData, setFormData] = useState<InventoryRequestInterface>({
        NameItem: " ",
        DateRequest: undefined,
        QuantityRequest: 0,
        UserID: 0,
      });
    const resetForm = () => {
    setFormData({
        NameItem: undefined,DateRequest: undefined,QuantityRequest: 0,UserID: 0});
    };

    const [UserformData, setUserFormData] = useState({
        UserID: " ",
        Username: " ",
      });
    
    const [isSummaryPopupOpen, setIsSummaryPopupOpen] = useState(false);
    const [monthlyRequests, setMonthlyRequests] = useState<Record<number, InventoryRequestInterface[]>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        fetchCategories();
        fetchInventoryByCategory(selectedCategory);
    }, [selectedCategory]);

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
    //เพิ่มฟีเจอร์แจ้งเตือนจำนวนอุปกรณ์ใกล้หมด
    const LOW_STOCK_THRESHOLD = 4; // กำหนดค่าจำนวนขั้นต่ำ
    const fetchInventoryByCategory = async (categoryId: number) => {
        try {
            const res = await GetInventoryById(String(categoryId));
            if (res.status === 200) {
                setTypeInventory(res.data);
    
                // ตรวจสอบอุปกรณ์ที่ใกล้หมด
                const lowStockItems = res.data.filter(
                    (item: InventoryInterface) => (item.QuantityInventory ?? 0) <= LOW_STOCK_THRESHOLD
                );                  
    
                if (lowStockItems.length > 0) {
                    message.warning(
                        `อุปกรณ์ใกล้หมด: ${lowStockItems.map((item: InventoryInterface) => item.InventoryName).join(", ")}`
                    );
                }
                
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

    ///=========================ระบบเบิกอุปกรณ์แม่บ้าน===============================

    const togglePopupOpen = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const togglePopupClose = () => {
        setErrors({}); 
        setIsPopupOpen(false);
        resetForm();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formErrors = validateForm(formData);

        // ถ้ามีข้อผิดพลาดในฟอร์ม
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors); // แสดงข้อผิดพลาด
            return; // หยุดการ submit
        }

        setErrors({}); 

        const formattedDateRequest = formData.DateRequest
            ? new Date(
                new Date(formData.DateRequest).getTime() -
                new Date(formData.DateRequest).getTimezoneOffset() * 60000
            ) 
                : undefined;

        try {
          const response = await CreateInventoryRequest({
            ...formData,
            NameItem: formData.NameItem,
            DateRequest: formattedDateRequest,
            QuantityRequest: formData.QuantityRequest, 
            UserID: Number(UserformData.UserID),
          });

          console.log(response)
      
          if (response.status >= 400) {
            throw new Error(response.data.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
          }

          togglePopupClose();
          handleUpdateQuantity();
          resetForm();
        } catch (error: any) {
          console.error("Error while submitting form:", error);
      
          if (error?.response?.data?.error) {
            message.error(`${error.response.data.error}`);
          } else if (error.message) {
            message.error(`ข้อผิดพลาด: ${error.message}`);
          } else {
            message.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
          }
        }
      };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "QuantityRequest" || name === "UserID"
                ? Number(value)
                : name === "DateRequest"
                ? (!isNaN(new Date(value).getTime())
                    ? new Date(value).toISOString()
                    : "")
                : value,
        }));
    };    

    const formatDateForInput = (date: any) => {
        
        if (typeof date === "string") {
            date = new Date(date);
        }
    
        
        if (!(date instanceof Date) || isNaN(date.getTime())) {
            console.error("Invalid date passed to formatDateForInput:", date);
            return ""; 
        }
    
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
    
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    

    useEffect(() => {
        const fetchInventoryRequest = async () => {
            try {
                const response = await ListInventoryRequest();
    
                if (response?.data && Array.isArray(response.data)) {
                    console.log("data", response.data)
                    setCleaningInventory(response.data);
                } else {
                    console.error("Unexpected data format:", response);
                    setCleaningInventory([]);
                }
            } catch (error) {
                console.error("Error fetching inventory:", error);
                setCleaningInventory([]);
            }
        };
    
        fetchInventoryRequest();
    }, []);

    // ดึงข้อมูล User
    useEffect(() => {
        const userId = localStorage.getItem("id");

        if (userId) { 
        const fetchUser = async (userid: string) => {
            try {
            const Userdata = await GetUserById(userid);
            setUserFormData(Userdata.data); 
            setUserFormData((prev: any) => ({
                ...prev,
                UserID: userId, 
                Username: Userdata.data.UserName || "Unknown User",
            }));
            } catch (error) {
            console.error("Error fetching user:", error);
            }
        };
            fetchUser(userId);
        } else {
            console.warn("No user ID found in localStorage.");
        }
    }, []);
    
    const handleUpdateQuantity = async () => {
        
        if (!formData.NameItem || formData.QuantityRequest === undefined) {
            message.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        } else if (formData.QuantityRequest <= 0) {
            message.error("กรุณากรอกจำนวนอุปกรณ์ให้ถูกต้อง");
            return;
        }
    
        const payload = {
            NameItem: formData.NameItem,
            Quantity: formData.QuantityRequest,
        };
    
        try {

            console.log(payload)
            await UpdateQuantityInventory(payload);
            
            message.success("บันทึกข้อมูลการเบิกอุปกรณ์สำเร็จ");
    
            fetchInventoryByCategory(selectedCategory);
            fetchMonthlyRequests();
        } catch (error: any) {
            if (error?.response?.data?.error) {
                message.error(`ข้อผิดพลาด: ${error.response.data.error}`);
            } else if (error?.message) {
                message.error(`ข้อผิดพลาด: ${error.message}`);
            } else {
                message.error("เกิดข้อผิดพลาดที่ไม่คาดคิด");
            }
        }
    };

    const fetchMonthlyRequests = async () => { 
        try {
            const response = await ListCreateInventoryRequest();
            console.log(response.data);
            if (response.status === 200) {
                const groupedRequests = response.data.reduce((acc: Record<number, InventoryRequestInterface[]>, req: InventoryRequestInterface) => {
                    if (!req.DateRequest) return acc;
                    const requestMonth = new Date(req.DateRequest).getMonth() + 1;
                    if (!acc[requestMonth]) acc[requestMonth] = [];
                    acc[requestMonth].push(req);
                    return acc;
                }, {});
    
                setMonthlyRequests(groupedRequests);
            } else {
                setMonthlyRequests({});
            }
        } catch (error) {
            console.error("Error fetching monthly requests:", error);
            setMonthlyRequests({});
        }
    };
    

    const toggleSummaryPopup = () => {
        setIsSummaryPopupOpen(!isSummaryPopupOpen);
        if (!isSummaryPopupOpen) {
            fetchMonthlyRequests();
        }
    };

    const getMonthName = (monthNumber: number): string => {
        const monthNames = [
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", 
            "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        ];
        return monthNames[monthNumber - 1];
    };

    const validateForm = (formData: InventoryRequestInterface) => {
        const errors: Record<string, string> = {};
    
        if (!formData.NameItem || formData.NameItem.trim() === "") {
            errors.NameItem = "กรุณาเลือกอุปกรณ์";
        }
        if (!formData.DateRequest || isNaN(new Date(formData.DateRequest).getTime())) {
            errors.DateRequest = "กรุณากรอกวันที่และเวลาที่ทำการเบิกอุปกรณ์";
        }
        if (formData.QuantityRequest === undefined || formData.QuantityRequest <= 0) {
            errors.QuantityRequest = "กรุณาระบุจำนวนอุปกรณ์ที่ถูกต้อง";
        }
    
        return errors;
    };
    
    return (
        <>
            <div style={{ height: '110px', zIndex: '0' }}></div>
            <div className='headerInventory'>
                <h1>INVENTORY</h1>
            </div>
            <div className='Mode'>
                {categories.map((category) => (
                    <p key={category.ID} onClick={() => filter(Number(category.ID))}>
                        {category.CategoryName}
                    </p>
                ))}
            </div>
            <div className="button-container">
                <button className="popupButton" onClick={toggleSummaryPopup}>
                    สรุปข้อมูลประจำเดือน
                </button>
                <button className="popupButtonwithdraw" onClick={togglePopupOpen}>
                    เบิกอุปกรณ์ทำความสะอาด
                </button>
            </div>

            {isPopupOpen && (
                <div className="popup-container">
                    <div className="popup">
                        <form onSubmit={handleSubmit}>
                            <h2>คำร้องขอเบิกอุปกรณ์ทำความสะอาด</h2>
                            <div className="form-group">
                            <label htmlFor="NameItem">อุปกรณ์ที่ต้องการ:</label>
                            <select  
                                id="NameItem"
                                value={formData.NameItem || ''}
                                onChange={(e) => setFormData({ ...formData, NameItem: e.target.value })}
                            >
                                <option value="">--- Select ---</option>
                                {CleaningInventory?.length ? (
                                    CleaningInventory.map((data) => (
                                        <option 
                                            key={data.ID || data.InventoryName} 
                                            value={data.InventoryName || ''} 
                                        >
                                            {data.InventoryName || 'Unknown Item'}
                                        </option>
                                ))
                            ) : (
                                <option value="">No items available</option>
                            )}
                            </select>
                            {errors.NameItem && (
                                <span className="error">{errors.NameItem}</span>
                            )}

                            </div>
                            <div className="form-group">
                                <label htmlFor="DateRequest">วันที่ทำการเบิกอุปกรณ์:</label>
                                <input
                                    type="datetime-local"
                                    id="DateRequest"
                                    name="DateRequest"
                                    value={formData.DateRequest ? formatDateForInput(formData.DateRequest) : ''}
                                    onChange={handleInputChange}
                                />
                                {errors.DateRequest && (
                                    <span className="error">{errors.DateRequest}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="QuantityRequest">จำนวน:</label>
                                <input
                                    type="number"
                                    id="QuantityRequest"
                                    name="QuantityRequest"
                                    value={formData.QuantityRequest}
                                    onChange={handleInputChange}
                                />
                                {errors.QuantityRequest && (
                                    <span className="error">{errors.QuantityRequest}</span>
                                )}

                            </div>
                            <div className="button-group">
                                <button type="submit" className="btn btn-save">บันทึก</button>
                                <button type="button" className="btn btn-close" onClick={togglePopupClose}>ปิด</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isSummaryPopupOpen && (
                <div className="popup-containerwithdraw">
                    <div className="popupwithdraw">
                        <h2>สรุปคำร้องขอเบิกอุปกรณ์ประจำเดือน</h2>
                        {Object.keys(monthlyRequests).length > 0 ? (
                         Object.entries(monthlyRequests).map(([month, requests]) => (
                                <div key={month}>
                                    <h3>เดือน {getMonthName(parseInt(month))}</h3>
                                    <table className="summaryTablewithdraw">
                                        <thead>
                                            <tr>
                                                <th>เบิกอุปกรณ์ครั้งที่</th>
                                                <th>ชื่ออุปกรณ์</th>
                                                <th>จำนวน</th>
                                                <th>วันที่ขอ</th>
                                                <th>ผู้ขอ</th>
                                                <th>สถานะ</th>
                                                <th>เหตุผล</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {requests.length > 0 ? (
                                                requests.map((req) => (
                                                    <tr key={req.ID}>
                                                        <td>{req.ID}</td>
                                                        <td>{req.NameItem}</td>
                                                        <td>{req.QuantityRequest}</td>
                                                        <td>{req.DateRequest ? new Date(req.DateRequest).toLocaleDateString() : "N/A"}</td>
                                                        <td>{req.User?.UserName}</td>
                                                        <td>
                                                            {req.RequestDetails?.length ? (
                                                                req.RequestDetails.map((detail) => (
                                                                    <div key={detail.ID}>
                                                            {detail.StatusRequest ? "สำเร็จ" : "ไม่สำเร็จ"}
                                                                    </div>
                                                                ))
                                                            ) : "ไม่มีข้อมูล"}
                                                        </td>
                                                        <td>
                                                            {req.RequestDetails?.length ? (
                                                                req.RequestDetails.map((detail) => (
                                                                    <div key={`reason-${detail.ID}`}>
                                                                        {detail.Reason || "-"}
                                                                    </div>
                                                                ))
                                                            ) : "ไม่มีข้อมูล"}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={7}>ไม่มีคำร้องในเดือนนี้</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            ))
                            ) : (
                            <p>ไม่มีคำร้องในระบบ</p>
                        )}
                        <button className="btn btn-closewithdraw" onClick={toggleSummaryPopup}>ปิด</button>
                    </div>
                </div>
            )}


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
                                <p>{data.QuantityInventory}
                                    {(data.QuantityInventory ?? 0) <= LOW_STOCK_THRESHOLD && (
                                        <span className="low-stock-alert"> ⚠️ </span>
                                )}
                                </p>
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