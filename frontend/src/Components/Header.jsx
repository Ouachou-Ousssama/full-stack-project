import gpt from "../images/ChatGpt.webp";
import menubar from "../images/menubar.svg";
import header from "../images/header.svg";
import "../Styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="flex justify-between align-center">
          <p className="flex align-center text-[20px] font-bold">CHATGPT</p>
          <img
            className="w-8 h-8 rounded-full ml-2"
            src={gpt}
            alt="img"
          />
        </div>
        <div className="nav">
          <ul>
            <li id="selected">General</li>
            <li>Sales</li>
            <li>Negotiation</li>
            <li>Marketing</li>
          </ul>
        </div>
        <div className="menu">
          <img src={menubar} alt="menu" />
          <div className="Link">
            <Link to="/home">Home</Link>
          </div>
        </div>
      </div>
      <img src={header} alt="img2" className="rel" />
    </div>
  );
};

export default Header;
