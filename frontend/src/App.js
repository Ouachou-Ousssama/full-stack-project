import "./App.css";
import { useState, lazy } from "react";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const AI = lazy(() => import("./Pages/AI"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Chat = lazy(() => import("./Pages/Chat"));

function App() {
  const [isConnected, setIsConnected] = useState(false);

  console.log(isConnected);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login setIsConnected={setIsConnected} />} />
          <Route
            path="/home"
            element={<Home setIsConnected={setIsConnected} />}
          />
          <Route
            path="/home/AskAi"
            element={<AI setIsConnected={setIsConnected} />}
          />
          <Route
            path="/home/chat/:id"
            element={<Chat setIsConnected={setIsConnected} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
