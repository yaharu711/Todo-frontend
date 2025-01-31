import {
  ImcompletedTodoType,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "../../types";
import ImcompletedTodo from "../ImcompletedTodo/ImcompletedTodo";
import styles from "./ImcompletedTodos.module.css";
import ImcompletedTodoForPending from "../ImcompletedTodoForPending/ImcompletedTodoForPending";
import IconButton from "../../../../components/IconButton";
import { GrSort } from "react-icons/gr";
import UseImcompletedTodosViewModel from "./useImcompletedTodosViewModel";
import Button from "../../../../components/Button";
import SortableImcompletedTodo from "../SortableImcompletedTodo/SortableImcompletedTodo";

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
  const {
    isSortMode,
    toggleSortMode,
    onClickSaveSorted,
    isPendingForSortedTodo,
  } = UseImcompletedTodosViewModel(todos);
  return (
    <section className={styles.wrap}>
      <h2>未完了のTODO</h2>
      <div
        className={styles.sortIcon}
        data-is-pending-for-sort-todo={isPendingForSortedTodo}
      >
        {/* ソートモードにできるボタンは他の更新がPending中はdisabledにしようかな */}
        {isSortMode ? (
          <Button
            onClick={onClickSaveSorted}
            style={{ width: "65px", height: "45px" }}
            disabled={isPendingForSortedTodo}
          >
            完了
          </Button>
        ) : (
          <IconButton
            onClick={toggleSortMode}
            children={<GrSort size={25} color="rgba(255, 255, 255, 0.9)" />}
            disabled={isPendingForSortedTodo}
          />
        )}
      </div>
      <ul className={styles.ul}>
        {isPendingForCreateTodo && (
          <ImcompletedTodoForPending
            todoName={creatingTodoForPending}
            isPendingForImcompleteTodo={true}
          />
        )}
        {todos.map((todo) => {
          if (isSortMode) {
            return <SortableImcompletedTodo key={todo.id} target={todo} />;
          }
          if (
            todo.updateDetailStatus === "pending" ||
            todo.updateTodoStatus === "add_pending"
          )
            return (
              <ImcompletedTodoForPending
                key={todo.id + "add_pending"}
                todoName={todo.name}
                //ここはImcompleteではなく、Addにしたい→実際の使われ方はAddだから→未完了以外にも作成も編集時も使うため
                isPendingForImcompleteTodo={true}
              />
            );
          if (todo.updateTodoStatus === "delete_pending")
            return (
              <ImcompletedTodoForPending
                key={todo.id + "delete_pending"}
                todoName={todo.name}
                // TODO: ここはCompleteではなくDeleteにしたい
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
