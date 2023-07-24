import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import components
import DashBoard from "./components/DashBoard";

//import pages
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Pagination from "./pages/Pagination";

//context
import ProductProvider from "./context/ProductProvider";
import CartProvider from "./context/CartProvider";

function App() {

  const [cartItems, setCartItems] = useState([
    { id: 2, qty: 3 },
    { id: 3, qty: 2 }
]);

useEffect(() => {

    const storedCartItems = localStorage.getItem("storedCartItem");

    if(!storedCartItems){
      localStorage.setItem("storedCartItems", JSON.stringify(cartItems)) 
    }
  }, [cartItems])




  return (
    <>
      <div>
        <Router>
          <CartProvider>
            <ProductProvider>
              <Routes>
                <Route element={<Home />}>
                  <Route path="/" element={<DashBoard />} />

                  <Route path="/productlist" element={<ProductList />} />

                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                </Route>
              </Routes>
            </ProductProvider>
          </CartProvider>
        </Router>
      </div>
    </>
  );
}

export default App;


//cart local storage