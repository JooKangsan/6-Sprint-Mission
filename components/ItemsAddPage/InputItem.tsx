import React, { ChangeEvent, KeyboardEvent } from "react";
import styles from "./InputItem.module.css";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  textArea?: boolean;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputItem = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  textArea,
  onKeyDown,
}: Props) => {
  return (
    <div>
      <div className={styles.Label}>{label}</div>
      {textArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.textStyle}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={styles.InputStyle}
        />
      )}
    </div>
  );
};

export default InputItem;
