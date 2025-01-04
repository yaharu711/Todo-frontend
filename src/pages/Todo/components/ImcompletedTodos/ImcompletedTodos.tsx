import { ImcompletedTodoType, ImcompletedTodoWithEditMode } from "../../types";
import { UpdateTodosRequest } from "../../../../api/Todo/types";
import ImcompletedTodo from "../ImcompletedTodo/ImcompletedTodo";
import styles from "./ImcompletedTodos.module.css";
import UseImcompletedTodosViewModel from "./useImcompletedTodosViewModel";

type Props = {
  todos: ImcompletedTodoType[];
  completeTodo: (id: number) => void;
  updateTodoDetail: (props: UpdateTodosRequest) => void;
  deleteTodo: (id: number) => void;
};

const ImcompletedTodos = ({
  todos,
  completeTodo,
  updateTodoDetail,
  deleteTodo,
}: Props) => {
  const { imcompletedTodosWithEditMode, toggleEditMode } =
    UseImcompletedTodosViewModel(todos);
  return (
    <section className={styles.wrap}>
      <h2>未完了のTODO一覧</h2>
      <ul className={styles.ul}>
        {imcompletedTodosWithEditMode.map(
          (todo: ImcompletedTodoWithEditMode) => {
            return (
              <ImcompletedTodo
                key={todo.name}
                target={todo}
                toggleEditMode={toggleEditMode}
                completeTodo={completeTodo}
                updateTodoDetail={updateTodoDetail}
                deleteTodo={deleteTodo}
              />
            );
          }
        )}
      </ul>
    </section>
  );
};

export default ImcompletedTodos;
