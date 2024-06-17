import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import styles from "@/styles/sign.module.css";
import Link from "next/link";
import Input from "@/components/sign/Input";
import Label from "@/components/sign/Label";
import Button from "@/components/sign/SignButton";
import EasyLogin from "@/components/sign/EasyLogin";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthProvider";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user, login } = useAuth(true);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { email, password } = values;
    await login({ email, password });
    router.push("/");
  }
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);
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
      <form className={styles.form} onSubmit={handleSubmit}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요"
          value={values.email}
          onChange={handleChange}
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={values.password}
          onChange={handleChange}
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

export default Login;
