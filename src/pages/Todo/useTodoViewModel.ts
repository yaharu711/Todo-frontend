import { useEffect, useState } from "react";
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodos,
} from "../../api/Todo/hooks";
import {
  CompletedTodoType,
  CreateTodoParams,
  ImcompletedTodoType,
  UpdateTodoParams,
} from ".";
import { createTodoErrorHandler } from "../../api/Todo/errorHandlers";
import { toast } from "react-toastify";
import { UpdateTodosRequest } from "../../api/Todo/types";

const UseTodoViewModel = () => {
  // TODOの取得と定義
  const { data: todos } = useGetTodos();
  const [imcompletedTodos, setImcompletedTodos] = useState<
    ImcompletedTodoType[]
  >(todos.imcompletedTodos);
  const [completedTodos, setCompletedTodos] = useState<CompletedTodoType[]>(
    todos.completedTodos
  );
  // 以下がないと、Todoを更新してrefetchしてもその結果を画面に反映できない→再描画されない
  // ローカルの状態として、「TODOが編集モードか」を管理する必要がありuseGetTodosの戻り値をそのまま使えない
  useEffect(() => {
    setImcompletedTodos(todos.imcompletedTodos);
    setCompletedTodos(todos.completedTodos);
  }, [todos]);

  // 作成について
  const { mutate: createTodoMutate, isPending: isPendingForCreateTodo } =
    useCreateTodo();
  const createTodo = ({ name, setInputError }: CreateTodoParams) => {
    createTodoMutate(
      { name },
      {
        onSuccess: () =>
          toast("TODOを作成しました✅", {
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
  const updateTodoDetail = (params: UpdateTodosRequest) => {
    updateTodo({
      params: params,
      successMessage: "TODOの更新が完了しました✅",
    });
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
      successMessage: "TODOを未完了にしました✅",
    });
  // 削除について
  const { mutate: deleteTodoMutate, isPending: isPendingForDeleteTodo } =
    useDeleteTodo();
  const deleteTodo = (id: number) => {
    deleteTodoMutate(id, {
      onSuccess: () =>
        toast("TODOを削除しました✅", {
          progressStyle: {
            background:
              "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
          },
        }),
    });
  };

  return {
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
  };
};

export default UseTodoViewModel;
