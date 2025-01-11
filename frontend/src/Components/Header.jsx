import gpt from "../images/gpt.png";
import menubar from "../images/menubar.svg";
import header from "../images/header.svg";
import "../Styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <div className="logo">
          <p>Oussama-GPT</p>
          <img
            style={{
              width: "40px",
              height: "40px",
            }}
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
