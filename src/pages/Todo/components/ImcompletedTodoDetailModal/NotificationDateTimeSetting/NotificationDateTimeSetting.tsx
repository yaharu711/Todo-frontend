import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useNotificationDateTimeSettingViewModel from "./NotificationDateTimeSettingViewModel";
import IconButton from "../../../../../components/IconButton/IconButton";
import { RxCross2 } from "react-icons/rx";
import styles from "./NotificationDateTimeSetting.module.css";
import { ja } from "date-fns/locale/ja";
import CustomTimeInput from "./components/CustomTimeInput/CustomTimeInput";
import CustomDateDisplay from "./components/CustomDateDisplay/CustomDateDisplay";
import React from "react";

type Props = {
  selectedDateTime: Date | null;
  onChangeDateTime: (date: Date | null) => void;
};

const NotificationDateTimeSetting = ({
  selectedDateTime,
  onChangeDateTime,
}: Props) => {
  const { now } = useNotificationDateTimeSettingViewModel();

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>リマインド:</span>
      <DatePicker
        selected={selectedDateTime}
        onChange={onChangeDateTime}
        customInput={<CustomDateDisplay />}
        showTimeInput
        customTimeInput={<CustomTimeInput />}
        timeFormat="HH:mm"
        dateFormat="M月d日 H時m分"
        placeholderText="日時を選択"
        minDate={now} // Prevent selecting past dates
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

export default NotificationDateTimeSetting;
