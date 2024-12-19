import React, { useEffect, useState } from 'react';
import '../Main.css';
import '@schedule-x/theme-default/dist/index.css';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';


import { StoreInterface } from '../../../interfaces/StoreInterface';
import { GetStoreByStatus } from '../../../services/https';

const CalendarAdmin: React.FC = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];
  const [Store, setStore] = useState<StoreInterface[]>([]);
    useEffect(() => {
      fetchUserData('This store is already taken.');
    },[]);
    
    const fetchUserData = async (F: string) => {
        try {
            const res = await GetStoreByStatus(F);
            if (res.status === 200 && res.data) {
                setStore(res.data);
            }
        } catch (error) {
            setStore([]);
        }
    };

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    calendars: {
      Main: {
        colorName: 'Main',
        lightColors: {
          main: '#C9AF62',
          container: '#E8D196',
          onContainer: '#594800',
        },
        darkColors: {
          main: '#fff5c0',
          onContainer: '#fff5de',
          container: '#a29742',
        },
      },
    },
    events: Store.map(store => ({
      id: store.ID?.toString() || 'unknown',
      title: store.NameStore || 'Unnamed Store',
      start: store.BookingDate ? new Date(store.BookingDate).toISOString().split('T')[0] : '2024-12-16',
      end: store.BookingDate ? new Date(store.BookingDate).toISOString().split('T')[0] : '2024-12-16',
      calendarId: "Main",
    })),
    plugins: [eventsService],
  });
  

  return (
    <>
      <div style={{ height: '110px', zIndex: '0' }}></div>
      <h1>Calendar</h1>
      <div className='Calendar'>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>
    </>
  );
};

export default CalendarAdmin;
