import UserApi from "../../api/User/functions";
import { useLocation } from "react-router-dom";
import { FromParts, resolveAuthRedirectTarget } from "../../auth/redirectFrom";
import styles from "./LineLoginButton.module.css";

type Props = {
  width?: number;
  height?: number;
};

// onClick を上位から受け取れるようにしておくと、Storybookなどテストがしやすくなる。
const LineLoginButton = ({ width, height }: Props) => {
  const location = useLocation();
  const handleClick = async () => {
    // 直前にアクセスしていた場所を優先（state → session → '/todos'）
    const returnTo = resolveAuthRedirectTarget({
      stateFrom: ((location.state as { from?: FromParts } | null) || {})?.from,
      defaultPath: "/todos",
    });
    const { url } = await UserApi.createLineAuthUrl(returnTo);
    // LINEログインのURLを取得するAPIを叩く
    window.location.href = url;
    // 上記、遷移後にcallbackとして別のAPIの呼び出し処理も書く必要がある
  };

  return (
    <button type="button" className={styles.button} onClick={handleClick}>
      <img
        src="https://todo-laravel-react.s3.ap-northeast-1.amazonaws.com/line/btn_login_base.png"
        alt=""
        className={styles.img}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
    </button>
  );
};
export default LineLoginButton;
