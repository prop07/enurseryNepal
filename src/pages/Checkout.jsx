import { FaAngleDoubleLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

//firebase
import { auth } from "../config/firebase";
import { ref, set, push } from "firebase/database";
import { database } from "../config/firebase";


//context
import { ProductContext } from "../context/ProductProvider";
import { CartDispatchContext } from "../context/CartProvider";
import { useUser } from "../context/UserContext";
import { useDispatchCart } from "../context/CartProvider";


const Checkout = () => {
  const { userId } = useUser();
  const dispatch = useDispatchCart();
  const [email, setEmail] = useState(auth?.currentUser?.email);
  const products = useContext(ProductContext);
  const { cart } = useContext(CartDispatchContext);
  const [cartAmount, setCartAmount] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [zipCode, setZipCode] = useState();
  const [stateProvince, setStateProvince] = useState();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const modifiedEmail = email.replace(/\./g, '_');

  const {
    handleSubmit,
  } = useForm();

  useEffect(() => {
    let totalAmount = 0;
    Object.keys(cart)?.map((cartKey) => {
      let item = products.find((product) => product.id === parseInt(cartKey));
      totalAmount += cart[cartKey] * item.price;
    });
    setCartAmount(totalAmount);
  }, [cart, cartAmount, products]);

  const updateCartWithProductInfo = () => {
    const updatedOrderItems = Object.keys(cart).map((cartKey) => {
      const quantity = cart[cartKey];
      const p = products.find((product) => product.id === parseInt(cartKey));
      return { id: cartKey, qty: quantity, name: p.name, price: p.price };
    });
    setOrderItems(...orderItems, updatedOrderItems);
  };

  useEffect(() => {
    updateCartWithProductInfo();
    const date = new Date;
    console.log(date.toLocaleString());
  }, [cart, products])

  useEffect(() => {
    console.log('Updated Order Items:', orderItems);
  }, [orderItems]);


  function writecheckout(id, order, userEmail, amount, userName, userPhone, userAddress, userStateProvince, userZipCode) {
    const currentDate = new Date;
    console.log(currentDate);
    console.log(currentDate);
    const orderPlace = {
      userId: id,
      items: order,
      name: userName,
      email: userEmail,
      totalAmount: amount + 100,
      phone: userPhone,
      address: userAddress,
      state_Province: userStateProvince,
      zipCode: userZipCode,
      status: "pending",
      date: JSON.stringify(currentDate),
    }
    const reference = ref(database, "order/" + modifiedEmail);
    const newPostRef = push(reference);

    set(newPostRef, {
      orderPlace ,
    });
    showToastMessage();
    dispatch({ type: "EmptyCart" });
    setButtonDisabled(true);
  }

  const checkout = () => {
    isButtonDisabled== false? writecheckout(userId, orderItems, email, cartAmount, name, phone, address, stateProvince, zipCode): null;
  }

  const showToastMessage = () => {
    toast.info("order Placed !", {
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


  return (
    <div className="flex justify-center object-contain items-center h-screen bg-[url('https://images.unsplash.com/photo-1538438253612-287c9fc9217e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      <div className=" rounded-lg px-6  pt-6 pb-8 mb-4 md:w-1/3 bg-white/50 ">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">
          Checkout
        </h2>
        <form onSubmit={handleSubmit(checkout)} className="space-y-4">
          <div>
            <p className="text-red-500 text-sm mb-1">all fields required *</p>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your full name"
              required={true}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={email}
              required={true}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              id="phone"
              name="phone"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your phone number"
              required={true}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              id="address"
              name="address"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your address"
              required={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="province/state" className="block text-sm font-medium text-gray-700">
                Province/state
              </label>
              <input
                onChange={(e) => setStateProvince(e.target.value)}
                type="text"
                id="province/state"
                name="province"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your province"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                onChange={(e) => setZipCode(e.target.value)}
                type="number"
                id="zipcode"
                name="zipcode"
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your zip code"
                required={true}
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              className={`bg-[#002D74] rounded-xl text-white hover:scale-105 duration-300 py-2 px-4 ${isButtonDisabled === true?"cursor-not-allowed":"cursor-pointer"}`}
              type="submit"
              disabled={isButtonDisabled}
            >
              Submit
            </button>
            <div>
              <ToastContainer />
            </div>
          </div>
        </form>
        {
          isButtonDisabled === true ? <Link to={"/"}>
                <p className="flex items-center my-4 cursor-pointer text-cyan-600 hover:text-cyan-400 ">
                  <FaAngleDoubleLeft /> <span>Return Home.</span>
                </p>
              </Link>:null
        }
      </div>
    </div>
  )
}

export default Checkout