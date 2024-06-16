import Image from "next/image";
import React from "react";
import styles from "./BoardDetail.module.css";

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
  article: Post;
}

function BoardDetail({ article }: PostsProps) {
  const { title, content, image, likeCount, createdAt } = article;
  const { nickname } = article.writer;

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString();

  return (
    <div className={styles.Container}>
      <div className={styles.topContainer}>
        <div className={styles.title}>
          <p>{title}</p>
          <button></button>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.Profile}>
              <Image
                src="/Img/icons/user.svg"
                width={24}
                height={24}
                alt="토끼이미지"
              />
              <p>{nickname}</p>
              <p className={styles.DateColor}>{formattedCreatedAt}</p>
            </div>
            <Image src="/Img/icons/Vector.svg" width={1} height={24} alt="세로선" />
            <div className={styles.like}>
              <Image src="/Img/icons/heart.svg" width={24} height={24} alt="하트" />
              <p>{likeCount}</p>
            </div>
          </div>
          {image && (
            <Image src={image} width={64} height={64} alt="사진 이미지" />
          )}
        </div>
        <div className={styles.hr} />
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

export default BoardDetail;
