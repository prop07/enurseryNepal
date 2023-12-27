import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//firebase
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

//icons
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { HiShoppingCart } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdOutlineSettings } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import logo from "../images/logo.png";

//context
import { CartDispatchContext } from "../context/CartProvider";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { userId } = useUser();
  const { cart } = useContext(CartDispatchContext);
  const [search, setSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const email = auth?.currentUser?.email;
  const redirect = useNavigate();

  const searchHandle = () => {
    setSearch(!search);
  };

  const toggleDropdown = () => {
    userId ? setIsOpen(!isOpen) : redirect("/login");
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="z-10  fixed w-full bg-white  top-0 left-0 right-0  pb-1    shadow-md shadow-slate-500/50 justify-center items-center">
        {userId ? null : (
          <div className=" text-sm p-2   bg-green-50 ">
            <span className="md:text-sm text-xs font-sm flex items-center justify-center gap-1">
              <FaInfoCircle /> make sure you
              <Link to={"/login"} className=" underline ">
                Log-in
              </Link>
              in order to save all your progress!
            </span>
          </div>
        )}
        <div className="flex items-center p-2 ">
          <Link to={"/"} className="flex mr-6 ">
            <img className="h-18 w-28 ml-4" src={logo} alt={logo} />
          </Link>
          <div className="w-auto flex">
            <div className="hidden md:block">
              <ul>
                <span className="cursor-pointer hover:text-cyan-600 text-sm p-2">
                  Shop
                </span>
                <Link to={"/products"}>
                  <span className="cursor-pointer hover:text-cyan-600 text-sm p-2">
                    Products
                  </span>
                </Link>
              </ul>
            </div>
          </div>
          <div className="flex justify-end m-1 mx-2 w-5/6 items-center ">
            {search ? (
              <div className=" hidden  md:flex mr-1 ">
                <input
                  className="h-8  w-auto px-4  bg-slate-100 outline-none rounded-l-lg "
                  placeholder="Search On Store"
                />
                <button className=" cursor-pointer hover:text-cyan-600 text-sm bg-slate-100 rounded-r-lg px-2 ">
                  <AiOutlineArrowRight size={20} />
                </button>
              </div>
            ) : null}
            <div className="cursor-pointer hover:text-cyan-600 mx-2">
              <AiOutlineSearch onClick={searchHandle} size={25} />
            </div>
            <div className="cursor-pointer hover:text-cyan-600 mx-2">
              <BiHelpCircle size={25} />
            </div>
            <div className="cursor-pointer hover:text-cyan-600 mx-2 mt-2 ">
              <Link to="/cart">
                <span className="relative inline-block">
                  <HiShoppingCart className="hover:text-cyan-600" size={25} />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {Object.values(cart).reduce((acc, i) => acc + i, 0)}
                  </span>
                </span>
              </Link>
            </div>
            <div className="relative inline-block text-left">
              <div>
                <FaUserCircle
                  className="ml-1 cursor-pointer hover:text-cyan-600"
                  onClick={toggleDropdown}
                  size={25}
                />
              </div>
              {isOpen && (
                <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
                  {/* Dropdown content goes here */}
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <p
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <span className="flex items-center cursor-pointer">
                        <ImProfile size={20} className="mr-1" />
                        Profile
                      </span>
                    </p>
                    <hr className="text-gray-400 w-3/4 mx-auto " />
                    <p
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      role="menuitem"
                    >
                      <span className="flex items-center">
                        <MdOutlineSettings size={20} className="mr-1" />
                        Settings
                      </span>
                    </p>
                    <hr className="text-gray-400 w-3/4 mx-auto " />
                    <p
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                      role="menuitem"
                    >
                      <span className="flex items-center" onClick={logout}>
                        <IoLogOutOutline size={20} className="mr-1" />
                        Sign out
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div>
              {email ? (
                <p className="md:block hidden ml-1 text-xs text-gray-600">
                  
                  {email}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {search ? (
        <center className="md:hidden z-20 fixed m-auto bg-white h-screen w-screen  ">
          <div className=" md:hidden flex   justify-center items-center  ">
            <input
              className="h-8  w-auto px-4  bg-slate-100 outline-none rounded-l-lg "
              placeholder="Search On Store"
            />
            <button className=" cursor-pointer hover:text-cyan-600 text-sm bg-slate-100 rounded-r-lg p-1.5 ">
              <AiOutlineArrowRight size={20} />
            </button>
            <AiOutlineClose
              size={20}
              onClick={searchHandle}
              className="justify-center cursor-pointer hover:text-cyan-600 ml-2 "
            />
          </div>
          <ul>
            <p
              className="cursor-pointer hover:text-cyan-600 text-sm p-2 mt-2 "
              onClick={searchHandle}
            >
              Shop
            </p>
            <Link to={"/products"}>
              <p
                className="cursor-pointer hover:text-cyan-600 text-sm p-2"
                onClick={searchHandle}
              >
                Products
              </p>
            </Link>
          </ul>
        </center>
      ) : null}
    </div>
  );
};

export default NavBar;
