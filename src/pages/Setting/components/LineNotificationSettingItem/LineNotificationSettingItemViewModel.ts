const LineNotificationSettingItemViewModel = () => {
  // 3つのAPIが必要になる
  // 1つ目: LINE連携の状態を取得するAPI
  // 2つ目: LINE通知のON/OFFの状態を取得するAPI
  // 3つ目: LINE通知のON/OFFの状態を変更するAPI
  return {
    // LINE通知のON/OFFの状態を取得するAPIを呼び出す
    isNotificationEnabled: true,
    onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.checked);
      // e.target.checkedをLINE通知のON/OFFに反映させるAPIを呼び出す
    },
    // LINE連携ができていない時はtrueにする
    isDisabledToggle: false,
    // LINE連携の状態によって動的に決まる
    // 連携できている→description: "LINEの通知機能のON/OFFできます", // デフォルト
    // 連携できていない→description: "LINE連携すると、Todoの通知がLINEで受け取れます"
    description: "LINEの通知機能のON/OFFできます",
  };
};
export default LineNotificationSettingItemViewModel;
