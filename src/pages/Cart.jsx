import React, { useContext } from "react";
import { AiOutlineClose,AiFillLock,AiOutlineReload } from "react-icons/ai";


//contex
import { CartContext } from "../context/CartProvider";
import { ProductContext } from "../context/ProductProvider";




const Cart = () => {
  const products = useContext(ProductContext);
  const cart = useContext(CartContext)


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
  return (
    <div className="flex flex-row mb-4">
      <div className="p-4">
        {/* table title */}
        <div className="flex max-w-2xl gap-24 bg-neutral-400  p-4 text-xl">
          <h1 className="w-24 ml-6 ">Image</h1>
          <h1 className="">Name</h1>
          <h1>Quantity</h1>
          <h1>Price</h1>
        </div>

        {/* Items */}
        <div className="flex gap-10 text-lg p-4 max-w-2xl items-center  shadow-md  ">
          <img
            className=" rounded-md h-24 w-24 p-2  "
            src={myProduct.imageLinks.link1}
            alt={myProduct.name}
          />
          <h1 className=" ml-16">{myProduct.name}</h1>
          <input
            type="number"
            min="1"
            max="20"
            placeholder="1"
            className=" text-center bg-slate-200 w-36 h-12 m-4"
          />
          <h1>{myProduct.price}</h1>
          <AiOutlineClose
            
            className="cursor-pointer hover:text-cyan-600"
          />
        </div>
        <hr/>
        <div className="p-4">
        <button className=" flex flex-row items-center p-4 text-neutral-100 bg-neutral-700 rounded w-42 m-4  hover:bg-neutral-600">
             <AiOutlineReload className="mr-2 text-neutral-100 "/>    Update Cart.
            </button>
      
        </div>

      </div>
{/* checkout */}
      <div className="p-4 shadow-md ">
        <h1 className="text-xl bg-neutral-400  p-4 w-64 text-center">
          My Cart
        </h1>
        <div className="flex flex-row">
          <h1 className="p-4 ml-2">Subtotal:</h1>
          <h1 className="p-4 ml-6">Rs:{myProduct.price}/-</h1>
        </div> <hr />
      <div className="flex flex-row">
          <h1 className="p-4 ml-2">Shipping:</h1>
          <h1 className="p-4 ml-6">Rs:100/-</h1>
        </div>
        <hr/>
        <div className="flex flex-row">
          <h1 className="p-4 ml-2">Total:</h1>
          <h1 className="p-4 ml-14">Rs:400/-</h1>
        </div>
        <button className=" flex flex-row items-center p-4 text-neutral-100 bg-neutral-700 rounded w-52 m-4  hover:bg-neutral-600">
       <AiFillLock className="mr-2"/>       Proceed Check Out.
            </button>
      </div>
     
    </div>
  );
};

export default Cart;
