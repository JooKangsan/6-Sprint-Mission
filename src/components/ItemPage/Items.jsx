import React from "react";
import heart from "../../assets/img/heart.svg";
import "./Items.css";

const Items = ({ item }) => {
  console.log(item);
  return (
    <div className="Items">
      <img src={item.images} alt={item.name} className="itemImg" />
      <div>
        <h1 className="ItemsName">{item.name} </h1>
        <span className="ItemsPrice">{item.price.toLocaleString()}원</span>
        <div className="ItemsFavorite">
          <img src={heart} />
          <span>{item.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
};

export default Items;
