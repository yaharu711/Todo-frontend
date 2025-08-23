import React from "react";
import styles from "./CustomTimeInput.module.css";

type CustomTimeInputProps = {
  date?: Date;
  onChange?: (time: string) => void;
};

const CustomTimeInput = ({ date, onChange }: CustomTimeInputProps) => {
  // Add default values to prevent crash if props are not passed
  const [hour, setHour] = React.useState(date ? date.getHours() : 0);
  const [minute, setMinute] = React.useState(date ? date.getMinutes() : 0);

  React.useEffect(() => {
    if (date) {
      setHour(date.getHours());
      setMinute(date.getMinutes());
    }
  }, [date]);

  const hours = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => i);
  }, []);

  const minutes = React.useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => i);
  }, []);

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = Number(e.target.value);
    setHour(newHour);
    if (onChange) {
      const timeString = `${String(newHour).padStart(2, "0")}:${String(
        minute
      ).padStart(2, "0")}`;
      onChange(timeString);
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinute = Number(e.target.value);
    setMinute(newMinute);
    if (onChange) {
      const timeString = `${String(hour).padStart(2, "0")}:${String(
        newMinute
      ).padStart(2, "0")}`;
      onChange(timeString);
    }
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
            {h}
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
