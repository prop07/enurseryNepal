import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiFillLock, AiOutlineReload } from "react-icons/ai";
import { Link } from "react-router-dom";

//contex
import { CartContext } from "../context/CartProvider";
import { ProductContext } from "../context/ProductProvider";

const myProduct = {
  name: "Donkey Tail",
  id: 4,
  price: 300,
  imageLinks: {
    link1:
      "https://enurserynepal.com/media/products/donkey_tail_manakamana_nursery.jpg",
    link2:
      "https://enurserynepal.com/media/products/fiddle_leaf_manakamana_nursery.jpg",
  },
  productDetails:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industryecimen book. It has survived not only five centuries, ",
  productClassification:
    "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
  shipping:
    "NRs. 100 Inside Kathmandu Valley for any other places and/or large quantity Shipping Charge may vary accordingly.",
};

const Cart = () => {
  const products = useContext(ProductContext);
  const cart = useContext(CartContext);

  const [cartItems, setCartItems] = useState(null);

  useEffect(() => {
    let data = [];
    let productname = null;

    cart.map((item) => {
      products.find((product) => {
        if (product.id == item.id) {
          data = [...data, product];
        }
      });
    });
    setCartItems(data);
  }, [products]);

  if (!cartItems) return <div>Loading</div>;

  return (
    <>
    <div className=" flex flex-wrap justify-center mt-24 ">
      {/* cart */}
      <div className="max-w-[80vh]">
        <div className="p-4">
          {/* table title */}
          <div className="flex  gap-24 bg-neutral-400  p-4 text-xl">
            <h1 className="w-24 ml-6 ">Image</h1>
            <h1 className="w-32">Name</h1>
            <h1>Quantity</h1>
            <h1>Price</h1>
            <h1></h1>
          </div>
          {/* Items */}
          {cartItems.map((item) => (
            <div id={item.id} className="flex gap-10 text-lg p-4   shadow-md  ">
              <img
                className=" rounded-md h-24 w-24 p-2  "
                src={item.image}
                alt={item.image}
              />
              <h1 className=" w-32 ml-20 cursor-pointer hover:text-cyan-600">
                <Link key={item.id} to={`/product/${item.id}`}>
                  {item.name}
                </Link>
              </h1>
              <input
                type="number"
                min="1"
                max="20"
                placeholder="1"
                className=" text-center bg-slate-200 w-36 h-12 m-4"
              />
              <h1 className="ml-6">{item.price}</h1>
              <AiOutlineClose className="ml-8 cursor-pointer hover:text-cyan-600" />
            </div>
          ))}
          {/* itemsEnd */}
          <hr />
          <div className="p-4">
            <button className=" flex flex-row items-center p-4 text-neutral-100 bg-neutral-700 rounded w-42 m-4  hover:bg-neutral-600">
              <AiOutlineReload className="mr-2 text-neutral-100 " /> Update
              Cart.
            </button>
          </div>
        </div>
      </div>
      {/* checkout */}
      <div className="p-4 shadow-md max-w-[40vw] mb-4">
        <h1 className="text-xl bg-neutral-400  p-4 w-64 text-center">
          My Cart
        </h1>
        <div className="flex flex-row">
          <h1 className="p-4 ml-2">Subtotal:</h1>
          <h1 className="p-4 ml-6">Rs:{myProduct.price}/-</h1>
        </div>{" "}
        <hr />
        <div className="flex flex-row">
          <h1 className="p-4 ml-2">Shipping:</h1>
          <h1 className="p-4 ml-6">Rs:100/-</h1>
        </div>
        <hr />
        <div className="flex flex-row">
          <h1 className="p-4 ml-2">Total:</h1>
          <h1 className="p-4 ml-14">Rs:400/-</h1>
        </div>
        <button className=" flex flex-row items-center p-4 text-neutral-100 bg-neutral-700 rounded w-52 m-4  hover:bg-neutral-600">
          <AiFillLock className="mr-2" /> Proceed Check Out.
        </button>
      </div>
    </div>
   </>
  );
};

export default Cart;
