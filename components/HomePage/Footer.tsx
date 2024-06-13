import React from "react";
import Image from "next/image";

function Img({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Image src={src} alt={alt} width={20} height={20} />
    </a>
  );
}

function Footer() {
  return (
    <div>
      <p>@codeit-2024</p>
      <p>Privacy Policy / FAQ</p>
      <div>
        <Img
          href="https://facebook.com"
          src="/Img/icons/facebook.svg"
          alt="페이스북"
        />
        <Img
          href="https://twitter.com"
          src="/Img/icons/twitter.svg"
          alt="트위터"
        />
        <Img
          href="https://youtube.com"
          src="/Img/icons/youtube.svg"
          alt="유튜브"
        />
        <Img
          href="https://instagram.com"
          src="/Img/icons/insta.svg"
          alt="인스타그램"
        />
      </div>
    </div>
  );
}

export default Footer;
