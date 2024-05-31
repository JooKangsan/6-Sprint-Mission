import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import logo from "../public/logo.svg";
import user from "../public/user.svg";
function Header() {
  return (
    <div className={styles.Container}>
      <div className={styles.InnerContainer}>
        <Link href="/">
          <Image className={styles.logo} src={logo} alt="로고" />
        </Link>
        <div className={styles.selectBox}>
          <Link href="/Boards" className={styles.box}>
            <span>자유게시판</span>
          </Link>
          <Link href="/items" className={styles.user}>
            <span>중고마켓</span>
          </Link>
        </div>
      </div>
      <Link href="/mypage">
        <Image className={styles.user} src={user} alt="유저이미지" />
      </Link>
    </div>
  );
}

export default Header;
