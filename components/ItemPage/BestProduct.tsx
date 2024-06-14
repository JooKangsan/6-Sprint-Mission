import React, { useEffect, useState, useCallback } from "react";
import Label from "./Label";
import Items from "./Items";
import axios from "@/pages/api/axios";
import styles from "./BestProduct.module.css"

interface Item {
  createdAt?: string;
  favoriteCount?: number;
  ownerId?: number;
  images?: string[];
  tags?: string[];
  price: number;
  description?: string;
  name?: string;
  id?: number;
}

interface SortedDataProps {
  orderBy: string;
  pageSize: number;
}

const getPageSize = () => {
  return window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 4;
};

function BestProduct() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const SortedData = useCallback(
    async ({ orderBy, pageSize }: SortedDataProps) => {
      try {
        const product = await axios.get(
          `/products?page=${1}&pageSize=${pageSize}&orderBy=${orderBy}`
        );
        setItemList(product.data.list);
        console.log(product.data.list);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    },
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    SortedData({ orderBy: "favorite", pageSize });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize, SortedData]);

  return (
    <div className={styles.bestProduct}>
      <Label>베스트 상품</Label>
      <div className={styles.bestItems}>
        {itemList.map((item) => (
          <Items item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default BestProduct;
