import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
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
      <form className="space-y-4">
        <div>
          <p className="text-red-500 text-sm mb-1">all fields required *</p>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your full name"
            required= "true"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your email address"
            required= "true"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your phone number"
            required= "true"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter your address"
            required= "true"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="province" className="block text-sm font-medium text-gray-700">
              Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your province"
              required= "true"
            />
          </div>
          <div>
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
              Zip Code
            </label>
            <input
              type="number"
              id="zipcode"
              name="zipcode"
              className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your zip code"
              required= "true"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Submit
          </button>
          <div>
      <button onClick={showToastMessage}>Notify</button>
      <ToastContainer />
    </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Checkout