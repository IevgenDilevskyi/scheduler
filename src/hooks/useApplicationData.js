import {useState, useEffect} from "react";
import axios from "axios";

//Custom hook
export default function useApplicationData() {
  //All state is here
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState(prev => ({ ...prev, day }));
  // Side effects hook
  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const appointmentsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");
    const promises = [daysPromise, appointmentsPromise, interviewersPromise];
    //Gets promises from axios calls and .then setState with this data
    Promise.all(promises)    
    .then((res) => {
        setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}))
      })
    }, []);

    // Counts the spots for the given day
    const getSpotsForDay = (dayObj, appointments) => {
      let spotCount = 0;
      dayObj.appointments.map(id => (!appointments[id].interview) ? spotCount++ : spotCount)
      return spotCount
    }; 
    
    // Returns days array with correct spots for the given day
    const updateSpots = function (dayName, days, appointments) {
      //Find the day Object
      const dayObj = days.find(day => day.name === dayName);
      //Calculate spots for this day
      const spots = getSpotsForDay(dayObj, appointments);
      //Update day Object with correct spots
      const newDay = {...dayObj, spots};
      //Creating new days Array
      const newDays = days.map(day => day.name === dayName ? newDay : day)
      return newDays;
    }

  //Updates appointments object with new interview data and changes State
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //Returns days array with updated spots
    const days = updateSpots(state.day, state.days, appointments)

     return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState(prev => ({...prev, appointments, days})))
  }

  //Updates appointments object after deleting interview and changes State
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //Returns days array with updated spots
    const days = updateSpots(state.day, state.days, appointments)

    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState(prev => ({...prev, appointments, days})))
      .catch((error) => {throw error})
  }
  //Return of whole custom hook
  return{state, setDay, bookInterview, cancelInterview};
}