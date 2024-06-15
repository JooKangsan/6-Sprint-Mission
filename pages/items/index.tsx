import React from "react";
import BestProduct from "@/components/ItemPage/BestProduct";
import Product from "@/components/ItemPage/Product";
import styles from "@/styles/ItemsPage.module.css";

const ItemsPage = () => {
  return (
    <div className={styles.Container}>
      <BestProduct />
      <Product />
    </div>
  );
};

export default ItemsPage;
