import styles from "./SignButton.module.css";

function SignButton({ text, isable }: { text: string; isable: boolean }) {
  return (
    <button className={isable ? styles.button_active : styles.button_disable}>
      {text}
    </button>
  );
}

export default SignButton;
