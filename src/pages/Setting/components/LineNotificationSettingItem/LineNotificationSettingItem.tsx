import ToggleSettingItem from "../ToggleSettingltem/ToggleSettingItem";
import LineNotificationSettingItemViewModel from "./LineNotificationSettingItemViewModel";

const LineNotificationSettingItem = ({
  isLineBotFriend,
}: {
  isLineBotFriend: boolean;
}) => {
  const { isNotificationEnabled, onChangeToggle, description } =
    LineNotificationSettingItemViewModel(isLineBotFriend);

  return (
    <ToggleSettingItem
      title="LINE通知"
      description={description}
      checked={isNotificationEnabled}
      onChange={onChangeToggle}
      disabled={!isLineBotFriend}
    />
  );
};
export default LineNotificationSettingItem;
