import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const cart = [
    {id: 2, qty: 3},
    {id: 3, qty: 2},
]



  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
