import React from "react";
import { format } from "date-fns";
import Image from "next/image";

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
  key: React.Key;
  post: Post;
}

function BestPosts({ post }: BestPostsProps) {
  return (
    <div key={post.id}>
      <div>
        <Image src="/Img/badge.svg" width={102} height={30} alt="badge" />
        <div>
          <p>{post.content}</p>
          {post.image ? (
            <Image src={post.image} width={72} height={72} alt="이미지" />
          ) : (
            <></>
          )}
        </div>
        <div>
          <p>{post.writer.nickname}</p>
          <Image src="/Img/heart.svg" width={16} height={16} alt="heart" />
          <p>{post.likeCount}</p>
          <p>{format(new Date(post.createdAt), "yyyy. MM. dd")}</p>
        </div>
      </div>
    </div>
  );
}

export default BestPosts;
