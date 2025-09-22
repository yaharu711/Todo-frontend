// TimeWheelPicker.tsx
import Picker from "react-mobile-picker";
import { useMemo, useCallback } from "react";
import styles from "./TimeWheelPicker.module.css";

export type TimeValue = { hour: number; minute: number };

export function TimeWheelPicker({
  value,
  onChange,
  minuteStep = 1,
}: {
  value: TimeValue;
  onChange: (v: TimeValue) => void;
  minuteStep?: number;
}) {
  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  const minutes = useMemo(() => {
    const a: number[] = [];
    for (let m = 0; m < 60; m += minuteStep) a.push(m);
    return a;
  }, [minuteStep]);

  // 1つのPickerにhourとminuteの両カラムをまとめる
  const pickerValue = useMemo(
    () => ({ h: value.hour, m: value.minute }),
    [value.hour, value.minute]
  );
  const handlePickerChange = useCallback(
    (newValue: { h?: number; m?: number }) => {
      const nextHour = newValue.h ?? value.hour;
      const nextMinute = newValue.m ?? value.minute;
      if (nextHour !== value.hour || nextMinute !== value.minute) {
        onChange({ hour: nextHour, minute: nextMinute });
      }
    },
    [onChange, value.hour, value.minute]
  );

  return (
    <div className={styles.pickerContainer}>
      <Picker value={pickerValue} onChange={handlePickerChange}>
        <Picker.Column name="h" className={styles.column}>
          {hours.map((h) => (
            <Picker.Item key={h} value={h}>
              {String(h).padStart(2, "0")}
            </Picker.Item>
          ))}
        </Picker.Column>
        <Picker.Column name="m" className={styles.column}>
          {minutes.map((m) => (
            <Picker.Item key={m} value={m}>
              {String(m).padStart(2, "0")}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
}
