import { useContext, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { RiCoupon3Line, RiDeleteBinLine } from "react-icons/ri";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { MdBrokenImage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//contex
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";
import { CartDispatchContext } from "../context/CartProvider";
import { useUser } from "../context/UserContext";

const Cart = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const products = useContext(ProductContext);
  const dispatch = useDispatchCart();
  const { cart } = useContext(CartDispatchContext);
  const [cartAmount, setCartAmount] = useState();

  const showToastRemoveMessage = () => {
    toast.warning("Item removed.", {
      position: "bottom-right",
      autoClose: 4000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  const showToastErrorMessage = (error) => {
    toast.error(error, {
      position: "bottom-right",
      autoClose: 4000,
      closeButton: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  //scroll top
  useEffect(() => {
    window.scroll(0, 0);
  }, []);


  useEffect(() => {
    let totalAmount = 0;
    Object.keys(cart)?.map((cartKey) => {
      let item = products.find((product) => product.id === parseInt(cartKey));
      totalAmount += cart[cartKey] * item?.price;
    });
    setCartAmount(totalAmount);
  }, [cart, cartAmount, products]);

  const handleDeleteCart = (id) => {
    dispatch({ type: "DeleteCartItem", payload: { id } });
    showToastRemoveMessage();
  };

  //update
  const handleUpdateCart = (action, id) => {
    Object.keys(cart).find((key) => key === id);
    if (cart[id] === 1 && action === "decrease") {
      dispatch({ type: "DeleteCartItem", payload: { id } });
      showToastRemoveMessage();
    }
    else if (cart[id] === 20 && action === "increase") {
      showToastErrorMessage("20 Max Quantity per items !")
    }
    else {
      dispatch({
        type: "AddToCart",
        payload: {
          id: parseInt(id),
          qtyEq: action === "increase" ? 1 : -1,
        },
      });
    }
  };

  const Checkout = () => {
    userId ? navigate('/checkout') : showToastErrorMessage("Login First !");
  }

  if (Object.keys(cart).length <= 0) {
    return (
      <center className=" grid items-center justify-center  font-poppins p-16 " >
        <HiShoppingCart size={100} />
        <h2 className=" text-xl font-bold mb-4">Your Cart is currently empty.</h2>
        <Link to={"/products/1"}>
          <p className="flex items-center cursor-pointer text-cyan-500 hover:text-cyan-300 ">
            <FaAngleDoubleLeft /> <span>Continue Shopping.</span>
          </p>
        </Link>
      </center>)
  }
  if (!products || !cart) {
    return (
      <div className=" h-screen w-screen  backdrop-blur-sm bg-white/30 "> <div className="flex h-full items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
      </div></div>
    )
  }
  return (
    <div className="flex items-center  font-poppins mt-20 ">
      <ToastContainer className="sm:w-72" />
      <div className="justify-center flex-1 px-1 py-6 mx-auto max-w-7xl lg:py-4 md:px-6 ">
        <div className="flex flex-wrap mt-2">
          <div className="w-full lg:w-8/12">
            <Link to={"/products/1"}>  <p className="flex items-center px-10 my-4 cursor-pointer text-cyan-500 hover:text-cyan-400 ">
              <FaAngleDoubleLeft /> <span>Continue Shopping.</span>
            </p></Link> <div className="px-10 overflow-auto" style={{ maxHeight: '69vh' }}>
              {Object.keys(cart)?.map((cartKey) => {
                const p = products.find(
                  (product) => product.id === parseInt(cartKey)
                );
                if (!p) {
                  return <div key={cartKey} >Product removed from store.</div>;
                }
                return (
                  <div
                    key={cartKey}
                    className="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-500  xl:justify-between border-opacity-40"
                  >
                    <div className="w-full mb-2 lg:mb-0 h-96 md:h-44 md:w-44">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt="Loading..."
                          className=" rounded object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex justify-center items-center rounded w-full h-full bg-gray-200 text-gray-400"><MdBrokenImage size={30} /></div>
                      )}
                    </div>
                    <div className=" px-4 mb-6 w-64 xl:mb-0 ">
                      <Link key={cartKey} to={`/product/${cartKey}`}>
                        <p className=" mb-5  text-xl font-medium truncate block capitalize  hover:underline">
                          {p.name}
                        </p>
                      </Link>
                      <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-medium">
                          <span className="">Type:</span>
                          <span className="ml-1 text-gray-400">
                            {p.type.detail}
                          </span>
                        </p>
                        <p className="text-sm font-medium ">
                          <span>Price:</span>
                          <span className="ml-1 text-gray-400">
                            {p.price}/-
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                      <div className="flex items-center">
                        <h4 className="mr-4 font-medium ">Qty:</h4>
                        <div className="inline-flex items-center font-semibold text-gray-500 border border-gray-300 rounded-md">
                          <button
                            onClick={() => handleUpdateCart("decrease", cartKey)}
                            className="p-3 pr-2 border-r border-gray-300 hover:text-gray-900  "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                            </svg>
                          </button>
                          <div
                            key={cart[cartKey].id}
                            className="flex items-center justify-center w-12 px-1 py-4  border-0 rounded-md    md:text-right"
                          >
                            {cart[cartKey]}
                          </div>
                          <button
                            onClick={() =>
                              handleUpdateCart("increase", cartKey)
                            }
                            className="p-3 border-l border-gray-300 hover:text-gray-900  "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 xl:w-auto">
                      <span className="text-base font-medium text-cyan-500  ">
                        <span className="text-base">Rs:</span>
                        <span>{cart[cartKey] * p.price}/-</span>
                      </span>
                    </div>
                    <span className="absolute top-0 right-0 text-gray-400 p-2 lg:mt-6 lg:-mr-4 hover:text-gray-600 cursor-pointer  ">
                      <RiDeleteBinLine
                        title="remove"
                        className="bg-gray-50 rounded"
                        onClick={() => handleDeleteCart(cartKey)}
                        size={25}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" w-full lg:w-4/12 mt-6">
            <div className="px-6 mb-14">
              <div className="mb-10">
                <span className="mb-2 text-xl font-bold text-gray-700 ">
                  Coupon.
                </span>
                <input
                  type="text"
                  className="mb-2 flex-1 w-full px-8 py-4 mt-2 font-normal placeholder-gray-400 border  rounded-xl  md:flex-none md:mr-6 "
                  placeholder="x304k45"
                  required=""
                />
                <p className="flex flex-row items-center p-4 mt-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 rounded w-48 cursor-not-allowed " >
                  <RiCoupon3Line className="mr-2" /> <span>Apply Coupon.</span>
                </p>
              </div>
              <div>
                <h2 className="mb-6 text-xl font-bold ">Cart Total.</h2>
                <div className="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border rounded-xl">
                  <span>Subtotal</span>
                  <span className="flex items-center text-xl">
                    <span className="mr-1 text-base">Rs:</span>
                    <span>{cartAmount}/-</span>
                  </span>
                </div>
                <div className="flex items-center justify-between px-10 py-2 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border rounded-xl">
                  <span>Shipping</span>
                  <span className="flex items-center text-xl">
                    <span className="mr-1 text-base">Rs:</span>
                    <span>100/-</span>
                  </span>
                </div>
                <p className="text-neutral-500 px-10 py-1 mb-3">
                  NRs. 100 Inside Kathmandu Valley for any other places and/or
                  large quantity Shipping Charge may vary accordingly.
                </p>
                <div className="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100 border    rounded-xl">
                  <span>Total</span>
                  <span className="flex items-center text-xl text-cyan-500 ">
                    <span className="mr-1 text-base">Rs:</span>
                    <span>{cartAmount + 100}/-</span>
                  </span>
                </div>
                <button onClick={Checkout} className="flex flex-row items-center cursor-pointer p-4 text-neutral-100 bg-neutral-700 rounded w-56   hover:bg-neutral-600">
                  <AiFillLock className="mr-2" />
                  <span>Proceed Check Out.</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
