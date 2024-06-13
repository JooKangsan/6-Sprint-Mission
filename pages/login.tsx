import React from "react";
import Image from "next/image";
import styles from "@/styles/Login.module.css";
import Link from "next/link";
import Input from "@/components/sign/Input";
import Label from "@/components/sign/Label";
import Button from "@/components/Button";

function login() {
  return (
    <>
      <div>
        <Link href="/">
          <Image
            src="/Img/logo/panda-logo_login.svg"
            width={396}
            height={132}
            alt="판다마켓 로고"
          />
        </Link>
      </div>
      <form className={styles.Form}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
        />
        <Button className={styles.Button}>로그인</Button>
        <div>
          회원이 아니신가요? <Link href="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default login;
