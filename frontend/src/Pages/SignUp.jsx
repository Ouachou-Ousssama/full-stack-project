import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Twitter2 from "../images/twitter2.webp";

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
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-start items-start transform translate-y-[-55px]">
        <Link
          className="text-center text-black rounded-xl my-3 no-underline w-full"
          to="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="w-[35px] h-[35px]"
            color="#000000"
            fill="none"
          >
            <path
              d="M4.80823 9.44118L6.77353 7.46899C8.18956 6.04799 8.74462 5.28357 9.51139 5.55381C10.4675 5.89077 10.1528 8.01692 10.1528 8.73471C11.6393 8.73471 13.1848 8.60259 14.6502 8.87787C19.4874 9.78664 21 13.7153 21 18C19.6309 17.0302 18.2632 15.997 16.6177 15.5476C14.5636 14.9865 12.2696 15.2542 10.1528 15.2542C10.1528 15.972 10.4675 18.0982 9.51139 18.4351C8.64251 18.7413 8.18956 17.9409 6.77353 16.5199L4.80823 14.5477C3.60275 13.338 3 12.7332 3 11.9945C3 11.2558 3.60275 10.6509 4.80823 9.44118Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
      </div>
      <form className="w-[35%] rounded-xl h-[80%] flex flex-col justify-evenly items-center">
        <img className="w-12 h-12" src={Twitter2} alt={Twitter2} />
        <h1 className="text-[40px]">Create An Account</h1>
        <input
          type="text"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="first name"
          onChange={handleFirstNameChange}
        />
        <input
          type="text"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="last name"
          onChange={handleLastNameChange}
        />
        <input
          type="date"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="date of birthday"
          onChange={handleDateChange}
        />
        <input
          type="text"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="login"
          onChange={handleLoginChange}
        />
        <input
          type="password"
          className="w-[80%] h-[10%] bg-transparent border border-[#999696] rounded-md text-center text-[#cacaca] my-1"
          placeholder="password"
          onChange={handlePasswordChange}
        />

        <button
          className="w-[80%] h-[10%] bg-[#1DA1F2] text-black rounded-xl cursor-pointer text-white rounded-[76px] cursor-pointer"
          onClick={handleSubmit}
        >
          CREATE
        </button>
      </form>
    </div>
  );
};

export default SignUp;
