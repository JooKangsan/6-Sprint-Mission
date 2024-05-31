import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "./api/axios";
import Posts from "@/components/Posts";
import BestPosts from "@/components/BestPosts";
import styles from "../styles/Boards.module.css";

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
  useEffect(() => {
    async function getPosts() {
      const res = await axios.get(`/articles`);
      console.log("res", res);
      const nextPosts: Post[] = res.data.list;
      setPosts(nextPosts);
    }
    getPosts();
  }, []);

  const [posts, setPosts] = useState<Post[]>([]);
  const [order, setOrder] = useState("recent");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePostsCount, setVisiblePostsCount] = useState(3);

  const sortedArticles = posts.sort((a, b) => b.likeCount - a.likeCount);
  const topArticles = sortedArticles.slice(0, visiblePostsCount);

  const handleOrderChange = (selectedOrder: string) => {
    setOrder(selectedOrder);
    setIsOpen(false);
  };
  return (
    <div className={styles.Container}>
      <div>
        <h2 className={styles.title}>베스트 게시글</h2>
        <div  className={styles.BestPosts}>
        {topArticles.map((post) => (
          <BestPosts key={post.id} post={post} />
        ))}
        </div>
      </div>
      <div className={styles.postNav}>
        <h2 className={styles.title}>게시글</h2>
        <div>
          <button className={styles.addBtn}>글쓰기</button>
        </div>
      </div>
      <div className={styles.postNav} >
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
              {order === "recent" ? "최신순" : "좋아요순"}
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
              {/* <Image src="/Img/sort.svg" width={24} height={24} alt="sort" /> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div onClick={() => handleOrderChange("recent")}>최신순</div>
        <div onClick={() => handleOrderChange("like")}>좋아요순</div>
      </div>

      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Boards;
