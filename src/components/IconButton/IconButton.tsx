import { ReactNode, forwardRef, ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = {
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, type = "button", style, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={styles.button}
        type={type}
        style={style}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

//forwardRefを使っている場合、displayNameを設定しないとDevToolsでコンポーネント名が表示されないため
IconButton.displayName = "IconButton";

export default IconButton;
