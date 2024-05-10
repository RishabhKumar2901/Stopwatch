// ************Without using useState for time***********

import React, { useRef, useState } from "react";
import "./Component1.css";
import { Button, Grid } from "@mui/material";

const Component1 = () => {
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [laps, setLaps] = useState([]);
  const [startTime, setStartTime] = useState(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  const startStopwatch = () => {
    setIsRunning(true);
    const existingTimeVal = document.querySelector("#timeval").textContent;
    let initialStartTime;
    if (existingTimeVal !== "00:00:00") {
      const [existingMinutes, existingSeconds, existingMilliseconds] = existingTimeVal.split(":").map(Number);
      const existingTimeElapsed = (existingMinutes * 60000) + (existingSeconds * 1000) + (existingMilliseconds * 10);
      initialStartTime = Date.now() - existingTimeElapsed;
    } else {
      initialStartTime = Date.now();
    }
    setStartTime(initialStartTime);
    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - initialStartTime;
      const milival = document.querySelector("#timeval");
      if (milival) {
        milival.textContent = formatTime(elapsedTime);
      }
    }, 10);
  };  

  const stopStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setStartTime(null);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setStartTime(null);
    setLaps([]);
    const milival = document.querySelector("#timeval");
    if (milival) {
      milival.textContent = "00:00:00";
    }
  };

  const lapStopwatch = () => {
    if (startTime !== null) {
      const elapsedTime = Date.now() - startTime;
      setLaps([elapsedTime, ...laps]);
    }
  };

  return (
    <>
      <Grid className="heading" mt={5}>
        <div>React Interview</div>
        <Grid mt={10}>Stopwatch</Grid>
        <span id="timeval">00:00:00</span>
        <Grid className="stopwatch" mt={5}>
          <Button
            variant="outlined"
            color="success"
            onClick={() => startStopwatch()}
            disabled={isRunning}
          >
            Start
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => stopStopwatch()}
            disabled={!isRunning}
          >
            Stop
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => lapStopwatch()}
            disabled={!isRunning}
          >
            Lap
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => resetStopwatch()}
          >
            Reset
          </Button>
        </Grid>
        {laps.map((lapTime, index) => (
          <p key={index}>Lap {laps.length - index}&nbsp;{formatTime(lapTime)}</p>
        ))}
      </Grid>
    </>
  );
};

export default Component1;








// **********With Using useState****************

// import React, { useEffect, useRef, useState } from "react";
// import "./Component1.css";
// import { Button, Grid } from "@mui/material";

// const Component1 = () => {
//   const [isRunning, setIsRunning] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const intervalRef = useRef(null);
//   const [laps, setLaps] = useState([]);
//   let milival = document.querySelector("#timeval");
//   console.log("first",milival.textContent,parseInt(milival.textContent)+1);


//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60000);
//     const seconds = Math.floor((time % 60000) / 1000);
//     const milliseconds = Math.floor((time % 1000) / 10);
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
//   };

//   const startStopwatch = () => {
//     setIsRunning(true);
//     const startTime = Date.now() - elapsedTime;
//     intervalRef.current = setInterval(() => {
//       setElapsedTime(Date.now() - startTime);
//     }, 10);
//   };

//   const stopStopwatch = () => {
//     clearInterval(intervalRef.current);
//     setIsRunning(false);
//   };

//   const resetStopwatch = () => {
//     clearInterval(intervalRef.current);
//     setIsRunning(false);
//     setElapsedTime(0);
//     setLaps([]);
//   };

//   const lapStopwatch = () => {
//     setLaps([elapsedTime, ...laps]);
//   };

//   return (
//     <>
//       <Grid className="heading" mt={5}>
//         <div>React Interview</div>
//         <Grid mt={10}>Stopwatch</Grid>
//         <Grid mt={5}>{formatTime(elapsedTime)}</Grid>
//         <div id="timeval">00</div>
//         <Grid className="stopwatch" mt={5}>
//           <Button
//             variant="outlined"
//             color="success"
//             onClick={() => startStopwatch()}
//           >
//             Start
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => stopStopwatch()}
//           >
//             Stop
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={() => lapStopwatch()}
//           >
//             Lap
//           </Button>
//           <Button
//             variant="outlined"
//             color="primary"
//             onClick={() => resetStopwatch()}
//           >
//             Reset
//           </Button>
//         </Grid>
//         {laps.map((lapTime, index) => (
//           <p>Lap {laps.length - index}&nbsp;{formatTime(lapTime)}</p>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default Component1;