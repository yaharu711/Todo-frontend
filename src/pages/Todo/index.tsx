import { ReactNode, useEffect, useState } from "react";
import TodoInputForm from "../../components/TodoInputForm";
import styles from "../../App.module.css";
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodos,
} from "../../api/Todo/hooks";
import CompletedTodos from "../../components/CompletedTodos";
import ImcompletedTodos from "../../components/ImcompletedTodos";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import { UpdateTodosRequest } from "../../api/Todo/types";
import { createTodoErrorHandler } from "../../api/Todo/errorHandlers";

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
  const { data: todos } = useGetTodos();
  const [imcompletedTodos, setImcompletedTodos] = useState<
    ImcompletedTodoType[]
  >(todos.imcompletedTodos);
  const [completedTodos, setCompletedTodos] = useState<CompletedTodoType[]>(
    todos.completedTodos
  );

  // 以下がないと、Todoを更新してrefetchしてもその結果を画面に反映できない→再描画されない
  useEffect(() => {
    setImcompletedTodos(todos.imcompletedTodos);
    setCompletedTodos(todos.completedTodos);
  }, [todos]);

  // TODO:
  // 名前の更新もできるように
  // 責務を分けて、影響範囲を絞りどこに何があるか分かるように一貫性を持たせるようにリファクタリングする

  // 作成について
  const { mutate: createTodoMutate, isPending: isPendingForCreateTodo } =
    useCreateTodo();
  const createTodo = ({ name, setInputError }: CreateTodoParams) => {
    createTodoMutate(
      { name },
      {
        onSuccess: () =>
          toast("TODOを作成しました", {
            progressStyle: {
              background:
                "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
            },
          }),
        onError: (error: Error) => {
          createTodoErrorHandler(setInputError, error);
        },
      }
    );
  };
  // 更新について
  const { mutate: updateTodoMutate, isPending: isPendingForUpdateTodo } =
    useUpdateTodos();
  const updateTodo = ({ params, successMessage }: UpdateTodoParams) => {
    updateTodoMutate(
      {
        params,
      },
      {
        onSuccess: () =>
          toast(successMessage, {
            progressStyle: {
              background:
                "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
            },
          }),
      }
    );
  };
  const completeTodo = (id: number) =>
    updateTodo({
      params: {
        id,
        is_completed: true,
      },
      successMessage: "TODOを完了しました✅",
    });
  const imcompleteTodo = (id: number) =>
    updateTodo({
      params: {
        id,
        is_completed: false,
      },
      successMessage: "TODOを未完了にしました",
    });
  // 削除について
  const { mutate: deleteTodoMutate, isPending: isPendingForDeleteTodo } =
    useDeleteTodo();
  const deleteTodo = (id: number) => {
    deleteTodoMutate(id, {
      onSuccess: () =>
        toast("TODOを削除しました", {
          progressStyle: {
            background:
              "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
          },
        }),
    });
  };

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
            updateTodo={updateTodo}
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
