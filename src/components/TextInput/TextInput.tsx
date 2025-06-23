import React from "react";
import styles from "./TextInput.module.css";

type TextInputProps = {
  label?: string;
  placeholder?: string;
  name: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent) => void;
  errorMessage?: string;
  style?: object;
  autoFocus?: boolean;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  onKeyDown,
  onBlur,
  errorMessage,
  style,
  autoFocus,
  type = "text",
}) => {
  return (
    <label className={styles.wrapp_input}>
      {label}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        autoFocus={autoFocus}
        style={style}
      />
      <span className={styles.input_error}>{errorMessage}</span>
    </label>
  );
};

export default TextInput;
