import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Typography } from '@material-ui/core';

const Calendar = () => {
  // Calendar States
  const [currentEvents, setCurrentEvents] = useState([]);
  const [counter, setCounter] = useState(0);
  const [eventObj, setEventObj] = useState(null);

  // useEffect(() => {
  // LOAD all events
  // }, [currentEvents])

  // from fullcalendar libary to handle calendar events
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      let newEvent = calendarApi.addEvent({
        id: counter,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      setCounter(counter + 1);
      setEventObj(newEvent);
      // PUT new event to database
    }
  };

  console.log('curr', currentEvents);
  console.log('obj', eventObj);

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event ${clickInfo.event.title}`
      )
    ) {
      clickInfo.event.remove();
      // DELETE event from database
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  console.log(currentEvents);

  return (
    <Typography component="div" id="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
      />
    </Typography>
  );
};

export default Calendar;
