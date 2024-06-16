import Image from "next/image";
import React from "react";
import styles from "./BoardComment.module.css";
import { TimeAgo } from '@/utils/TimeAgo';

type Comments = {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

interface Writer {
  image?: string;
  nickname: string;
  id: number;
}

function BoardComment({ comment }: { comment: Comments }) {
  console.log(comment);

  return (
    <div className={styles.container}>
      <div className={styles.commentTop}>
        <p className={styles.Content}>{comment.content}</p>
        <button className={styles.moreSeeBtn}>
          <Image
            src="/Img/icons/moreSeeBtn.svg"
            width={3}
            height={13}
            alt="더보기 버튼"
          />
        </button>
      </div>
      <div className={styles.commentBottom}>
        <Image
          src="/Img/icons/user.svg"
          width={32}
          height={32}
          alt="user이미지"
        />
        <div className={styles.user}>
          <p>{comment.writer.nickname}</p>
          <p className={styles.QuestionTimstamp}>{TimeAgo(comment.updatedAt)}</p>
        </div>
      </div>
      <div className={styles.hr} />
    </div>
  );
}

export default BoardComment;
