import { useContext, useEffect } from "react";
import { AiFillLock } from "react-icons/ai";
import { RiCoupon3Line, RiDeleteBinLine } from "react-icons/ri";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

//contex
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";
import { CartDispatchContext } from "../context/CartProvider";

const Cart = () => {
  const products = useContext(ProductContext);
  const dispatch = useDispatchCart();
  const { cart } = useContext(CartDispatchContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let newCartData = {};
    Object.keys(cart).map((key) => {
      products.find((product) => {
        if (product.id == key) {
          newCartData[product.id] = cart[key] || 0;
        }
      });
    });
    console.log("newCartData", newCartData);
    // dispatch({ type: "SetCart", payload: { id: { 1: 2 } } });
  }, []);

  const handleDeleteCart = (id) => {
    dispatch({ type: "DeleteCartItem", payload: { id } });
  };

  const handleUpdateCart = (action, id) => {
    cart.find((item) => item.id);
    dispatch({
      type: "UpdateCartItem",
      payload: {
        id: parseInt(id),
        qty: parseInt(1) + action === "increase" ? 1 : -1,
      },
    });
  };

  return (
    <section className="flex items-center bg-gray-50  font-poppins mt-20 ">
      <div className="justify-center flex-1 px-1 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <div className="flex flex-wrap mt-2">
          <div className="w-full lg:w-8/12">
            <div className="px-10 overflow-auto max-h-screen ">
              <Link to={"/products"}>
                {" "}
                <p className="flex items-center my-4 cursor-pointer text-cyan-500 hover:text-cyan-300 ">
                  <FaAngleDoubleLeft /> <span>Continue Shopping.</span>
                </p>
              </Link>
              {Object.keys(cart).map((cartKey) => {
                const p = products.find((product) => product.id === cartKey);
                if (!p) {
                  return;
                }
                return (
                  <div
                    key={cartKey}
                    className="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-200  xl:justify-between border-opacity-40"
                  >
                    <div className="w-full mb-2 lg:mb-0 h-96 md:h-44 md:w-44">
                      {p ? (
                        <img
                          src={p.image}
                          alt={p.image}
                          className=" rounded object-cover w-full h-full"
                        />
                      ) : (
                        <div>Loading image</div>
                      )}
                    </div>
                    <div className="w-full px-4 mb-6 md:w-auto xl:mb-0">
                      <Link key={cartKey} to={`/product/${cartKey}`}>
                        <div className="block mb-5 text-xl font-medium   text-ellipsis  hover:underline">
                          {p.name}
                        </div>
                      </Link>
                      <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-medium">
                          <span className="">Type:</span>
                          <span className="ml-1 text-gray-400 ">
                            {p.type.detail.substring(0, 8)}
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
                        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              handleUpdateCart("decrease", cartKey)
                            }
                            className="py-2 pr-2 border-r border-gray-300 hover:text-gray-900  "
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
                            className="w-12 px-1 py-4 text-center border-0 rounded-md  bg-gray-50  md:text-right"
                          >
                            {cart[cartKey]}
                          </div>
                          <button
                            onClick={() =>
                              handleUpdateCart("increase", cartKey)
                            }
                            className="py-2 pl-2 border-l border-gray-300 hover:text-gray-900  "
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
                <p className="flex flex-row items-center p-4 mt-2 text-neutral-100 bg-neutral-700 rounded w-48 cursor-pointer  hover:bg-neutral-600">
                  {" "}
                  <RiCoupon3Line className="mr-2" /> <span>Apply Coupon.</span>
                </p>
              </div>
              <div>
                <h2 className="mb-6 text-xl font-bold ">Cart Total.</h2>
                <div className="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border    rounded-xl">
                  <span>Subtotal</span>
                  <span className="flex items-center text-xl">
                    <span className="mr-2 text-base">Rs</span>
                    <span>710,70</span>
                  </span>
                </div>
                <div className="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border    rounded-xl">
                  <span>Shipping</span>
                  <span className="flex items-center text-xl">
                    <span className="mr-2 text-base">Rs:</span>
                    <span>100/-</span>
                  </span>
                </div>
                <div className="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100 border    rounded-xl">
                  <span>Total</span>
                  <span className="flex items-center text-xl text-cyan-500 ">
                    <span className="mr-2 text-base">Rs:</span>
                    <span>720,70</span>
                  </span>
                </div>
                <p className="flex flex-row items-center cursor-pointer p-4 text-neutral-100 bg-neutral-700 rounded w-56   hover:bg-neutral-600">
                  {" "}
                  <AiFillLock className="mr-2" />{" "}
                  <span>Proceed Check Out.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
