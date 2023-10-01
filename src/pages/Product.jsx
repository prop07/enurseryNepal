import {  useContext } from "react";
import { useParams } from "react-router-dom";

//context
import { ProductContext } from "../context/ProductProvider";

const myProduct = {
  productDetails:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industryecimen book. It has survived not only five centuries, ",
  productClassification:
    "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
  shipping:
    "NRs. 100 Inside Kathmandu Valley for any other places and/or large quantity Shipping Charge may vary accordingly.",
};

const Product = () => {
  const products = useContext(ProductContext);
  const { productId } = useParams();

  console.log(productId);
  const product = products.find((item) => item.id == productId);

  return (
    <>
      <div>
        <div className="container px-5 mt-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 max-h-[55vh] object-cover object-center rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                ON SALE
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}.
              </h1>
              <div className="flex mb-4">{product.type.detail}</div>
              <p className="leading-relaxed mb-4">
                Dui urna vehicula tincidunt pretium consequat luctus mi, platea
                fermentum conubia tempus ac orci. Pellentesque dictum malesuada
                cubilia faucibus dignissim mi nascetur senectus, augue ad libero
                efficitur dolor duis lobortis, non etiam sociosqu maximus enim
                mus natoque.
              </p>
              <div>
                <p className="title-font font-medium text-2xl text-gray-900 mb-4">
                  Rs:{product.price}/-
                </p>
                <div>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    placeholder="1"
                    className=" text-center bg-slate-200 w-48 h-12 mb-4"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="p-4 text-neutral-100 bg-neutral-600 rounded w-48 font-medium  hover:bg-neutral-700">
                    Add to Cart
                  </button>
                  <button className="p-4 text-neutral-100 bg-neutral-700 rounded w-48  hover:bg-neutral-500 ">
                    Buy Now
                  </button>
                </div>
                <div>
                  <h1 className=" mt-4 text-neutral-500 text-lg mb-1">
                    Shipping
                  </h1>
                  <p className="text-neutral-500 mb-4">
                    NRs. 100 Inside Kathmandu Valley for any other places and/or
                    large quantity Shipping Charge may vary accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
