import styles from "./Textarea.module.css";

type Props = {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  errorMessage?: string;
  style?: object;
  autoFocus?: boolean;
};

const Textarea = ({
  label,
  placeholder,
  name,
  value,
  onChange,
  onKeyDown,
  onBlur,
  errorMessage,
  style,
  autoFocus,
}: Props) => {
  return (
    <label className={styles.wrapp_input}>
      {label}
      <textarea
        className={styles.input}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        style={style}
        autoFocus={autoFocus}
      />
      <span className={styles.input_error}>{errorMessage}</span>
    </label>
  );
};

export default Textarea;
