import "./App.css";

function Square({ letter }) {
  return <div className="square">{letter}</div>;
}

export default function App() {
  return (
    <div className="App">
      <h1>Hello</h1>

      <div className="board-row">
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
      </div>
      <div className="board-row">
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
      </div>
      <div className="board-row">
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
      </div>
      <div className="board-row">
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
      </div>
      <div className="board-row">
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
      </div>
      <div className="board-row">
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
        <Square letter="p" />
      </div>
    </div>
  );
}
