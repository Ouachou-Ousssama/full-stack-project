import "../Styles/SignUp.css";
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
    if (signUp.firstName && signUp.lastName && signUp.dateBirth && signUp.email && signUp.password) {
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
    <div className="formContainer">
      <form className="formm">
        <h1 className="label welcome">Hello 👋</h1>
        <p
          className="label"
          style={{
            margin: "5px 0",
          }}
        >
          Create Your Account
        </p>
        <label className="label">First Name</label>
        <input
          type="text"
          className="inppput"
          placeholder="enter your first name"
          onChange={handleFirstNameChange}
        />
        <label className="label">Last Name</label>
        <input
          type="text"
          className="inppput"
          placeholder="enter your last name"
          onChange={handleLastNameChange}
        />
        <label className="label">Date Of Birthday</label>
        <input
          type="text"
          className="inppput"
          placeholder="enter your date of birthday"
          onChange={handleDateChange}
        />
        <label className="label">Login</label>
        <input
          type="text"
          className="inppput"
          placeholder="entrer your login"
          onChange={handleLoginChange}
        />
        <label className="label">Passowrd</label>
        <input
          type="password"
          className="inppput"
          placeholder="entrer your password"
          onChange={handlePasswordChange}
        />
        <button className="login" onClick={handleSubmit}>
          Craete
        </button>
        <div className="hr"></div>
        <Link className="Login" to="/">
          Login
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
