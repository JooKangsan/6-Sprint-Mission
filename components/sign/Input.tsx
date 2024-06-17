import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />;
}

export default Input;
