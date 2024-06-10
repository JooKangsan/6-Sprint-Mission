import React, { useEffect, useMemo, useState } from "react";
import axios from "@/pages/api/axios";
import AddImage from "@/components/AddImage";
import styles from "@/styles/addboard.module.css";

function AddBoard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.top_header}>
        <h2 className={styles.title}>게시글 쓰기</h2>
        <button className={styles.addButton}>등록</button>
      </div>
      <div className={styles.interContainer}>
        <div>
          <h2 className={styles.text}>*제목</h2>
          <input
            className={styles.inputValue}
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h2 className={styles.text}>*내용</h2>
          <textarea
            className={styles.textArea}
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <h2 className={styles.text}>이미지</h2>
          <AddImage />
        </div>
      </div>
    </div>
  );
}

export default AddBoard;
