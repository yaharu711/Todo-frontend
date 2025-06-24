import {
  ImcompletedTodoType,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "../../types";
import ImcompletedTodo from "../ImcompletedTodo/ImcompletedTodo";
import styles from "./ImcompletedTodos.module.css";
import ImcompletedTodoForPending from "../ImcompletedTodoForPending/ImcompletedTodoForPending";
import IconButton from "../../../../components/IconButton/IconButton";
import { GrSort } from "react-icons/gr";
import UseImcompletedTodosViewModel from "./useImcompletedTodosViewModel";
import Button from "../../../../components/Button/Button";
import SortableImcompletedTodo from "../SortableImcompletedTodo/SortableImcompletedTodo";
import ImcompletedTodoDetailModal from "../ImcompletedTodoDetailModal/ImcompletedTodoDetailModal";

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
    isOpen,
    setOpen,
    selectedTodo,
    toggleModal,
    completeTodo,
    displayAnimationTodoIds,
  } = UseImcompletedTodosViewModel(todos);

  return (
    <section className={styles.wrap}>
      <h2>ホーム</h2>
      <div
        className={styles.sortIcon}
        data-is-pending-for-sort-todo={isPendingForSortedTodo}
      >
        {/* ソートモードにできるボタンは他の更新がPending中はdisabledにしようかな */}
        {isSortMode ? (
          <Button
            onClick={onClickSaveSorted}
            style={{ width: "80px", height: "45px" }}
            disabled={isPendingForSortedTodo}
          >
            完了
          </Button>
        ) : (
          <IconButton
            onClick={toggleSortMode}
            children={
              <GrSort size={25} style={{ color: "var(--color-icon)" }} />
            }
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
                completeTodo={completeTodo}
                updateTodoDetail={updateTodoDetail}
                deleteTodo={deleteTodo}
                isError={true}
                toggleModal={toggleModal}
                displayAnimationTodoIds={displayAnimationTodoIds}
              />
            );
          }

          return (
            <ImcompletedTodo
              key={todo.id}
              target={todo}
              completeTodo={completeTodo}
              updateTodoDetail={updateTodoDetail}
              deleteTodo={deleteTodo}
              toggleModal={toggleModal}
              displayAnimationTodoIds={displayAnimationTodoIds}
            />
          );
        })}
      </ul>
      {/* モーダルはPortalによりBody直下に配置されるためこの位置でも良い */}
      <ImcompletedTodoDetailModal
        key={selectedTodo.id}
        isOpen={isOpen}
        target={selectedTodo}
        setOpen={setOpen}
        updateTodoDetail={updateTodoDetail}
        updateTodo={updateTodo}
      />
    </section>
  );
};

export default ImcompletedTodos;
