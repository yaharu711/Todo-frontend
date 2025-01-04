import { ReactNode } from "react";
import TodoInputForm from "./components/TodoInputForm";
import styles from "../../App.module.css";
import CompletedTodos from "./components/CompletedTodos";
import ImcompletedTodos from "./components/ImcompletedTodos";
import { FadeLoader } from "react-spinners";
import { UpdateTodosRequest } from "../../api/Todo/types";
import UseTodoViewModel from "./useTodoViewModel";

type renderTodoButtonProps = {
  key: string;
  isDisabled?: boolean;
  onClick: (id: number) => void;
  id: number;
  children: string | ReactNode;
  style?: object;
};

export type ButtonProps = {
  onClick: (id: number) => void;
  children: string | ReactNode;
  style?: object;
  render: ({
    key,
    isDisabled,
    onClick,
    children,
    style,
  }: renderTodoButtonProps) => ReactNode;
};

export type TodoType = {
  id: number;
  name: string;
  isEditMode: boolean;
};

export type ImcompletedTodoType = {
  isEditMode: boolean;
  id: number;
  name: string;
  created_at: string;
  completed_at?: string;
  imcompleted_at: string;
};

export type CompletedTodoType = {
  id: number;
  name: string;
  created_at: string;
  completed_at: string;
  imcompleted_at: string;
};

export type UpdateTodoParams = {
  params: UpdateTodosRequest;
  successMessage: string;
};

export type CreateTodoParams = {
  name: string;
  setInputError: React.Dispatch<React.SetStateAction<string>>;
};

// TODO: components配下にあるコンポーネントはすべてpage/Todo/components配下に移動させよう

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
