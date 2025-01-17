import {
  ImcompletedTodoType,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "../../types";
import ImcompletedTodo from "../ImcompletedTodo/ImcompletedTodo";
import styles from "./ImcompletedTodos.module.css";
import ImcompletedTodoForPending from "../ImcompletedTodoForPending/ImcompletedTodoForPending";

type Props = {
  todos: ImcompletedTodoType[];
  creatingTodoForPending: string;
  isPendingForCreateTodo: boolean;
  updateTodo: ({ params, successMessage }: UpdateTodoParams) => void;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  deleteTodo: (id: number) => void;
};

const ImcompletedTodos = ({
  todos,
  creatingTodoForPending,
  isPendingForCreateTodo,
  updateTodo,
  updateTodoDetail,
  deleteTodo,
}: Props) => {
  return (
    <section className={styles.wrap}>
      <h2>未完了のTODO一覧</h2>
      <ul className={styles.ul}>
        {isPendingForCreateTodo && (
          <ImcompletedTodoForPending
            todoName={creatingTodoForPending}
            isPendingForImcompleteTodo={true}
          />
        )}
        {todos.map((todo) => {
          if (
            todo.updateDetailStatus === "pending" ||
            todo.updateTodoStatus === "add_pending"
          )
            return (
              <ImcompletedTodoForPending
                key={todo.id + "add_pending"}
                todoName={todo.name}
                isPendingForImcompleteTodo={
                  todo.updateTodoStatus === "add_pending"
                }
              />
            );
          if (todo.updateTodoStatus === "delete_pending")
            return (
              <ImcompletedTodoForPending
                key={todo.id + "delete_pending"}
                todoName={todo.name}
                isPendingForCompleteTodo={true}
              />
            );
          if (todo.updateDetailStatus === "error") {
            return (
              <ImcompletedTodo
                key={todo.id + "error"}
                target={todo}
                updateTodo={updateTodo}
                updateTodoDetail={updateTodoDetail}
                deleteTodo={deleteTodo}
                isError={true}
              />
            );
          }

          return (
            <ImcompletedTodo
              key={todo.id}
              target={todo}
              updateTodo={updateTodo}
              updateTodoDetail={updateTodoDetail}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ImcompletedTodos;
