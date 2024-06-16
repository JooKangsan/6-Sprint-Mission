import React from "react";
import axios from "../api/axios";
import { GetServerSidePropsContext } from "next";
import BoardComment from "@/components/BoardComment";
import BoardDetail from "@/components/BoardDetail";
import styles from "@/styles/addboardID.module.css";

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

interface Writer {
  image?: string;
  nickname: string;
  id: number;
}

interface Comment {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface PostsProps {
  article: Post;
  comments: Comment[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params || typeof context.params.id !== "string") {
    return {
      notFound: true,
    };
  }
  const articleId = context.params["id"];

  let article;
  let comments;
  try {
    const res = await axios.get(`/articles/${articleId}`);
    const comment = await axios.get(`/articles/${articleId}/comments?limit=10`);
    article = res.data;
    comments = comment.data.list;
    return {
      props: {
        article,
        comments,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

function PostItems({ article, comments }: PostsProps) {
  console.log(comments);
  return (
    <div className={styles.container}>
      <BoardDetail article={article} />
      <div className={styles.Comments}>
        <div className={styles.addComment}>
          <h2 className={styles.addCommentTitle}>댓글 달기</h2>
          <textarea className={styles.CommentInput}placeholder="댓글을 입력해주세요"/>
          <button className={styles.addCommentBtn}>등록</button>
        </div>
        {comments.map((comment) => (
          <BoardComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default PostItems;
