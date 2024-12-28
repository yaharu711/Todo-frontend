import { ReactNode } from "react";
import styles from "./IconButton.module.css";

export type IconButtonProps = {
  onClick: () => void;
  children: ReactNode;
};
const IconButton = ({ onClick, children }: IconButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
