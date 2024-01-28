import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdBrokenImage } from "react-icons/md";

//context
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";

const Product = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [quantity, setQuantity] = useState(1);
  const products = useContext(ProductContext);
  const { productId } = useParams();
  const product = products.find((item) => item.id == productId);
  const dispatch = useDispatchCart();

  const addToCart = () => {
    dispatch({
      type: "UpdateCartItem",
      payload: { id: parseInt(productId), qty: parseInt(quantity) },
    });
    showToastMessage();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);

  const showToastMessage = () => {
    toast.success("Item added.", {
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

  if (!product) {
    return (
      <div className=" h-screen w-screen  backdrop-blur-sm bg-white/30 ">
        <div className="flex h-full items-center justify-center space-x-2">
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" container px-5 py-1  mx-auto">
        {/* Breadcrumb */}
        <div
          className="flex mx-auto lg:w-4/5 mb-4 mt-4"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-cyan-600 "
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to={"/products/1"}
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-cyan-600 "
                >
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <Link
                  to={`/search/${product.type.detail}/1`}
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-cyan-600 "
                >
                  {product.type.detail}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </div>
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {product.image ? (
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 max-h-[55vh] object-cover object-center rounded"
              src={product.image}
            />
          ) : (
            <div className=" flex items-center justify-center bg-gray-200 text-gray-400 lg:w-1/2 w-full lg:h-auto h-64 max-h-[55vh] object-cover object-center rounded">
              <MdBrokenImage size={30} />
            </div>
          )}
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              ON SALE
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}.
            </h1>
            <div className="flex mb-4">{product.type.detail}</div>
            <p className="leading-relaxed mb-4">
              Introducing {product.name}, an exclusive item available only at
              our store. Rest easy knowing that any damage incurred during
              delivery will be promptly replaced. Please note that changes of
              mind are not eligible for returns or exchanges. Elevate your
              shopping experience with {product.name} today!
            </p>
            <div>
              <p className="title-font font-medium text-2xl text-gray-900 mb-4">
                Rs:{product.price}/-
              </p>
              <form onSubmit={handleSubmit(addToCart)}>
                <h1 className=" mt-4 text-neutral-600 text-lg mb-1">
                  Quantity:
                </h1>
                <input
                  {...register("quantity", {
                    value: /^[1-9]+$/,
                    message: "Please enter a valid Quantity 1 To 20 !",
                    max: {
                      value: 20,
                      message: " Quantity must be less or equal 20 !",
                    },
                    min: {
                      value: 1,
                      message: "Quantity must be 1 or greater !",
                    },
                  })}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  placeholder="1"
                  className=" text-center bg-slate-200 w-48 h-12 mb-1"
                />
                <p className="text-red-500 text-sm mb-1">
                  {errors.quantity?.message}
                </p>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className=" p-4 text-neutral-100 bg-neutral-600 rounded w-48 font-medium  hover:bg-neutral-700"
                  >
                    Add to Cart
                  </button>
                  <ToastContainer className="sm:w-48" />
                </div>
              </form>
              <div>
                <h1 className=" mt-4 text-neutral-500 text-lg mb-1">
                  Shipping
                </h1>
                <p className="text-neutral-500 mb-2">
                  NRs. 100 Inside Kathmandu Valley for any other places and/or
                  large quantity Shipping Charge may vary accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
