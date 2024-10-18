import React, { SetStateAction, useState } from 'react'
import styles from './TodoInputForm.module.css';
import Button from './Button';
import TextInput from './TextInput';
import type { TodoType } from '../App';

type TodoInputFormProps = {
    imcompletedTodos: TodoType[],
    setImcompletedTodos: React.Dispatch<SetStateAction<TodoType[]>>
}

const TodoInputForm: React.FC<TodoInputFormProps> = ({imcompletedTodos, setImcompletedTodos}) => {
    const [inputedTodoName, setInputedTodoName] = useState<string>("");
    const [inputError, setInputError] = useState<string>('');

    const createTodo = (): void => {
        const imcompletedTodoNames = imcompletedTodos.map(imcompletedTodo => imcompletedTodo.name);
        if (inputedTodoName === "") {
            setInputError("入力は必須です");
            return;
        }
        if (imcompletedTodoNames.includes(inputedTodoName)) {
            setInputError('既に同じTODOがあります');
            return;
        }
        const newTodo: TodoType = {
            name: inputedTodoName,
            isEditMode: false
        }
        setImcompletedTodos([...imcompletedTodos, newTodo]);
        setInputedTodoName("");
    }
    const createTodoOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key !== "Enter") return;
        createTodo();
        e.preventDefault();
    }
    return (
        <div className={styles.wrap}>

            <TextInput 
                placeholder="TODO名" 
                value={inputedTodoName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInputedTodoName(e.target.value);
                    setInputError('');
                }}
                onKeyDown={(e) => createTodoOnKeyDown(e)}
                errorMessage={inputError}
            />
            <Button
                disabled={inputedTodoName === ""}
                onClick={createTodo}
            >作成</Button>
        </div>
  )
}

export default TodoInputForm
