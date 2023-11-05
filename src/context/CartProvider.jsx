import { useContext } from "react";
import { createContext, useState, useEffect, useReducer } from "react";

export const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    
    case 'AddToCart':{ const { id, qty } = action.payload;
    const existingCartItemIndex = state.findIndex(item => item.id === id);

    if (existingCartItemIndex !== -1) {
      // If the item already exists in the cart, update its quantity
      const updatedCart = [...state];
      return updatedCart;
    } else {
      // If the item doesn't exist in the cart, add it as a new item
      const updatedCart = [...state, { id, qty }];
      localStorage.setItem("storedCartItem", JSON.stringify(updatedCart));
      return updatedCart;
    }}
    case 'UpdateToCart':
      return;
    case 'DeleteToCart':
      return;
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {

  // const initialState = localStorage.getItem('storedCartItem');
  const [cart, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    //  localStorage.getItem('storedCartItem') ? null:localStorage.setItem("storedCartItem",JSON.stringify(dummyCart));
    localStorage.setItem("storedCartItem", JSON.stringify(cart));
  }, [cart])

  const [dummyCart, setDummycart] = useState([
    { id: 1, qty: 3 },
    { id: 3, qty: 2 },
    { id: 5, qty: 2 },
    { id: 7, qty: 9 }

  ]
  )

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
