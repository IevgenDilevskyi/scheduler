import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");
    const promises = [daysPromise, appointmentsPromise, interviewersPromise];
    Promise.all(promises)    
    .then(res => {
      console.log("Promise.all RESPONSE",res);
        setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}))
      })
    }, []);
    
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      
    return(
      <Appointment
        key={appointment.id}
        interview={interview}
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
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>  
  );
}
