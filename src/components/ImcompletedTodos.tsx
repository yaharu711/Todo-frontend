import { ImcompletedTodoType } from "../pages/Todo";
import ImcompletedTodo from "./ImcompletedTodo";
import styles from "./ImcompletedTodos.module.css";

type Props = {
  todos: ImcompletedTodoType[];
  setTodos: React.Dispatch<React.SetStateAction<ImcompletedTodoType[]>>;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const ImcompletedTodos = ({
  todos,
  setTodos,
  completeTodo,
  deleteTodo,
}: Props) => {
  return (
    <section className={styles.wrap}>
      <h2>未完了のTODO一覧</h2>
      <ul className={styles.ul}>
        {todos.map((todo: ImcompletedTodoType) => {
          return (
            <ImcompletedTodo
              key={todo.name}
              target={todo}
              todos={todos}
              setTodos={setTodos}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ImcompletedTodos;
