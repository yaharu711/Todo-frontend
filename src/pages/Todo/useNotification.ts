import { toast } from "react-toastify";
import { getFCMToken } from "../../api/client/firebase";
import { useEffect, useState } from "react";
import { isSupported } from "firebase/messaging";

const useNotification = () => {
  //   console.log((await isSupported()) && Notification.permission);

  const registFCMToken = async () => {
    const permission = (await isSupported())
      ? await Notification.requestPermission()
      : "un-supported";
    setIsShowNotificationButton(permission === "default");
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

  const [isShowNotificationButton, setIsShowNotificationButton] =
    useState<boolean>(false);

  useEffect(() => {
    const checkNotificationSupport = async () => {
      const supported = await isSupported();
      setIsShowNotificationButton(
        supported && Notification.permission === "default"
      );
    };

    checkNotificationSupport();
  }, []);

  return {
    registFCMToken,
    updateFCMToken,
    isShowNotificationButton,
  };
};

export default useNotification;
