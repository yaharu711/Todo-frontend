import TodoInputForm from "./components/TodoInputForm/TodoInputForm";
import styles from "../../App.module.css";
import CompletedTodos from "./components/CompletedTodos/CompletedTodos";
import ImcompletedTodos from "./components/ImcompletedTodos/ImcompletedTodos";
import useTodoViewModel from "./useTodoViewModel";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import useNotification from "./useNotification";

const TodoPage = () => {
  const {
    imcompletedTodos,
    completedTodos,
    createTodo,
    creatingTodoForPending,
    updateTodoDetail,
    updateTodo,
    deleteTodo,
    isPendingForCreateTodo,
    sensors,
    handleDragEnd,
  } = useTodoViewModel();
  const { registFCMToken, updateFCMToken, isShowNotificationButton } =
    useNotification();

  return (
    <div className={styles.container}>
      {/* <button onClick={updateFCMToken}>更新</button> */}
      <TodoInputForm
        isPendingForCreateTodo={isPendingForCreateTodo}
        submit={createTodo}
        getFCMToken={registFCMToken}
        isShowNotificationButton={isShowNotificationButton}
      />
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
            />
          </SortableContext>
        </DndContext>
        <CompletedTodos todos={completedTodos} updateTodo={updateTodo} />
      </>
    </div>
  );
};

export default TodoPage;
