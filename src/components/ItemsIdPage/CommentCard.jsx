import React from "react";
import SeeMore from "../../assets/img/SeeMore.svg";
import "./CommentCard.css";

function CommentCard({ item }) {
  return (
    <>
      <div className="itemsContent">
        <div className="QuestionContent">{item.content}</div>
        <button className="SeeMoreButton">
          <img className="SeeMoreImg" src={SeeMore} />
        </button>
      </div>
      <div className="QuestionProfile">
        <img
          src={item.writer.image}
          alt={`${item.writer.nickname}님의 프로필 사진`}
        />
        <div>
          <div className="Username">{item.writer.nickname}</div>
          <p className="QuestionTimestamp">{item.updatedAt}</p>
        </div>
      </div>
      <hr />
    </>
  );
}

export default CommentCard;
