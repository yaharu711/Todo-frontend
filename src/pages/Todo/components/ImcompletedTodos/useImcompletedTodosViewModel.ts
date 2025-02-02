import { useState } from "react";
import { ImcompletedTodoType } from "../../types";
import { useSortTodosMutation } from "../../../../api/Todo/hooks";
import { showSuccessToast } from "../../../../util/CustomToast";

const UseImcompletedTodosViewModel = (
  imcompletedTodos: ImcompletedTodoType[]
) => {
  const [isSortMode, setIsSortMode] = useState(false);
  const toggleSortMode = () => setIsSortMode((prev) => !prev);

  const { mutate: sortTodosMutate, isPending: isPendingForSortedTodo } =
    useSortTodosMutation();
  const onClickSaveSorted = () => {
    const sorted_todo_ids = imcompletedTodos.map(
      (imcompletedTodo) => imcompletedTodo.id
    );
    sortTodosMutate(sorted_todo_ids, {
      onSuccess: () => showSuccessToast("並び替えに成功しました✅")
    });
    toggleSortMode();
  };

  return {
    isSortMode,
    toggleSortMode,
    onClickSaveSorted,
    isPendingForSortedTodo,
  };
};

export default UseImcompletedTodosViewModel;
