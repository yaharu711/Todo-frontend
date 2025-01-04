import TodoInputForm from "./components/TodoInputForm";
import styles from "../../App.module.css";
import CompletedTodos from "./components/CompletedTodos";
import ImcompletedTodos from "./components/ImcompletedTodos";
import { FadeLoader } from "react-spinners";
import UseTodoViewModel from "./useTodoViewModel";

const TodoPage = () => {
  const {
    imcompletedTodos,
    setImcompletedTodos,
    completedTodos,
    createTodo,
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
      <TodoInputForm submit={createTodo} />
      {isPendingForUpdateTodo ||
      isPendingForCreateTodo ||
      isPendingForDeleteTodo ? (
        <FadeLoader color="rgba(100, 108, 255, 1)" />
      ) : (
        <>
          <ImcompletedTodos
            todos={imcompletedTodos}
            setTodos={setImcompletedTodos}
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
