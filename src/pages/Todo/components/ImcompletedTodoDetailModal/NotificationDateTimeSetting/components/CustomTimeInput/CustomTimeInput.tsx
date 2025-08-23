import React from "react";
import styles from "./CustomTimeInput.module.css";

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

export default CustomTimeInput;
