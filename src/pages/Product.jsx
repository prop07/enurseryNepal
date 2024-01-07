import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//context
import { ProductContext } from "../context/ProductProvider";
import { useDispatchCart } from "../context/CartProvider";

const myProduct = {
  productDetails:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industryecimen book. It has survived not only five centuries, ",
  productClassification:
    "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
  shipping:
    "NRs. 100 Inside Kathmandu Valley for any other places and/or large quantity Shipping Charge may vary accordingly.",
};

const Product = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [quantity, setQuantity] = useState(1);
  const products = useContext(ProductContext);
  const { productId } = useParams();
  const product = products.find((item) => item.id == productId);
  const dispatch = useDispatchCart();

  const addToCart = () => {
    dispatch({
      type: "UpdateCartItem",
      payload: { id: parseInt(productId), qty: parseInt(quantity) },
    });
    showToastMessage();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(products);
  }, [products]);

  const showToastMessage = () => {
    toast.success("Item added.",{
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

      if(!product){
        return(
          <div className=" h-screen w-screen  backdrop-blur-sm bg-white/30 "> <div className="flex h-full items-center justify-center space-x-2">
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
          <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        </div></div>
        )
      }

  return (
      <div >
        <div className=" h-6"></div>
        <div className=" container px-5 py-1   mx-auto">
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
                <form onSubmit={handleSubmit(addToCart)}>
                  <h1 className=" mt-4 text-neutral-600 text-lg mb-1">
                    Quantity:
                  </h1>
                  <input
                    {...register("quantity", {
                      value: /^[1-9]+$/,
                      message: "Please enter a valid Quantity 1 To 20 !",
                      max: {
                        value: 20,
                        message: " Quantity must be less than 20 !",
                      },
                      min: {
                        value: 1,
                        message: "Quantity must be 1 or greater !",
                      },
                    })}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    placeholder="1"
                    className=" text-center bg-slate-200 w-48 h-12 mb-1"
                  />
                  <p className="text-red-500 text-sm mb-1">
                    {errors.quantity?.message}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className=" p-4 text-neutral-100 bg-neutral-600 rounded w-48 font-medium  hover:bg-neutral-700"
                    >
                      Add to Cart
                    </button>
                      <ToastContainer className="sm:w-48" />
                  
                  </div>
                </form>
                <div>
                  <h1 className=" mt-4 text-neutral-500 text-lg mb-1">
                    Shipping
                  </h1>
                  <p className="text-neutral-500 mb-2">
                    NRs. 100 Inside Kathmandu Valley for any other places and/or
                    large quantity Shipping Charge may vary accordingly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      
  );
};

export default Product;
