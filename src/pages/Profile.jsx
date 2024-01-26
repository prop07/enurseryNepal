import { useEffect, useState, useContext } from "react";
import { MdBrokenImage } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//firebase
import { ref, onValue, get, child, remove } from "firebase/database";
import { database, auth } from "../config/firebase";
//context
import { useUser } from "../context/UserContext";
import { ProductContext } from "../context/ProductProvider";

const Profile = () => {
  const { userId } = useUser();
  const products = useContext(ProductContext);
  const email = auth?.currentUser?.email;
  const modifiedEmail = email?.replace(/\./g, "_");
  const [activeOrderId, setActiveOrderId] = useState();
  const [orderIds, setOrderIds] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = ref(database, "order/" + modifiedEmail);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val() || {};
          setOrderDetails(data);
          const uniqueIds = Object.keys(data);
          setOrderIds(uniqueIds);
          setActiveOrderId(uniqueIds[0]);
        });
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };
    fetchData();
  }, [userId, modifiedEmail, email]);

  const showToastRemoveMessage = () => {
    toast.warning("Order removed.", {
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

  const showToastErrorMessage = (message) => {
    toast.error(message, {
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

//loading
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    window.scroll(0, 0);
    return () => clearTimeout(loadingTimeout);
  }, []);

//total item count
  function calculateTotalQuantity() {
    const items = orderDetails[activeOrderId]?.orderPlace?.items || [];
    return items.reduce((total, item) => total + item.qty, 0);
  }

//remove order
async function deleteOrder(orderId, email) {
  const orderRef = ref(database, 'order/' + email);
  try {
    const snapshot = await get(child(orderRef, orderId));
    if (snapshot.exists()) {
      remove(child(orderRef, orderId));
      showToastRemoveMessage();
    } else {
      showToastErrorMessage("Unable to remove !");
    }
  } catch (error) {
    showToastErrorMessage(error);
  }
}

  if (isLoading || !products) {
    return (
      <div className=" h-screen w-screen  backdrop-blur-sm bg-white/30 "> <div className="flex h-full items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-neutral-700"></div>
      </div></div>
    )
  }
  return (
    <div className=" py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <ToastContainer className="sm:w-72" />
      <div className="flex"><div className="text-gray-600 text-center  font-bold  border-r-2  border-gray-400 p-2 mr-1" >
        Your Order List:
      </div>
        <div className="flex  overflow-scroll" style={{ maxHeight: "80vh" }}>
          {orderIds.map((orderId) => (
            <div key={orderId} onClick={() => setActiveOrderId(orderId)} className={`flex p-2 justify-start item-start rounded-md  flex-col  cursor-pointer ${activeOrderId == orderId ? "bg-gray-300 " : "bg-white "}`}>
              <h1 className="text-sm font-semibold  text-gray-800">
                ID:
                {orderId}</h1>
              <p className="text-sm font-medium leading-6 text-gray-600">Date:{JSON.parse(orderDetails[orderId].orderPlace.date)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full ">
        <div className="flex flex-col justify-start items-start w-full ">
          <div className="flex flex-col  overflow-scroll gap-1 justify-start items-start  bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full" style={{ maxHeight: "50vh" }}>
            <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Order items</p>
            {/* cards */}
            {orderDetails[activeOrderId]?.orderPlace?.items ? (
              orderDetails[activeOrderId].orderPlace.items.map((item) => {
                const p = products.find(
                  (product) => product.id === parseInt(item.id)
                );
                if (!p) {
                  return <div key={p.id} >Product removed from store.</div>;
                }
                return (
                  <div key={item.id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    {p.image ? (
                      <div className="pb-4 md:pb-8 w-full md:w-40">
                        <img className="w-full  rounded-md h-72 object-cover md:h-32" src={p.image} alt="Loading..." />
                      </div>
                    ) :
                      (
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <div className="flex justify-center items-center rounded w-full h-72 md:h-32 bg-gray-200 text-gray-400">
                            <MdBrokenImage size={20} />
                          </div>
                        </div>
                      )}
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl truncate w-64  xl:text-2xl font-semibold leading-6 text-gray-800">{item.name}</h3>
                        <div className="flex justify-start items-start flex-col space-y-2">
                          <p className="text-sm  leading-none text-gray-500">{p.type.title}</p>
                          <p className="text-sm  leading-none text-gray-500">{p.sub_category.category.title}</p>
                        </div>
                      </div>
                      <div className="flex justify-between space-x-8 items-start w-full">
                        <p className="text-base  xl:text-lg leading-6">Rs:{item.price}</p>
                        <p className="text-base  xl:text-lg leading-6 text-gray-800">Qty:{item.qty}</p>
                        <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">Total Price:{item.price * item.qty}</p>
                      </div>
                    </div>
                  </div>
                )
              }
              )
            ) : (
              <p>No order details found </p>
            )}
          </div>
          <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50  space-y-6">
              <h3 className="text-xl  font-semibold leading-5 text-gray-800">Summary</h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base  leading-4 text-gray-800">Subtotal</p>
                  <p className="text-base  leading-4 text-gray-600">Rs: {orderDetails[activeOrderId]?.orderPlace.totalAmount - 100}/-</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base  leading-4 text-gray-800">Shipping</p>
                  {activeOrderId?
                  <p className="text-base  leading-4 text-gray-600">Rs:100/-</p>
                  : <p className="text-base  leading-4 text-gray-600">Rs:NaN/-</p>
                  }
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-base  font-semibold leading-4 text-gray-800">Total</p>
                <p className="text-base  font-semibold leading-4 text-gray-600">Rs:{orderDetails[activeOrderId]?.orderPlace.totalAmount}/-</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
          <h3 className="text-xl  font-semibold leading-5 text-gray-800">Customer Details</h3>
          <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base  font-semibold leading-4 text-left text-gray-800">{orderDetails[activeOrderId]?.orderPlace.name}</p>
                  <p className="w-48 lg:w-full  xl:w-48  md:text-left text-sm  text-gray-600">Phone:{orderDetails[activeOrderId]?.orderPlace.phone}</p>
                </div>
              </div>
              <div className="flex justify-center text-gray-800  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="cursor-pointer text-sm leading-5 ">{email}</p>
              </div>
            </div>
            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
              <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                  <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                  <div className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm  text-gray-600">
                    <p className="py-1">{orderDetails[activeOrderId]?.orderPlace.address}</p>
                    <p className="py-1">Post box:{orderDetails[activeOrderId]?.orderPlace.zipCode}</p>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                  <p className="text-base  font-semibold leading-4 text-center md:text-left text-gray-800">Order Details</p>
                  <div className="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm  text-gray-600">
                    <p className="py-1">Status:{orderDetails[activeOrderId]?.orderPlace.status}</p>
                    <p className="py-1">Id:{activeOrderId}</p>
                    <p className="py-1">Total product:{calculateTotalQuantity()}</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                {activeOrderId?
                ( <button onClick={()=>deleteOrder( activeOrderId, modifiedEmail)} className="mt-6 md:mt-0 py-5 hover:bg-gray-200   border border-gray-800  w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">Delete order</button>)
              :null }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;