import { ClipLoader } from "react-spinners";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import styles from "./ToggleSettingItem.module.css";

type Props = {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isPendingForToggleButton?: boolean;
};

const ToggleSettingItem = ({
  title,
  description = "",
  checked,
  onChange,
  disabled = false,
  isPendingForToggleButton = false,
}: Props) => {
  return (
    <div className={styles.toggle_container}>
      <div className={styles.left}>
        <p className={styles.toggle_label}>{title}</p>
        <p className={styles.toggle_description}>{description}</p>
      </div>
      {isPendingForToggleButton ? (
        <ClipLoader size={25} color="rgba(255, 255, 255, 0.9)" />
      ) : (
        <ToggleButton
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default ToggleSettingItem;
