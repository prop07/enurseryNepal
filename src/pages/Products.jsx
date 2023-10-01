import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

//icons
import { BsImageAlt, BsBagPlus } from 'react-icons/bs';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';

//context
import { ProductContext } from "../context/ProductProvider";

export const Products = () => {
    const { pageId } = useParams();
    const products = useContext(ProductContext);
    const [activePage, setActivePage] = useState(parseInt(pageId));
    const [pageCount, setPageCount] = useState(Math.ceil(products.length / 12));

    useEffect(() => {
        setActivePage(pageId);
        window.scrollTo(0, 0);
    }, [pageId]);
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
                            <BsBagPlus size={25} />
                        </span>
                    </div>
                </div>
            </div>));
    if (products.length === 0)
        return (
            <div className="p-4 relative w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
                {loadingSkelaton}
            </div>
        )
    return (
        <div className="p-4 relative w-fit mx-auto  grid grid-cols-1  lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-14  ">
            {productCardList}
        </div>
    )
}

//pagintation
const Pagination = ({ pageCount, activePage, setActivePage }) => {
    //activePage to int
    const inActivePage = parseInt(activePage);

    const pagintation = [];
    for (let i = (inActivePage - 2); i < (inActivePage + 3); i++) {
        if (i > 1 && i < pageCount) {
            console.log("page" + i);
            pagintation.push(
                <Link key={i} to={`/products/${parseInt(i)}`} >
                    <li
                        className={`flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out ${inActivePage === i
                            ? 'bg-cyan-600 text-cyan-50'
                            : 'hover:bg-cyan-600 hover:text-cyan-50'
                            }`}>
                        {i}
                    </li>
                </Link>
            );
        }
    }
    return (
        <div>
            {pageCount > 1 ? (
                <pages>
                    <ul className="flex  justify-center gap-8 my-8">
                        <li
                            className="flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-cyan-600 hover:text-cyan-50 "
                        >
                            <FiArrowLeft />
                        </li>
                        <Link to={`/products/1`}>
                            <li
                                key={1}
                                className={`flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out ${inActivePage === 1
                                    ? "bg-cyan-600 text-cyan-50"
                                    : "hover:bg-cyan-600 hover:text-cyan-50"
                                    }`}
                            >
                                1
                            </li>
                        </Link>
                        <BsThreeDots
                            className={` flex items-center justify-center place-self-center ${inActivePage < 5 ? " hidden " : null
                                }`}
                        />
                        {pagintation}
                        <BsThreeDots
                            className={` flex items-center justify-center place-self-center ${inActivePage > pageCount - 4 ? " hidden " : null
                                }`}
                        />
                        <Link to={`/products/${pageCount}`}>
                            <li
                                key={pageCount}
                                className={`flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out ${inActivePage === pageCount
                                    ? "bg-cyan-600 text-cyan-50"
                                    : "hover:bg-cyan-600 hover:text-cyan-50"
                                    }`}
                            >
                                {pageCount}
                            </li>
                        </Link>
                        <li
                            className="flex items-center justify-center cursor-pointer place-self-center rounded-full border border-blue-gray-100 h-8 w-8 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-cyan-600 hover:text-cyan-50 "
                        >
                            <FiArrowRight />
                        </li>
                    </ul>
                </pages>
            ) : null}
        </div>
    )
}