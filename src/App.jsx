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
import ProductProvider from "./context/ProductContext";

//context

function App() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("https://enurserynepal.com/api/v1/product/")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data))
  //     .catch((error) => console.log(error));

  // }, []);

  return (
    <>
      <div>
        {/* <Router>
            <Routes>
              <Route element={<Home />}>
                <Route path="/" element={<DashBoard />} />

                <Route path="/Productlist" element={<ProductList />} />

                <Route path="/Product/:id" element={<Product />} />
                <Route path="/Cart" element={<Cart />} />
              </Route>
            </Routes>
          </Router> */}
        <ProductProvider>
          <ProductList />
        </ProductProvider>
      </div>
    </>
  );
}

export default App;
