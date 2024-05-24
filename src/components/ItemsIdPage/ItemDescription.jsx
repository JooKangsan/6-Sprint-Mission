import React, { useState } from "react";
import "./ItemDescription.css";
import Tags from "./Tags";
import heart from "../../assets/img/heart.svg";
import heart_red from "../../assets/img/heart-red.svg";

function ItemDescription({ product }) {
  const [heartChange, setHeartChange] = useState(true);
  const [heartCount, setHeartCount] = useState(product.favoriteCount);

  const handleHeartChanger = () => {
    setHeartChange(!heartChange);
    setHeartCount(heartChange ? heartCount + 1 : heartCount - 1);
  };

  console.log(product);
  return (
    <div className="DescriptionContainer">
      <img
        className="ItemsImg"
        src={product.images[0]}
        alt={` 상품 대표 사진`}
      />
      <div className="ItemDetailsContainer">
        <div>
          <div>{product.name}</div>
          <div>{product.price.toLocaleString()}원</div>
          <hr />
          <div>
            <div>상품소개</div>
            <div>{product.description}</div>
          </div>
          <div>
            <div>상품태그</div>
            <Tags tags={product.tags} />
          </div>
        </div>
        <button className="PillButton" onClick={handleHeartChanger}>
          <div className="ButtonContent">
            <img className="heartIcon" src={heartChange ? heart : heart_red} />
            {heartCount}
          </div>
        </button>
      </div>
    </div>
  );
}

export default ItemDescription;
