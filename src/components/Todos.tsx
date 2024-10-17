import React, { useState } from 'react';
import styles from './Todos.module.css'
import Button from './Button';
import { CiEdit } from "react-icons/ci";
import TextInput from './TextInput';
import { ButtonProps } from '../App';

type TodosProps = {
    section: string,
    todos: string[],
    setTodos: React.Dispatch<React.SetStateAction<string[]>>,
    buttonPropsList: ButtonProps[]
}

const Todos: React.FC<TodosProps> = ({
    section,
    todos,
    setTodos,
    buttonPropsList
}) => {
    // todo名は重複を許していないので、キーをとりあえずはtodo名にする
    const [editMode, setEditMode] = useState<Map<string, boolean>>(new Map());
    const [editInput, setEditInput] = useState<string>('');
    const [editInputError, setEditInputError] = useState<string>('');
    const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

    const toggleEditMode = (target: string) => {
        setEditMode(prev => new Map(prev).set(target, !prev.get(target)));
        setIsDisabledButton(prev => !prev);
    }
    const editTodo = (target: string) => {
        if (editInput === "") {
            setEditInputError("入力は必須です");
            return;
        }
        if (target !== editInput && todos.includes(editInput)) {
            setEditInputError('既に同じTODOがあります');
            return;
        }
        setTodos(prev => prev.map(todo => (todo === target ? editInput : todo)));

        setEditInput('');
        setEditMode(prev => new Map(prev).set(target, false));
        setIsDisabledButton(false);
    }
    const editTodoOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, target: string): void => {
        if (e.key !== "Enter") return;
        editTodo(target);
        e.preventDefault();
    }
    const editTodoOnBlur = (target: string): void => editTodo(target);

    return (
        <section className={styles.wrapp}>
            <h2>{section}</h2>
            <ul className={styles.ul }>
                {todos.map((todo: string) => {
                return (
                    <li
                        key={todo}
                        className={styles.li}
                    >
                        <div className={styles.todo_name_wrapp}>
                            <button 
                                className={styles.todo_name_edit_button}
                                onClick={() => toggleEditMode(todo)} 
                            >
                                <CiEdit size={25} color='white'/>
                            </button>
                            {editMode.get(todo) ? (
                                <TextInput
                                    placeholder={todo}
                                    value={editInput}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setEditInput(e.target.value);
                                        setEditInputError('');
                                    }}
                                    onKeyDown={(e) => editTodoOnKeyDown(e, todo)}
                                    onBlur={() => editTodoOnBlur(todo)}
                                    errorMessage={editInputError}
                                />
                            ): (
                                <p className={styles.todo_name}>{todo}</p>
                            )}
                        </div>
                        <div className={styles.buttons_wrap}>
                            {/* このボタンは動的に削除されたり更新されたりしないので、mapのindexをコンポーネントのkeyに指定しても問題ない */}
                            {buttonPropsList.map((buttonProps) => (
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
