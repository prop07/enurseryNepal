import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

//import components
import DashBoard from "./components/DashBoard";

//import pages
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import { ProductList2 } from "./pages/ProductList2";
import { Product2 } from "./pages/Product2";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";

//context
import ProductProvider from "./context/ProductProvider";



function App() {

  const [dummyCart, setDummycart] = useState([
    { id: 1, qty: 3 },
    { id: 3, qty: 2 },
    { id: 5, qty: 2 },
    {id: 7,  qty:9 }


]
  )

  //unauthorize

  useEffect(() => {
  
localStorage.getItem('storedCartItem') ? null:localStorage.setItem("storedCartItem",JSON.stringify(dummyCart));

  }, [])

  function writeUserData(userId, name, email, imageUrl){
 const db = getdatabase();

  }


 


  return (
    <>
      <div>
        <Router>
            <ProductProvider>
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                <Route element={<Home />}>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/products/:page" element={<ProductList />} />
                  <Route path="/products2/:page/" element={<ProductList2 />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/product2/:productId" element={<Product2 />} />
                  <Route path="/cart" element={<Cart />} />
                </Route>
              </Routes>
            </ProductProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
