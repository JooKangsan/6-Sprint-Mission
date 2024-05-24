import React from "react";
import SeeMore from "../../assets/img/SeeMore.svg";

function CommentCard({ item }) {
  return (
    <>
      <div className="itemsContent">
        <div>{item.content}</div>
        <button>
          <img src={SeeMore} />
        </button>
      </div>
      <div>
        <div>
          <img
            src={item.writer.image}
            alt={`${item.writer.nickname}님의 프로필 사진`}
          />

          <div>
            <div className="Username">{item.writer.nickname}</div>
            <p>{item.updatedAt}</p>
          </div>
        </div>

        <hr />
      </div>
    </>
  );
}

export default CommentCard;
