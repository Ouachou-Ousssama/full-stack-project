import React, { useState } from "react";
import { motion } from "framer-motion";
import Twitter from "../images/twitter2.webp";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/sendMail", form).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col justify-center items-center bg-[#fff]">
        <motion.form
          className="w-[40%] bg-[#fff] rounded-xl h-[70%] flex flex-col justify-evenly items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <img className="w-12 h-12 " src={Twitter} alt="twitter" />
          <h1 className="text-4xl font-bold">Forget Password</h1>
          <input
            type="text"
            className="w-[60%] h-[10%] bg-transparent border border-[#999696] rounded-md p-2"
            placeholder="firstName"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <input
            type="text"
            className="w-[60%] h-[10%] bg-transparent border border-[#999696] rounded-md p-2"
            placeholder="lastName"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <input
            type="text"
            className="w-[60%] h-[10%] bg-transparent border border-[#999696] rounded-md p-2"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="w-[60%] h-[10%] bg-[#1DA1F2] font-[700] text-[16px] text-white rounded-[76px] cursor-pointer"
          >
            Send Email
          </motion.button>
          <div className="flex justify-between w-[60%]">
            <Link
              className="text-center text-[#1DA1F2] rounded-xl no-underline text-right"
              to="/"
            >
              Log In
            </Link>
            <Link
              className="text-center text-[#1DA1F2] rounded-xl no-underline text-right"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default ForgetPassword;
