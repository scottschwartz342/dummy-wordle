import "./App.css";
import { useState } from "react";

function Square() {
  const [value, setValue] = useState("/");

  function handleClick() {
    setValue("X");
  }

  return (
    <div className="square" onClick={handleClick}>
      {value}
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>{" "}
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>{" "}
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>{" "}
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>{" "}
      <div className="board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  );
}
