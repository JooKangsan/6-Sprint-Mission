import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import InputItem from "./InputItem";
import styles from "./TagInput.module.css";
import Image from "next/image";

interface TagInputProps {
  tags: string[];
  addTag: (tag: string) => void;
}

function TagInput({ tags, addTag }: TagInputProps) {
  const [input, setInput] = useState<string>("");

  const onPressEnter = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.nativeEvent.isComposing) return;
    const inputStr = input.trim();
    if (event.key === "Enter" && inputStr) {
      event.preventDefault();
      addTag(inputStr);
      setInput("");
    }
  };

  return (
    <div>
      <InputItem
        id="tags"
        label="태그"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해주세요"
      />
      {tags.length > 0 && (
        <div className={styles.tagsSection}>
          {tags.map((tag) => (
            <div className={styles.tagsLayOut} key={`tag-${tag}`}>
              <span className={styles.TagContents}>{tag}</span>
              <div className={styles.xIcon}>
                <Image
                  src="/Img/icons/xicon.svg"
                  width={8}
                  height={8}
                  alt="삭제 아이콘"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TagInput;
