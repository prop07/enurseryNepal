import { createContext, useState, useEffect } from "react";
import productJson from "../../data";

export const ProductContext = createContext();


const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_KEY);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts(productJson);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;