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

  // descriptionは通知の権限などの状態によって動的に決まる
  let description = "ブラウザの通知機能のON/OFFできます"; // デフォルト

  if (isDeniedPermission) {
    description =
      "この機能を使うにはブラウザの通知の権限をデフォルトにリセットしてから、再度ONにしてください";
  } else if (!isSupportedBrowser) {
    description =
      "申し訳ありません、まだこの端末では使えません。対応端末はPCとなります。";
  }

  // isNotificationEnabledの状態が確定していない時はトグルを表示しない
  // →トグルが表示された後に、操作もしていないのに変化したらユーザに混乱を与えるため
  if (isNotificationEnabled === null) return <p>...loading</p>;

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
