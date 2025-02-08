import { motion } from "framer-motion";
import axios from "axios";

import { useState } from "react";
import Twitter from "../images/twitter2.webp";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsConnected }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConnection = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/loginGuests", {
        email: login,
        password: password,
        is_online : true
      })
      .then((res) => {
        localStorage.setItem("lastName", res.data.user.lastName);
        localStorage.setItem("firstName", res.data.user.firstName);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        console.log(res.data.user.id);
        navigate("/home");
        setIsConnected(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#fff]">
      <motion.form
        className="w-[40%] bg-[#fff] rounded-xl h-[60%] flex flex-col justify-evenly items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img className="w-12 h-12 " src={Twitter} alt="twitter" />
        <h1 className="text-4xl font-bold">Log In To Twitter</h1>
        <input
          type="text"
          className="w-[60%] h-[11%] bg-transparent border border-[#999696] rounded-md p-2"
          placeholder="Email"
          onChange={handleLogin}
        />
        <input
          type="password"
          className="w-[60%] h-[11%] bg-transparent border border-[#999696] rounded-md p-2"
          placeholder="Password"
          onChange={handlePassword}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-[60%] h-[12%] bg-[#1DA1F2] font-[700] text-[16px] text-white rounded-[76px] cursor-pointer"
          onClick={handleConnection}
        >
          Log In
        </motion.button>
        <Link
          className="w-[70%] text-center text-[#1DA1F2] rounded-xl no-underline text-right mr-[80px]"
          to="/signup"
        >
          Sign Up
        </Link>
      </motion.form>
    </div>
  );
};

export default Login;
