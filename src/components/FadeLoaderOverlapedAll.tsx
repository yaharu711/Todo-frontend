import { FadeLoader } from "react-spinners";
import styles from "./FadeLoaderOverlapedAll.module.css";

const FadeLoaderOverlapedAll = () => {
  return (
    <div className={styles.spinnersOverlay}>
      <div className={styles.spinnersContent}>
        <FadeLoader color="#646cff" />
      </div>
    </div>
  );
};

export default FadeLoaderOverlapedAll;
