import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");
    const promises = [daysPromise, appointmentsPromise, interviewersPromise];
    Promise.all(promises)    
    .then((res) => {
        console.log("res", res[0].data);
        setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}))
      })
    }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };   
     return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState(prev => ({...prev, appointments})))
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments})))
      .catch((error) => {throw error})
  }

  return{state, setDay, bookInterview, cancelInterview};
}