import React, { createContext, useState, useEffect, useReducer } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'AddToCart':
      // Logic to handle adding product to the cart
      // action.productId and action.quantity contain the product ID and quantity
      // Update your state accordingly
      return /* updated state */;
    case 'UPDATE':
      // Logic to handle updating product quantity in the cart
      return /* updated state */;
    case 'DELETE':
      // Logic to handle removing product from the cart
      return /* updated state */;
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartAct, dispatch] = useReducer(cartReducer, []);
  const [cart, setCart] = useState([]);
  const [dummyCart, setDummycart] = useState([
    { id: 1, qty: 3 },
    { id: 3, qty: 2 },
    { id: 5, qty: 2 },
    {id: 7,  qty:9 }

]
  )

  

  useEffect(() => {
   
  
    localStorage.getItem('storedCartItem') ? null:localStorage.setItem("storedCartItem",JSON.stringify(dummyCart));
    
      }, [])




  return (
    <CartContext.Provider value={dispatch}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
