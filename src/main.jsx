import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

//context reducer
import ProductProvider from "./context/ProductProvider";
import CartProvider from "./context/CartProvider";
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
    </UserProvider>
  </React.StrictMode>
);
