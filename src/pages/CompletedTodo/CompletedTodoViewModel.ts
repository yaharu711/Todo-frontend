import { useGetCompletedTodos, useImcompleteTodo } from "../../api/Todo/hooks";
import { showSuccessToast } from "../../util/CustomToast";

export type ImcompleteTodoParams = {
  id: number;
  successMessage: string;
};

const useCompletedTodoViewModel = () => {
  const {
    data: todos,
    isPending: isPendingForGetCompletedTodos,
    error,
  } = useGetCompletedTodos();
  // 取得系のエラーはとりあえず投げる
  if (error) throw error;

  const { mutate, isPending: isPendingForImcompleteTodo } = useImcompleteTodo();
  const imcompleteTodo = ({ id, successMessage }: ImcompleteTodoParams) => {
    mutate(id, {
      onSuccess: () => showSuccessToast(successMessage),
    });
  };

  return {
    todos: todos.completedTodosWithStatus,
    imcompleteTodo,
    isPendingForGetCompletedTodos,
    isPendingForImcompleteTodo,
  };
};

export default useCompletedTodoViewModel;
