import { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

//import components
import DashBoard from "./components/DashBoard";

//import pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Products} from "./pages/Products";





function App() {
function writeUserData(userId, name, email, imageUrl){
const db = getdatabase();

  }
  return (
    <>
      <div>
        <Router>
            
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route element={<Home />}>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                </Route>
              </Routes>
            
            
        </Router>
      </div>
    </>
  );
}

export default App;
