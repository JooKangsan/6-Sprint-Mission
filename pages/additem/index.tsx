import React, { useState, ChangeEvent } from "react";
import InputItem from "@/components/ItemsAddPage/InputItem";
import FileInput from "@/components/ItemsAddPage/FileInput";
import TagInput from "@/components/ItemsAddPage/TagInput";
import styles from "@/components/ItemsAddPage/ItemsAddPage.module.css";

const ItemsAddPage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  console.log(tags);

  const SubmitDisabled = !name || !description || !price || !tags.length;
  return (
    <div className={styles.Container}>
      <form>
        <div className={styles.addItemTitle}>
          <h1>상품 등록하기 </h1>
          <button
            className={styles.addItemButton}
            type="submit"
            disabled={SubmitDisabled}
          >
            등록
          </button>
        </div>
        <div className={styles.ImgUpload}>
          <FileInput title="상품이미지" />
        </div>
        <InputItem
          id="name"
          label="상품명"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="상품명을 입력해주세요"
        />
        <InputItem
          id="description"
          label="상품 소개"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상품 소개를 입력해주세요"
          textArea
        />
        <InputItem
          id="price"
          label="판매가격"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="판매가격을 입력해주세요"
        />
        <TagInput tags={tags} addTag={addTag} />
      </form>
    </div>
  );
};

export default ItemsAddPage;
