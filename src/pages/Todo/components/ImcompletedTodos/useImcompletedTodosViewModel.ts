import { useState } from "react";
import { ImcompletedTodoType } from "../../types";
import { useSortTodosMutation } from "../../../../api/Todo/hooks";
import { toast } from "react-toastify";

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
      onSuccess: () =>
        toast("並び替えに成功しました✅", {
          progressStyle: {
            background:
              "linear-gradient(90deg, rgba(100, 108, 255, 1) 0%, rgba(173, 216, 230, 1) 100%)",
          },
        }),
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
