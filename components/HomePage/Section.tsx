import React from "react";
import Image from "next/image";

interface section {
  badge: string;
  title1: string;
  title2: string;
  content1: string;
  content2: string;
  src: string;
  alt: string;
}

function Section({badge,title1,title2,content1,content2,src,alt}:section) {
  return (
    <div>
      <Image
        src={src}
        width={588}
        height={444}
        alt={alt}
      />
      <div>
        <span>{badge}</span>
        <p>
          {title1}
          <br />
          {title2}
        </p>
        <p>
          {content1}
          <br />
          {content2}
        </p>
      </div>
    </div>
  );
}

export default Section;
