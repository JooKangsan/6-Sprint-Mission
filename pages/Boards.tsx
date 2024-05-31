import Image from "next/image";
import React, { useEffect, useState } from "react";
import search from "@/public/search.svg";
import arrowDown from "@/public/arrowDown.svg";
import sort from "@/public/sort.svg";
import axios from "./api/axios";
import Posts from "@/components/Posts";
import BestPosts from "@/components/BestPosts";

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
    <>
      <div>
        <h2>베스트 게시글</h2>
        {topArticles.map((post) => (
          <BestPosts key={post.id} post={post} />
        ))}
      </div>
      <div>
        <h2>게시글</h2>
        <button>글쓰기</button>
      </div>
      <div>
        <Image src="/Img/search.svg" width={24} height={24} alt="search" />
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <div onClick={() => setIsOpen(!isOpen)}>
          <div>{order === "recent" ? "최신순" : "좋아요순"}</div>
          <div>
            <Image
              src="/Img/arrowDown.svg"
              width={15.7}
              height={7.42}
              alt="ArrowDown"
            />
          </div>
          <div>
            <Image src="/Img/sort.svg" width={24} height={24} alt="sort" />
          </div>
        </div>
        <div>
          <div onClick={() => handleOrderChange("recent")}>최신순</div>
          <div onClick={() => handleOrderChange("like")}>좋아요순</div>
        </div>
      </div>
      <Posts />
    </>
  );
}

export default Boards;
