import { CompletedTodoType, UpdateTodoParams } from "../../types";
import styles from "./CompletedTodos.module.css";
import CompletedTodo from "../CompletedTodo/CompletedTodo";

type Props = {
  todos: CompletedTodoType[];
  updateTodo: ({ params, successMessage }: UpdateTodoParams) => void;
};

const CompletedTodos = ({ todos, updateTodo }: Props) => {
  return (
    <section className={styles.wrap}>
      <h2>完了済みのTODO</h2>
      <ul className={styles.ul}>
        {todos.map((todo: CompletedTodoType) => {
          return (
            <CompletedTodo
              key={todo.id}
              target={todo}
              updateTodo={updateTodo}
              isPendingForImcompleteTodo={
                todo.updateTodoStatus === "delete_pending"
              }
              isPendingForCompleteTodo={todo.updateTodoStatus === "add_pending"}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default CompletedTodos;
