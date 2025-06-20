import LineLoginButton from "../../../components/LineLoginButton/LineLoginButton";
import styles from "./LineBotSettingItem.module.css";

const LineBotSettingItem = ({
  isLineBotFriend,
}: {
  isLineBotFriend: boolean;
}) => {
  const description = isLineBotFriend
    ? "LINEの連携が完了しています"
    : "LINEの連携が完了する（公式アカウントと友達になる）と、Todoの通知を受け取ることができます。";

  return (
    <div className={styles.container}>
      <p
        className={styles.section_description}
        style={{ fontSize: "12px", color: "#aaaaaa" }}
      >
        {description}
      </p>
      {!isLineBotFriend && <LineLoginButton width={95} height={30} />}
    </div>
  );
};
export default LineBotSettingItem;
