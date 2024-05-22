import React from "react";

const InputItem = ({ id, label, value, onChange, placeholder, textArea }) => {
  return (
    <div>
      {label}
      {textArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputItem;
