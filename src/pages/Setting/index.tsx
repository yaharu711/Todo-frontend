import styles from "./index.module.css";
import SettingHeader from "./components/SettingHeader/SettingHeader";
import WebNotificationSettingItem from "./components/WebNotificationSettingItem/WebNotificationSettingItem";

const SettingPage = () => {
  return (
    <div className={styles.settings_container}>
      <SettingHeader />
      <div className={styles.settings_section}>
        <h2 className={styles.section_title}>通知の設定</h2>
        <WebNotificationSettingItem />
      </div>
    </div>
  );
};

export default SettingPage;
