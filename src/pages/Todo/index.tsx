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
    updateTodo,
    deleteTodo,
    isPendingForCreateTodo,
    isPendingForDeleteTodo,
  } = UseTodoViewModel();

  return (
    <div className={styles.container}>
      <TodoInputForm
        isPendingForCreateTodo={isPendingForCreateTodo}
        submit={createTodo}
      />
      {isPendingForDeleteTodo ? (
        <FadeLoader color="rgba(100, 108, 255, 1)" />
      ) : (
        <>
          <ImcompletedTodos
            todos={imcompletedTodos}
            creatingTodoForPending={creatingTodoForPending}
            isPendingForCreateTodo={isPendingForCreateTodo}
            updateTodo={updateTodo}
            updateTodoDetail={updateTodoDetail}
            deleteTodo={deleteTodo}
          />
          <CompletedTodos todos={completedTodos} updateTodo={updateTodo} />
        </>
      )}
    </div>
  );
};

export default TodoPage;
