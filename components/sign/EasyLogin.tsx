import Image from "next/image";
import styles from "./EasyLogin.module.css";

function Img({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Image src={src} alt={alt} width={42} height={42} />
    </a>
  );
}

function EasyLogin() {
  return (
    <div className={styles.Container}>
      <p>간편 로그인하기</p>
      <div>
        <Img
          href="https://google.com"
          src="/Img/icons/google.svg"
          alt="페이스북"
        />
        <Img
          href="https://kakao.com"
          src="/Img/icons/kakao.svg"
          alt="트위터"
        />
      </div>
    </div>
  );
}

export default EasyLogin;
