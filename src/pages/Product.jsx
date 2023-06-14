import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";



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

const Product = () => {
  const productId = useParams();
  console.log(productId);

  //fetch
  const [products, setProducts] = useState([]);

  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    fetch("https://enurserynepal.com/api/v1/product/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));

      foundProductByID()
  }, []);

  const foundProductByID = () => {
  const foundItem = products.find(({ id }) => id === productId);
  setProductDetail(foundItem);  
  };

  const [productDetails, setProductDetails] = useState(true);
  const [productClassification, setProductClassificationn] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [productLink, setProductLink] = useState(myProduct.imageLinks.link1);

  const handleProductDetails = () => {
    setProductDetails(true);
    setProductClassificationn(false);
    setShipping(false);
  };

  const handleProductClassification = () => {
    setProductDetails(false);
    setProductClassificationn(true);
    setShipping(false);
  };

  const handleShipping = () => {
    setProductDetails(false);
    setProductClassificationn(false);
    setShipping(true);
  };

  //style

  const style = {
    color: "rgb(8 145 178)",
  };

  const noStyle = {};

  return (
    <>
      {productId.id}
      <div className="flex gap-0 p-2  items-center justify-center ">
        {/* image selection */}

        <div className="grid">
          <div className="w-20 h-20">
            <img
              onClick={() => setProductLink(myProduct.imageLinks.link1)}
              className=" p-4 cursor-pointer "
              src={myProduct.imageLinks.link1}
              alt={myProduct.imageLinks.link1}
            ></img>
          </div>

          <div className="w-20 h-20">
            <img
              onClick={() => setProductLink(myProduct.imageLinks.link2)}
              className=" p-4 cursor-pointer "
              src={myProduct.imageLinks.link2}
              alt={myProduct.imageLinks.link2}
            ></img>
          </div>
        </div>
        {/* image */}
        <div>
          <div>
            <img
              className="object-cover"
              style={{ height: "30rem", width: "30rem" }}
              src={productLink}
              alt={productLink}
            ></img>
          </div>
        </div>
        {/* form */}
        <div>
          <div className="font-bold m-4">{myProduct.name}</div>
          <h1 className="text-green-600 m-4">In Stock</h1>
          <div className="font-medium m-4">Rs:{myProduct.price}/-</div>
          <div>
            <input
              type="number"
              min="1"
              max="20"
              placeholder="1"
              className=" text-center bg-slate-200 w-48 h-12 m-4"
            />
          </div>
          <div>
            <button className="p-4 text-neutral-100 bg-neutral-600 rounded w-48 font-medium m-4 hover:bg-neutral-700">
              Add to Cart
            </button>
          </div>
          <div>
            <button className="p-4 text-neutral-100 bg-neutral-700 rounded w-48 m-4 hover:bg-neutral-500 ">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="text-lg flex gap-3 bg-slate-300 py-4 px-16">
          <span
            style={productDetails ? style : noStyle}
            className="cursor-pointer  hover:text-cyan-600  "
            onClick={handleProductDetails}
          >
            Product Details
          </span>
          <span
            style={productClassification ? style : noStyle}
            className="cursor-pointer hover:text-cyan-600 "
            onClick={handleProductClassification}
          >
            Product Classification
          </span>
          <span
            style={shipping ? style : noStyle}
            className="cursor-pointer hover:text-cyan-600 "
            onClick={handleShipping}
          >
            Shipping
          </span>
        </div>

        {productDetails ? (
          <div className="py-4 px-16 ">{myProduct.productDetails}</div>
        ) : null}
        {productClassification ? (
          <div className="py-4 px-16 ">{myProduct.productClassification}</div>
        ) : null}
        {shipping ? (
          <div className="py-4 px-16 ">{myProduct.shipping}</div>
        ) : null}
      </div>
    </>
  );
};

export default Product;
