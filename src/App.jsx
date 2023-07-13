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

  return (
    <>
      <div>
        <Router>
          <CartProvider>
          <ProductProvider>
            <Routes>
              <Route element={<Home />}>
                <Route path="/" element={<DashBoard />} />

                <Route path="/Productlist" element={<ProductList />} />

                <Route path="/Product/:id" element={<Product />} />
                <Route path="/Cart" element={<Cart />} />
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
