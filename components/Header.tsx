import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/Header.module.css";
import { useAuth } from "@/context/AuthProvider";

function Header() {
  const { user } = useAuth(true);

  return (
    <div className={styles.Container}>
      <div className={styles.InnerContainer}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/Img/logo/panda-logo.svg"
            width={152}
            height={68}
            alt="로고"
          />
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
      {user ? (
        <div className={styles.isUser}>
          <Link href="/mypage">
            <Image
              className={styles.user}
              src="/Img/icons/user.svg"
              width={40}
              height={40}
              alt="유저이미지"
            />
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            로그아웃
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Header;
