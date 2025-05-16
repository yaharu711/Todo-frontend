import LineLoginButton from "../../../components/LineLoginButton/LineLoginButton";
import styles from "./LineLoginSettingItem.module.css";

const LineLoginSettingItem = () => {
  return (
    <div className={styles.container}>
      <p
        className={styles.section_description}
        style={{ fontSize: "12px", color: "#aaaaaa" }}
      >
        LINE連携すると、Todoの通知をLINEで受け取れます。
      </p>
      <LineLoginButton />
    </div>
  );
};
export default LineLoginSettingItem;
