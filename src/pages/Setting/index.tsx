import styles from "./index.module.css";
import ToggleSettingItem from "./components/ToggleSettingltem/ToggleSettingItem";
import SettingHeader from "./components/SettingHeader/SettingHeader";

const SettingPage = () => {
  return (
    <div className={styles.settings_container}>
      <SettingHeader />
      <div className={styles.settings_section}>
        <h2 className={styles.section_title}>通知の設定</h2>
        <ToggleSettingItem
          title="ブラウザ通知"
          description="ブラウザの通知機能のON/OFFできます"
        />
      </div>
    </div>
  );
};

export default SettingPage;
