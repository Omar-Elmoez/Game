import { useRef, useState } from "react";

function TimeChallenge(props) {
  const timer = useRef();

  const [timeStarted, setTimeStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

  const startChallengeHandler = () => {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
    }, props.targetTime * 1000);

    setTimeStarted(!timeStarted);
  };

  const endChallengeHandler = () => {
    clearTimeout(timer.current);
    setTimeStarted(!timeStarted);
  }

  return (
    <section className="challenge">
      <h2>{props.title}</h2>
      {timerExpired && <p>You Lost!!</p>}
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
  );
}

export default TimeChallenge;
