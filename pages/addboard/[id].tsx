import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import axios from "../api/axios";
import { GetServerSidePropsContext } from "next";
import BoardComment from "@/components/BoardComment";
import BoardDetail from "@/components/BoardDetail";
import styles from "@/styles/addboardID.module.css";
import { getCookie } from "cookies-next";
import { useAuth } from "@/context/AuthProvider";

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
  articleId: string;
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
        articleId,
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

function PostItems({ articleId, article, comments }: PostsProps) {
  const [content, setContent] = useState<string>("");
  const { user } = useAuth();

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("유저 데이터가 없습니다.");
    }
    let data;
    const accessToken = getCookie("accessToken");
    try {
      data = await axios.post(
        `/articles/${articleId}/comments`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (e) {}
    setContent("");
  };

  console.log(comments);
  return (
    <div className={styles.container}>
      <BoardDetail article={article} />
      <div className={styles.Comments}>
        <form onSubmit={onSubmit} className={styles.addComment}>
          <h2 className={styles.addCommentTitle}>댓글 달기</h2>
          <textarea
            className={styles.CommentInput}
            placeholder="댓글을 입력해주세요"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            className={content ? styles.addCommentBtn : styles.disabledBtn}
            type="submit"
            disabled={!content}
          >
            등록
          </button>
        </form>
        {comments.map((comment) => (
          <BoardComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default PostItems;
