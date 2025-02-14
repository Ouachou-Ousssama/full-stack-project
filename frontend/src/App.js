import "./App.css";
import { useState, lazy } from "react";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Login = lazy(() => import("./Pages/Login"));
const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const AI = lazy(() => import("./Pages/AI"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const Chat = lazy(() => import("./Pages/Chat"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPassword"));

function App() {
  const [isConnected, setIsConnected] = useState(false);

  console.log(isConnected);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="w-24 h-24 border-t-0 border-b-4 border-l-4 border-r-4 border-[#000] rounded-full"
            ></motion.div>
          </div>
        }
      >
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
            path="/forgetPassword" 
            element={<ForgetPassword setIsConnected={setIsConnected} />}
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
