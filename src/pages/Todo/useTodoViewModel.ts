import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateDetailTodos,
  useUpdateTodos,
} from "../../api/Todo/hooks";
import {
  CreateTodoParams,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "./types";
import { toast } from "react-toastify";

const UseTodoViewModel = () => {
  // TODOの取得と定義
  const { data: todos } = useGetTodos();
  const imcompletedTodos = todos.imcompletedTodos;
  const completedTodos = todos.completedTodos;

  // 作成について
  const {
    mutate: createTodoMutate,
    isPending: isPendingForCreateTodo,
    variables,
  } = useCreateTodo();
  // 楽観的更新に使うもの
  const creatingTodoForPending =
    variables === undefined ? "" : variables.request.name;

  const createTodo = ({ request, setInputError }: CreateTodoParams) => {
    createTodoMutate(
      { request, setInputError },
      {
        onSuccess: () =>
          toast("TODOを作成しました✅", {
            progressStyle: {
              background:
                "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
            },
          }),
      }
    );
  };
  // TODOの詳細の更新について
  const {
    mutate: updateTodoDetailMutate,
    isPending: isPendingForUpdateDetailTodo,
  } = useUpdateDetailTodos();
  // またErrorBoundaryでキャッチされなくなった？？
  // しかも、422の時もエラーとしてthrowされてしまう
  //   if (errorForUpdateDetailTodo !== null) throw errorForUpdateDetailTodo;
  const updateTodoDetail = ({
    request,
    setInputError,
  }: UpdateTodoDetailParams) => {
    updateTodoDetailMutate(
      {
        request,
        setInputError,
      },
      {
        onSuccess: () =>
          toast("TODOの更新が完了しました✅", {
            progressStyle: {
              background:
                "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
            },
          }),
      }
    );
  };
  // TODOの完了と未完了について
  const { mutate: updateTodoMutate, isPending: isPendingForUpdateTodo } =
    useUpdateTodos();
  const updateTodo = ({ params, successMessage }: UpdateTodoParams) => {
    updateTodoMutate(params, {
      onSuccess: () =>
        toast(successMessage, {
          progressStyle: {
            background:
              "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
          },
        }),
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
    creatingTodoForPending,
    updateTodoDetail,
    imcompleteTodo,
    completeTodo,
    deleteTodo,
    isPendingForCreateTodo,
    isPendingForUpdateDetailTodo,
    isPendingForUpdateTodo,
    isPendingForDeleteTodo,
  };
};

export default UseTodoViewModel;
