import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

 const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://enurserynepal.com/api/v1/product/');
      const data = await response.json();
      setProducts(data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;