import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Typography } from '@material-ui/core';
import axios from 'axios';

const Calendar = ({ id }) => {
  const [eventObj, setEventObj] = useState(null);
  const [onloadEvents, setOnloadEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/${id}/events`)
      .then(({ data }) => {
        console.log('data.events', data.events);
        setOnloadEvents(data.events);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log('onloadEvents', onloadEvents);

  // from fullcalendar libary to handle calendar events
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      let newEvent = calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      setEventObj(newEvent);
      if (eventObj) {
        console.log('eventObj in handleEvent', eventObj);
        axios
          .post('/user/me/events', {
            events: {
              title: eventObj.title,
              start: eventObj.start,
              startStr: eventObj.startStr,
              end: eventObj.end,
              endStr: eventObj.endStr,
              allDay: eventObj.allDay
            }
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  console.log(eventObj);

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
    if (
      window.confirm(
        `Are you sure you want to delete the event ${clickInfo.event.title}`
      )
    ) {
      clickInfo.event.remove();
      // axios.delete(`/user/me/events${eventID}`)
      //     .then((response) => {
      //       console.log(response);
      //     })
      //     .catch((error) => console.log(error));
    }
  };

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
        events={onloadEvents}
        editable={true}
        selectable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
    </Typography>
  );
};

export default Calendar;
