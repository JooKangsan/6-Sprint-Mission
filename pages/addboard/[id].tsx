import React from "react";
import axios from "../api/axios";
import { GetServerSidePropsContext } from "next";
import BoardComment from "@/components/BoardComment";
import BoardDetail from "@/components/BoardDetail";

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
  article: Post;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params || typeof context.params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const articleId = context.params["id"];
  let article;
  try {
    const res = await axios.get(`/articles/${articleId}`);
    article = res.data;
    return {
      props: {
        article,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}

function postItems({ article }: PostsProps) {
  return (
    <div>
      <BoardDetail article={article}/>
      <BoardComment />
    </div>
  );
}

export default postItems;
