import { useNavigate } from "react-router-dom";
import ToggleButton from "../../components/ToggleButton";
import styles from "./index.module.css";
import Button from "../../components/Button";

const SettingPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.settings_container}>
      <div className={styles.settings_header}>
        <Button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "35px",
            cursor: "pointer",
            padding: 0,
            width: "25px",
            marginRight: "5px",
            marginBottom: "5px",
          }}
        >
          &lt;
        </Button>
        <h2 className={styles.settings_title}>アプリ設定</h2>
      </div>
      <div className={styles.settings_section}>
        <h2 className={styles.section_title}>通知の設定</h2>
        <ToggleButton />
      </div>
    </div>
  );
};

export default SettingPage;
