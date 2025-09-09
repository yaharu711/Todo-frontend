import React from "react";
import styles from "./Textarea.module.css";

type Props = {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent) => void;
  errorMessage?: string;
  style?: object;
  containerStyle?: object;
  autoFocus?: boolean;
  autoResize?: boolean;
  minRows?: number;
  maxHeight?: number; // px 指定
};

const Textarea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  onKeyDown,
  onBlur,
  errorMessage,
  style,
  containerStyle, // labelで囲っているからそのlabelに対してスタイルを当てたい場合に使う
  autoFocus,
  autoResize = false,
  minRows = 1,
}: Props) => {
  return (
    <label className={styles.wrapp_input} style={containerStyle}>
      {label}
      <textarea
        className={styles.input}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        rows={autoResize ? minRows : undefined}
        style={{
          ...(style || {}),
          ...(autoResize ? { minHeight: 0 } : {}),
        }}
        autoFocus={autoFocus}
      />
      <span className={styles.input_error}>{errorMessage}</span>
    </label>
  );
};

export default Textarea;
