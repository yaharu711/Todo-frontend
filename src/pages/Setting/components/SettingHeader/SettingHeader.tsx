import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import styles from "./SettingHeader.module.css";

const SettingHeader = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.settings_header}>
      <Button
        onClick={() => navigate("/todos")}
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
  );
};

export default SettingHeader;
