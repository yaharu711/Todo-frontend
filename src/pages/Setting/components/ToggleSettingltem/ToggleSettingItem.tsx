import ToggleButton from "../../../../components/ToggleButton";
import styles from "./ToggleSettingItem.module.css";

type Props = {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const ToggleSettingItem = ({
  title,
  description = "",
  checked,
  onChange,
  disabled = false,
}: Props) => {
  return (
    <div className={styles.toggle_container}>
      <div className={styles.left}>
        <p className={styles.toggle_label}>{title}</p>
        <p className={styles.toggle_description}>{description}</p>
      </div>
      <ToggleButton checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  );
};

export default ToggleSettingItem;
