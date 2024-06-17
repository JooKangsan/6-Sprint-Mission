import Image from "next/image";
import styles from "@/styles/sign.module.css";
import Link from "next/link";
import Input from "@/components/sign/Input";
import Label from "@/components/sign/Label";
import Button from "@/components/sign/SignButton";
import EasyLogin from "@/components/sign/EasyLogin";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthProvider";
import axios from "@/pages/api/axios";

interface Register {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

function Register() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const router = useRouter();
  const { user, login } = useAuth(true);

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, nickname, password, passwordConfirmation } = values;

    let result;
    try {
      result = await axios.post("/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation,
      });
      await login({ email, password });
    } catch (e) {}
    // NOTE - 로그인 후 메인 페이지로 이동
    router.push("/");
  };

  useEffect(() => {
    if (user) {
      router.push("/myPage");
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
          onChange={handleInputChange}
          value={values.email}
        />
        <Label htmlFor="email">닉네임</Label>
        <Input
          id="nickname"
          name="nickname"
          type="nickname"
          placeholder="닉네임을 입력해 주세요"
          onChange={handleInputChange}
          value={values.nickname}
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          onChange={handleInputChange}
          value={values.password}
        />
        <Label htmlFor="passwordConfirmation">비밀번호 확인</Label>
        <Input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          onChange={handleInputChange}
          value={values.passwordConfirmation}
        />
        <Button isable={false} text="회원가입" />
        <EasyLogin />
        <div className={styles.link}>
          이미 회원이신가요?
          <Link href="/login" className={styles.text_decoration}>
            로그인하기
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
