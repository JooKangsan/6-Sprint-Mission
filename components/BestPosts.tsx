import React from "react";
import { format } from "date-fns";
import Image from "next/image";
import styles from "../styles/BestPosts.module.css";

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
    <div key={post.id} className={styles.BestContainer}>
      <div className={styles.InnerContainer}>
        <Image src="/Img/badge.svg" width={102} height={30} alt="badge" />
        <div className={styles.Content}>
          <p className={styles.Text}>{post.content}</p>
          {post.image ? (
            <Image
              src={post.image}
              width={72}
              height={72}
              alt="이미지"
              className={styles.PostImgs}
            />
          ) : (
            <></>
          )}
        </div>
        <div className={styles.InfoContent}>
          <div  className={styles.Info}>
            <p className={styles.nickname}>{post.writer.nickname}</p>
            <Image src="/Img/heart.svg" width={16} height={16} alt="heart" />
            <p className={styles.likeCount}>{post.likeCount}</p>
          </div >
          <div>
          <p className={styles.createdAt}>
            {format(new Date(post.createdAt), "yyyy. MM. dd")}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestPosts;
