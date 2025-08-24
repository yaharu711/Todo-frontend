// TimeWheelPicker.tsx
import Picker from "react-mobile-picker";
import { useMemo } from "react";

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

  const hourValueObj = useMemo(() => ({ h: value.hour }), [value.hour]);
  const minuteValueObj = useMemo(() => ({ m: value.minute }), [value.minute]);

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div
          style={{
            marginBottom: 8,
            opacity: 0.7,
            width: "40px",
            textAlign: "center",
          }}
        >
          時
        </div>
        <Picker
          value={hourValueObj}
          onChange={(data) => {
            const newHour = data.h;
            if (newHour !== value.hour) {
              onChange({ hour: newHour, minute: value.minute });
            }
          }}
        >
          <Picker.Column name="h">
            {hours.map((h) => (
              <Picker.Item key={h} value={h}>
                {String(h).padStart(2, "0")}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
      <div>
        <div
          style={{
            marginBottom: 8,
            opacity: 0.7,
            width: "40px",
            textAlign: "center",
          }}
        >
          分
        </div>
        <Picker
          value={minuteValueObj}
          onChange={(data) => {
            const newMinute = data.m;
            if (newMinute !== value.minute) {
              // ← 値が本当に変わったときだけ更新
              onChange({ hour: value.hour, minute: newMinute });
            }
          }}
        >
          <Picker.Column name="m">
            {minutes.map((m) => (
              <Picker.Item key={m} value={m}>
                {String(m).padStart(2, "0")}
              </Picker.Item>
            ))}
          </Picker.Column>
        </Picker>
      </div>
    </div>
  );
}
