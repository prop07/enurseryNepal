import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../pages/Product";

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://enurserynepal.com/api/v1/product/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mx-0 grid place-items-center  grid-cols-4  ">
      {products.slice(0, 20).map((product) => (
        <Link to={`/product/${product.id}`}>
        <div>
          <div key={product.id}>
            <img
              className="w-64 h-64 rounded border-2 border-neutral-500"
              src={product.image}
              alt={product.image}
            />
          </div>
          <div className="flex">
            <div className="grid">
              <div className="font-bold m-2">{product.name}</div>
              <div className="font-semibold m-2 text-neutral-700">Rs:{product.price}/-</div>
            </div>
            <div className="grid">
              <button className="p-2 m-1 text-neutral-100 bg-neutral-600 rounded w-36 font-medium  hover:bg-neutral-700">
                Add to Cart
              </button>
              <button className="p-2 m-1 text-neutral-100 bg-neutral-700 rounded w-36  hover:bg-neutral-500 ">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};
export default ProductCard;
