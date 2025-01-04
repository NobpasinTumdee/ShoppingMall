import React, { useEffect, useState } from 'react';
import './CleaningUI.css';
import { ListAreas,CreateCleaningRecord,GetCleaningRecordsByArea,GetSchedulesByArea,GetUserById, DeleteCleaningRecord } from '../../../services/https';
import { AreaInterface,CleaningRecordInterface,SchedulesInterface } from '../../../interfaces/CleaningInterface';
import { message } from "antd";

const TaskOverview: React.FC = () => {
  /*interface FormData {
    ActualStartTime: string;
    ActualEndTime: string;
    Notes: string;
    AreaID: number;
  }*/
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenTask, setIsPopupOpenTask] = useState(false);
  const [isPopupOpenClean, setIsPopupOpenClean] = useState(false); 
  const [popupMessage, setPopupMessage] = useState(''); 
  const [areas, setAreas] = useState<AreaInterface[]>([]);
  const [selectedArea, setSelectedArea] = useState<number | undefined>(undefined);
  const [cleaningRecords, setCleaningRecords] = useState<CleaningRecordInterface[]>([]);
  const [schedule, setschedule] = useState<SchedulesInterface[]>([]);
  const [popupCleaningRecords, setPopupCleaningRecords] = useState<CleaningRecordInterface[]>([]);
  const [popupSchedules, setPopupSchedules] = useState<SchedulesInterface[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [UserformData, setUserFormData] = useState({
    UserID: " ", // เก็บค่าที่จะส่ง
    Username: " ", // เก็บค่าที่จะแสดง
  });
  const [formData, setFormData] = useState<CleaningRecordInterface>({
    ActualStartTime: undefined, 
    ActualEndTime: undefined,
    Notes: '',
    AreaID: 0,
  });
  const resetForm = () => {
    setFormData({
      ActualStartTime: undefined,ActualEndTime: undefined,Notes: '',AreaID: 0});
  };

  const openCleanPopup = (day: number) => { 
    
    if (!selectedArea) {
      message.info("กรุณาเลือกสถานที่ทำความสะอาดก่อน");
      return;
    }
    
    // ตรวจสอบว่ามีค่า cleaningRecords หรือไม่
    if (!cleaningRecords || !Array.isArray(cleaningRecords)) {
      setPopupCleaningRecords([]);
      setPopupMessage(`ไม่พบข้อมูลการทำความสะอาดสำหรับวันที่ ${day}/${currentMonth + 1}/${currentYear}`);
      setIsPopupOpenClean(true);
      return;
    }
  
    const filteredRecords = cleaningRecords.filter((record) => {
      if (record && record.ActualStartTime) {
        const startTime = new Date(record.ActualStartTime);
        return (
          startTime.getDate() === day &&
          startTime.getMonth() === currentMonth &&
          startTime.getFullYear() === currentYear
        );
      }
      return false;
    });    

    //console.log("Filtered Records:", filteredRecords); // แสดงข้อมูลใน Console
    // เซ็ตข้อมูลที่กรองแล้วใน State
    setPopupCleaningRecords(filteredRecords);
    setPopupMessage(
      filteredRecords.length > 0
        ? `รายละเอียดการทำความสะอาดสำหรับวันที่ ${day}/${currentMonth + 1}/${currentYear}`
        : `ไม่มีข้อมูลการทำความสะอาดสำหรับวันที่ ${day}/${currentMonth + 1}/${currentYear}`
    );
    setIsPopupOpenClean(true);
    //console.log("Filtered Records:", filteredRecords);
  };

  const openTaskPopup = (day: number) => {
    
    if (!selectedArea) {
      message.info("กรุณาเลือกสถานที่ทำความสะอาดก่อน");
      return;
    }
  // กรองข้อมูล Schedule เฉพาะที่ตรงกับวันที่ที่เลือก
  const filteredRecords = schedule.filter((record) => {
    if (!record.StartTime) return false; // ข้ามกรณี undefined
    const recordDate = new Date(record.StartTime);
    return (
      recordDate.getDate() === day &&
      recordDate.getMonth() === currentMonth &&
      recordDate.getFullYear() === currentYear
    );
  });

  setPopupSchedules(filteredRecords); // เซ็ตข้อมูลที่กรองแล้วใน State
  setPopupMessage(`รายละเอียดการทำงานสำหรับวันที่ ${day}/${currentMonth + 1}/${currentYear}`);
  setIsPopupOpenTask(true);
  };

  // ฟังก์ชันจัดการฟอร์ม
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "ActualStartTime" || name === "ActualEndTime"
        ? (value ? new Date(new Date(value).getTime() - new Date().getTimezoneOffset() * 60000) : null)
        : value,
    }));    
    setUserFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDelete = async (day: Date) => {
    try {
      console.log("วันที่ที่ต้องการลบ:", day);
  
      // ตรวจสอบว่ามีการเลือกพื้นที่หรือยัง
      if (!selectedArea) {
        message.info("กรุณาเลือกสถานที่ทำความสะอาดก่อน");
        return;
      }
  
      // แปลงวันที่ให้เป็น local time (yyyy-MM-dd)
      const localDate = new Date(day);
      localDate.setHours(0, 0, 0, 0); // ตั้งเวลาเป็นเที่ยงคืน
      const formattedDay = localDate.toLocaleDateString("en-CA"); // ได้รูปแบบ yyyy-MM-dd
  
      // สร้าง payload เพื่อส่งไปยัง API
      const payload = {
        AreaID: selectedArea.toString(),
        Day: formattedDay, // ส่งค่าใน local timezone
      };
  
      // ส่งคำขอ API เพื่อทำการลบข้อมูล
      console.log("ลบข้อมูลด้วย payload:", payload);
      await DeleteCleaningRecord(payload);
  
      // อัปเดตรายการหลังการลบสำเร็จ
      await fetchCleaningRecords(selectedArea); // ดึงข้อมูลใหม่สำหรับพื้นที่ที่เลือก
      message.success("ลบข้อมูลการทำความสะอาดสำเร็จ");
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("เกิดข้อผิดพลาดในการลบข้อมูล");
    }
  };     
   
  const validateForm = (formData: any) => {
    const errors: Record<string, string> = {};
  
    if (!selectedArea) {
      errors.selectedArea = "กรุณาเลือกสถานที่ก่อนทำการบันทึกการทำความสะอาด";
    }
    if (!formData.ActualStartTime || !(formData.ActualStartTime instanceof Date)) {
      errors.ActualStartTime = "กรุณากรอกเวลาเริ่มต้นจริง";
    }
    if (!formData.ActualEndTime || !(formData.ActualEndTime instanceof Date)) {
      errors.ActualEndTime = "กรุณากรอกเวลาสิ้นสุดจริง";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // เช็คสถานที่ที่เลือก
    if (!selectedArea) {
      message.error("กรุณาเลือกสถานที่ก่อนทำการบันทึกการทำความสะอาด");
      return;
    }
  
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
  
    setErrors({}); 
  
    const formattedStartTime = formData.ActualStartTime
      ? new Date(formData.ActualStartTime)
      : undefined;

    const formattedEndTime = formData.ActualEndTime
      ? new Date(formData.ActualEndTime)
      : undefined;
  
    try {
      const response = await CreateCleaningRecord({
        ...formData,
        UserID: Number(UserformData.UserID),
        AreaID: selectedArea,
        Notes: formData.Notes,
        ActualStartTime: formattedStartTime, 
        ActualEndTime: formattedEndTime,   
      });
  
      console.log("Form data submitted successfully:", response);
  
      if (response.status >= 400) {
        throw new Error(response.data.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
  
      await fetchCleaningRecords(selectedArea);
      message.success("บันทึกข้อมูลการทำความสะอาดสำเร็จ");
      resetForm();
      closePopup();
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

  const openPopup = () => {
    setPopupMessage('บันทึกการทำความสะอาด');
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    resetForm();
  }

  // ดึงข้อมูล Areas
  useEffect(() => {
    const fetchAreas = async () => {
      const data = await ListAreas();
      console.log(data);
      setAreas(data);
    };

    fetchAreas();
  }, []);

  // ดึงข้อมูล User
  useEffect(() => {
    const userId = localStorage.getItem("id");

    if (userId) { 
      const fetchUser = async (userid: string) => {
        try {
          const Userdata = await GetUserById(userid);
          //console.log(Userdata.data);
          setUserFormData(Userdata.data); // สมมติว่าคุณมี setUser อยู่แล้ว
          setUserFormData((prev: any) => ({
            ...prev,
            UserID: userId, // เก็บ UserID สำหรับส่งข้อมูล
            Username: Userdata.data.UserName || "Unknown User", // เก็บ Username สำหรับแสดง
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


  useEffect(() => {
    if (selectedArea) fetchCleaningRecords(selectedArea);
  }, [selectedArea]);

  useEffect(() => {
    if (selectedArea) fetchSchedules(selectedArea);
  }, [selectedArea]);

  useEffect(() => {
    console.log("Cleaning Records:", cleaningRecords);
  }, [cleaningRecords])

  // Helper functions for calendar generation
  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  // Navigation handlers
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  // Generate calendar grid
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfWeek = getFirstDayOfWeek(currentMonth, currentYear);

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // ฟังก์ชันเรียกข้อมูลการทำความสะอาด
  const fetchCleaningRecords = async (areaId: number) => {
    try {
        const data: CleaningRecordInterface[] = await GetCleaningRecordsByArea(areaId);
        if (Array.isArray(data)) {
            setCleaningRecords(data);
        } else {
            console.error("API response format is incorrect");
        }
    } catch (error) {
        console.error('Error fetching cleaning records:', error);
    }
  };

  // ฟังก์ชันเรียกข้อมูลตารางการทำความสะอาด
  const fetchSchedules = async (areaId: number) => {
    try {
      const data = await GetSchedulesByArea(areaId); // เรียก API
      setschedule(data); // เก็บข้อมูลใน State
    } catch (error) {
      console.error('Error fetching cleaning records:', error);
    }
  };

  return (
    <div className="cleaning-container">
      {/* Header Section */}
      <header className="header">
      <div className="dropdown">
        <label htmlFor="taskFilter">สถานที่ทำความสะอาด :</label>
        <select
          id="taskFilter"
          className="task-filter"
          value={selectedArea || ''} 
          onChange={(e) => setSelectedArea(Number(e.target.value))} 
        >
          <option value="" disabled>
            เลือกสถานที่
          </option>
          {areas.length > 0 ? (
            areas.map((area: AreaInterface) => (
              <option key={area.ID} value={area.ID}>
                {area.AreaName}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Loading...
            </option>
          )}
        </select>
      </div>
      <button
            className="add-task-button"
            onClick={() => {
            if (!selectedArea) {
              message.info('กรุณาเลือกสถานที่ก่อนทำการบันทึกการทำความสะอาด');
              return;
            }
            openPopup();
          }}
        >
          บันทึกการทำความสะอาด
        </button>
      </header>

      {isPopupOpen && (
        <div className="popup-container">
          <div className="popup">
            <form onSubmit={handleSubmit}>
              <h2 className="popup-title">{popupMessage}</h2>
              <div className="form-group">
                <label htmlFor="ActualStartTime">เวลาเริ่มต้นจริง:</label>
                <input
                  type="datetime-local"
                  id="ActualStartTime"
                  name="ActualStartTime"
                  value={formData.ActualStartTime ? formData.ActualStartTime.toISOString().slice(0, 16) : ''}
                  onChange={handleInputChange}
                />
                {errors.ActualStartTime && (
                  <span className="error">{errors.ActualStartTime}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="ActualEndTime">เวลาสิ้นสุดจริง:</label>
                <input
                  type="datetime-local"
                  id="ActualEndTime"
                  name="ActualEndTime"
                  value={formData.ActualEndTime ? formData.ActualEndTime.toISOString().slice(0, 16) : ''}
                  onChange={handleInputChange}
                />
                {errors.ActualEndTime && (
                  <span className="error">{errors.ActualEndTime}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="Notes">หมายเหตุ:</label>
                <textarea
                  id="Notes"
                  name="Notes"
                  value={formData.Notes}
                  onChange={handleInputChange}
                />
              </div>
              <label>
                ผู้บันทึก :
                <input
                  name="UserID"
                  value={UserformData.Username}
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
              
              <div className="button-group">
                <button type="submit" className="btn btn-save">บันทึก</button>
                <button type="button" className="btn btn-close" onClick={closePopup}>
                  ปิด
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Calendar Navigation */}
      <div className="calendar-navigation">
        <button onClick={goToPreviousMonth}>&lt; Previous</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
          })}
          , {currentYear}
        </h2>
        <button onClick={goToNextMonth}>Next &gt;</button>
      </div>

      {/* Calendar Section */}
      <div className="calendar">
        <table>
          <thead>
            <tr>
              <th>SUN</th>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th>SAT</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
              (_, weekIndex) => (
                <tr key={weekIndex}>
                  {calendarDays
                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                    .map((day, index) => (
                      <td key={index} className="day-cell">
                        {day && (
                          <>
                            <span>{day}</span>
                            <div
                              className="task-label design"
                              onClick={() => openTaskPopup(day)}
                            >
                              รายละเอียดงาน
                            </div>
                            <br />
                            <div
                              className="task-label development"
                              onClick={() => openCleanPopup(day)}
                              >
                              รายละเอียดการทำงาน
                            </div>
                            <div className="delete-icon-container">
                            <button
                              className="delete-icon"
                              onClick={() => handleDelete(new Date(currentYear, currentMonth, day))}
                              >
                                🗑️
                            </button>
                          </div>
                          </>
                        )}
                      </td>
                    ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Popup สำหรับ "รายละเอียดงานความสะอาด" */}
      {isPopupOpenTask && (
        <div className="popup-container">
          <div className="popup">
            <div className="popup-content">
              <h3>{popupMessage}</h3>
              {popupSchedules.length > 0 ? (
                <ul>
                  {popupSchedules.map((record, index) => {
                    const startTime =
                      record.StartTime ? new Date(record.StartTime) : null;
                      const endTime =
                      record.EndTime ? new Date(record.EndTime) : null;

                    return (
                      <li key={index}>
                        <p>
                          เวลาเริ่มต้น{" "}
                          {startTime && !isNaN(startTime.getTime())
                            ? startTime.toISOString().substring(11, 19)
                            : "-"}
                        </p>
                        <p>
                          เวลาสิ้นสุด{" "}
                          {endTime && !isNaN(endTime.getTime())
                            ? endTime.toISOString().substring(11, 19)
                            : "-"}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>ไม่มีข้อมูลงานทำความสะอาดสำหรับวันนี้</p>
              )}
              <button onClick={() => setIsPopupOpenTask(false)}>ปิด</button>
            </div>
          </div>
        </div>
      )}


      {/* Popup สำหรับ "รายละเอียดการทำความสะอาด" */}
      {isPopupOpenClean && (
      <div className="popup-container">
        <div className="popup">
          <div className="popup-content">
          <h3>{popupMessage}</h3>
            {popupCleaningRecords.length > 0 ? (
            <ul>
              {popupCleaningRecords.map((record, index) => (
                <li key={index}>
                  <p>เวลาเริ่มต้น {record.ActualStartTime ? new Date(new Date(record.ActualStartTime).getTime() - 7 * 60 * 60 * 1000).toLocaleTimeString('th-TH') : '-'}</p>
                  <p>เวลาสิ้นสุด {record.ActualEndTime ? new Date(new Date(record.ActualEndTime).getTime() - 7 * 60 * 60 * 1000).toLocaleTimeString('th-TH') : '-'}</p>
                  <p>หมายเหตุ: {record.Notes || '-'}</p>
                  <p>ผู้บันทึก: {record.User?.UserName || '-'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>ไม่มีข้อมูลการทำความสะอาดสำหรับวันนี้</p>
          )}
            <button onClick={() => setIsPopupOpenClean(false)}>ปิด</button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default TaskOverview;
