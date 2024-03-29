import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import components
import DashBoard from "./components/DashBoard";

//import pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import {Products} from "./pages/Products";
import { Search } from "./pages/Search";


function App() {
  return (
    <>
      <div>
        <Router>
            
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route element={<Home />}>
                  <Route path="/" element={<DashBoard />} />
                  <Route path="/search/:searchQuery/:page" element={<Search />}/>
                  <Route path="/products/:page" element={<Products />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile/order" element={<Profile />} />
                </Route>
              </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
