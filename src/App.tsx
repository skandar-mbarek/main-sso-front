import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LoginPage from "./pages/login-page";
import {Login} from "./services/auth-service";
import {Authorize} from "./pages/authorize-page";

function App() {
  return (
      <div className="App">
          <Routes>
              <Route path="/login/:clientId" element={<LoginPage />} />
              <Route path="/" element={<Authorize />} />
          </Routes>
      </div>
  );
}

export default App;
