import { BsBagPlus } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import {Link} from "react-router-dom";


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
          <p className="mb-2 text-gray-600">New Arrivals</p>
          <p className=" lg:text-6xl text-4xl font-extrabold">
            CREATE YOUR OWN
          </p>
          <p className="lg:text-6xl text-4xl font-extrabold">HEALTHIER SPACE</p>
          <p className="mt-2  lg:text-base text-sm text-gray-600">
            All types of plant delivered at your door step stop waiting and
            start building your own garden
          </p>
          <button className="py-3 px-5 mt-2 bg-gray-800 rounded-md text-white hover:bg-green-700 ">
            SHOPNOW
          </button>
        </div>
      </div>
      <div className=" mt-4 grid mx-14  ">
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
                    <div className="rounded-md shadow-md h-96 w-64" key={p.id}>
                      <Link key={p.id} to={`/product/${p.id}`}>
                      <img
                        src={p.image}
                        alt="product image"
                        className="object-cover object-center w-full rounded-t-md h-72" /></Link>
                      <div className="mt-1 px-2">  <span className="text-gray-400 p-1  mb-1 rounded bg-gray-200 mr-1 text-sm">
                        {p.type.title}
                      </span>
                        <span className="text-gray-400 p-1  mb-1 rounded bg-gray-200 mr-1 text-sm">
                          {p.sub_category.category.title}
                        </span></div>
                      <div className="px-2">
                        <p className=" mt-1 font-semibold text-neutral-700 truncate block capitalize">
                          {p.name}
                        </p>
                        <div className="flex items-center">
                          <p className="text-neutral-700  cursor-auto my-1">Rs:{p.price}/-</p>
                          <span className="ml-auto cursor-pointer hover:text-cyan-600">
                            <BsBagPlus onClick={() => addToCart(p.id)} size={25} className="mr-2" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })
            }
          </div>
        </div>
      </div>
      <div>
        <div className="mx-14 flex xl:flex-row flex-col gap-2 ">
          <div className="relative flex-1">
            <img className="rounded-md " src="https://img.freepik.com/free-photo/small-cacti-with-white-wall-background_53876-133169.jpg?w=1380&t=st=1704075587~exp=1704076187~hmac=cac960933cf5a80ce196d14d7ff858f1700dcc8efdae1a69e6c94782de6f3cc1" alt="" />
          <div className="absolute right-10  lg:top-32 top-1 ml-4 ">
            <p className="text-neutral-700  ">Only On Our Store!</p>
            <p className="  sm:text-6xl text-3xl font-extrabold mb-6">Indoor Life Plants</p>
            <span className=" font-semibold cursor-pointer text-gray-900 hover:text-white border-2 border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg text-sm px-5 py-3 text-center me-2 ">
              CHECK NOW
            </span>
            </div>
          </div>
          <div className="relative flex-1">
            <img className=" rounded-md " src="https://img.freepik.com/free-photo/white-wall-with-tree-leaf-wall_74190-7308.jpg?w=1380&t=st=1704035493~exp=1704036093~hmac=b6467e7bb210c244db6e663984ed8cea598f59ce43f47bb216bce1b177521eb5" alt="" />
          <div className="absolute right-10  lg:top-32 top-1 ml-4 ">
            <p className="text-neutral-700  ">Only On Our Store!</p>
            <p className="  sm:text-6xl text-3xl font-extrabold mb-6">Outdoor Life Plants</p>
            <span className=" font-semibold cursor-pointer text-gray-900 hover:text-white border-2 border-gray-800   hover:bg-gray-900  focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg text-sm px-5 py-3 text-center me-2  ">
              CHECK NOW
            </span>
            </div>
          </div>
        </div>
        <div className="flex xl:flex-row flex-col  mx-14 p-4 gap-1">
        <div className="flex-1 right-10  ml-4  flex flex-col items-center justify-center h-96">
            <p className="text-neutral-700  ">A Great Addition</p>
            <p className="  sm:text-6xl text-3xl font-extrabold mb-6">Gardening, Timly Visit & Routine Service For You !</p>
            <span className=" font-semibold cursor-pointer text-gray-900 hover:text-white border-2 border-gray-800  hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300  rounded-lg text-sm px-5 py-3 text-center me-2 ">
              BOOK NOW
            </span>
            </div>
          <div className="flex-1">
        <img className="rounded-full" src="https://img.freepik.com/free-photo/worker-take-care-flowerpoots-girl-white-shirt-woman-gloves_1157-42003.jpg?w=1380&t=st=1704076223~exp=1704076823~hmac=b5bb640c7bb9de636c33aa1770e1fbe4b8009262e0821d4c141dc3a99d1e12da" alt="gardening" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
