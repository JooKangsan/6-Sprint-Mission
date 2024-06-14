import React from "react";
import styles from "./Banner.module.css";
import Image from "next/image";
import Link from "next/link";

interface logo {
  isButton?: Boolean;
  text1: string;
  text2: string;
  src: string;
  alt: string;
}

function Banner({ isButton, text1, text2, src, alt }: logo) {
  return (
    <div className={styles.banner}>
      <div className={styles.banner_inner}>
        <div className={styles.banner_inner__text}>
          <p>
            {text1} <br className={styles.br} />
            {text2}
          </p>
          {isButton && (
            <Link href="/items">
              <button className={styles.banner_inner__button}>
                구경하러 가기
              </button>
            </Link>
          )}
        </div>
        <Image
          className={styles.banner_inner__img}
          src={src}
          width={996}
          height={447}
          alt={alt}
        />
      </div>
    </div>
  );
}

export default Banner;
