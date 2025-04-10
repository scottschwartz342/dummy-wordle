import "./App.css";
import { useState, useEffect } from "react";
import { WordleGame } from "./WordleGame";

const game: WordleGame = new WordleGame();

function isAlpha(str: string): boolean {
  return str.length === 1 && /^[a-zA-Z]+$/.test(str);
}

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
