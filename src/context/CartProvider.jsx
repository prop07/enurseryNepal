import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [dummycart, setCart] = useState([
    { id: 1, qty: 3 },
    { id: 3, qty: 2 },
    { id: 5, qty: 2 }


]
  )

  //unauthorize

  useEffect(() => {
    try {
      setCart(localStorage.getItem('storedCartItems'))
    }
    catch {
      localStorage.setItem('storedCartItems', dummycart);
      
    }
  }, [])






  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
