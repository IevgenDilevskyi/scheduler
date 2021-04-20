import React, {useState} from 'react';

import Button from "../../components/Button"
import InterviewerList from "../../components/InterviewerList";

const Form = (props) => {
  
  const [name, setName] = useState(props.name || "");
  const [selectedInterviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // const setInterviewer = () => props.setInterviewer;
  // const interviewer = props.interviewer;
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, selectedInterviewer);
  }

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            data-testid="student-name-input"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        {/* <InterviewerList interviewers={props.interviewers} interviewer={props.interviewer} setInterviewer={props.setInterviewer} /> */}
        <InterviewerList interviewers={props.interviewers} interviewer={selectedInterviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>

  )

}

export default Form;