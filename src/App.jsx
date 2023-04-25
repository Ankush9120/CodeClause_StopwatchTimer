import React, { useState } from "react";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";

const App = () => {
  const [tab, setTab] = useState(0);

  const options = ["StopWatch", "Timer"];
  return (
    <main>
      <ul className="options">
        {options.map((e, i) => {
          return (
            <li
              onClick={() => setTab(i)}
              className={tab === i ? "active" : undefined}
              key={i}
            >
              {e}
            </li>
          );
        })}
      </ul>
      {tab === 0 && <Stopwatch />}

      {tab === 1 && <Timer />}
    </main>
  );
};

export default App;
