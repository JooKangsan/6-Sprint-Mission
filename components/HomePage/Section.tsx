import React from "react";
import Image from "next/image";
import styles from "./Section.module.css";

interface section {
  flex_reverse?: boolean;
  badge: string;
  title1: string;
  title2: string;
  content1: string;
  content2: string;
  src: string;
  alt: string;
}

function Section({
  flex_reverse,
  badge,
  title1,
  title2,
  content1,
  content2,
  src,
  alt,
}: section) {
  return (
    <div
      className={flex_reverse ? styles.sectionReverse : styles.section_inner}
    >
      <Image src={src} width={588} height={444} alt={alt} />
      <div className={styles.section_inner__text}>
        <span className={styles.badge}>{badge}</span>
        <p className={styles.section_inner__title}>
          {title1}
          <br className={styles.br} />
          {title2}
        </p>
        <p className={styles.section_inner__content}>
          {content1}
          <br />
          {content2}
        </p>
      </div>
    </div>
  );
}

export default Section;
