import Image from "next/image";
import React, { useEffect, useState } from "react";
import search from "../public/search.svg";
import ArrowDown from "../public/arrowDown.svg";
import sort from "../public/sort.svg";
import axios from "./api/axios";
import Posts from "@/components/Posts";
import BestPost from "@/components/BestPost";
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


function Boards() {
  const [posts, setPosts] = useState<Post[] >([]);
  const [order, setOrder] = useState("recent")
  const [isOpen, setIsOpen] = useState(false)
  const [visiblePostsCount, setVisiblePostsCount] = useState(3);

  const sortedArticles = posts.sort((a, b) => b.likeCount - a.likeCount);
  const topArticles = sortedArticles.slice(0, visiblePostsCount);

  const handleOrderChange = (selectedOrder: string) => {
    setOrder(selectedOrder)
    setIsOpen(false)
  }



  return (
    <>
      <div>
        <h2>베스트 게시글</h2>
        <BestPosts />
      </div>
      <div>
        <h2>게시글</h2>
        <button>글쓰기</button>
      </div>
      <div>
        <Image src={search} alt="search" />
        <input />
      </div>
      <div>
        <div onClick={() => setIsOpen(!isOpen)}>
          <div>{order === "recent" ? "최신순" : "좋아요순"}</div>
          <div>
            <Image src={ArrowDown} alt="ArrowDown" />
          </div>
          <div>
            <Image src={sort} alt="sort" />
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
