import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useNotificationDateTimeSettingViewModel from "./NotificationDateTimeSettingViewModel";
import React from "react";
import IconButton from "../../../../../../components/IconButton/IconButton";
import { RxCross2 } from "react-icons/rx";
import styles from "./NotificationDateTimeSetting.module.css";
import { ja } from "date-fns/locale/ja";

type Props = {
  selectedDateTime: Date | null;
  onChangeDateTime: (date: Date | null) => void;
};

const NotificationDateTimeSetting = ({
  selectedDateTime,
  onChangeDateTime,
}: Props) => {
  const { now, minTime, maxTime } =
    useNotificationDateTimeSettingViewModel(selectedDateTime);

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>リマインド:</span>
      <DatePicker
        selected={selectedDateTime}
        onChange={onChangeDateTime}
        customInput={<CustomDateDisplay />}
        showTimeInput
        customTimeInput={
          <CustomTimeInput minTime={minTime} maxTime={maxTime} />
        }
        timeFormat="HH:mm"
        dateFormat="M月d日 H時m分"
        placeholderText="日時を選択"
        minDate={now} // 過去の日付を選択不可にする
        minTime={minTime}
        maxTime={maxTime}
        locale={ja}
        withPortal
        timeCaption="時間"
      />
      {selectedDateTime !== null && (
        <IconButton onClick={() => onChangeDateTime(null)}>
          <RxCross2 size={15} style={{ color: "var(--color-icon)" }} />
        </IconButton>
      )}
    </div>
  );
};

// カスタム表示用コンポーネントの型定義
type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

// カスタムコンポーネント：<input> の代わりに <span> を使い、普通のテキスト表示にする
const CustomDateDisplay = React.forwardRef<HTMLSpanElement, CustomInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <span
        ref={ref}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "inline-block",
          userSelect: "none",
          padding: "4px 8px",
          borderBottom: "1px solid #ccc",
        }}
      >
        {value || "日時を選択"}
      </span>
    );
  }
);

type CustomTimeInputProps = {
  date?: Date;
  onChange?: (date: Date) => void;
  minTime: Date;
  maxTime: Date;
};

const CustomTimeInput = ({
  date = new Date(),
  onChange = () => undefined,
  minTime,
  maxTime,
}: CustomTimeInputProps) => {
  const [hour, setHour] = React.useState(date.getHours());
  const [minute, setMinute] = React.useState(date.getMinutes());

  React.useEffect(() => {
    setHour(date.getHours());
    setMinute(date.getMinutes());
  }, [date]);

  const hours = React.useMemo(() => {
    const start = minTime.getHours();
    const end = maxTime.getHours();
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [minTime, maxTime]);

  const minutes = React.useMemo(() => {
    const start =
      hour === minTime.getHours() ? minTime.getMinutes() : 0;
    const end = hour === maxTime.getHours() ? maxTime.getMinutes() : 59;
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [hour, minTime, maxTime]);

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = Number(e.target.value);
    setHour(newHour);
    const mins =
      newHour === minTime.getHours()
        ? minutes.filter((m) => m >= minTime.getMinutes())
        : newHour === maxTime.getHours()
        ? minutes.filter((m) => m <= maxTime.getMinutes())
        : minutes;
    let newMinute = minute;
    if (mins.length) {
      if (newMinute < mins[0]) newMinute = mins[0];
      if (newMinute > mins[mins.length - 1]) newMinute = mins[mins.length - 1];
    }
    setMinute(newMinute);
    const newDate = new Date(date);
    newDate.setHours(newHour, newMinute, 0, 0);
    onChange(newDate);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinute = Number(e.target.value);
    setMinute(newMinute);
    const newDate = new Date(date);
    newDate.setHours(hour, newMinute, 0, 0);
    onChange(newDate);
  };

  return (
    <div className={styles.timePicker}>
      <select
        className={styles.timeSelect}
        value={hour}
        onChange={handleHourChange}
        size={5}
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {String(h).padStart(2, "0")}
          </option>
        ))}
      </select>
      <select
        className={styles.timeSelect}
        value={minute}
        onChange={handleMinuteChange}
        size={5}
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {String(m).padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NotificationDateTimeSetting;
