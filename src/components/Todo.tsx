import React, { useState } from 'react';
import Button from './Button';
import { CiEdit } from 'react-icons/ci';
import TextInput from './TextInput';
import { ButtonProps, TodoType } from '../App';
import styles from './Todo.module.css'

type TodoProps = {
    target: TodoType,
    todos: TodoType[],
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
    buttonPropsList: ButtonProps[]
}

const Todo: React.FC<TodoProps> = ({
    target,
    todos,
    setTodos,
    buttonPropsList
}) => {
    const [inputedTodoName, setInputedTodoName] = useState<string>('');
    const [editInputError, setEditInputError] = useState<string>('');
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

    const toggleEditMode = (target: TodoType) => {
        setTodos(prev => prev.map(todo => {
            if (todo.name !== target.name) return todo;
            return {...todo, isEditMode: !todo.isEditMode}
        }))
        setIsDisabledButton(prev => !prev);
    }
    const editTodo = (target: TodoType) => {
        const todoNames = todos.map(todo => todo.name);
        if (target.name !== inputedTodoName && todoNames.includes(inputedTodoName)) {
            setEditInputError('既に同じTODOがあります');
            return;
        }

        const updatedTodo: TodoType = {
            name: inputedTodoName === "" ? target.name : inputedTodoName,
            isEditMode: false
        }
        setTodos(prev => prev.map(todo => (todo.name === target.name ? updatedTodo : todo)));
        setInputedTodoName('');
        setIsDisabledButton(false);
    }
    const editTodoOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, target: TodoType): void => {
        if (e.key !== "Enter") return;
        editTodo(target);
        e.preventDefault();
    }
    const editTodoOnBlur = (target: TodoType): void => editTodo(target);

    return (
        <li className={styles.li}>
            <div className={styles.todo_name_wrapp}>
                <button 
                    className={styles.todo_name_edit_button}
                    onClick={() => toggleEditMode(target)} 
                >
                    <CiEdit size={25} color='white'/>
                </button>
                {target.isEditMode ? (
                    <TextInput
                        placeholder={target.name}
                        value={inputedTodoName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setInputedTodoName(e.target.value);
                            setEditInputError('');
                        }}
                        onKeyDown={(e) => editTodoOnKeyDown(e, target)}
                        onBlur={() => editTodoOnBlur(target)}
                        errorMessage={editInputError}
                    />
                ): (
                    <p className={styles.todo_name}>
                        {target.name}
                    </p>
                )}
            </div>
            <div className={styles.buttons_wrap}>
                {/* このボタンは動的に削除されたり更新されたりしないので、mapのindexをコンポーネントのkeyに指定しても問題ない */}
                {buttonPropsList.map((buttonProps) => (
                    // 汎用性が高くなったかな。高くなった分、親で色々定義して準備して渡す用になった。
                    <Button 
                        key={buttonProps.children}
                        disabled={isDisabledButton}
                        onClick={() => buttonProps.onClick(target)}
                        children={buttonProps.children}
                    />
                ))}
            </div>
        </li>
    );
}

export default Todo;
