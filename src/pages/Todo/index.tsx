import TodoInputForm from "./components/TodoInputForm/TodoInputForm";
import styles from "../../App.module.css";
import CompletedTodos from "./components/CompletedTodos/CompletedTodos";
import ImcompletedTodos from "./components/ImcompletedTodos/ImcompletedTodos";
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
  } = UseTodoViewModel();

  return (
    <div className={styles.container}>
      <TodoInputForm
        isPendingForCreateTodo={isPendingForCreateTodo}
        submit={createTodo}
      />
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
    </div>
  );
};

export default TodoPage;
