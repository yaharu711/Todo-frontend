import React, { useState } from 'react';
import styles from './Todos.module.css'
import Button from './Button';
import { CiEdit } from "react-icons/ci";
import TextInput from './TextInput';
import { ButtonProps, Todo } from '../App';

type TodosProps = {
    section: string,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    buttonPropsList: ButtonProps[]
}

const Todos: React.FC<TodosProps> = ({
    section,
    todos,
    setTodos,
    buttonPropsList
}) => {
    const [inputedTodoName, setInputedTodoName] = useState<string>('');
    const [editInputError, setEditInputError] = useState<string>('');
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

    const toggleEditMode = (target: Todo) => {
        setTodos(prev => prev.map(todo => {
            if (todo.name !== target.name) return todo;
            todo.isEditMode = true;
            return todo;
        }))
        setIsDisabledButton(prev => !prev);
    }
    const editTodo = (target: Todo) => {
        const todoNames = todos.map(todo => todo.name);
        if (inputedTodoName === "") {
            setEditInputError("入力は必須です");
            return;
        }
        if (target.name !== inputedTodoName && todoNames.includes(inputedTodoName)) {
            setEditInputError('既に同じTODOがあります');
            return;
        }
        const updatedTodo: Todo = {
            name: inputedTodoName,
            isEditMode: false
        }
        setTodos(prev => prev.map(todo => (todo.name === target.name ? updatedTodo : todo)));

        setInputedTodoName('');
        setIsDisabledButton(false);
    }
    const editTodoOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, target: Todo): void => {
        if (e.key !== "Enter") return;
        editTodo(target);
        e.preventDefault();
    }
    const editTodoOnBlur = (target: Todo): void => editTodo(target);

    return (
        <section className={styles.wrap}>
            <h2>{section}</h2>
            <ul className={styles.ul }>
                {todos.map((todo: Todo) => {
                return (
                    <li
                        key={todo.name}
                        className={styles.li}
                    >
                        <div className={styles.todo_name_wrapp}>
                            <button 
                                className={styles.todo_name_edit_button}
                                onClick={() => toggleEditMode(todo)} 
                            >
                                <CiEdit size={25} color='white'/>
                            </button>
                            {todo.isEditMode ? (
                                <TextInput
                                    placeholder={todo.name}
                                    value={inputedTodoName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setInputedTodoName(e.target.value);
                                        setEditInputError('');
                                    }}
                                    onKeyDown={(e) => editTodoOnKeyDown(e, todo)}
                                    onBlur={() => editTodoOnBlur(todo)}
                                    errorMessage={editInputError}
                                />
                            ): (
                                <p className={styles.todo_name}>{todo.name}</p>
                            )}
                        </div>
                        <div className={styles.buttons_wrap}>
                            {/* このボタンは動的に削除されたり更新されたりしないので、mapのindexをコンポーネントのkeyに指定しても問題ない */}
                            {buttonPropsList.map((buttonProps) => (
                                // 汎用性が高くなったかな。高くなった分、親で色々定義して準備して渡す用になった。
                                <Button 
                                    key={buttonProps.children}
                                    disabled={isDisabledButton}
                                    onClick={() => buttonProps.onClick(todo)}
                                    children={buttonProps.children}
                                />
                            ))}
                        </div>
                    </li>
                );
                })}
            </ul>
        </section>
    );
}

export default Todos;
