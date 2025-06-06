import { toast } from "react-toastify";
import { getFCMToken, messaging } from "../../api/client/firebase";
import { useEffect, useState } from "react";
import { deleteToken, isSupported } from "firebase/messaging";
import { showSuccessToast } from "../../util/CustomToast";
import {
  useCheckExistValidFCMToken,
  useInvalidateLatestFCMToken,
  useSaveFCMToken,
} from "../../api/FCM/hooks";

const useFCMNotification = () => {
  const {
    data: isExistValidFCMToken,
    isPending: isPendingForCheckIsExistValidFCMToken,
  } = useCheckExistValidFCMToken();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState<
    boolean | null
  >(null);
  const [isDeniedPermission, setIsDeniedPermission] = useState<boolean>(false);
  const [isSupportedBrowser, setIsSupportedBrowser] = useState<boolean>(false);

  // どうしてもisSupported()で確認が必要なので、非同期になり、useStateにセットするにはuseEffectを使うしかないかな
  useEffect(() => {
    const initialize = async () => {
      const supported = await isSupported();
      setIsSupportedBrowser(supported);
      if (!supported) {
        setIsNotificationEnabled(false);
        return;
      }
      setIsDeniedPermission(Notification.permission === "denied");
      if (
        isPendingForCheckIsExistValidFCMToken ||
        isExistValidFCMToken === undefined
      ) {
        return;
      }
      setIsNotificationEnabled(
        Notification.permission === "granted" && isExistValidFCMToken
      );
    };

    initialize();
  }, [isExistValidFCMToken, isPendingForCheckIsExistValidFCMToken]);

  const { mutate: saveFCMTokenMutate } = useSaveFCMToken();
  const { mutate: invalidateLatestFCMTokenMutate } =
    useInvalidateLatestFCMToken();
  const registFCMToken = async () => {
    // public配下のService Workerを明示的に登録
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("通知の許可がされていません");
      return;
    }

    const FCMToken = await getFCMToken(registration);
    if (FCMToken === null) {
      console.error("FCMがサポートされていないか、まだ初期化されていません。");
      return;
    }
    saveFCMTokenMutate(
      { fcm_token: FCMToken },
      {
        onSuccess: () => {
          setIsNotificationEnabled(true);
          showSuccessToast("通知機能をオンにしました✅");
        },
      }
    );
  };

  // これにより、Service Workerに紐づくトークンはFirebaes上からは削除される
  // つまり、APIからPushリクエストしても404が返ってくるようになる
  const unRegisterFCMToken = async () => {
    if (!isSupportedBrowser || messaging === null) {
      toast("まだ通知機能が使えないブラウザです");
      return;
    }
    const result = await deleteToken(messaging);
    if (result === false) {
      toast.error(
        "通知をOFFにできませんでした。予期せぬエラーのため開発者に問い合わせてください",
        {
          progressStyle: {
            background:
              "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
          },
        }
      );
      return;
    }
    invalidateLatestFCMTokenMutate(undefined, {
      onSuccess: () => {
        setIsNotificationEnabled(false);
        showSuccessToast("通知機能をオフにしました✅");
      },
    });
  };

  return {
    registFCMToken,
    unRegisterFCMToken,
    isNotificationEnabled,
    isSupportedBrowser,
    isDeniedPermission,
  };
};

export default useFCMNotification;
