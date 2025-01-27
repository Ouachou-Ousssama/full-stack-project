import React, { useState } from "react";
import Header from "../Components/Header";
import Section from "../Components/Sections";
import { useNavigate } from "react-router-dom";
import Gemi from "../Components/Gemi";
import "../Styles/AI.css";

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
