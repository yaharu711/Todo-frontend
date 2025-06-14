import { Link } from "react-router-dom";
import useLogoViewModel from "./LogoViewModel";
import styles from "./Logo.module.css";

const Logo = () => {
  const { isLoading, onLoad } = useLogoViewModel();
  return (
    <Link className={styles.logo_wrap} to="/todos">
      {isLoading && (
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "var('--background-color')",
          }}
        />
      )}
      <img
        src="https://todo-laravel-react.s3.ap-northeast-1.amazonaws.com/icon-40x40.svg"
        alt="ロゴ"
        onLoad={() => {
          onLoad();
        }}
      />
      <span className={styles.logo_label}>Todoアプリ</span>
    </Link>
  );
};
export default Logo;
