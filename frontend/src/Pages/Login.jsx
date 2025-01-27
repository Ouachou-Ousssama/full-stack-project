import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#424035]">
      <motion.form
        className="w-[30%] bg-[#2d2b23] rounded-xl h-[75%] flex flex-col justify-evenly items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl text-white">Welcome 👋</h1>
        <p className="text-white">Sign in to your account</p>
        <label className="text-white">Login</label>
        <input
          type="text"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="entrer your login"
          onChange={handleLogin}
        />
        <label className="text-white">Password</label>
        <input
          type="password"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="entrer your password"
          onChange={handlePassword}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="w-[80%] h-[10%] bg-[#ddcb89] text-black rounded-xl my-3 cursor-pointer"
          onClick={handleConnection}
        >
          Login
        </motion.button>
        <div className="w-[80%] bg-white h-px"></div>
        <a
          className="w-[70%] text-center py-2 bg-[#b5b09d] text-black rounded-xl my-3 no-underline"
          href="/signup"
        >
          Sign Up
        </a>
      </motion.form>
    </div>
  );
};

export default Login;
