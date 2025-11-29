import TodoInputForm from "./components/TodoInputForm/TodoInputForm";
import styles from "./index.module.css";
import ImcompletedTodos from "./components/ImcompletedTodos/ImcompletedTodos";
import useTodoViewModel from "./useTodoViewModel";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import Header from "./components/TodoHeader/Header";
import { ClipLoader } from "react-spinners";

const TodoPage = () => {
  const {
    filter,
    setFilter,
    isPendingForGetTodos,
    imcompletedTodos,
    createTodo,
    creatingTodoForPending,
    updateTodoDetail,
    updateTodo,
    deleteTodo,
    isPendingForCreateTodo,
    sensors,
    handleDragEnd,
  } = useTodoViewModel();
  // const { registFCMToken, notificationPermission } = useNotification();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main_container}>
        {/* 更新用の仕組みも作らないとね */}
        {/* <button onClick={updateFCMToken}>更新</button> */}
        <TodoInputForm
          isPendingForCreateTodo={isPendingForCreateTodo}
          submit={createTodo}
        />
        {isPendingForGetTodos ? (
          <ClipLoader size={50} color="rgba(255, 255, 255, 0.9)" />
        ) : (
          <>
            <DndContext
              sensors={sensors}
              modifiers={[restrictToVerticalAxis]}
              collisionDetection={closestCenter} // ソート可能なリストはデフォルトのRectangle intersectionより判定が甘いアルゴリズムにする
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={imcompletedTodos}
                strategy={verticalListSortingStrategy}
              >
                <ImcompletedTodos
                  todos={imcompletedTodos}
                  creatingTodoForPending={creatingTodoForPending}
                  isPendingForCreateTodo={isPendingForCreateTodo}
                  updateTodo={updateTodo}
                  updateTodoDetail={updateTodoDetail}
                  deleteTodo={deleteTodo}
                  filter={filter}
                  onChangeFilter={setFilter}
                />
              </SortableContext>
            </DndContext>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
