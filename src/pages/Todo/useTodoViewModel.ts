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
import { showSuccessToast } from "../../util/CustomToast";
import { useState } from "react";
import { ImcompletedFilter } from "./components/ImcompletedTodos/filterOptions";

const useTodoViewModel = () => {
  const [filter, setFilter] = useState<ImcompletedFilter>("all");
  // TODOの取得と定義
  const { data: todos, isPending: isPendingForGetTodos, error } =
    useGetTodos(filter);
  // 取得系のエラーはとりあえず投げる
  if (error) throw error;

  const imcompletedTodos = todos.imcompletedTodosWithStatus;

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
        onSuccess: () => showSuccessToast("作成に成功しました✅"),
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
        onSuccess: () => showSuccessToast("更新に成功しました✅"),
      }
    );
  };
  // TODOの完了と未完了について
  const { mutate: updateTodoMutate, isPending: isPendingForUpdateTodo } =
    useUpdateTodos();
  const updateTodo = ({ params, successMessage }: UpdateTodoParams) => {
    updateTodoMutate(params, {
      onSuccess: () => showSuccessToast(successMessage),
    });
  };
  // 削除について
  const { mutate: deleteTodoMutate, isPending: isPendingForDeleteTodo } =
    useDeleteTodo();
  const deleteTodo = (id: number) => {
    deleteTodoMutate(id, {
      onSuccess: () => showSuccessToast("削除に成功しました✅"),
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
    filter,
    setFilter,
    isPendingForGetTodos,
    imcompletedTodos,
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

export default useTodoViewModel;
