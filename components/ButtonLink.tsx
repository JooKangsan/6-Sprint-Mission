import Link from "next/link";
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonLinkProps {
  href: string;
  className?: string;
  children?: ReactNode;
}
export default function ButtonLink({
  href,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${styles.button} ${className}`} {...props} />
  );
}
