import React, { useState } from 'react';
import './CleaningUI.css';

const TaskOverview: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State สำหรับควบคุมป๊อปอัป
  const [formData, setFormData] = useState({
    actual_start_time: '',
    actual_end_time: '',
    notes: '',
    schedule_id: '',
    user_id: '',
  });

  // Helper functions for calendar generation
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfWeek = (month: number, year: number) => new Date(year, month, 1).getDay();

  // ฟังก์ชันควบคุมป๊อปอัป
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // ฟังก์ชันจัดการฟอร์ม
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // ฟังก์ชันสำหรับส่งข้อมูล
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    closePopup(); // ปิดป๊อปอัปหลังจากส่งข้อมูล
  };

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
    calendarDays.push(null); // Empty cells for days before the 1st
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="cleaning-container">
      {/* Header Section */}
      <header className="header">
        <div className="dropdown">
          <label htmlFor="taskFilter">Option:</label>
          <select id="taskFilter" className="task-filter">
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
            <option>Item 4</option>
          </select>
        </div>
        <button className="add-task-button" onClick={openPopup}>
          บันทึกการทำความสะอาด
        </button>
      </header>

      {/* Calendar Navigation */}
      <div className="calendar-navigation">
        <button onClick={goToPreviousMonth}>&lt; Previous</button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })}, {currentYear}
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
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIndex) => (
              <tr key={weekIndex}>
                {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, index) => (
                  <td key={index} className="day-cell">
                    {day && (
                      <>
                        <span>{day}</span>
                        <div className="task-label design">Design</div>
                        <br />
                        <div className="task-label development">Development</div>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
                  name="actual_start_time"
                  value={formData.actual_start_time}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                เวลาสิ้นสุด:
                <input
                  type="datetime-local"
                  name="actual_end_time"
                  value={formData.actual_end_time}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                หมายเหตุ:
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                ></textarea>
              </label>
              <label>
                Schedule ID:
                <input
                  type="number"
                  name="schedule_id"
                  value={formData.schedule_id}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                User ID:
                <input
                  type="number"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit">บันทึก</button>
              <button type="button" onClick={closePopup}>
                ยกเลิก
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskOverview;
