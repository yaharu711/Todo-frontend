import { CalendarContainerProps } from "react-datepicker";
import { format, setHours, setMinutes } from "date-fns";
import Button from "../../../../../../../components/Button/Button";
import { TimeValue, TimeWheelPicker } from "../TimeWheelPicker/TimeWheelPicker";
import styles from "./CalendarContainer.module.css";

type CustomCalendarContainerProps = CalendarContainerProps & {
  step: "date" | "time";
  setStep: (step: "date" | "time") => void;
  draftDate: Date | null;
  tm: TimeValue;
  setTm: (tm: TimeValue) => void;
  minuteStep: number;
  onChangeDateTime: (date: Date | null) => void;
  onChangeDatePicker: (isOpen: boolean) => void;
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
  onChangeDatePicker,
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
                onChangeDatePicker(false);
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
