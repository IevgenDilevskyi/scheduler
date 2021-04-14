import React from "react";
import "./styles.scss";
// import Header from "../Appointment";
// import Show from "../Appointment";
// import Empty from "../Appointment";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";



export default function Appointment(props) {
  return(
    <article className="appointment">
       <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} 
    </article>
  )

}

// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.
