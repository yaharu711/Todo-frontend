import TodoInputForm from "./components/TodoInputForm/TodoInputForm";
import styles from "../../App.module.css";
import CompletedTodos from "./components/CompletedTodos/CompletedTodos";
import ImcompletedTodos from "./components/ImcompletedTodos/ImcompletedTodos";
import { FadeLoader } from "react-spinners";
import UseTodoViewModel from "./useTodoViewModel";

const TodoPage = () => {
  const {
    imcompletedTodos,
    completedTodos,
    createTodo,
    creatingTodoForPending,
    updateTodoDetail,
    imcompleteTodo,
    completeTodo,
    deleteTodo,
    isPendingForCreateTodo,
    isPendingForUpdateTodo,
    isPendingForDeleteTodo,
  } = UseTodoViewModel();

  return (
    <div className={styles.container}>
      <TodoInputForm
        isPendingForCreateTodo={isPendingForCreateTodo}
        submit={createTodo}
      />
      {isPendingForUpdateTodo || isPendingForDeleteTodo ? (
        <FadeLoader color="rgba(100, 108, 255, 1)" />
      ) : (
        <>
          <ImcompletedTodos
            todos={imcompletedTodos}
            creatingTodoForPending={creatingTodoForPending}
            isPendingForCreateTodo={isPendingForCreateTodo}
            completeTodo={completeTodo}
            updateTodoDetail={updateTodoDetail}
            deleteTodo={deleteTodo}
          />
          <CompletedTodos
            todos={completedTodos}
            imcompleteTodo={imcompleteTodo}
          />
        </>
      )}
    </div>
  );
};

export default TodoPage;
