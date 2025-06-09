import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/todos");
  };

  return (
    <button className={styles.back_button} onClick={onClick}>
      <IoChevronBackOutline size={25} />
      <span className={styles.back_button__label}>Todo</span>
    </button>
  );
};

export default BackButton;
