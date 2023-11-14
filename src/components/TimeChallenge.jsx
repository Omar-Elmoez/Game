import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

function TimeChallenge(props) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(props.targetTime * 1000);

  const timerIsActive =
    timeRemaining > 0 && timeRemaining < props.targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleReset = () => {
    setTimeRemaining(props.targetTime * 1000);
  };
  
  const startChallengeHandler = () => {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  };

  const endChallengeHandler = () => {
    dialog.current.open();
    clearInterval(timer.current);
  };

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={props.targetTime}
        timeRemaining={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? "s" : ""}
        </p>
        <div>
          <button
            onClick={
              timerIsActive ? endChallengeHandler : startChallengeHandler
            }
          >
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </div>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Timer is running...." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

export default TimeChallenge;
