import { ImcompletedTodoType } from "../../types";
import { UpdateTodosRequest } from "../../../../api/Todo/types";
import ImcompletedTodo from "../ImcompletedTodo/ImcompletedTodo";
import styles from "./ImcompletedTodos.module.css";
import ImcompletedTodoForPending from "../ImcompletedTodoForPending/ImcompletedTodoForPending";

type Props = {
  todos: ImcompletedTodoType[];
  creatingTodoForPending: string;
  isPendingForCreateTodo: boolean;
  completeTodo: (id: number) => void;
  updateTodoDetail: (props: UpdateTodosRequest) => void;
  deleteTodo: (id: number) => void;
};

const ImcompletedTodos = ({
  todos,
  creatingTodoForPending,
  isPendingForCreateTodo,
  completeTodo,
  updateTodoDetail,
  deleteTodo,
}: Props) => {
  return (
    <section className={styles.wrap}>
      <h2>未完了のTODO一覧</h2>
      <ul className={styles.ul}>
        {isPendingForCreateTodo && (
          <ImcompletedTodoForPending todoName={creatingTodoForPending} />
        )}
        {todos.map((todo) => {
          //TODO: 更新の楽観的更新については、ここでisPending中のものならImcompletedTodoForPendingコンポーネントを表示する処理する
          return (
            <ImcompletedTodo
              key={todo.name}
              target={todo}
              completeTodo={completeTodo}
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
