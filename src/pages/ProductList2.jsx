import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import products from "./DummyData";

export const ProductList2 = () => {
  const { page } = useParams();
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState(products.length / 2);

  useEffect(() => {
    console.log("current page from params: ", page);
    setActivePage(page);
  }, [page]);

  //   const renderComponent = () => {
  //     const elements = [];
  //     for (let i = 0; i < pages; i++) {
  //       elements.push(
  //         <ProductListByPage
  //           key={i}
  //           activePage={activePage}
  //           products={products}
  //         />
  //       );
  //     }
  //     return elements;
  //   };

  return (
    <div>
      <b>Products</b>
      <div className="products">
        {products && <ProductListByPage activePage={activePage} products={products} />}
      </div>
      <div>
        <Pagination activePage={activePage} setActivePage={setActivePage} />
      </div>
    </div>
  );
};

const ProductListByPage = ({ activePage, products }) => {
  return (
    <div className="d-flex flex-wrap">
      {products.slice((activePage - 1) * 25, activePage * 25).map((product) => (
        <Link className="m-4" key={product.id} to={`/product2/${product.id}/`}>
          <img src={product.image} alt={product.name} height={25} width={25} />
          <div>Name: {product.name}</div>
          <div>Description: {product.description}</div>
          <div>Price: {product.price}</div>
        </Link>
      ))}
    </div>
  );
};

const Pagination = ({ activePage, setActivePage }) => {
  //   const handlePage = (type) => {
  //     if (type === "increase") {

  //     }
  //   };
  return (
    <div>
      <Link
        style={{ padding: "1rem" }}
        // onClick={() => handlePage("increase")}
        to={`/products2/${parseInt(activePage) + 1}/`}
      >
        Increase
      </Link>
      <Link
        style={{ padding: "1rem" }}
        to={`/products2/${parseInt(activePage) - 1}/`}
        // onClick={() => handlePage("decrease")}
      >
        Decrease
      </Link>
    </div>
  );
};
