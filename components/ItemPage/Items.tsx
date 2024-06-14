import React from "react";
import Image from "next/image";
import styles from "./Items.module.css"

interface Items {
  item: {
    createdAt?: string;
    favoriteCount?: number;
    ownerId?: number;
    images?: string[];
    tags?: string[];
    price: number;
    description?: string;
    name?: string;
    id?: number;
  };
}

function Items({ item }: Items) {
  const imageUrl = item.images && item.images.length > 0 ? item.images[0] : "";
  return (
    <div className={styles.Container}>
      <Image className={styles.itemImg} src={imageUrl} width={282} height={282} alt="아이템 이미지" />
      <div>
        <h1 className={styles.ItemsName}>{item.name}</h1>
        <p className={styles.ItemsPrice}>{item.price.toLocaleString()}원</p>
        <div className={styles.ItemsFavorite}>
          <Image
            src="/Img/icons/heart.svg"
            width={16}
            height={16}
            alt="하트이미지"
          />
          <span>{item.favoriteCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Items;
