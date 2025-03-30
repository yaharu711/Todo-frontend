import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useNotificationDateTimeSettingViewModel from "./NotificationDateTimeSettingViewModel";
import React from "react";
import IconButton from "../../../../../../components/IconButton";
import { RxCross2 } from "react-icons/rx";
import styles from "./NotificationDateTimeSetting.module.css";
import { ja } from "date-fns/locale/ja";

const NotificationDateTimeSetting = () => {
  const { selectedDateTime, onChangeDateTime, now, minTime, maxTime } =
    useNotificationDateTimeSettingViewModel();
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>リマインド:</span>
      <DatePicker
        selected={selectedDateTime}
        onChange={onChangeDateTime}
        customInput={<CustomDateDisplay />}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1} // 分単位での選択
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

export default NotificationDateTimeSetting;
