
//returns array of appointments objects
export function getAppointmentsForDay(state, day) {
  const result = [];

  for(let item of state.days) {
    if(item.name === day) {
      for(let appointment of item.appointments) {
        result.push(state.appointments[appointment])
      }
    }
  }
    return result;
}
//returns array of interviewers objects
export function getInterviewersForDay(state, day) {
  const result = [];

  for(let item of state.days) {
    if(item.name === day) {
      for(let interviewer of item.interviewers) {
        result.push(state.interviewers[interviewer])
      }
    }
  }
    return result;
}

//returns interview object
export function getInterview(state, interview) {
  if(!interview) {return null};

  const result = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  return result;
}