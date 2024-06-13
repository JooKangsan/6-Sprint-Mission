import React from "react";
import Image from "next/image";

interface logo {
  text1: string;
  text2: string;
  src: string;
  alt: string;
}

function Banner({ text1, text2, src, alt }: logo) {
  return (
    <div>
      <div>
        <p>
          {text1} <br />
          {text2}
        </p>
        <button>구경하러 가기</button>
      </div>
      <Image src={src} width={996} height={447} alt={alt} />
    </div>
  );
}

export default Banner;
