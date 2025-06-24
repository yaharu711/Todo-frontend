import { ClipLoader } from "react-spinners";
import styles from "./ClipLoaderOverlapedAll.module.css";

const ClipLoaderOverlapedAll = () => {
  return (
    <div className={styles.loader_overlay}>
      <div className={styles.loader}>
        <ClipLoader size={80} color="rgba(255, 255, 255, 0.9)" />
      </div>
    </div>
  );
};

export default ClipLoaderOverlapedAll;
