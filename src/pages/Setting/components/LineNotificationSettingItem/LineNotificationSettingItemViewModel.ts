import { useSwitchLineNotificationStatus } from "../../../../api/Line/hooks";
import { showSuccessToast } from "../../../../util/CustomToast";

const LineNotificationSettingItemViewModel = (isLineBotFriend: boolean) => {
  const { mutate } = useSwitchLineNotificationStatus();
  const onChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.checkedをLINE通知のON/OFFに反映させるAPIを呼び出す
    mutate(e.target.checked, {
      onSuccess: () => {
        if (e.target.checked) {
          showSuccessToast("LINE通知をOFFにしました✅");
        } else {
          showSuccessToast("LINE通知をONにしました✅");
        }
      },
    });
  };

  return {
    // LINE通知のON/OFFの状態を取得するAPIを呼び出す
    onChangeToggle,
    description: isLineBotFriend
      ? "LINEの通知機能のON/OFFできます"
      : "LINEの連携が完了すると、設定できます",
  };
};
export default LineNotificationSettingItemViewModel;
