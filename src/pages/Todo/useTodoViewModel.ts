import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodos,
} from "../../api/Todo/hooks";
import { CreateTodoParams, UpdateTodoParams } from "./types";
import { createTodoErrorHandler } from "../../api/Todo/errorHandlers";
import { toast } from "react-toastify";
import { UpdateTodosRequest } from "../../api/Todo/types";

const UseTodoViewModel = () => {
  // TODOの取得と定義
  const { data: todos } = useGetTodos();
  const imcompletedTodos = todos.imcompletedTodos;
  const completedTodos = todos.completedTodos;

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
