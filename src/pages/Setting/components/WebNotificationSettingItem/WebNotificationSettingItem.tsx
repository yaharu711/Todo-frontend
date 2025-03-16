import ToggleSettingItem from "../ToggleSettingltem/ToggleSettingItem";
import WebNotificationSettingItemViewModel from "./WebNotificationSettingItemViewModel";

const WebNotificationSettingItem = () => {
  const {
    isNotificationEnabled,
    isSupportedBrowser,
    onChangeToggle,
    isDisabledToggle,
    isDeniedPermission,
  } = WebNotificationSettingItemViewModel();

  // descriptionの動的な決定
  let description = "ブラウザの通知機能のON/OFFできます"; // デフォルト

  if (isDeniedPermission) {
    description =
      "この機能を使うにはブラウザの通知の権限をデフォルトにリセットしてから、再度ONにしてください";
  } else if (!isSupportedBrowser) {
    description =
      "申し訳ありません、まだこの端末では使えません。対応端末はPCとなります。";
  }

  // isDeniedの時→ブラウザの通知の権限をデフォルトにリセットしてから、再度ONにしてください
  // !isSupportedの時→ まだこのブラウザではブラウザ通知機能は使えません
  // 上記以外はブラウザの通知機能のON/OFFできます
  return (
    <ToggleSettingItem
      title="ブラウザ通知"
      description={description}
      checked={isNotificationEnabled}
      onChange={onChangeToggle}
      disabled={isDisabledToggle}
    />
  );
};

export default WebNotificationSettingItem;
