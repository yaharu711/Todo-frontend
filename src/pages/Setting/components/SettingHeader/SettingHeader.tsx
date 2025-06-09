import styles from "./SettingHeader.module.css";
import BackButton from "../../../../components/BackButton";

const SettingHeader = () => {
  return (
    <div className={styles.settings_header}>
      <BackButton />
    </div>
  );
};

export default SettingHeader;
