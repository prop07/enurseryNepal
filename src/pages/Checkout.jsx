import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";


//firebase
import { auth } from "../config/firebase";
import { ref, set} from "firebase/database";
import { database } from "../config/firebase";

//context
import { ProductContext } from "../context/ProductProvider";
import { CartDispatchContext } from "../context/CartProvider";
import { useUser } from "../context/UserContext";
import { checkActionCode } from "firebase/auth";


const Checkout = () => {
  const { userId } = useUser();
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
 }, [cart, products])
 
 useEffect(() => {
  console.log('Updated Order Items:', orderItems);
}, [orderItems]);


function writeUserCart(id, order) {
  const reference = ref(database, "order/" + id);
  set(reference, {
    items: order,
    email:"manoj@gmail.com",
    Pob:"12233",
    Amount:"120000"
  });
}

const checkout =()=>{
  console.log(name)
}





  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
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
          onChange={(e)=>setName(e.target.value)}
            type="text"
            id="fullName"
            name="fullName"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your full name"
            required= {true}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
          onChange={(e)=>setEmail(e.target.value)}
          
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={email}
            required= {true}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
          onChange={(e)=>setPhone(e.target.value)}
            type="number"
            id="phone"
            name="phone"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your phone number"
            required= {true}
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
          onChange={(e)=>setAddress(e.target.value)}
            type="text"
            id="address"
            name="address"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your address"
            required= {true}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="province/state" className="block text-sm font-medium text-gray-700">
              Province/state
            </label>
            <input
            onChange={(e)=>setStateProvince(e.target.value)}
              type="text"
              id="province/state"
              name="province"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your province"
            required= {true}
            />
          </div>
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
            onChange={(e)=>setZipCode(e.target.value)}
              type="number"
              id="zipcode"
              name="zipcode"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your zip code"
            required= {true}
            />
          </div>
        </div>
        <div className="mt-4">
        <button
                className="bg-[#002D74] rounded-xl text-white p-2 hover:scale-105 duration-300"
                type="submit"
              >
                Submit
              </button>
          <div>
      <ToastContainer />
    </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Checkout