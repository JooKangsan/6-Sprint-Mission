import React, { useCallback, useEffect, useMemo, useState } from "react";
import Items from "./Items";
import axios from "@/pages/api/axios";
import Label from "./Label";
import styles from "./Product.module.css";
import Image from "next/image";
import { SORT_ORDERS, SORT_LABELS } from "@/utils/sort";
import { useRouter } from "next/router";

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

function Product() {
  const [itemList, setItemList] = useState<Item[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState(SORT_ORDERS.RECENT);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const SortedData = useCallback(
    async ({ orderBy, pageSize }: SortedDataProps) => {
      try {
        const product = await axios.get(
          `/products?page=1&pageSize=${pageSize}&orderBy=${orderBy}`
        );
        const nextPosts: Item[] = product.data.list;
        setItemList(nextPosts);
        console.log(nextPosts);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    },
    []
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPageSize(4);
      } else if (window.innerWidth < 1200) {
        setPageSize(6);
      } else {
        setPageSize(10);
      }
    };
    window.addEventListener("resize", handleResize);
    SortedData({ orderBy, pageSize });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize, orderBy, SortedData]);


  const handleOrderChange = (selectedOrder: string) => {
    setOrderBy(selectedOrder);
    setIsOpen(false);
  };

  const filteredItems = useMemo(() => {
    return itemList
      ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (orderBy === SORT_ORDERS.RECENT) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          return b.favoriteCount - a.favoriteCount;
        }
      });
  }, [itemList, search, orderBy]);

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
            <input
              className={styles.searchInput}
              placeholder="검색할 상품을 입력해 주세요"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className={styles.addItemBtn}
            onClick={() => {
              router.push("/additem");
            }}
          >
            상품 등록하기
          </button>
          <div className={styles.btnToggle}>
            <button
              className={styles.optionButton}
              onClick={() => setIsOpen(!isOpen)}
            >
              {orderBy === SORT_ORDERS.RECENT
                ? SORT_LABELS[SORT_ORDERS.RECENT]
                : SORT_LABELS[SORT_ORDERS.LIKES]}
              <Image
                className={styles.arrowDown}
                src="/Img/icons/arrowDown.svg"
                width={24}
                height={24}
                alt=""
              />
            </button>
            {isOpen && (
              <div className={styles.OptionsContainer}>
                <div
                  onClick={() => handleOrderChange(SORT_ORDERS.RECENT)}
                  className={styles.Option}
                >
                  최신순
                </div>
                <div
                  onClick={() => handleOrderChange(SORT_ORDERS.FAVORITE)}
                  className={styles.Option}
                >
                  좋아요순
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.Items}>
        {filteredItems.map((item) => (
          <Items item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Product;
