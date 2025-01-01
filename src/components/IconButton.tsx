import { ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};
const IconButton = ({ onClick, disabled, children }: IconButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default IconButton;
