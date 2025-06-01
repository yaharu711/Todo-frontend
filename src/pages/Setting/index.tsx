import styles from "./index.module.css";
import SettingHeader from "./components/SettingHeader/SettingHeader";
import WebNotificationSettingItem from "./components/WebNotificationSettingItem/WebNotificationSettingItem";
import LineNotificationSettingItem from "./components/LineNotificationSettingItem/LineNotificationSettingItem";
import LineBotSettingItem from "./components/LineLoginSettingItem/LineBotSettingItem";
import useSettingPageViewModel from "./SettingPageViewModel";
import { ClipLoader } from "react-spinners";

const SettingPage = () => {
  const {
    isLineBotFriend,
    isPendingForcheckLineBotFriend,
    isNotificationEnabled,
    isPendingForLineNotificationStatus,
  } = useSettingPageViewModel();

  return (
    <div className={styles.settings_container}>
      <SettingHeader />
      <div className={styles.settings_section}>
        <h2 className={styles.section_title}>通知の設定</h2>
        <WebNotificationSettingItem />
        {isPendingForcheckLineBotFriend ||
        isLineBotFriend === undefined ||
        isPendingForLineNotificationStatus ||
        isNotificationEnabled === undefined ? (
          <ClipLoader size={25} color="rgba(255, 255, 255, 0.9)" />
        ) : (
          <LineNotificationSettingItem
            isLineBotFriend={isLineBotFriend}
            isNotificationEnabled={isNotificationEnabled}
          />
        )}
      </div>
      <div className={styles.settings_section}>
        <h2 className={styles.section_title}>LINE連携</h2>
        {isPendingForcheckLineBotFriend || isLineBotFriend === undefined ? (
          <ClipLoader size={25} color="rgba(255, 255, 255, 0.9)" />
        ) : (
          <LineBotSettingItem isLineBotFriend={isLineBotFriend} />
        )}
      </div>
    </div>
  );
};

export default SettingPage;
