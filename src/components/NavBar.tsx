import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';

import { AiOutlineSearch, AiOutlineClose,AiOutlineArrowRight } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  text: string;
  setText: string;
}

const NavBar = () => {
  const [search, setSearch] = useState(false);

  const searchHandle = () => {
    setSearch(!search);
  };

  return (
    <>
    <div className="flex  bg-white fixed  top-0 left-0 right-0  py-4  px-1 md:px-16 shadow-md shadow-slate-500/50 justify-center items-center h-20">
     <Link to={"/"}><div>Logo</div></Link> 
      <div className="w-4/5 flex">
        <div className="hidden md:block">
          <ul>
           <span
              className="cursor-pointer hover:text-cyan-600 text-sm p-2" >
              Shop
            </span>
            <Link to={'/productlist'}> 
            <span className="cursor-pointer hover:text-cyan-600 text-sm p-2" >
              Product
            </span></Link>
          </ul>
        </div>
      </div>
      <div className="flex justify-end m-1 mx-2 w-2/5 items-center ">
        {search ? (
          <div className=" hidden md:flex mr-4 ">
            <input
              className="h-8  w-auto px-4  bg-slate-100 outline-none rounded-l-lg "
              placeholder="Search On Store"
            />
    
            <button className=" cursor-pointer hover:text-cyan-600 text-sm bg-slate-100 rounded-r-lg px-4 ">
              <AiOutlineArrowRight  size={20} />
            </button>
            
          </div>
        ) : null}

        <div className="cursor-pointer hover:text-cyan-600 mx-2">
          <AiOutlineSearch onClick={searchHandle} size={25} />
        </div>

        <div className="cursor-pointer hover:text-cyan-600 mx-2">
          <BiHelpCircle size={25} />
        </div>
        <div className="cursor-pointer hover:text-cyan-600 mx-2">
          <Link to="/cart">
            <HiShoppingCart size={25} />
          </Link>
        </div>
        <div className="cursor-pointer hover:text-cyan-600">
          <FaUserCircle size={25} />
        </div>
      </div>
     
      </div>
      {search ? (
        <center className="md:hidden absolute m-auto bg-white h-screen w-screen  "> 
         <div className=" md:hidden flex mt-24  justify-center items-center  ">
            <input
              className="h-8  w-auto px-4  bg-slate-100 outline-none rounded-l-lg "
              placeholder="Search On Store"
            />
    
            <button className=" cursor-pointer hover:text-cyan-600 text-sm bg-slate-100 rounded-r-lg p-1.5 ">
              <AiOutlineArrowRight  size={20} />
            </button>
            
            <AiOutlineClose size={20} onClick={searchHandle} className="justify-center cursor-pointer hover:text-cyan-600 ml-2 "/>
            
          </div>
          <ul>

           <p
              className="cursor-pointer hover:text-cyan-600 text-sm p-2 mt-2 " onClick={searchHandle} >
              Shop
            </p>
            <Link to={'/productlist'}> 
            <p className="cursor-pointer hover:text-cyan-600 text-sm p-2" onClick={searchHandle} >
              Product
            </p></Link>
          </ul>
          
          </center>
        
          
        ) : null}
       
     </>
  
    

  );
};

export default NavBar;
