import { useState, useRef } from "react";
export default function Player() {
  const userInput = useRef();

  const [name, setName] = useState("");

  const displayName = () => {
    setName(userInput.current.value);
    userInput.current.value = "";
  };
  return (
    <section id="player">
      <h2>Welcome {name ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={userInput} />
        <button onClick={displayName}>Set Name</button>
      </p>
    </section>
  );
}
