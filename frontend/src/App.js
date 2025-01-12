import "./App.css";
import { useState } from "react";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import AI from './Pages/AI';
import SignUp from './Pages/SignUp';
import Details from "./Pages/Details";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsConnected={setIsConnected}/>} />
          <Route path="/home" element={<Home setIsConnected={setIsConnected} />} />
          <Route path='/home/AskAi' element={<AI setIsConnected={setIsConnected} />} />
          <Route path="/home/chat/:id" element={<Chat setIsConnected={setIsConnected} />} />
          <Route path="/home/:id" element={<Details setIsConnected={setIsConnected} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
