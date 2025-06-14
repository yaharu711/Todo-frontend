import { CompletedTodoType } from "../Todo/types";
import styles from "./index.module.css";
import CompletedTodo from "./components/CompletedTodo/CompletedTodo";
import useCompletedTodoViewModel from "./CompletedTodoViewModel";
import { ClipLoader } from "react-spinners";
import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton";

const CompletedTodoPage = () => {
  const { todos, imcompleteTodo, isPendingForGetCompletedTodos } =
    useCompletedTodoViewModel();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <BackButton />
        <Header />
      </div>
      <div className={styles.main_container}>
        <section className={styles.wrap}>
          <h2 className={styles.h2}>完了済みのTODO</h2>
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
                      isPendingForGetCompletedTodos ||
                      todo.updateTodoStatus === "delete_pending"
                    }
                  />
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default CompletedTodoPage;
