import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

//icons
import { BsImageAlt, BsBagPlus } from "react-icons/bs";
import { MdBrokenImage } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

//context
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";

export const Products = () => {
  const { page } = useParams();
  const products = useContext(ProductContext);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const calculatePageCount = async () => {
      const pageCount = Math.ceil(products.length / 12);
      setPageCount(pageCount);
    };
    calculatePageCount();
  }, [products]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [page]);

  //loading skelation
  const loadingSkelaton = [];
  for (let i = 1; i < 7; i++) {
    loadingSkelaton.push(
      <div
        key={i}
        role="status"
        className=" w-72 border border-gray-500 rounded-xl shadow animate-pulse p-4  "
      >
        <div className="flex items-center justify-center h-64 w-60 mb-4 ml-1 bg-gray-400 rounded ">
          <BsImageAlt size={30} />
        </div>
        <div className="h-2.5 bg-gray-400 rounded-full  w-60 mb-4 ml-1"></div>
        <div className="h-2.5 bg-gray-400 rounded-full  w-60 mb-8 ml-1"></div>
        <div className="h-2.5 bg-gray-400 rounded-full  w-60 mb-2 ml-1"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  return (
      <div>
        {products.length != 0 ? (
          <div>
            <ProductListByPage activePage={page} products={products} />
            <div className=" flex items-center gap-1 justify-center h-auto">
              <div className="h-0.5 w-2/4  bg-gray-400 rounded-xl"></div>
              <p className="flex items-center justify-center text-gray-400 font-normal border border-gray-400 rounded-full h-10 w-10 ">
                {page}
              </p>
            </div>
            <Pagination pageCount={pageCount} activePage={page} />
          </div>
        ) : (
          <div className="p-4 relative w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
            {loadingSkelaton}
          </div>
        )}
      </div>
  );
};

//product Listing
const ProductListByPage = ({ activePage, products }) => {
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

  //productsCards
  const productCardList = [];
  products.slice(activePage * 12 - 12, activePage * 12).map((product) =>
    productCardList.push(
      <div
        key={product.id}
        className=" w-72 grid border bg-white rounded-xl justify-items-center shadow-baseShadow hover:shadow-hoverShadow shadow-gray-300 hover:shadow-gray-300 duration-500 ease-in-out"
      >
        <Link key={product.id} to={`/product/${product.id}`}>
          {product.image ? (
            <LazyLoadImage
              className="w-64 h-64 mt-4 object-center rounded  "
              src={product.image}
              alt={product.image}
              effect="blur"
            />
          ) : (
            <div className="flex items-center justify-center mt-4 h-64 w-64  bg-gray-200 rounded text-gray-400 hover:text-gray-400">
              <MdBrokenImage size={30} />
            </div>
          )}
        </Link>
        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 p-1 mb-1 rounded bg-gray-200 mr-1 text-sm">
            {product.type.title}
          </span>
          <span className="text-gray-400 p-1 mb-1 rounded bg-gray-200 mr-1 text-sm">
            {product.sub_category.category.title}
          </span>
          <span className="text-gray-400 p-1 mb-1 rounded bg-gray-200  text-sm">
            {product.sub_category.title}
          </span>
          <p className="text-lg mt-1 font-semibold text-neutral-700 truncate block capitalize">
            {product.name}
          </p>
          <div className="flex items-center">
            <p className="text-lg  text-black cursor-auto my-3">
              Rs:{product.price}/-
            </p>
            <span className="ml-auto cursor-pointer hover:text-cyan-600">
              <BsBagPlus title="add to cart" onClick={() => addToCart(product.id)} size={25} />
            </span>
          </div>
        </div>
      </div>
    )
  );
  return (
    <div className="p-4 relative w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
      {productCardList}
      <ToastContainer className="sm:w-48" />
    </div>
  );
};

//pagintation
const Pagination = ({ pageCount, activePage }) => {
  return (
    <div className="flex items-center justify-center mb-4 mt-2">
      {activePage < pageCount ? (
        <Link
          to={`/products/${JSON.parse(activePage) + 1}`}
          className="flex items-center justify-center w-2/3 py-2  self-center rounded-md  border border-gray-400 hover:border-gray-800 text-gray-800 transition duration-300 ease-in-out "
        >
          <span> Next page</span>
        </Link>
      ) : (
        <span className="flex items-center justify-center w-2/3 py-2 self-center rounded-md  border border-gray-400 text-gray-400 cursor-not-allowed   ">
          No more items !
        </span>
      )}
    </div>
  );
};
