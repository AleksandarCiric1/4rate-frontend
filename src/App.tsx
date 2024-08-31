import React, { useState } from "react";
import "./App.css";
import "./pages/login/Login";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./configuration/Routing";

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
