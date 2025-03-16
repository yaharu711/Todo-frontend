import { useState } from "react";
import ToggleButton from "../../../../components/ToggleButton";
import styles from "./ToggleSettingItem.module.css";

type Props = {
  title: string;
  description?: string;
};

const ToggleSettingItem = ({ title, description = "" }: Props) => {
  const [on, setON] = useState(false);
  return (
    <div className={styles.toggle_container}>
      <div>
        <p className={styles.toggle_label}>{title}</p>
        <p className={styles.toggle_description}>{description}</p>
      </div>
      <ToggleButton checked={on} onChange={() => setON((prev) => !prev)} />
    </div>
  );
};

export default ToggleSettingItem;
