import React, { useEffect, useState } from 'react';
import Items from './Items';
import './BestProduct.css';
import { getProducts }  from '../../../api';

const getPageSize = () => {
  return window.innerWidth < 768 ? 1 :  window.innerWidth < 1280 ? 2 : 4
};
const BestProduct = () => {
  
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
      <div className="bestProduct">
      <h1 className="Title">베스트 상품</h1>
      <div className="bestItems">
      {itemList?.map((item) => (
          <Items item={item} key={`${item.id}`} />
        ))}
      </div>
    </div>
  );
};

export default BestProduct;