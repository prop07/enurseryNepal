import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom';

import { AiOutlineSearch } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/Hi";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  text: string;
  setText: string;
}

const NavBar = () => {
  const navList = ["Home", "Shop", "Product"];
  const [search, setSearch] = useState(false);
  

  const searchHandle = () => {
    setSearch(!search);
  };

  return (
    <div className="flex  py-4 px-16 mb-4 shadow-lg shadow-slate-500/50 ">
      <div>Logo</div>

      <div className="w-4/5 flex ">
        <div>
          <ul>
            {navList.map((item, index) => (
              <span
                className="cursor-pointer hover:text-cyan-600 text-sm p-2"
                key={index}
              >
                {item}
              </span>
            ))}
          </ul>
        </div>
      
      </div>

      <div className="flex justify-end m-1  mx-2 w-2/5 fle">

  {search ? (
          <div className="flex justify-center items-center">
            <input
              className="h-7 w-auto px-8 rounded bg-slate-100 border border-slate-50 "
              placeholder=" Search On Store"
            />
            <button
              className="ml-2"
              cursor-pointer
              hover:text-cyan-600
              text-sm
              p-2
            >
              <AiOutlineClose onClick={searchHandle} size={25} />
            </button>
          </div>
        ) : null}
        
        <div className="cursor-pointer hover:text-cyan-600 mx-2 ">
          <AiOutlineSearch onClick={searchHandle} size={25} />
        </div>
        <div className="cursor-pointer hover:text-cyan-600 mx-2 ">
          <BiHelpCircle size={25} />
        </div>
        <div className="cursor-pointer hover:text-cyan-600 mx-2 ">
          <Link to="/Cart"><HiShoppingCart size={25} /></Link>
          
        </div>
        <div className="cursor-pointer hover:text-cyan-600 mx-2 ">
          <FaUserCircle size={25} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
