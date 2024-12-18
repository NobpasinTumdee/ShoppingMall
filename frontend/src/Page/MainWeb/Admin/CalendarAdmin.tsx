import React, { useEffect, useState } from 'react';
import '../Main.css';
import '@schedule-x/theme-default/dist/index.css'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay , createViewMonthAgenda , createViewMonthGrid , createViewWeek } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

const CalendarAdmin: React.FC = () => {
    const eventsService = useState(() => createEventsServicePlugin())[0]
 
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
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-12-16',
        end: '2024-12-16',
        calendarId: "Main",
      },
      {
        id: '2',
        title: 'Event 1',
        start: '2024-12-16',
        end: '2024-12-16',
      },
    ],
    plugins: [eventsService]
  })
 
  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
    return(
        <>
            <div style={{height: '110px',zIndex: '0'}}></div>
            <h1>Calendar</h1>
            <div className='Calendar'>
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </>
    );

};

export default CalendarAdmin;