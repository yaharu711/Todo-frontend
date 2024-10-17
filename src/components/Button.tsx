import React from 'react'
import styles from './Button.module.css'

export type ButtonProps<> = {
    disabled?: boolean,
    onClick: (todo: string) => void,
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({disabled=false, onClick, children}) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >{children}</button>
  )
}

export default Button
