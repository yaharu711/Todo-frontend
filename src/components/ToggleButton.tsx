import styles from "./ToggleButton.module.css";

type Props = {
  checked: boolean;
  onChange: () => void;
};
const ToggleButton = ({ checked, onChange }: Props) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={() => onChange()} />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleButton;
