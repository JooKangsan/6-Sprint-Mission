import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import styles from "../styles/Posts.module.css";
import Link from "next/link";

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
      <Link href={`/addboard/${post.id}`}>
        <div className={styles.Container}>
          <div className={styles.InnerContainer}>
            <p className={styles.title}>{post.title}</p>
            <div>
              {post.image ? (
                <Image
                  src={post.image}
                  width={72}
                  height={72}
                  alt="이미지"
                  className={styles.Img}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.InnerContainer}>
            <div className={styles.Group}>
              <Image
                src="/Img/icons/user.svg"
                width={24}
                height={24}
                alt="프로필 이미지"
              />
              <div className={styles.nickname}>{post.writer.nickname}</div>
              <div className={styles.CreatedAt}>
                {format(post.createdAt, "yyyy. MM. dd")}
              </div>
            </div>
            <div className={styles.HeartGroup}>
              <Image
                src="/Img/icons/heart.svg"
                width={16}
                height={16}
                alt="heart"
                className={styles.Heart}
              />
              <div className={styles.likeCount}>{post.likeCount}</div>
            </div>
          </div>
        </div>
        <div className={styles.Divider} />
      </Link>

  );
}

export default Posts;
