import React from 'react';
import styles from './Todos.module.css'
import { ButtonProps, TodoType } from '../App';
import Todo from './Todo';

type TodosProps = {
    section: string,
    todos: TodoType[],
    setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>,
    buttonPropsList: ButtonProps[]
}

const Todos: React.FC<TodosProps> = ({
    section,
    todos,
    setTodos,
    buttonPropsList
}) => {
    return (
        <section className={styles.wrap}>
            <h2>{section}</h2>
            <ul className={styles.ul }>
                {todos.map((todo: TodoType) => {
                return (
                    <Todo
                        key={todo.name}
                        target={todo}
                        todos={todos}
                        setTodos={setTodos}
                        buttonPropsList={buttonPropsList}
                    />
                );
                })}
            </ul>
        </section>
    );
}

export default Todos;
