import React, { SetStateAction, useState } from 'react'
import styles from './TodoInputForm.module.css';
import Button from './Button';
import TextInput from './TextInput';

type TodoInputFormProps = {
    imcompletedTodo: string[],
    setImcompletedTodo: React.Dispatch<SetStateAction<string[]>>
}

const TodoInputForm: React.FC<TodoInputFormProps> = ({imcompletedTodo, setImcompletedTodo}) => {
    const [inputedTodo, setInputedTodo] = useState<string>("");
    const [inputError, setInputError] = useState<string>('');

    const createTodo = (): void => {
        if (inputedTodo === "") {
            setInputError("入力は必須です");
            return;
        }
        if (imcompletedTodo.includes(inputedTodo)) {
            setInputError('既に同じTODOがあります');
            return;
        }
        setImcompletedTodo([...imcompletedTodo, inputedTodo]);
        setInputedTodo("");
    }
    const createTodoOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key !== "Enter") return;
        createTodo();
        e.preventDefault();
    }
    return (
        <div className={styles.wrapp}>

            <TextInput 
                placeholder="TODO名" 
                value={inputedTodo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputedTodo(e.target.value);
                    setInputError('');
                }}
                onKeyDown={(e) => createTodoOnKeyDown(e)}
                errorMessage={inputError}
            />
            <Button
                disabled={inputedTodo === ""}
                onClick={createTodo}
            >作成</Button>
        </div>
  )
}

export default TodoInputForm
