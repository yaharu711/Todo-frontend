import DatePicker, { CalendarContainerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useNotificationDateTimeSettingViewModel from "./NotificationDateTimeSettingViewModel";
import IconButton from "../../../../../components/IconButton/IconButton";
import { RxCross2 } from "react-icons/rx";
import styles from "./NotificationDateTimeSetting.module.css";
import { ja } from "date-fns/locale/ja";
import CustomDateDisplay from "./components/CustomDateDisplay/CustomDateDisplay";
import { useState } from "react";
import { format, setHours, setMinutes } from "date-fns";
import {
  TimeValue,
  TimeWheelPicker,
} from "./components/TimeWheelPicker/TimeWheelPicker";
import Button from "../../../../../components/Button/Button";

type Props = {
  selectedDateTime: Date | null;
  onChangeDateTime: (date: Date | null) => void;
  minuteStep?: number; // 時分のステップ値、デフォルトは5分
  onChangeDatePicker: (isOpen: boolean) => void;
};

const NotificationDateTimeSetting = ({
  selectedDateTime,
  onChangeDateTime,
  minuteStep = 5, // 時分のステップ値、デフォルトは5分
  onChangeDatePicker,
}: Props) => {
  const { now } = useNotificationDateTimeSettingViewModel();
  // ポップアップ内の“段階”
  const [step, setStep] = useState<"date" | "time">("date");
  // 日付が選ばれたあと、時分を編集中に保持
  const [draftDate, setDraftDate] = useState<Date | null>(selectedDateTime);
  const [tm, setTm] = useState<TimeValue>(() => {
    const d = selectedDateTime ?? new Date();
    return {
      hour: d.getHours(),
      minute: Math.floor(d.getMinutes() / minuteStep) * minuteStep,
    };
  });

  const CalendarContainer = ({
    className,
    children,
  }: CalendarContainerProps) => {
    return (
      <div
        className={className}
        style={{ padding: 12 }}
        onTouchMove={(e) => e.preventDefault()}
      >
        {step === "date" ? (
          <>{children /* ← 通常のカレンダーをそのまま描画 */}</>
        ) : (
          <div
            onTouchMove={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            style={{ width: 300, marginTop: 16 }}
          >
            <div style={{ fontWeight: 700, marginBottom: 24 }}>
              {draftDate
                ? format(draftDate, `M月d日 ${tm.hour}時${tm.minute}分`)
                : "Select date"}
            </div>
            <TimeWheelPicker
              value={tm}
              onChange={setTm}
              minuteStep={minuteStep}
            />
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 16,
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => setStep("date")}
                style={{
                  width: 70,
                  height: 45,
                }}
              >
                戻る
              </Button>
              <Button
                onClick={() => {
                  if (!draftDate) return;
                  let d = setHours(draftDate, tm.hour);
                  d = setMinutes(d, tm.minute);
                  onChangeDateTime(d);
                }}
                style={{
                  width: 70,
                  height: 45,
                }}
              >
                決定
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>リマインド:</span>
      <DatePicker
        selected={selectedDateTime}
        onChange={onChangeDateTime}
        onSelect={(d) => {
          setDraftDate(d as Date);
          // 既存値の時分を引き継ぐ
          const base = (d as Date) ?? new Date();
          setTm({
            hour: base.getHours(),
            minute: Math.floor(base.getMinutes() / minuteStep) * minuteStep,
          });
          setStep("time");
        }}
        customInput={<CustomDateDisplay />}
        calendarContainer={CalendarContainer}
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
