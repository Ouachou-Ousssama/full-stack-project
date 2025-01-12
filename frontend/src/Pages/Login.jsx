import { motion } from "framer-motion";
import "../Styles/Login.css";
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
    <div className="formContainer">
      <motion.form
        className="form"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="label welcome">Welcome 👋</h1>
        <p className="label">Sign in to your account</p>
        <label className="label">Login</label>
        <input
          type="text"
          className="inppp"
          placeholder="entrer your login"
          onChange={handleLogin}
        />
        <label className="label">Passowrd</label>
        <input
          type="password"
          className="inppp"
          placeholder="entrer your password"
          onChange={handlePassword}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="login"
          onClick={handleConnection}
        >
          Login
        </motion.button>
        <div className="hr"></div>
        <a className="Login" href="/signup">
          Sign Up
        </a>
      </motion.form>
    </div>
  );
};

export default Login;
