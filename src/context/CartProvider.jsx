import { useContext } from "react";
import { createContext, useState, useEffect, useReducer } from "react";

export const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SetCart":
      return { ...state, ...action.payload };
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
  const initialState = localStorage.getItem("cartItemss");
  const [cart, dispatch] = useReducer(reducer, initialState || {});

  useEffect(() => {
    localStorage.setItem("cartItemss", JSON.stringify(cart));
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
