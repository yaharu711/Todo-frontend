import { CompletedTodoType } from "../../types";
import styles from "./CompletedTodos.module.css";
import CompletedTodo from "../CompletedTodo/CompletedTodo";

type Props = {
  todos: CompletedTodoType[];
  imcompleteTodo: (id: number) => void;
};

const CompletedTodos = ({ todos, imcompleteTodo }: Props) => {
  return (
    <section className={styles.wrap}>
      <h2>完了済みのTODO一覧</h2>
      <ul className={styles.ul}>
        {todos.map((todo: CompletedTodoType) => {
          return (
            <CompletedTodo target={todo} imcompleteTodo={imcompleteTodo} />
          );
        })}
      </ul>
    </section>
  );
};

export default CompletedTodos;
