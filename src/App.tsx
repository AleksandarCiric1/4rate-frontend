import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "./components/shared/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <h1>Hello, Vite + React + TypeScript!</h1>
        <Button />
      </div>
    </>
  );
}

export default App;
