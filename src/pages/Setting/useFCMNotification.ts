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
  const { data: isExistValidFCMToken } = useCheckExistValidFCMToken();
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

      setIsNotificationEnabled(
        Notification.permission === "granted" && isExistValidFCMToken
      );
      setIsDeniedPermission(Notification.permission === "denied");
    };

    initialize();
  }, [isExistValidFCMToken]);

  const { mutate: saveFCMTokenMutate } = useSaveFCMToken();
  const { mutate: invalidateLatestFCMTokenMutate } =
    useInvalidateLatestFCMToken();
  const registFCMToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("通知の許可がされていません");
      return;
    }

    const FCMToken = await getFCMToken();
    if (FCMToken === null) {
      console.error("FCMがサポートされていないか、まだ初期化されていません。");
      return;
    }
    saveFCMTokenMutate({ fcm_token: FCMToken });
    setIsNotificationEnabled(true);
    showSuccessToast("通知機能をオンにしました✅");
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
    invalidateLatestFCMTokenMutate();
    setIsNotificationEnabled(false);
    showSuccessToast("通知機能をオフにしました✅");
  };

  // Service Workerを更新した時や通知権限がgrantedなのにFCMトークンない場合の再発行など(deniedにして権限リセットではなく、grantedに戻した時とか)
  // TODO: トークンの更新は、ユーザにやらせるようにすれば良さそう！
  // 通知の許可・拒否の状態をpermissionとLaravel APIでトークンの存在有無によって決める
  // そうすれば、grantedでトークンがない時は通知設定がOFFになるので、ユーザがONにすればgetFCMToken()で再発行して保存できる！
  const updateFCMToken = async () => {
    try {
      const FCMToken = await getFCMToken();
      console.log(FCMToken);
    } catch (error) {
      // deniedしている場合は例外がはかれるので、キャッチしてアクションする
      console.error(error);
      toast(
        "通知の権限をリセットしてリロードしてください。そして、再度通知のアイコンをクリックして通知を許可してください"
      );
    }
  };

  return {
    registFCMToken,
    unRegisterFCMToken,
    updateFCMToken,
    isNotificationEnabled,
    isSupportedBrowser,
    isDeniedPermission,
  };
};

export default useFCMNotification;
