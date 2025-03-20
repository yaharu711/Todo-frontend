// 以下だとメッセージ受信できた！！！！
self.addEventListener("push", function (event) {
  console.log("📩 メッセージを受信できました！");

  if (!event.data) {
    console.error("📭 受信データが空です。");
    return;
  }

  try {
    const data = event.data.json();
    const title = data?.notification?.title ?? "新しい通知";
    const message = data?.notification?.body ?? "詳細を確認してください";

    event.waitUntil(
      self.registration.showNotification(title, {
        body: message,
      })
    );
    console.log("通知処理完了");
  } catch (error) {
    console.error("🚨 プッシュ通知の解析に失敗しました:", error);
  }
});

// 以下はなくても、getToken()を再実行すると、新しいService Workerが適応されるみたい
// しかし、getToken()に直接registrationを渡すようにすると、以下がないとリロードしたりしてもすぐに適応されなくなった
self.addEventListener("install", (event) => {
  console.log("🛠 Service Worker インストール中...");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("🚀 新しい Service Worker がアクティブに！古いのはどうなる？");
  event.waitUntil(self.clients.claim());
});
