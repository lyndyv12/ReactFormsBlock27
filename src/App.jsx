import { useState } from 'react';
import './App.css';
import SignUpForm from './assets/SignUpForm/SignUpForm';
import Authenticate from './assets/Authenticate/Authenticate';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState("");

  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUpForm setToken={setToken} />} />
        <Route path="/authenticate" element={<Authenticate token={token} />} />
        <Route path="*" element={<SignUpForm setToken={setToken} />} />
      </Routes>
      
    </div>
  );
}

export default App;

