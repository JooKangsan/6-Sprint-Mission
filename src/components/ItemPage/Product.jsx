import React, { useEffect, useState } from "react";
import search from "../../assets/img/search.svg";
import { Link } from "react-router-dom";
import Items from "./Items";
import './Product.css';
import { getProducts }  from '../../api';

const getPageSize = () => {
  return window.innerWidth < 768 ? 4 :  window.innerWidth < 1200 ? 6 : 10
};
const Product = () => {
  const [itemList, setItemList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const SortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };


    window.addEventListener("resize", handleResize);
    SortedData({ orderBy: "favorite", pageSize });

  }, [pageSize]);
  return (
    <>
    <div className="Product">
      <h1 className="Title">전체 상품</h1>
      <div className="ProductBar">
        <div className="searchBar">
          <img src={search} alt="검색버튼" className="searchImg" />
          <input className="searchInput" placeholder="검색할 상품을 입력해 주세요" />
        </div>
        <Link to="/additem" className="loginLink button">
          상품 등록하기
        </Link>
        <select>
          <option>최신순</option>
          <option>좋아요순</option>
        </select>
        </div>
    </div>
    <div className="Item">
    {itemList?.map((item) => (
          <Items item={item} key={`best-item-${item.id}`} />
        ))}
    </div>
    </>
  );
};

export default Product;
