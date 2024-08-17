import { useState } from "react";
import "./App.css";
import "./pages/login/Login";
import Login from "./pages/login/Login";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex w-full h-screen">
        <div className="w-full items-center justify-center flex">
          <Login />
        </div>
      </div>
    </>
  );
}

export default App;
