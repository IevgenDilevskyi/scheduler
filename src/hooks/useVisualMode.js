import {useState} from "react";

// Custom hook responsible for holding state of the mode. Appointment view depends on the mode (in Appointment/index.js)
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Changes mode and adds it History array. Gets called in Appointment/index.js.
  function transition(newMode, replace = false) {

    if (replace) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
    }
    setMode(newMode)
    setHistory(prev => [...prev, newMode])

  }

  // Changes mode to previous and changes History array. Gets called in Appointment/index.js.
  function back() {
   
    if(history.length > 1) {
      const newHistory = history.slice(0, -1)
      setHistory(newHistory)
      setMode(newHistory[newHistory.length - 1])
    }

  }

  return { mode, transition, back};
}