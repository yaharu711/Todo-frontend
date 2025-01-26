import TodoInputForm from "./components/TodoInputForm/TodoInputForm";
import styles from "../../App.module.css";
import CompletedTodos from "./components/CompletedTodos/CompletedTodos";
import ImcompletedTodos from "./components/ImcompletedTodos/ImcompletedTodos";
import UseTodoViewModel from "./useTodoViewModel";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
  } = UseTodoViewModel();

  return (
    <div className={styles.container}>
      <TodoInputForm
        isPendingForCreateTodo={isPendingForCreateTodo}
        submit={createTodo}
      />
      <>
        <DndContext
          sensors={sensors}
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
