import UserApi from "../../api/User/functions";
import { useAuthRedirect } from "../../auth/redirectFrom";
import { ROUTE_PATHS } from "../../routes/paths";
import styles from "./LineLoginButton.module.css";

type Props = {
  width?: number;
  height?: number;
};

// onClick を上位から受け取れるようにしておくと、Storybookなどテストがしやすくなる。
const LineLoginButton = ({ width, height }: Props) => {
  const { target } = useAuthRedirect({ defaultPath: ROUTE_PATHS.todos });
  const handleClick = async () => {
    const { url } = await UserApi.createLineAuthUrl(target);
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
