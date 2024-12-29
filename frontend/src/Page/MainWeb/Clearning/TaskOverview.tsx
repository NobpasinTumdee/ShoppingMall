import React, { useEffect, useState } from 'react';
import './CleaningUI.css';
import { ListAreas,CreateCleaningRecord,GetCleaningRecordsByArea,GetSchedulesByArea,GetUserById } from '../../../services/https';
import { AreaInterface,CleaningRecordInterface,SchedulesInterface } from '../../../interfaces/CleaningInterface';
import { message } from "antd";

const TaskOverview: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenTask, setIsPopupOpenTask] = useState(false); // ป็อปอัปสำหรับ "รายละเอียดงาน"
  const [isPopupOpenClean, setIsPopupOpenClean] = useState(false); // ป็อปอัปสำหรับ "รายละเอียดการทำความสะอาด"
  const [popupMessage, setPopupMessage] = useState(''); // สำหรับแสดงข้อความ
  const [areas, setAreas] = useState<AreaInterface[]>([]);
  const [selectedArea, setSelectedArea] = useState<number | undefined>(undefined);//เลือกพื้นที่ทำความสะอาด
  const [cleaningRecords, setCleaningRecords] = useState<CleaningRecordInterface[]>([]);
  const [schedule, setschedule] = useState<SchedulesInterface[]>([]);
  const [popupCleaningRecords, setPopupCleaningRecords] = useState<CleaningRecordInterface[]>([]);
  const [popupSchedules, setPopupSchedules] = useState<SchedulesInterface[]>([]);
  const [UserformData, setUserFormData] = useState({
    UserID: "", // เก็บค่าที่จะส่ง
    Username: "", // เก็บค่าที่จะแสดง
  });
  const [formData, setFormData] = useState({
    ActualStartTime: '',
    ActualEndTime: '',
    Notes: '',
    AreaID: 0,
  });
  const resetForm = () => {
    setFormData({
      ActualStartTime: '',ActualEndTime: '',Notes: '',AreaID: 0});
    setUserFormData({
      UserID: "",Username: "",});
  };

  const openCleanPopup = (day: number) => { 
    
    if (!selectedArea) {
      message.info("กรุณาเลือกสถานที่ทำความสะอาดก่อน");
      return;
    }
    // ตรวจสอบว่ามีค่า cleaningRecords หรือไม่
    if (!cleaningRecords || !Array.isArray(cleaningRecords)) {
      //console.error("cleaningRecords ไม่มีค่า หรือไม่ใช่อาร์เรย์");
      setPopupCleaningRecords([]);
      setPopupMessage(`ไม่พบข้อมูลการทำความสะอาดสำหรับวันที่ ${day}/${currentMonth + 1}/${currentYear}`);
      setIsPopupOpenClean(true);
      return;
    }
  
    // กรองข้อมูล CleaningRecords เฉพาะที่ตรงกับวันที่ที่เลือก
    const filteredRecords = cleaningRecords.filter((record) => {
      if (!record.ActualStartTime) return false; // ข้ามกรณี undefined
      const recordDate = new Date(record.ActualStartTime);
      return (
        recordDate.getDate() === day &&
        recordDate.getMonth() === currentMonth &&
        recordDate.getFullYear() === currentYear
      );
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
    //formRef.current?.reset();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setUserFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedArea) {
      message.error('กรุณาเลือกสถานที่ก่อนทำการบันทึกการทำความสะอาด');
      return; // หยุดการทำงานถ้ายังไม่ได้เลือกสถานที่
    }

    // ฟังก์ชันแปลงเวลาให้เป็น UTC และมี timezone
    const formatDateToBackend = (isoDate: string | number | Date) => {
      const date = new Date(isoDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const timezoneOffset = date.getTimezoneOffset();
      const sign = timezoneOffset > 0 ? '-' : '+';
      const absOffset = Math.abs(timezoneOffset);
      const offsetHours = String(Math.floor(absOffset / 60)).padStart(2, '0');
      const offsetMinutes = String(absOffset % 60).padStart(2, '0');
      const timezone = `${sign}${offsetHours}:${offsetMinutes}`;

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${timezone}`;
    };
    
    try { 
      const response = await CreateCleaningRecord({
        ...formData,
        UserID: Number(UserformData.UserID),
        AreaID: selectedArea,
        ActualStartTime: formatDateToBackend(formData.ActualStartTime),
        ActualEndTime: formatDateToBackend(formData.ActualEndTime),
      });
    
      console.log('Form data submitted successfully:', response);
    
      // ตรวจสอบสถานะ response ที่ไม่ใช่ 200/201
      if (response.status >= 400) {
        throw new Error(response.data.error || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }

      await fetchCleaningRecords(selectedArea);
      message.success("บันทึกข้อมูลการทำความสะอาดสำเร็จ");
      resetForm();
      closePopup();
    } catch (error: any) {
      console.error('Error while submitting form:', error);
    
      if (error?.response?.data?.error) {
        message.error(`${error.response.data.error}`);
      } else if (error.message) {
        message.error(`ข้อผิดพลาด: ${error.message}`);
      } else {
        message.error('เกิดข้อผิดพลาดที่ไม่คาดคิด');
      }
    }
    
  };

  const openPopup = () => {
    setPopupMessage('บันทึกการทำความสะอาด');
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

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
  }, [cleaningRecords]);

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
      const data = await GetCleaningRecordsByArea(areaId);
      setCleaningRecords(data); // เก็บข้อมูลใน State
      //console.log(cleaningRecords)
    } catch (error) {
      console.error('Error fetching cleaning records:', error);
    }
  };

  // ฟังก์ชันเรียกข้อมูลการทำความสะอาด
  const fetchSchedules = async (areaId: number) => {
    try {
      const data = await GetSchedulesByArea((areaId)); // เรียก API
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
          value={selectedArea || ''} // ใช้ '' เป็นค่า fallback ถ้า selectedArea เป็น null
          onChange={(e) => setSelectedArea(Number(e.target.value))} // อัปเดตค่า selectedArea
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

      {/* Popup สำหรับบันทึกข้อมูล */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h3>บันทึกการทำความสะอาด</h3>
            <form onSubmit={handleSubmit}>
              <label>
                เวลาเริ่มต้น:
                <input
                  type="datetime-local"
                  name="ActualStartTime"
                  value={formData.ActualStartTime}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                เวลาสิ้นสุด:
                <input
                  type="datetime-local"
                  name="ActualEndTime"
                  value={formData.ActualEndTime}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                หมายเหตุ:
                <textarea
                  name="Notes"
                  value={formData.Notes}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <br />
              <label>
                ผู้บันทึก :
                <input
                  name="UserID"
                  value={UserformData.Username}
                  onChange={handleInputChange}
                  readOnly
                />
              </label>
              <br />
              <button type="submit">บันทึก</button>
              <button type="button" onClick={closePopup}>
                ยกเลิก
              </button>
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
      <div className="popup">
        <div className="popup-content">
        <h3>{popupMessage}</h3>
          {popupSchedules.length > 0 ? (
          <ul>
            {popupSchedules.map((record, index) => (
              <li key={index}>
                <p>เวลาเริ่มต้น {record.StartTime ? record.StartTime.substring(11, 19) : '-'}</p>
                <p>เวลาสิ้นสุด {record.EndTime ? record.EndTime.substring(11, 19) : '-'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>ไม่มีข้อมูลงานทำความสะอาดสำหรับวันนี้</p>
        )}
          <button onClick={() => setIsPopupOpenTask(false)}>ปิด</button>
        </div>
      </div>
      )}

      {/* Popup สำหรับ "รายละเอียดการทำความสะอาด" */}
      {isPopupOpenClean && (
      <div className="popup">
        <div className="popup-content">
        <h3>{popupMessage}</h3>
          {popupCleaningRecords.length > 0 ? (
          <ul>
            {popupCleaningRecords.map((record, index) => (
              <li key={index}>
                <p>เวลาเริ่มต้น {record.ActualStartTime ? new Date(record.ActualStartTime).toLocaleTimeString('th-TH') : '-'}</p>
                <p>เวลาสิ้นสุด {record.ActualEndTime ? new Date(record.ActualEndTime).toLocaleTimeString('th-TH') : '-'}</p>
                <p>หมายเหตุ: {record.Notes || '-'}</p>
                <p>ผู้บันทึก: {record.UserName || '-'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>ไม่มีข้อมูลการทำความสะอาดสำหรับวันนี้</p>
        )}
          <button onClick={() => setIsPopupOpenClean(false)}>ปิด</button>
        </div>
      </div>
      )}

    </div>
  );
};

export default TaskOverview;
