import React, { useEffect, useRef, useState } from "react";
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const timer = useRef();

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      return () => clearInterval(timer.current);
    }
  }, [running]);

  const grabHours = useRef(null);
  const grabMinutes = useRef(null);
  const grabSeconds = useRef(null);
  const grabMilliseconds = useRef(null);

  useEffect(() => {
    grabHours.current.style.strokeDashoffset =
      440 - (440 * format(time).hours) / 12;
  }, [format(time).hours]);

  useEffect(() => {
    grabMinutes.current.style.strokeDashoffset =
      440 - (440 * format(time).minutes) / 60;
  }, [format(time).minutes]);

  useEffect(() => {
    grabSeconds.current.style.strokeDashoffset =
      440 - (440 * format(time).seconds) / 60;
  }, [format(time).seconds]);

  useEffect(() => {
    grabMilliseconds.current.style.strokeDashoffset =
      440 - (440 * format(time).milliseconds) / 100;
  }, [format(time).milliseconds]);
  return (
    <section className="flex justify-center items-center flex-col text-2xl">
      <header className="text-3xl font-semibold">React StopWatch</header>
      <div className="text-4xl">
        <div id="time">
          <div className="circle c1">
            <div className="dot"></div>
            <span>HOURS</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle ref={grabHours} cx={70} cy={70} r={70}></circle>
            </svg>
            <div id="hours">{format(time).hours}</div>
          </div>
          <div className="circle c2">
            <div className="dot"></div>
            <span>MINUTES</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle ref={grabMinutes} cx={70} cy={70} r={70}></circle>
            </svg>
            <div id="minutes">{format(time).minutes}</div>
          </div>
          <div className="circle c3">
            <div className="dot"></div>
            <span>SECONDS</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle ref={grabSeconds} cx={70} cy={70} r={70}></circle>
            </svg>
            <div id="seconds">{format(time).seconds}</div>
          </div>
          <div className="circle c4">
            <div className="dot"></div>
            <span>MILLISECONDS</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle ref={grabMilliseconds} cx={70} cy={70} r={70}></circle>
            </svg>
            <div id="milliseconds">{format(time).milliseconds}</div>
          </div>
        </div>
      </div>
      <div className="buttons flex gap-3">
        <button
          className={`w-24 ${!running ? "bg-blue-600" : "bg-red-600"}`}
          onClick={() => {
            if (running) clearInterval(timer.current);
            setRunning(!running);
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div>
    </section>
  );
};

const format = (time) => {
  let hours = Math.floor((time / 3600000) % 24);
  let minutes = Math.floor((time / 60000) % 60);
  let seconds = Math.floor((time / 1000) % 60);
  let milliseconds = time % 1000;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds < 100 ? "0" + milliseconds : milliseconds;
  milliseconds =
    milliseconds < 10 ? "0" + milliseconds / 10 : milliseconds / 10;

  return { hours, minutes, seconds, milliseconds };
};

export default Stopwatch;
