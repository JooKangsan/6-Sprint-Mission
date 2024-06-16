import React, { useState, ChangeEvent } from "react";
import styles from "./FileInput.module.css";
import Image from "next/image";

function FileInput({ title }: { title: string }) {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleDivClick = () => {
    const inputElement = document.getElementById(
      "imageUpload"
    ) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  };
  const handleImgUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imgUrl);
    }
  };

  const newLocal = "다운받은 이미지";
  return (
    <div>
      {title && <div className={styles.Label}>{title}</div>}
      <div className={styles.ImageUploadContainer}>
        <div className={styles.ImgContainer} onClick={handleDivClick}>
          <Image
            src="/Img/icons/Plus.svg"
            width={48}
            height={48}
            alt="플러스 아이콘"
          />
          이미지 등록
        </div>
        <input
          className={styles.ImgUpload}
          id="imageUpload"
          type="file"
          onChange={handleImgUpload}
        />
        {imagePreviewUrl && (
          <Image
            className={styles.imagePreviewUrl}
            src={imagePreviewUrl}
            width={200}
            height={200}
            alt={newLocal}
          />
        )}
      </div>
    </div>
  );
}

export default FileInput;
