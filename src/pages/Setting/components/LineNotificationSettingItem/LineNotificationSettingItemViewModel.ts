const LineNotificationSettingItemViewModel = (isLineBotFriend: boolean) => {
  // 2つ目: LINE通知のON/OFFの状態を取得するAPI
  // 3つ目: LINE通知のON/OFFの状態を変更するAPI
  return {
    // LINE通知のON/OFFの状態を取得するAPIを呼び出す
    isNotificationEnabled: true,
    onChangeToggle: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.checked);
      // e.target.checkedをLINE通知のON/OFFに反映させるAPIを呼び出す
    },
    description: isLineBotFriend
      ? "LINEの通知機能のON/OFFできます"
      : "LINEの連携が完了すると、設定できます",
  };
};
export default LineNotificationSettingItemViewModel;
