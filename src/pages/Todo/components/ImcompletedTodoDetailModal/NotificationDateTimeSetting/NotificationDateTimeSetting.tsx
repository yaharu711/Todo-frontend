import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useNotificationDateTimeSettingViewModel from "./NotificationDateTimeSettingViewModel";
import IconButton from "../../../../../components/IconButton/IconButton";
import { RxCross2 } from "react-icons/rx";
import styles from "./NotificationDateTimeSetting.module.css";
import { ja } from "date-fns/locale/ja";
import CustomDateDisplay from "./components/CustomDateDisplay/CustomDateDisplay";
import { useState } from "react";
import { TimeValue } from "./components/TimeWheelPicker/TimeWheelPicker";
import CalendarContainer from "./components/CalendarContainer/CalendarContainer";

type Props = {
  selectedDateTime: Date | null;
  onChangeDateTime: (date: Date | null) => void;
  minuteStep?: number; // 時分のステップ値（1分ごとだとスクロールが多くなるため、指定できるようにする）
  isOpenDatePicker: boolean; // 日時選択ポップアップが開いているかどうか
  onChangeDatePicker: (isOpen: boolean) => void;
};

const NotificationDateTimeSetting = ({
  selectedDateTime,
  onChangeDateTime,
  minuteStep = 5, // 時分のステップ値、デフォルトは5分
  isOpenDatePicker,
  onChangeDatePicker,
}: Props) => {
  const { now } = useNotificationDateTimeSettingViewModel();
  // 日付選択と時刻選択をコンポーネント切り替えで行うために、stepで管理する
  const [step, setStep] = useState<"date" | "time">("date");
  // 日付が選ばれたあと、時分を編集中に保持
  const [draftDate, setDraftDate] = useState<Date | null>(selectedDateTime);
  const [tm, setTm] = useState<TimeValue>(() => {
    let d: Date;
    if (selectedDateTime) {
      d = selectedDateTime;
    } else {
      // 時刻選択で0時から始まると少しスクロールが多くなるため、デフォルト値は中間の12時に設定する
      d = new Date();
      d.setHours(12, 0, 0, 0);
    }
    return {
      hour: d.getHours(),
      minute: Math.floor(d.getMinutes() / minuteStep) * minuteStep,
    };
  });

  const onSelectDate = (d: Date | null) => {
    setDraftDate(d as Date);
    setStep("time");
  };

  // 決定押した時に、datepickerが閉じるようにする。決定ボタンのonClickイベントですぐできそう。
  // css moduleにするリファクタリングも行うこと
  // 時刻選択時のスクロールのがたつきはどうにかならないのか、、

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>リマインド:</span>
      <DatePicker
        open={isOpenDatePicker}
        selected={selectedDateTime}
        onChange={onChangeDateTime}
        onSelect={onSelectDate}
        customInput={<CustomDateDisplay />}
        calendarContainer={(props) => (
          console.log("CalendarContainer props:", props),
          (
            <CalendarContainer
              {...props}
              step={step}
              setStep={setStep}
              draftDate={draftDate}
              tm={tm}
              setTm={setTm}
              minuteStep={minuteStep}
              onChangeDateTime={onChangeDateTime}
              onChangeDatePicker={onChangeDatePicker}
            />
          )
        )}
        shouldCloseOnSelect={false} // 日付クリックで閉じない（時間ステップに切替）
        onCalendarOpen={() => onChangeDatePicker(true)}
        onCalendarClose={() => {
          onChangeDatePicker(false);
          setStep("date");
        }}
        timeFormat="HH:mm"
        dateFormat="M月d日 H時m分"
        placeholderText="日時を選択"
        minDate={now} // Prevent selecting past dates
        locale={ja}
        withPortal
      />
      {selectedDateTime !== null && (
        <IconButton onClick={() => onChangeDateTime(null)}>
          <RxCross2 size={15} style={{ color: "var(--color-icon)" }} />
        </IconButton>
      )}
    </div>
  );
};

export default NotificationDateTimeSetting;
