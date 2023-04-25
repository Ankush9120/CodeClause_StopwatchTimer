import React, { useEffect, useRef, useState } from "react";

const Timer = () => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [milliseconds, setMilliseconds] = useState("");
  const [running, setRunning] = useState(null);

  const grabMilliseconds = useRef(null);
  const grabSeconds = useRef(null);
  const grabMinutes = useRef(null);
  const grabHours = useRef(null);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        if (milliseconds > 0) {
          setMilliseconds((milliseconds) => milliseconds - 1);
        } else if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
          setMilliseconds(99);
          grabSeconds.current.style.strokeDashoffset =
            440 - (440 * seconds) / 60;
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setMilliseconds(99);
          setSeconds(59);
          grabMinutes.current.style.strokeDashoffset =
            440 - (440 * minutes) / 60;
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMilliseconds(99);
          setSeconds(59);
          setMinutes(59);
          grabHours.current.style.strokeDashoffset = 440 - (440 * hours) / 60;
        }
      }, 10);
    }

    grabMilliseconds.current.style.strokeDashoffset =
      440 - (440 * milliseconds) / 100;
    grabSeconds.current.style.strokeDashoffset = 440 - (440 * seconds) / 60;
    grabMinutes.current.style.strokeDashoffset = 440 - (440 * minutes) / 60;
    grabHours.current.style.strokeDashoffset = 440 - (440 * hours) / 12;

    return () => clearInterval(interval);
  }, [milliseconds, seconds, minutes, hours, running]);

  const handleStart = () => {
    let time = [hours, minutes, seconds, milliseconds];
    !time.includes(0) ? setRunning(!running) : setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  return (
    <section className="timer flex justify-center items-center flex-col text-2xl">
      <header className="text-3xl font-semibold">React Timer</header>
      <div className="text-4xl">
        <div id="time">
          <div className="circle c1">
            <div className="dot"></div>
            <span>HOURS</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle
                className="c"
                ref={grabHours}
                cx={70}
                cy={70}
                r={70}
              ></circle>
            </svg>
            <div id="hours">
              <input
                onChange={(e) => setHours(e.target.value)}
                value={hours}
                placeholder="00"
                maxLength={2}
                type="tel"
              />
            </div>
          </div>
          <div className="circle c2">
            <div className="dot"></div>
            <span>MINUTES</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle
                className="c"
                ref={grabMinutes}
                cx={70}
                cy={70}
                r={70}
              ></circle>
            </svg>
            <div id="minutes">
              <input
                onChange={(e) => {setMinutes(e.target.value) ; minutes>0 }}
                value={minutes}
                placeholder="00"
                maxLength={2}
                type="tel"
              />
            </div>
          </div>
          <div className="circle c3">
            <div className="dot"></div>
            <span>SECONDS</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle
                className="c"
                ref={grabSeconds}
                cx={70}
                cy={70}
                r={70}
              ></circle>
            </svg>
            <div id="seconds">
              <input
                onChange={(e) => setSeconds(e.target.value)}
                value={seconds}
                placeholder="00"
                maxLength={2}
                type="tel"
              />
            </div>
          </div>

          <div className="circle c4">
            <div className="dot"></div>
            <span>MILLISECONDS</span>
            <svg>
              <circle cx={70} cy={70} r={70}></circle>
              <circle
                className="c"
                ref={grabMilliseconds}
                cx={70}
                cy={70}
                r={70}
              ></circle>
            </svg>
            <div id="milliseconds">
              <input
                onChange={(e) => {
                  setMilliseconds(e.target.value);
                }}
                value={milliseconds}
                placeholder="00"
                maxLength={2}
                type="tel"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="buttons flex gap-3">
        <button
          onClick={handleStart}
          className={`w-24 ${!running ? "bg-blue-600" : "bg-red-600"}`}
        >
          {!running ? "Start" : "Stop"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </section>
  );
};

export default Timer;
