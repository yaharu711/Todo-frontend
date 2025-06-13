import { ReactNode } from "react";
import styles from "./IconButtonWithLabel.module.css";

export type Props = {
  onClick?: () => void;
  iconComponent: ReactNode;
  label: string;
};

const IconButtonWithLabel = ({ onClick, iconComponent, label }: Props) => {
  return (
    <button className={styles.menu_item} onClick={onClick}>
      {iconComponent}
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default IconButtonWithLabel;
