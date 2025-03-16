import { toast } from "react-toastify";
import { getFCMToken, messaging } from "../../api/client/firebase";
import { useEffect, useState } from "react";
import { deleteToken, isSupported } from "firebase/messaging";
import { showSuccessToast } from "../../util/CustomToast";

const useFCMNotification = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] =
    useState<boolean>(false);
  const [isDeniedPermission, setIsDeniedPermission] = useState<boolean>(false);
  const [isSupportedBrowser, setIsSupportedBrowser] = useState<boolean>(false);

  // どうしてもisSupported()で確認が必要なので、非同期になり、useStateにセットするにはuseEffectを使うしかないかな
  useEffect(() => {
    const initialize = async () => {
      const supported = await isSupported();
      setIsSupportedBrowser(supported);
      if (!supported) return;
      // ここは、LaravelのAPIも作ってトークンが存在するかも確認する必要がある
      // TODO: つまり、「permissionがgranted」かつ「トークンが存在する」なら通知が有効
      setIsNotificationEnabled(Notification.permission === "granted");
      setIsDeniedPermission(Notification.permission === "denied");
    };

    initialize();
  }, []);

  const registFCMToken = async () => {
    if (!isSupportedBrowser) {
      toast("まだ通知機能が使えないブラウザです");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("通知の許可がされていません");
      return;
    }

    const FCMToken = await getFCMToken();
    console.log(FCMToken);
    // TODO: APIにFCMTokenを投げてDBに保存する
    setIsNotificationEnabled(true);
    showSuccessToast("通知機能をオンにしました✅");
  };

  // これにより、Service Workerに紐づくトークンはFirebaes上からは削除される
  // つまり、APIからPushリクエストしても404が返ってくる
  // しかし、ここでAPIでLaravelサーバ上からもユーザに紐づくトークンを削除しないと、
  // サーバとしてユーザが通知をオフにしているという状態を保持できないので、delete APIも呼ぶ必要がある
  const unRegisterFCMToken = async () => {
    if (!isSupportedBrowser || messaging === null) {
      toast("まだ通知機能が使えないブラウザです");
      return;
    }
    await deleteToken(messaging);
    setIsNotificationEnabled(false);
    // TODO: APIからトークン削除する必要がある。
    // 一応論理削除にしておこうかな
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
