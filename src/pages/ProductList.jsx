import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsBagPlus } from "react-icons/bs";

//context
import { ProductContext } from "../context/ProductProvider";

const ProductList = () => {
  const products = useContext(ProductContext);




  return (
    <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-24 mb-5 ">
      {products.map((product) => (
        <div
          id={product.id}
          className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
        >
          <Link key={product.id} to={`/product/${product.id}`}>
            <img src={product.image} />
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
                <div className="ml-auto">
                  <BsBagPlus />
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </section>
  );
};
export default ProductList;
