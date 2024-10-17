import React from 'react';
import styles from './TextInput.module.css'

type TextInputProps = {
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEventHandler<HTMLInputElement>) => void,
    errorMessage: string
}

const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    value,
    onChange,
    onKeyDown,
    onBlur,
    errorMessage
}) => {
    return (
        <div className={styles.wrapp_input}>
            <input 
                className={styles.input}
                type="text"
                placeholder={placeholder} 
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                autoFocus
            />
            <span className={styles.input_error}>{errorMessage}</span>
        </div>
    );
}

export default TextInput;
