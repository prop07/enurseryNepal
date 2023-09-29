import React from "react";
import { useParams } from "react-router-dom";
import products from "./DummyData";

export const Product2 = () => {
  const { productId } = useParams();
  const product = products.filter(p => parseInt(productId) === p.id)
  if (product) {
    return <div className="m-3">{product[0].name}</div>;
  }
};
