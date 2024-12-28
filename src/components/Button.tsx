import React, { ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  children: string | ReactNode;
  style?: object;
};

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  type = "button",
  onClick,
  children,
}) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
