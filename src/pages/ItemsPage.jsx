import React from "react";
import Header from "../components/context/Header";
import BestProduct from "../components/ItemPage/BestProduct";
import Product from "../components/ItemPage/Product";
const ItemsPage = () => {
  return (
    <>
      <Header />
      <div>
        <BestProduct />
        <Product />
      </div>
    </>
  );
};

export default ItemsPage;
