import styles from "./ToggleButton.module.css";

type Props = {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};
const ToggleButton = ({ checked, onChange, disabled = false }: Props) => {
  return (
    <label className={styles.switch} data-is-disabled={disabled}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e)}
        disabled={disabled}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ToggleButton;
