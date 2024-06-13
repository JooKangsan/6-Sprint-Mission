import React from "react";
import Image from "next/image";
import styles from "@/styles/sign.module.css";
import Link from "next/link";
import Input from "@/components/sign/Input";
import Label from "@/components/sign/Label";
import Button from "@/components/sign/SignButton";
import EasyLogin from "@/components/sign/EasyLogin";

function login() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image
          src="/Img/logo/panda-logo_login.svg"
          width={396}
          height={132}
          alt="판다마켓 로고"
        />
      </Link>
      <form className={styles.form}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
        />
        <Button isable={false} text="로그인" />
        <EasyLogin />
        <div className={styles.link}>
          판다 마켓이 처음이신가요? 
          <Link href="/register" className={styles.text_decoration}>
            회원가입하기
          </Link>
        </div>
      </form>
    </div>
  );
}

export default login;
