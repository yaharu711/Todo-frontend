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

  return {
    isNotificationEnabled,
    isSupportedBrowser,
    onChangeToggle,
    isDisabledToggle,
    isDeniedPermission,
  };
};

export default WebNotificationSettingItemViewModel;
