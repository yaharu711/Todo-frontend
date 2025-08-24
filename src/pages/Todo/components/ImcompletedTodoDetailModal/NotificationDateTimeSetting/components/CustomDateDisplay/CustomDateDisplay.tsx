import React from "react";
import styles from "./CustomDateDisplay.module.css";

// カスタム表示用コンポーネントの型定義
type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

// カスタムコンポーネント：<input> の代わりに <span> を使い、普通のテキスト表示にする
const CustomDateDisplay = React.forwardRef<HTMLSpanElement, CustomInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <span ref={ref} onClick={onClick} className={styles.customDateDisplay}>
        {value || "日時を選択"}
      </span>
    );
  }
);

export default CustomDateDisplay;
