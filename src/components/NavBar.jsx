import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

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
import { FaUserCircle, FaInfoCircle, FaChevronDown } from "react-icons/fa";
import { IoMdGift } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import logo from "../images/logo.png";

//context
import { CartDispatchContext } from "../context/CartProvider";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { handleSubmit } = useForm();
  const { userId } = useUser();
  const { cart } = useContext(CartDispatchContext);
  const [search, setSearch] = useState(false);
  const [userDropDown, setUserDropDown] = useState(false);
  const email = auth?.currentUser?.email;
  const redirect = useNavigate();
  const [categoryDropDown, setCategoryDropDown] = useState(false);
  const [searchQuery, setSearchQuery] = useState();

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== "") {
      redirect(`search/${searchQuery}/1`);
    }
  };

  const handleSearchMobo = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery !== "") {
      redirect(`search/${searchQuery}/1`);
    }
    setSearch(!search);
  };

  const searchToggle = () => {
    setSearch(!search);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const userHandle = () => {
    if (userId) {
      setUserDropDown(!userDropDown);
    } else {
      redirect("login");
    }
  };

  return (
    <div>
      <div className="z-10   fixed w-full bg-white  top-0 left-0 right-0  pb-1  shadow-md shadow-slate-500/50 justify-center items-center">
        {userId ? null : (
          <div className=" text-sm p-2 text-white  bg-green-700 ">
            <span className="md:text-sm text-xs font-sm flex items-center justify-center gap-1">
              <FaInfoCircle /> make sure you
              <Link to={"/login"} className=" underline hover:text-black ">
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
            <div className="hidden lg:block">
              <div className="flex">
                <div className="relative cursor-pointer  text-sm p-2">
                  <span
                    onClick={() => setCategoryDropDown(!categoryDropDown)}
                    className=" text-base flex items-center justify-center "
                  >
                    Category
                    <FaChevronDown
                      size={15}
                      className={`ml-1 duration-500 ease-in-out ${
                        categoryDropDown === true ? "rotate-90" : null
                      }`}
                    />
                  </span>
                  {categoryDropDown ? (
                    <div className="  absolute left-0 mt-1 w-28 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <ul className="flex flex-col  cursor-pointer">
                        <Link  onClick={() => setCategoryDropDown(!categoryDropDown)} to={"/search/indoor/1"}>
                          <center className=" text-base text-gray-700 hover:bg-gray-100 p-1 w-28">
                            Indoor
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={() => setCategoryDropDown(!categoryDropDown)} to={"/search/outdoor/1"}>
                          <center className=" text-base text-gray-700 hover:bg-gray-100 p-1 w-28">
                            Outdoor
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={() => setCategoryDropDown(!categoryDropDown)} to={"/search/semi-indoor/1"}>
                          <center className=" text-base text-gray-700 hover:bg-gray-100 p-1 w-28">
                            Semi-Indoor
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={() => setCategoryDropDown(!categoryDropDown)} to={"/search/vase/1"}>
                          <center className=" text-base text-gray-700 hover:bg-gray-100 p-1 w-28">
                            Vase
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={() => setCategoryDropDown(!categoryDropDown)} to={"/search/fertilizer/1"}>
                          <center className=" text-base text-gray-700 hover:bg-gray-100 p-1 w-28">
                            Fertilizer
                          </center>
                        </Link>
                      </ul>
                    </div>
                  ) : null}
                </div>
                <Link to={"/products/1"}>
                  <p className="cursor-pointer hover:text-cyan-600 text-base p-2">
                    Products
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-end m-1 mx-2 w-5/6 items-center ">
            {search ? (
              <form onSubmit={handleSubmit(handleSearch)}>
                <div className=" hidden  lg:flex mr-1 ">
                  <button
                    type="submit"
                    className=" cursor-pointer hover:text-cyan-600 text-sm bg-gray-200 rounded-l-lg px-2 "
                  >
                    <AiOutlineSearch size={25} />
                  </button>
                  <input
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8  w-auto px-4  bg-gray-200 outline-none  "
                    placeholder="Search On Store"
                  />
                  <button className=" cursor-pointer hover:text-cyan-600 text-sm bg-gray-200 rounded-r-lg px-2 ">
                    <AiOutlineClose onClick={searchToggle} size={25} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="cursor-pointer hover:text-cyan-600 mx-2">
                <AiOutlineSearch onClick={searchToggle} size={25} />
              </div>
            )}
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
                  onClick={userHandle}
                  size={25}
                />
              </div>
              {userDropDown ? (
                <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
                  {/* Dropdown content goes here */}
                  <div
                    className="py-1 relative"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                  <p
                  onClick={userHandle}
                      className="block md:hidden px-4 py-2 text-gray-700"
                      role="menuitem"
                    >
                        <span className="flex items-center cursor-pointer truncate">
                          <IoMdGift size={20} className="mr-1" />
                          {email}
                        </span>
                    </p>
                    <hr className="block md:hidden text-gray-400 w-3/4 mx-auto " />
                    <p
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Link onClick={userHandle} className=" hover:text-gray-700" to={"/profile/order"}>
                        <span className="flex items-center cursor-pointer">
                          <IoMdGift size={20} className="mr-1" />
                          Orders
                        </span>
                      </Link>
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
              ) : null}
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
        <center className="lg:hidden z-20 fixed m-auto bg-white h-screen w-screen  ">
          <div className=" lg:hidden flex   justify-center items-center  ">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8  w-auto px-4  bg-gray-200 outline-none rounded-l-lg "
              placeholder="Search On Store"
            />
            <button
              onClick={handleSearchMobo}
              className=" cursor-pointer hover:text-cyan-600 text-sm bg-gray-200 rounded-r-lg p-1.5 "
            >
              <AiOutlineArrowRight size={20} />
            </button>
            <AiOutlineClose
              size={20}
              onClick={searchToggle}
              className="justify-center cursor-pointer hover:text-cyan-600 ml-2 "
            />
          </div>
          <ul className="mt-2">
            
            <Link to={"/products/1"}>
              <p
                className="cursor-pointer text-base text-gray-700   p-1 w-28"
                onClick={searchToggle}
              >
                Products
              </p>
            </Link>
            <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link  onClick={searchToggle} to={"/search/indoor/1"}>
                          <center className=" text-base text-gray-700  p-1 w-28">
                            Indoor
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={searchToggle} to={"/search/outdoor/1"}>
                          <center className=" text-base text-gray-700  p-1 w-28">
                            Outdoor
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={searchToggle} to={"/search/semi-indoor/1"}>
                          <center className=" text-base text-gray-700  p-1 w-28">
                            Semi-Indoor
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={searchToggle} to={"/search/vase/1"}>
                          <center className=" text-base text-gray-700  p-1 w-28">
                            Vase
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                        <Link onClick={searchToggle} to={"/search/fertilizer/1"}>
                          <center className=" text-base text-gray-700  p-1 w-28">
                            Fertilizer
                          </center>
                        </Link>
                        <hr className="text-gray-400 w-3/4 mx-auto" />
                      </ul>
        </center>
      ) : null}
    </div>
  );
};

export default NavBar;
