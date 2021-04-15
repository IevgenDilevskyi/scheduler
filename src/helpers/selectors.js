
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
