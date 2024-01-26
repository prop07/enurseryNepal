import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

//icons
import {  BsBagPlus } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { MdBrokenImage } from "react-icons/md";

//context
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";

export const Search = () => {
  const { searchQuery , page } = useParams();
  const products = useContext(ProductContext);
  const [pageCount, setPageCount] = useState(0);
  const [matchingProducts , setMatchingProducts] = useState([]);
  const [ sortBy, setSortBy ] = useState("default");
  const [isLoading, setIsLoading] = useState(true);


  //pages
  useEffect(() => {
    const calculatePageCount = async () => {
      const pageCount = Math.ceil(matchingProducts.length / 12);
      setPageCount(pageCount);
    };
    calculatePageCount();
  }, [matchingProducts]);

  //filter
  useEffect(() => {
    const search = searchQuery.trim().toLocaleLowerCase();
    const filterProduct =
      products.filter(
        (product) =>
          product.name.toLowerCase().includes(search) ||
          product.type.title.toLowerCase().includes(search) ||
          product.sub_category.category.title.toLowerCase().includes(search) ||
          product.sub_category.title.toLowerCase().includes(search)
      );
      if (sortBy === "ascending") {
        setMatchingProducts(filterProduct.slice().sort((a, b) => a.price - b.price));
      } else if (sortBy === "descending") {
        setMatchingProducts(filterProduct.slice().sort((a, b) => b.price - a.price));
      } else {
        setMatchingProducts( products.filter(
          (product) =>
            product.name.toLowerCase().includes(search) ||
            product.type.title.toLowerCase().includes(search)
        ));
      }
  }, [ searchQuery, sortBy, products]);

  //loading
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    window.scroll(0, 0);
    return () => clearTimeout(loadingTimeout);
  }, [page]);


  if (isLoading || !products) {
    return (
      <div className=" h-screen w-screen  backdrop-blur-sm bg-white/30 "> <div className="flex h-full items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
      </div></div>
    )
  }
  
  if(products  &&  matchingProducts.length == 0 ){
    return(
      <center className=" grid items-center justify-center h-96  font-poppins p-16 " >
    <h2 className=" text-xl font-bold mb-4 text-gray-600"> Sorry! &#34;no item match found for {searchQuery}&#34;</h2>
  </center>
    )
  }
  
  return (
    <>
    <div className=" sm:w-2/4 p-1   mx-auto pt-5   flex justify-end items-end ">
      <p className="border border-gray-400 p-1 sm:p-2 rounded-md">
      <span className="  mr-1 text-sm sm:text-base ">Sort by:</span>

      <span onClick={()=>setSortBy("default")} className={`border-r-2  border-gray-400 sm:pr-2 pr-1 cursor-pointer sm:text-lg text-sm ${sortBy == "default"?"text-black":" text-gray-500 "}`}>Default</span>
      <span onClick={()=>setSortBy("ascending")} className={`border-r-2 border-gray-400 sm:pr-2 sm:pl-2 pl-1 pr-1  cursor-pointer sm:text-lg text-sm ${sortBy == "ascending"?"text-black":" text-gray-500  "}`}>Price Low to High</span>
      <span onClick={()=>setSortBy("descending")} className={`sm:pl-2 pl-1 border-gray-400 pr-1 cursor-pointer sm:text-lg text-sm ${sortBy == "descending"?"text-black":" text-gray-500  "}`}>Price High to Low</span>
      </p>
    </div>   
          <div>
            
            <ProductListByPage activePage={page} products={matchingProducts} />
            <div className=" flex items-center gap-1 justify-center h-auto"><div className="h-0.5 w-2/4  bg-gray-400 rounded-xl"></div><p className="flex items-center justify-center text-gray-400 font-normal border border-gray-400 rounded-full h-10 w-10 ">{page}</p> </div>
          </div>
      <div>
        <Pagination
          pageCount={pageCount}
          searchQuery = {searchQuery}
          activePage={page}
        />
      </div>
    </>
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
  products.slice((activePage * 12)-12, activePage * 12).map((product) =>
    productCardList.push(
      <div
        key={product.id}
        className=" w-72 grid border bg-white rounded-xl justify-items-center shadow-baseShadow hover:shadow-hoverShadow shadow-gray-300 hover:shadow-gray-300 duration-500 ease-in-out"
      >
          <Link key={product.id} to={`/product/${product.id}`}
          >
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
        {}
      </div>
    )
  );
  return (
    
    <div className="p-4  w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
      {productCardList}
      <ToastContainer className="sm:w-48" />
    </div>
  );
};


//pagintation
const Pagination = ({ pageCount, activePage, searchQuery }) => {
  return (
    <div className="flex items-center justify-center mb-4 mt-2">
    {activePage < pageCount ?   <Link to={`/search/${searchQuery}/${JSON.parse(activePage)+1}`}
        
        className="flex items-center justify-center w-2/3 py-2  self-center rounded-md  border border-gray-400 hover:border-gray-800 text-gray-800 transition duration-300 ease-in-out "
      >
          <span> Next page</span>
      </Link>: 
          <span   className="flex items-center justify-center w-2/3 py-2 self-center rounded-md  border border-gray-400 text-gray-400 cursor-not-allowed   ">No more items !</span>
        }
    </div>
  );
};
