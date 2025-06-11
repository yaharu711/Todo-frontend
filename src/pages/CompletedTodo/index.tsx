import { CompletedTodoType } from "../Todo/types";
import styles from "./index.module.css";
import CompletedTodo from "./CompletedTodo/CompletedTodo";
import useCompletedTodoViewModel from "./CompletedTodoViewModel";
import { ClipLoader } from "react-spinners";

const CompletedTodoPage = () => {
  const { todos, imcompleteTodo, isPendingForGetCompletedTodos } =
    useCompletedTodoViewModel();
  return (
    // 未完了のTodoページと同じラッパーにする。
    // デザインが崩れている
    <section className={styles.wrap}>
      <h2>完了済みのTODO</h2>
      {isPendingForGetCompletedTodos ? (
        <ClipLoader size={50} color="rgba(255, 255, 255, 0.9)" />
      ) : (
        <ul className={styles.ul}>
          {todos.map((todo: CompletedTodoType) => {
            return (
              <CompletedTodo
                key={todo.id}
                target={todo}
                imcompleteTodo={imcompleteTodo}
                isPendingForImcompleteTodo={
                  todo.updateTodoStatus === "delete_pending"
                }
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default CompletedTodoPage;
