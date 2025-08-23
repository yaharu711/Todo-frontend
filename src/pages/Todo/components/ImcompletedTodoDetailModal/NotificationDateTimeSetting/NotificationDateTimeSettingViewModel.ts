const useNotificationDateTimeSettingViewModel = (
  selectedDateTime: Date | null
) => {
  const now = new Date();
  // 選択日が今日の場合、現在時刻の1分後（秒・ミリ秒は0に）を返す
  const getMinTimeForSelectedDate = (date: Date) => {
    if (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    ) {
      const nextMinute = new Date(now.getTime() + 60000); // 1分後
      nextMinute.setSeconds(0, 0);
      return nextMinute;
    } else {
      // 今日以外の場合は、その日の0時0分から選択可能にする
      const midnight = new Date(date);
      midnight.setHours(0, 0, 0, 0);
      return midnight;
    }
  };

  // 選択済み日があればその日の最小時間を設定、なければ今日の場合の最小時間を利用

  const minTime = selectedDateTime
    ? getMinTimeForSelectedDate(selectedDateTime)
    : (() => {
        const nextMinute = new Date(now.getTime() + 60000);
        nextMinute.setSeconds(0, 0);
        return nextMinute;
      })();

  // 選択日の最大時間はその日の23:59に設定
  const maxTime = selectedDateTime
    ? (() => {
        const endOfDay = new Date(selectedDateTime);
        endOfDay.setHours(23, 59, 0, 0);
        return endOfDay;
      })()
    : (() => {
        const endOfDay = now;
        endOfDay.setHours(23, 59, 0, 0);
        return endOfDay;
      })();

  return {
    now,
    minTime,
    maxTime,
  };
};

export default useNotificationDateTimeSettingViewModel;
