/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useReducer, useContext } from "react";
import { ProductContext } from "../context/ProductProvider";

//firebase
import { ref, set, child, get } from "firebase/database";
import { database } from "../config/firebase";

import { useUser } from "../context/UserContext";

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
    case "EmptyCart": {
      return {}; 
    }
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const { userId } = useUser();
  const products = useContext(ProductContext);
  // const initialState = localStorage.getItem("cart");
  const [cart, dispatch] = useReducer(
    reducer,
    // initialState ? JSON.parse(initialState) : 
    {}
  );

  //write
  function writeUserCart(id, cart) {
    const reference = ref(database, "cart/" + id);
    set(reference, {
      data: cart,
    });
  }

  //read
  useEffect(() => {
    try {
      const userRef = ref(database, "cart/" + userId);
      get(child(userRef, "data")).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log("Cart from database :", data);
          dispatch({ type: "SetCart", payload: data });
          console.log(cart);
        } else {
          const initialState = localStorage.getItem("cart");
          console.log("try from local storage" + initialState);
          dispatch({type:"SetCart", payload: JSON.parse(initialState)})
        }
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [userId]);

  //write user cart on change
  useEffect(() => {
    userId
      ? writeUserCart(userId, cart)
      : console.log("user not found");
    localStorage.setItem("cart", JSON.stringify(cart)
    );
  }, [cart]);

  //find product within cart
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
  }, []);

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
