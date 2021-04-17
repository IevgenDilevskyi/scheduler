import React from "react";
// import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  console.log("DAYS", state.days);

  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day });

  // useEffect(() => {
  //   const daysPromise = axios.get("/api/days");
  //   const appointmentsPromise = axios.get("/api/appointments");
  //   const interviewersPromise = axios.get("/api/interviewers");
  //   const promises = [daysPromise, appointmentsPromise, interviewersPromise];
  //   Promise.all(promises)    
  //   .then(res => {
  //       setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}))
  //     })
  //   }, []);
    
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  console.log("getInterviewersForDay", dailyInterviewers);
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return(
      <Appointment
        {...appointment}
        id={appointment.id}
        key={appointment.id}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })
  
  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };   
  //    return axios.put(`/api/appointments/${id}`, appointment)
  //     .then((prev) => setState({...prev, appointments}))
  // }

  // function cancelInterview(id) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.delete(`/api/appointments/${id}`)
  //     .then((prev) => setState({...prev, appointments}))
  //     .catch((error) => {throw error})
  // }



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
