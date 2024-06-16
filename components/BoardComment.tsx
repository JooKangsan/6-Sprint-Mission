import React from "react";

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
  return <div>{comment.content}</div>;
}

export default BoardComment;
