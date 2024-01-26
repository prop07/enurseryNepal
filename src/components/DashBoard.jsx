import { BsBagPlus } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import {Link} from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

//images
import outdoor from "../images/outdoor.jpg";
import indoor from "../images/indoor.jpg";
import gardening from "../images/gardening.jpg";

//icon
import { BsImageAlt} from "react-icons/bs";




//context
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";

const deal = [259, 311, 81, 308, 174, 321];

const DashBoard = () => {
  const products = useContext(ProductContext);
  const dispatch = useDispatchCart();

  const addToCart = (productId) => {
    dispatch({ type: "AddToCart", payload: { id: productId, qtyEq: 1 } });
    showToastMessage();
  };

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

  return (
    <div>
      <ToastContainer className="sm:w-48" />
      <div className="relative " style={{ height: "60vh" }}>
        <div
          className="bg-gradient-to-t from-transparent to-white absolute inset-0 "
          style={{ height: "15px" }}
        ></div>
        <img
          src="https://images.unsplash.com/photo-1483794344563-d27a8d18014e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="banner"
          className="w-full  object-none"
          style={{ height: "60vh" }}
        />
        <div className="absolute lg:left-24  lg:top-24 top-20 ml-4 lg:ml-80 ">
          <p className="mb-2 text-gray-600">Get Yours</p>
          <p className=" lg:text-6xl text-4xl font-extrabold">
            CREATE YOUR OWN
          </p>
          <p className="lg:text-6xl text-4xl font-extrabold">HEALTHIER SPACE</p>
          <p className="mt-2  lg:text-base text-sm text-gray-600">
            All types of plant delivered at your door step stop waiting and
            start building your own garden
          </p>
          <Link to={'/products/1'}><button className="py-3 px-5 mt-2 bg-gray-800 rounded-md text-white hover:bg-green-700 ">
            SHOP NOW
          </button>
          </Link>
        </div>
      </div>
      <div className=" mt-4 grid mx-14 rounded-md ">
        <div className="w-36 font-extrabold  border-green-700 border-b-4  ">
          TODAY&apos;S DEAL
        </div>
        <div className="sm:flex gap-4 mt-2 mb-2 grid">
          <div className="relative">
            <img
              className="h-96 sm:w-74 w-96 rounded-md "
              src="https://img.freepik.com/free-photo/peace-lily-plant-pot_53876-133141.jpg?size=626&ext=jpg"
              alt="new arrivals"
            />
            <div className=" absolute inset-x-0 bottom-0 p-4 text-3xl font-bold bg-green-500 bg-opacity-50 text-white ">
              <p>BUY NEW</p>
              <p>FRESH ARRIVALS</p>
            </div>
          </div>
          <div className="grid grid-flow-col gap-2 overflow-scroll ">
            {
              deal.map((value) => {
                const p = products.find((product) => product.id === parseInt(value));
                if (p) {
                  return (
                    <div className="rounded-md  h-96 w-64" key={p.id}>
                      <Link key={p.id} to={`/product/${p.id}`}>
                      <LazyLoadImage
                      effect="blur"
                      width={240}
                        src={p.image}
                        alt="product image"
                        className="object-cover object-center w-full rounded-t-md h-72" /></Link>
                      <div className="mt-0.5 px-2">  <span className="text-gray-400 p-1  mb-1 rounded bg-gray-200 mr-1 text-sm">
                        {p.type.title}
                      </span>
                        <span className="text-gray-400 p-1  mb-0.5 rounded bg-gray-200 mr-1 text-sm">
                          {p.sub_category.category.title}
                        </span></div>
                      <div className="px-2">
                        <p className=" mt-0.5 font-semibold text-neutral-700 truncate block capitalize">
                          {p.name}
                        </p>
                        <div className="flex items-center ">
                          <p className="text-neutral-700  cursor-auto my-1">Rs:{p.price}/-</p>
                          <span className="ml-auto cursor-pointer hover:text-cyan-600">
                            <BsBagPlus title="add to cart" onClick={() => addToCart(p.id)} size={20} className="mr-2" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }//
                return (
                  <div
                  key={value}
                  role="status"
                  className="mr-2 h-96 w-64 border border-gray-500 rounded-xl shadow animate-pulse p-4  "
                >
                  <div className="flex items-center justify-center h-64 w-56 mb-4 ml-1 bg-gray-400 rounded ">
                    <BsImageAlt size={30} />
                  </div>
                  <div className="h-2.5 bg-gray-400 rounded-full  w-56 mb-4 ml-1"></div>
                  <div className="h-2.5 bg-gray-400 rounded-full  w-56 mb-8 ml-1"></div>
                  <div className="h-2.5 bg-gray-400 rounded-full  w-56 mb-2 ml-1"></div>
                  <span className="sr-only">Loading...</span>
                </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <div>
        <div className="mx-14 flex xl:flex-row flex-col gap-2 ">
          <div className="relative flex-1">
            <img className="rounded-md " src={indoor} alt="indoor plants" />
          <div className="absolute right-10  lg:top-32 top-1 ml-4 ">
            <p className="text-neutral-700  ">Only On Our Store!</p>
            <p className="  sm:text-6xl text-3xl font-extrabold mb-6">Indoor Life Plants</p>
            <Link to={'search/indoor/1'} className="font-bold cursor-pointer sm:text-gray-900 hover:text-white border-2 border-gray-800   hover:bg-gray-900  focus:ring-4 focus:outline-none focus:ring-gray-300 bg-gray-900 sm:bg-transparent text-white  rounded-lg text-sm px-6 py-4 text-center me-2  ">
              CHECK NOW
            </Link>
            </div>
          </div>
          <div className="relative flex-1">
            <img className=" rounded-md " src={outdoor} alt="outdoor plants" />
          <div className="absolute right-10  lg:top-32 top-1 ml-4 ">
            <p className="text-neutral-700  ">Only On Our Store!</p>
            <p className="  sm:text-6xl text-3xl font-extrabold mb-6">Outdoor Life Plants</p>
            <Link to={'search/outdoor/1'} className=" font-bold cursor-pointer sm:text-gray-900 hover:text-white border-2 border-gray-800   hover:bg-gray-900  focus:ring-4 focus:outline-none focus:ring-gray-300 bg-gray-900 sm:bg-transparent text-white  rounded-lg text-sm px-6 py-4 text-center me-2  ">
              CHECK NOW
            </Link>
            </div>
          </div>
        </div>
        <div className="flex xl:flex-row flex-col  mx-14 p-4 gap-1">
        <div className="flex-1 right-10  ml-4  flex flex-col items-center justify-center h-96">
            <p className="text-neutral-700  ">A Great Addition</p>
            <p className="  sm:text-6xl text-3xl font-extrabold mb-6">Gardening, Timly Visit & Routine Service For You !</p>
            <span title="adding soon!" className=" font-bold   cursor-not-allowed text-gray-900 hover:text-white border-2 border-gray-800  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg text-sm px-6 py-4 text-center me-2 ">
              BOOK NOW
            </span>
            </div>
          <div className="flex-1">
        <img className="sm:rounded-full rounded-xl" src={gardening} alt="gardening" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
