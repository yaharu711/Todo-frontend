import { toast } from "react-toastify";
import { getFCMToken } from "../../api/client/firebase";
import { useEffect, useState } from "react";
import { isSupported } from "firebase/messaging";

const useNotification = () => {
  //   console.log((await isSupported()) && Notification.permission);
  const [notificationPermission, setNotificationPermission] = useState<
    NotificationPermission | "un-supported"
  >("default");

  useEffect(() => {
    const checkNotificationSupport = async () => {
      const supported = await isSupported();
      setNotificationPermission(
        supported ? Notification.permission : "un-supported"
      );
    };

    checkNotificationSupport();
  }, []);

  const registFCMToken = async () => {
    const permission = (await isSupported())
      ? await Notification.requestPermission()
      : "un-supported";
    setNotificationPermission(permission);
    if (permission !== "granted" && permission !== "un-supported") {
      console.log("通知の許可がされていません");
      return;
    } else if (permission === "un-supported") {
      toast("まだ通知機能が使えないブラウザです");
      return;
    }

    const FCMToken = await getFCMToken();
    console.log(FCMToken);
    // APIにFCMTokenを投げてDBに保存する
  };

  // Service Workerを更新した時や通知権限がgrantedなのにFCMトークンない場合の再発行など(deniedにして権限リセットではなく、grantedに戻した時とか)
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
    updateFCMToken,
    notificationPermission,
  };
};

export default useNotification;
