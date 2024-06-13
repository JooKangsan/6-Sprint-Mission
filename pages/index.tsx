import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <p>
          일상의 모든 물건을
          <br /> 거래해보세요
        </p>
        <button>구경하러 가기</button>
        <Image src="/Img/logo.svg" width={996} height={447} alt="로고" />
      </div>
      <div>
        <div>
          <Image src="/Img/logo.svg" width={588} height={444} alt="로고" />
          <span>HotItem</span>
          <p>
            인기상품을 <br />
            확인 해 보세요
          </p>
          <p>
            가장 HOT한 중고거래 물품을
            <br />
            판다 마켓에서 확인해 보세요
          </p>
        </div>
        <div>
          <Image src="/Img/logo.svg" width={588} height={444} alt="로고" />
          <span>search</span>
          <p>
            구매를 원하는 <br />
            상품을 검색하세요
          </p>
          <p>
            구매하고 싶은 물픔은 검색해서
            <br />
            쉽게 찾아보세요
          </p>
        </div>
        <div>
          <Image src="/Img/logo.svg" width={588} height={444} alt="로고" />
          <span>register</span>
          <p>
            판매를 원하는 <br />
            상품을 등록하세요
          </p>
          <p>
            어떤 물건이든 판매하고 싶은 상품을
            <br />
            쉽게 등록하세요
          </p>
        </div>
      </div>
      <div>
        <p>
          믿을수 있는
          <br />
          판다마켓 중고거래
        </p>
        <Image src="/Img/logo.svg" width={996} height={447} alt="로고" />
      </div>
    </>
  );
}
