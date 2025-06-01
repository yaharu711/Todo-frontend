import { ClipLoader } from "react-spinners";
import ToggleSettingItem from "../ToggleSettingltem/ToggleSettingItem";
import LineNotificationSettingItemViewModel from "./LineNotificationSettingItemViewModel";

const LineNotificationSettingItem = ({
  isLineBotFriend,
}: {
  isLineBotFriend: boolean;
}) => {
  const {
    isPendingForGetLineNotificationStatus,
    isNotificationEnabled,
    onChangeToggle,
    description,
  } = LineNotificationSettingItemViewModel(isLineBotFriend);

  if (
    isNotificationEnabled === undefined ||
    isPendingForGetLineNotificationStatus
  ) {
    return <ClipLoader size={25} color="rgba(255, 255, 255, 0.9)" />;
  }
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
