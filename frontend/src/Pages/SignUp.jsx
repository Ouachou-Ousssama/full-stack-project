import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    firstName: "",
    lastName: "",
    dateBirth: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      signUp.firstName &&
      signUp.lastName &&
      signUp.dateBirth &&
      signUp.email &&
      signUp.password
    ) {
      axios.post("http://localhost:8000/api/craeteGuests", {
        firstName: signUp.firstName,
        lastName: signUp.lastName,
        dateOfBirth: signUp.dateBirth,
        email: signUp.email,
        password: signUp.password,
      });
      navigate("/");
    }
  };

  const handleFirstNameChange = (e) => {
    setSignUp({ ...signUp, firstName: e.target.value });
  };

  const handleDateChange = (e) => {
    setSignUp({ ...signUp, dateBirth: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setSignUp({ ...signUp, lastName: e.target.value });
  };

  const handleLoginChange = (e) => {
    setSignUp({ ...signUp, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setSignUp({ ...signUp, password: e.target.value });
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#424035]">
      <form className="w-[35%] bg-[#2d2b23] rounded-xl h-[90%] flex flex-col justify-evenly items-center">
        <h1 className="text-[40px] text-white">Hello 👋</h1>
        <p className="text-white my-1">Create Your Account</p>

        <label className="text-white py-1">First Name</label>
        <input
          type="text"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="enter your first name"
          onChange={handleFirstNameChange}
        />

        <label className="text-white py-1">Last Name</label>
        <input
          type="text"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="enter your last name"
          onChange={handleLastNameChange}
        />

        <label className="text-white py-1">Date Of Birth</label>
        <input
          type="date"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="enter your date of birthday"
          onChange={handleDateChange}
        />

        <label className="text-white py-1">Login</label>
        <input
          type="text"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="enter your login"
          onChange={handleLoginChange}
        />

        <label className="text-white py-1">Password</label>
        <input
          type="password"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="enter your password"
          onChange={handlePasswordChange}
        />

        <button
          className="w-[80%] h-[10%] bg-[#ddcb89] text-black rounded-xl my-3 cursor-pointer"
          onClick={handleSubmit}
        >
          Create
        </button>

        <div className="w-[80%] bg-white h-px"></div>

        <Link
          className="w-[70%] text-center py-2 bg-[#b5b09d] text-black rounded-xl my-3 no-underline"
          to="/"
        >
          Login
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
