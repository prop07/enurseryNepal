import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//icons
import { BsImageAlt, BsBagPlus } from 'react-icons/bs';

//context
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";

export const Products = () => {
    const products = useContext(ProductContext);
    const [activePage, setActivePage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        const calculatePageCount = async () => {
            const pageCount = Math.ceil(products.length / 12);
            setPageCount(pageCount);
        };
        calculatePageCount();
    }, [products]);

    useEffect(() => {
        console.log(activePage);
    }, [activePage]);
    return (
        <div>
            <div>
                {products && <ProductListByPage activePage={activePage} products={products} />}
            </div>
            <div><Pagination pageCount={pageCount} activePage={activePage} setActivePage={setActivePage} /> </div>
        </div>
    );
};

//product Listing
const ProductListByPage = ({ activePage, products }) => {
    const dispatch = useDispatchCart();
    const addToCart = (productId) => {
        dispatch({ type: 'AddToCart', payload: { id: productId, qty: 1 } });
    }

    //loading skelation
    const loadingSkelaton = [];
    for (let i = 1; i < 7; i++) {
        loadingSkelaton.push(
            <div key={i}
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
    //productsCards
    const productCardList = [];
    products.slice(0, activePage * 12).map((product) =>
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
                            <BsBagPlus onClick={() => addToCart(product.id)} size={25} />
                        </span>
                    </div>
                </div>
            </div>
        ));
    if (products.length === 0)
        return (
            <div className="p-4 relative w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
                {loadingSkelaton}
            </div>)
    return (
        <div className="p-4 relative w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
            {productCardList}

        </div>
    )
}
//pagintation
const Pagination = ({ pageCount, activePage, setActivePage }) => {

    return (
        <div className="flex items-center justify-center">
            <p onClick={() => activePage < pageCount ? setActivePage(activePage + 1) : null} className="flex items-center justify-center w-2/3  self-center   m-4 border cursor-pointer p-2  text-gray-400 hover:text-gray-800  ">
                {activePage < pageCount ? <span> Load more</span> : <span>No more items</span>}
            </p>
        </div>
    )
}