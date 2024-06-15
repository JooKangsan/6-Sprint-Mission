import React, { useCallback, useEffect, useRef, useState } from "react";
import Items from "./Items";
import axios from "@/pages/api/axios";
import Label from "./Label";
import styles from "./Product.module.css";
import Image from "next/image";

interface Item {
  createdAt: string;
  favoriteCount: number;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}

interface SortedDataProps {
  orderBy: string;
  pageSize: number;
}

const getPageSize = () => {
  if (typeof window === "undefined") {
    return 10;
  }
  return window.innerWidth < 768 ? 4 : window.innerWidth < 1200 ? 6 : 10;
};

function Product() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState(getPageSize());
  const [optionToggle, setOptionToggle] = useState(false);
  const [orderBy, setOrderBy] = useState("최신순");

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

  const handleSortSelection = (sortOption: React.SetStateAction<string>) => {
    setOrderBy(sortOption);
  };

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
  const ClickOption = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOptionToggle(!optionToggle);
  };

  return (
    <div className={styles.Product}>
      <div className={styles.ProductTop}>
        <Label>판매중인 상품</Label>
        <div className={styles.ProductBar}>
          <div className={styles.searchBar}>
            <Image
              className={styles.searchImg}
              src="/Img/icons/search.svg"
              width={24}
              height={24}
              alt=""
            />
            <input className={styles.searchInput} />
          </div>
          <button className={styles.addItemBtn}>상품 등록하기</button>
          <select>
            <option>최신순</option>
            <option>좋아요순</option>
          </select>
        </div>
      </div>
      <div className={styles.Items}>
        {itemList.map((item) => (
          <Items item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
export default Product;
