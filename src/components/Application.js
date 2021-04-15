import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//   },
//   {
//     id: 4,
//     time: "4pm",
//     interview: {
//       student: "Cool guy",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4.30pm",
//     interview: {
//       student: "Eugene JD",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
// ];

export default function Application(props) {

  // const [days, setDays] = useState([]);
  // let [day, setDay] = useState('Monday');
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });

  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    const promises = [daysPromise,appointmentsPromise];
    Promise.all(promises)    
      .then(res => {
        console.log("Promise.all RESPONSE",res);
        setState(prev => ({...prev, days: res[0].data, appointments: res[1].data}))
      })
  }, []);

    // useEffect(() => {
    //   axios.get("/api/days")
      
    //   .then(response => {
    //     // setDays([...response.data]);
    //   })}, []);

  const appointmentsList = dailyAppointments.map(appointment => {
    return(
      <Appointment
        key={appointment.id}
        {...appointment}
      />
    )

  })

  return (
    <main className="layout">
      <section className="sidebar">
        
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setDay={setDay}
            />
          </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
    
    
  );
  
}
