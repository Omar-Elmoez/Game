import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

function TimeChallenge(props) {
  const timer = useRef();
  const dialog = useRef();

  const [timeStarted, setTimeStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const startChallengeHandler = () => {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      dialog.current.showModal();
    }, props.targetTime * 1000);

    setTimeStarted(!timeStarted);
  };

  const endChallengeHandler = () => {
    clearTimeout(timer.current);
    setTimeStarted(!timeStarted);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={props.targetTime} result='Lost!' />
      <section className="challenge">
        <h2>{props.title}</h2>
        <p className="challenge-time">
          {props.targetTime} second{props.targetTime > 1 ? "s" : ""}
        </p>
        <div>
          <button onClick={timeStarted ? endChallengeHandler : startChallengeHandler}>
            {timeStarted ? "Stop" : "Start"} Challenge
          </button>
        </div>
        <p className={timeStarted ? "active" : ""}>
          {timeStarted ? "Timer is running...." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

export default TimeChallenge;
