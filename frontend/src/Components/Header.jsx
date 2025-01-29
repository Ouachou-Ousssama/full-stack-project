import gpt from "../images/ChatGpt.webp";
import menubar from "../images/menubar.svg";
import header from "../images/header.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

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
        <div className="flex items-center flex flex-col h-[20%] ">
          <img src={menubar} alt="menu" onClick={handleMenu} className="h-[90%] w-[100%]" />
          {showMenu && (
            <div className="ml-2 mt-2 p-2 rounded-[16px] h-[10%] flex items-center justify-center w-auto" >
              <Link to="/home" className="text-decoration-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M4.80823 9.44118L6.77353 7.46899C8.18956 6.04799 8.74462 5.28357 9.51139 5.55381C10.4675 5.89077 10.1528 8.01692 10.1528 8.73471C11.6393 8.73471 13.1848 8.60259 14.6502 8.87787C19.4874 9.78664 21 13.7153 21 18C19.6309 17.0302 18.2632 15.997 16.6177 15.5476C14.5636 14.9865 12.2696 15.2542 10.1528 15.2542C10.1528 15.972 10.4675 18.0982 9.51139 18.4351C8.64251 18.7413 8.18956 17.9409 6.77353 16.5199L4.80823 14.5477C3.60275 13.338 3 12.7332 3 11.9945C3 11.2558 3.60275 10.6509 4.80823 9.44118Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
              </Link>
            </div>
          )}
        </div>
      </div>
      <img src={header} alt="img2" className="absolute top-0 right-0 z-[-1]" />
    </div>
  );
};

export default Header;
