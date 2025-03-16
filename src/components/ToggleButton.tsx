import { useState } from "react";
import styles from "./ToggleButton.module.css";

const ToggleButton = () => {
  const [wifiOnly, setWifiOnly] = useState(false);

  return (
    <div className={styles.toggle_container}>
      <div>
        <p className={styles.toggle_label}>Wi-Fiのみ</p>
        <p className={styles.toggle_description}>
          Wi-Fi接続時のみダウンロードします
        </p>
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={wifiOnly}
          onChange={() => setWifiOnly(!wifiOnly)}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ToggleButton;
