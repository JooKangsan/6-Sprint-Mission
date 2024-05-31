import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import styles from "../styles/Posts.module.css";

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

interface PostsProps {
  key: React.Key;
  post: Post;
}

function Posts({ post }: PostsProps) {
  return (
    <div>
      <div>
        <p>{post.content}</p>
        {post.image ? (
          <Image src={post.image} width={72} height={72} alt="이미지" />
        ) : (
          <></>
        )}
      </div>
      <div>
        <div>
          <Image
            src="/Img/user.svg"
            width={24}
            height={24}
            alt="프로필 이미지"
          />
          <div>{post.writer.nickname}</div>
          <div>{format(post.createdAt, "yyyy. MM. dd")}</div>
        </div>
        <div>
          <Image src="/Img/heart.svg" width={16} height={16} alt="heart" />
          <div>{post.likeCount}</div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
