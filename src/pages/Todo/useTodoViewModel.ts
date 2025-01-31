import {
  DragEndEvent,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodos,
  useSortImcompletedTodoQueryCache,
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
  const imcompletedTodos = todos.imcompletedTodosWithStatus;
  const completedTodos = todos.completedTodosWithStatus;

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

  // Todoの並び替えロジックについて
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 0,
        tolerance: 0, // 遅延時間中に指が 5 ピクセル以上動かされた場合にのみ、操作は中断されます
      },
    })
  );

  const sortTodoQueryCahce = useSortImcompletedTodoQueryCache();
  const handleDragEnd = (event: DragEndEvent) => {
    sortTodoQueryCahce(event);
  };

  return {
    imcompletedTodos,
    completedTodos,
    createTodo,
    creatingTodoForPending,
    updateTodoDetail,
    updateTodo,
    deleteTodo,
    isPendingForCreateTodo,
    isPendingForUpdateDetailTodo,
    isPendingForUpdateTodo,
    isPendingForDeleteTodo,
    sensors,
    handleDragEnd,
  };
};

export default UseTodoViewModel;
