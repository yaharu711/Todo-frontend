// @ts-expect-error: DatePicker types are incompatible with our usage but function correctly
import DatePicker, { CalendarContainerProps } from "react-datepicker";
import { format, setHours, setMinutes } from "date-fns";
import Button from "../../../../../../../components/Button/Button";
import { TimeValue, TimeWheelPicker } from "../TimeWheelPicker/TimeWheelPicker";
import styles from "./CalendarContainer.module.css";
import React from "react";

type CustomCalendarContainerProps = CalendarContainerProps & {
  step: "date" | "time";
  setStep: (step: "date" | "time") => void;
  draftDate: Date | null;
  tm: TimeValue;
  setTm: (tm: TimeValue) => void;
  minuteStep: number;
  onChangeDateTime: (date: Date | null) => void;
  datePickerRef: React.RefObject<DatePicker>;
};

const CalendarContainer = ({
  className,
  children,
  step,
  setStep,
  draftDate,
  tm,
  setTm,
  minuteStep,
  onChangeDateTime,
  datePickerRef,
}: CustomCalendarContainerProps) => {
  return (
    <div className={`${className} ${styles.container}`}>
      {step === "date" ? (
        <>{children}</>
      ) : (
        <div className={styles.timeStepWrapper}>
          <div className={styles.draftDate}>
            {draftDate
              ? format(draftDate, `M月d日 ${tm.hour}時${tm.minute}分`)
              : "Select date"}
          </div>
          <TimeWheelPicker
            value={tm}
            onChange={setTm}
            minuteStep={minuteStep}
          />
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setStep("date")}
              style={{ width: "70px", height: "45px" }}
            >
              戻る
            </Button>
            <Button
              onClick={() => {
                if (!draftDate) return;
                let d = setHours(draftDate, tm.hour);
                d = setMinutes(d, tm.minute);
                onChangeDateTime(d);
                if (datePickerRef.current) {
                  datePickerRef.current.setOpen(false);
                }
              }}
              style={{ width: "70px", height: "45px" }}
            >
              設定
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarContainer;
