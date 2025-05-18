import ToggleSettingItem from "../ToggleSettingltem/ToggleSettingItem";
import WebNotificationSettingItemViewModel from "./WebNotificationSettingItemViewModel";

const WebNotificationSettingItem = () => {
  const {
    isNotificationEnabled,
    onChangeToggle,
    isDisabledToggle,
    description,
  } = WebNotificationSettingItemViewModel();
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
