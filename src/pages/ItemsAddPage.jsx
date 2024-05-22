import React, { useState } from "react";
import Header from "../components/context/Header";
import InputItem from "../components/ItemsAddPage/InputItem";

const AddItemPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  return (
    <div>
      <Header />
      <form>
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
        <InputItem
          id="tags"
          label="태그"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력해주세요"
        />
      </form>
    </div>
  );
};

export default AddItemPage;
