import styles from "./LineLoginButton.module.css";

// onClick を上位から受け取れるようにしておくと、Storybookなどテストがしやすくなる。
const LineLoginButton = () => {
  const handleClick = () => {
    // LINEログインのURLを取得するAPIを叩く
    //   window.location.href = `${process.env.REACT_APP_API_URL}/login/line`;
    // 上記、遷移後にcallbackとして別のAPIの呼び出し処理も書く必要がある
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      {/* 画像を要素として挿入し、CSSでフィットさせる */}
      <img
        src="https://todo-laravel-react.s3.ap-northeast-1.amazonaws.com/line/btn_login_base.png"
        alt=""
        className={styles.img}
      />
    </button>
  );
};
export default LineLoginButton;
