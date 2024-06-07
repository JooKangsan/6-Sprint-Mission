import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import axios from "./api/axios";
import Posts from "@/components/Posts";
import BestPosts from "@/components/BestPosts";
import { SORT_ORDERS, SORT_LABELS } from "@/utils/sort";
import styles from "../styles/Boards.module.css";
import ButtonLink from "@/components/ButtonLink";

interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  writer: {
    id: number;
    nickname: string;
  };
}

interface BestPostsProps {
  key: React.Key; // React에서 제공하는 Key 타입 사용
  posts: Post[]; // Article 타입의 배열
}

function Boards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [posts, setPosts] = useState<Post[]>([]);
  const [order, setOrder] = useState(SORT_ORDERS.RECENT);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePostsCount, setVisiblePostsCount] = useState(3);

  const sortedArticles = posts.sort((a, b) => b.likeCount - a.likeCount);
  const topArticles = sortedArticles.slice(0, visiblePostsCount);

  async function getPosts() {
    try {
      const res = await axios.get(
        `/articles/?page=${currentPage}&per_page=${perPage}`
      );
      console.log("res", res);
      const nextPosts: Post[] = res.data.list;
      setPosts(nextPosts);
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [currentPage, perPage]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisiblePostsCount(1);
      } else if (window.innerWidth < 1200) {
        setVisiblePostsCount(2);
      } else {
        setVisiblePostsCount(3);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOrderChange = (selectedOrder: string) => {
    setOrder(selectedOrder);
    setIsOpen(false);
  };

  const filteredPosts = useMemo(() => {
    return posts
      ?.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (order === SORT_ORDERS.RECENT) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          return b.likeCount - a.likeCount;
        }
      });
  }, [posts, searchTerm, order]);

  return (
    <div className={styles.Container}>
      <div>
        <h2 className={styles.title}>베스트 게시글</h2>
        <div className={styles.BestPosts}>
          {topArticles.map((post) => (
            <BestPosts key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className={styles.postNav}>
        <h2 className={styles.title}>게시글</h2>
        <div>
          <ButtonLink
            className={isOpen ? styles.addBtn : styles.addBt}
            href="./addboard/"
          >
            글쓰기
          </ButtonLink>
        </div>
      </div>
      <div className={styles.postNav}>
        <div className={styles.search}>
          <Image
            src="/Img/search.svg"
            width={24}
            height={24}
            alt="search"
            className={styles.searchImg}
          />
          <input
            className={styles.searchBar}
            type="text"
            placeholder="검색할 상품을 입력해주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <div
            className={styles.SelectButton}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className={styles.Order}>
              {order === SORT_ORDERS.RECENT
                ? SORT_LABELS[SORT_ORDERS.RECENT]
                : SORT_LABELS[SORT_ORDERS.LIKES]}
            </div>
            <div>
              <Image
                src="/Img/arrowDown.svg"
                width={24}
                height={24}
                alt="ArrowDown"
              />
            </div>
            <div>
              <Image
                src="/Img/sort.svg"
                width={24}
                height={24}
                alt="sort"
                className={styles.MobileSort}
              />
            </div>
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className={styles.OptionsContainer}>
          <div
            onClick={() => handleOrderChange(SORT_ORDERS.RECENT)}
            className={styles.Option}
          >
            최신순
          </div>
          <div
            onClick={() => handleOrderChange(SORT_ORDERS.LIKES)}
            className={styles.Option}
          >
            좋아요순
          </div>
        </div>
      ) : (
        <></>
      )}

      {filteredPosts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Boards;


