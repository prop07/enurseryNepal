import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BsBagPlus } from "react-icons/bs";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BsThreeDots, BsImageAlt } from "react-icons/bs";

//context
import { ProductContext } from "../context/ProductProvider";

const ProductList = () => {
  const { page } = useParams();
  const products = useContext(ProductContext);
  const cart = JSON.parse(localStorage.getItem("storedCartItems"));
  const [activePage, setActivePage] = useState(3);
  const [pages, setPages] = useState(null);
  const [none, setNone] = useState([]);

  useEffect(() => {
    setPages(Math.ceil(products.length / 12));
    // console.log("Total Pages " + pages);
  }, [products]);

  useEffect(() => {
    console.log("Active page changed to: ", activePage);
  }, [activePage, page]);

  const addToCart = (id) => {
    let item = { id: id, qty: 1 };
    setNone(...cart, item);
    console.log(none);
  };

  //page handeling
  const increasePage = () => {
    // window.scrollTo({top: 0, behavior: "smooth" });
    setActivePage(activePage + 1);
  };

  const decreasePage = () => {
    setActivePage(activePage - 1);
  };
  // console.log("current page " + activePage);

  const productCardList = [];
  products.slice(activePage * 12 - 12, activePage * 12).map((product) =>
    productCardList.push(
      <div
        key={product.id}
        className=" w-72 grid border bg-white rounded-xl justify-items-center shadow-baseShadow hover:shadow-hoverShadow shadow-gray-200 hover:shadow-gray-200 duration-500 ease-in-out"
      >
        <Link key={product.id} to={`/product/${product.id}`}>
          <img
            className="w-64 h-64 mt-4 object-center rounded duration-500 hover:scale-105"
            src={product.image}
            alt={product.image}
          />
        </Link>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {product.type.detail}
          </span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {product.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              Rs:{product.price}/-
            </p>
            <span className="ml-auto cursor-pointer hover:text-cyan-600">
              <BsBagPlus size={25} onClick={() => addToCart(product.id)} />
            </span>
          </div>
        </div>
      </div>
    )
  );

  const pagintation = [];
  for (let i = activePage - 2; i < activePage + 3; i++) {
    if (i > 1 && i < pages) {
      console.log("Total pages " + i);
      pagintation.push(
        <button onClick={() => setActivePage(i)}>
          {i}
          {/* <li key={i}
        className={`flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out ${activePage === i
          ? 'bg-cyan-600 text-cyan-50'
          : 'hover:bg-cyan-600 hover:text-cyan-50'
          }`}>
        {i}
      </li> */}
        </button>
      );
    }
  }

  const loadingSkelaton = [];
  for (let i = 1; i < 7; i++) {
    loadingSkelaton.push(
      <div
        role="status"
        className=" w-72 border border-gray-200 rounded-xl shadow animate-pulse p-4  dark:border-gray-500"
      >
        <div className="flex items-center justify-center h-64 w-60 mb-4 ml-1 bg-gray-200 rounded dark:bg-gray-500">
          <BsImageAlt size={30} />
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-60 mb-4 ml-1"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-60 mb-8 ml-1"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-60 mb-2 ml-1"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (products.length === 0)
    return (
  <div className="p-4">
   <skelaton className="relative w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
        {loadingSkelaton}
      </skelaton>
  </div>
   
    );

  return (
    <>
      <section className="scroll-smooth w-fit mx-auto grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
        {productCardList}
      </section>
      {/* pagentation */}
      {pages > 1 ? (
        <pages>
          {" "}
          <ul className="flex  justify-center gap-8 my-8">
            <li
              onClick={() => (activePage > 1 ? decreasePage() : null)}
              className="flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-cyan-600 hover:text-cyan-50 "
            >
              <FiArrowLeft />
            </li>
            <Link to={`/productlist/1`}>
              {" "}
              <li
                key={1}
                className={`flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out ${
                  activePage === 1
                    ? "bg-cyan-600 text-cyan-50"
                    : "hover:bg-cyan-600 hover:text-cyan-50"
                }`}
              >
                1
              </li>
            </Link>
            <BsThreeDots
              className={` flex items-center justify-center place-self-center ${
                activePage < 5 ? " hidden " : null
              }`}
            />
            {pagintation}
            <BsThreeDots
              className={` flex items-center justify-center place-self-center ${
                activePage > pages - 4 ? " hidden " : null
              }`}
            />
            <li
              key={pages}
              className={`flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out ${
                activePage === pages
                  ? "bg-cyan-600 text-cyan-50"
                  : "hover:bg-cyan-600 hover:text-cyan-50"
              }`}
            >
              {pages}
            </li>
            <li
              onClick={() => (activePage < pages ? increasePage() : null)}
              className="flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-cyan-600 hover:text-cyan-50 "
            >
              <FiArrowRight />
            </li>
          </ul>
        </pages>
      ) : null}
    </>
  );
};
export default ProductList;

//pagintation

// 63
// perP>12
// 5.25

// 3
// 24>25

// 12*3-11
//(0,1000) no err

// active page 1 (active page * 1-12,active page * 12)
//act*12-12 , active page *12,12-14

//product list  comp
// display product 
