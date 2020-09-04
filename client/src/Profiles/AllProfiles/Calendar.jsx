import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';

const Calendar = ({ id }) => {
  const [onloadEvents, setOnloadEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/${id}/events`)
      .then(({ data }) => {
        setOnloadEvents(data.events);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // from fullcalendar libary to handle calendar events
  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    if (title) {
      let newEvent = calendarApi.addEvent({
        title,
        start: selectInfo.start,
        startStr: selectInfo.startStr,
        end: selectInfo.end,
        endStr: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
      addEvent(newEvent);
    }
  };

  const addEvent = (eventObj) => {
    axios
      .post('/user/me/events', {
        events: {
          title: eventObj.title,
          start: eventObj.start,
          end: eventObj.end,
          allDay: eventObj.allDay
        }
      })
      .then(({ data }) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEvent = () => {
    // clickInfo.event.remove();
    // axios
    //   .delete(`/user/me/events${eventID}`)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => console.log(error));
  };

  const handleEventClick = (clickInfo) => {
    console.log(clickInfo.event);
    const start = moment(clickInfo.event.start).format(
      'ddd, MMMM Do YYYY, h:mm a'
    );
    const end = moment(clickInfo.event.end).format('ddd, MMMM Do YYYY, h:mm a');
    swal({
      title: `Event: ${clickInfo.event.title}`,
      text: `From: ${start}\nTo: ${end}`,
      buttons: [true, 'Delete'],
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        swal('Your event has been deleted!', {
          icon: 'success'
        });
      }
    });
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
