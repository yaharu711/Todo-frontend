import LineLoginButton from "../../../../components/LineLoginButton/LineLoginButton";
import styles from "./SocialLogin.module.css";

const SocialLogin = () => {
  return (
    <div className={styles.social_login_container}>
      <div className={styles.login_line_wrap}>
        {/* LINE ログインボタン */}
        <LineLoginButton width={160} height={45} />

        {/* 注意書き */}
        <div className={styles.alert_wrap}>
          <span className={styles.alert_title}>
            既にアカウント、初めてLINEログインする方へ
          </span>
          <br />
          <span className={styles.notice_text}>
            一度メールアドレスとパスワードでログインし、
            設定画面からLINEログインを有効にしてください。
          </span>
        </div>
      </div>
    </div>
  );
};
export default SocialLogin;
