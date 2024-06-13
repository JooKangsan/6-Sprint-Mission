import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/HomePage/Banner";
import Section from "@/components/HomePage/Section";
import Footer from "@/components/HomePage/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>판다마켓</title>
        <link rel="icon" href="/Img/icons/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Banner
          isButton
          text1="일상의 모든 물건을"
          text2="거래해 보세요"
          src="/Img/main/panda-1.png"
          alt="로고"
        />
        <div className={styles.section}>
          <Section
            badge="HotItem"
            title1="인기 상품을"
            title2="확인 해 보세요"
            content1="가장 HOT한 중고거래 물품을"
            content2="판다마켓에서 확인해보세요"
            src="/Img/main/main-img-1.png"
            alt="판다마켓"
          />
          <Section
            flex_reverse
            badge="search"
            title1="구매를 원하는"
            title2="상품을 검색하세요"
            content1="구매하고 싶은 물픔은 검색해서"
            content2="쉽게 찾아보세요"
            src="/Img/main/main-img-2.png"
            alt="판다마켓"
          />
          <Section
            badge="register"
            title1="판매를 원하는"
            title2="상품을 등록하세요"
            content1="어떤 물건이든 판매하고 싶은 상품을"
            content2="쉽게 등록하세요"
            src="/Img/main/main-img-3.png"
            alt="판다마켓"
          />
        </div>
        <Banner
          text1="믿을 수 있는"
          text2="판다마켓 중고거래"
          src="/Img/main/panda-1.png"
          alt="로고"
        />
        <Footer />
      </div>
    </>
  );
}
