import gpt from "../images/ChatGpt.webp";
import menubar from "../images/menubar.svg";
import header from "../images/header.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full flex h-[15vh] justify-center relative">
      <div className="w-[90%] h-full flex items-center justify-between">
        <div className="flex justify-between items-center">
          <p className="text-[20px] font-bold">CHATGPT</p>
          <img className="w-8 h-8 rounded-full ml-2" src={gpt} alt="img" />
        </div>
        <div className="w-1/2 flex flex-col items-center">
          <ul className="flex justify-between w-[90%] p-1 bg-[#ededed] rounded-[16px] list-none">
            <li className="text-[#8a8a8a] px-4 py-1">General</li>
            <li className="text-[#8a8a8a] px-4 py-1">Sales</li>
            <li className="text-[#8a8a8a] px-4 py-1">Negotiation</li>
            <li className="text-[#8a8a8a] px-4 py-1">Marketing</li>
          </ul>
        </div>
        <div className="flex items-center">
          <img src={menubar} alt="menu" />
          <div className="ml-2">
            <Link to="/home" className="text-decoration-none">
              Home
            </Link>
          </div>
        </div>
      </div>
      <img src={header} alt="img2" className="absolute top-0 right-0 z-[-1]" />
    </div>
  );
};

export default Header;
