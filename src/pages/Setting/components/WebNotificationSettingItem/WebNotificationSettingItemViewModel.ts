import useFCMNotification from "../../useFCMNotification";

const WebNotificationSettingItemViewModel = () => {
  const {
    registFCMToken,
    unRegisterFCMToken,
    isNotificationEnabled,
    isSupportedBrowser,
    isDeniedPermission,
  } = useFCMNotification();
  const onChangeToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      await registFCMToken();
    } else {
      await unRegisterFCMToken();
    }
  };

  const isDisabledToggle = !isSupportedBrowser || isDeniedPermission;

  // descriptionは通知の権限などの状態によって動的に決まる
  let description = "ブラウザの通知機能のON/OFFできます"; // デフォルト

  if (isDeniedPermission) {
    description =
      "この機能を使うにはブラウザの通知の権限をデフォルトにリセットしてから、再度ONにしてください";
  } else if (!isSupportedBrowser) {
    description =
      "申し訳ありません、まだこの端末では使えません。対応端末はPCとなります。";
  }

  return {
    isNotificationEnabled,
    isSupportedBrowser,
    onChangeToggle,
    isDisabledToggle,
    isDeniedPermission,
    description,
  };
};

export default WebNotificationSettingItemViewModel;
