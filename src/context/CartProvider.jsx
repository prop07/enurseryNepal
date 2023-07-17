import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();



 const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {id:1,qty:3},
    {id:5,qty:2},
    {id:6,qty:1},
    {id:8,qty:4},
  ]);

 return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

//reducer
//local storage
//firebase