import {
  useCheckLineBotFriend,
  useGetLineNotificationStatus,
} from "../../api/Line/hooks";

const useSettingPageViewModel = () => {
  const {
    data: lineBotFriend,
    isPending: isPendingForcheckLineBotFriend,
    error,
  } = useCheckLineBotFriend();
  // 取得系のエラーはとりあえず投げる
  if (error) throw error;
  const {
    data: lineNotificationStatus,
    isPending: isPendingForLineNotificationStatus,
  } = useGetLineNotificationStatus();

  return {
    isLineBotFriend: lineBotFriend?.friend_flag,
    isPendingForcheckLineBotFriend,
    isPendingForLineNotificationStatus,
    isNotificationEnabled: lineNotificationStatus?.is_notification,
  };
};

export default useSettingPageViewModel;
