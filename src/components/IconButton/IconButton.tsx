import { ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  style?: React.CSSProperties;
};
const IconButton = ({
  onClick,
  disabled,
  children,
  style,
}: IconButtonProps) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default IconButton;
