import { useContext } from "react";
import { ProductContext } from "../context/ProductProvider";
import { createContext, useState, useEffect, useReducer } from "react";

export const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SetCart":
      return { ...state, ...action.payload };
    case "AddToCart": {
      const { id, qtyEq } = action.payload;
      return { ...state, [id]: (state[id] || 0) + qtyEq };
    }
    case "UpdateCartItem": {
      const { id, qty } = action.payload;
      return { ...state, [id]: qty };
    }
    case "DeleteCartItem": {
      const { id } = action.payload;
      let newCart = { ...state };
      delete newCart[id];
      return { ...newCart };
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const products = useContext(ProductContext);
  const initialState = localStorage.getItem("ca");
  const [cart, dispatch] = useReducer(
    reducer,
    initialState ? JSON.parse(initialState) : {}
  );

  useEffect(() => {
    let newCartData = {};
    Object.keys(cart).map((key) => {
      products.find((product) => {
        if (product.id == key) {
          newCartData[product.id] = cart[key] || 0;
        }
      });
    });
    dispatch({ type: "SetCart", payload: newCartData });
    console.log("cart", cart);
  }, []);

  useEffect(() => {
    localStorage.setItem("ca", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartDispatchContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;

export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error("useDispatchCart must be used within a CartProvider");
  }
  return context.dispatch;
};
