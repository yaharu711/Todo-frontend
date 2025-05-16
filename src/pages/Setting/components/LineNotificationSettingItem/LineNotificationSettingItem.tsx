import ToggleSettingItem from "../ToggleSettingltem/ToggleSettingItem";
import LineNotificationSettingItemViewModel from "./LineNotificationSettingItemViewModel";

const LineNotificationSettingItem = () => {
  const {
    isNotificationEnabled,
    onChangeToggle,
    isDisabledToggle,
    description,
  } = LineNotificationSettingItemViewModel();
  return (
    <ToggleSettingItem
      title="LINE通知"
      description={description}
      checked={isNotificationEnabled}
      onChange={onChangeToggle}
      disabled={isDisabledToggle}
    />
  );
};
export default LineNotificationSettingItem;
