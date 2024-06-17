import Image from "next/image";
import React, { useState } from "react";
import styles from "./AddImage.module.css";

function AddImage() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl: string = URL.createObjectURL(file);
      console.log(imageUrl);
      setImagePreviewUrl(imageUrl);
    }
  };
  
  return (
    <div className={styles.Container}>
      <div className={styles.AddContainer}>
        <label className={styles.plusButton} htmlFor="image">
          <Image src="/Img/icons/Plus.svg" width={48} height={48} alt="plus 버튼" />
          이미지 등록
        </label>
      </div>
      <input
        className={styles.inputFile}
        id="image"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />

      {imagePreviewUrl && (
          <Image
            src={imagePreviewUrl}
            width={282}
            height={282}
            alt="plus 버튼"
            className={styles.imagePreviewUrl}
          />
      )}
    </div>
  );
}

export default AddImage;
