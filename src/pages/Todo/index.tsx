import TodoInputForm from "./components/TodoInputForm/TodoInputForm";
import styles from "./index.module.css";
import CompletedTodos from "./components/CompletedTodos/CompletedTodos";
import ImcompletedTodos from "./components/ImcompletedTodos/ImcompletedTodos";
import useTodoViewModel from "./useTodoViewModel";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import Header from "./components/Header/Header";

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
    </div>
  );
};

export default TodoPage;
