import React, { useState , lazy } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/AI.css";
const Header = lazy(() => import("../Components/Header"));
const Section = lazy(() => import("../Components/Sections")); 
const Gemi = lazy(() => import("../Components/Gemi")); 

const AI = ({ setIsConnected }) => {
  const [resp, setresp] = useState();
  const [subf, setsubf] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    setIsConnected(false);
    navigate("/");
  }

  const apiKey = process.env.REACT_APP_API_KEY;
  const apiSliced = apiKey.slice(1, -1);
  //console.log(apiKey);

  const receiveDataFromChild = (data) => {
    setresp(data.data);
    setsubf(data.sub);
  };

  return (
    <div className="app-container">
      <Header />
      <Section resp={resp} sub={subf} />
      <Gemi sendDataToParent={receiveDataFromChild} apiKey={apiSliced} />
    </div>
  );
};

export default AI;
