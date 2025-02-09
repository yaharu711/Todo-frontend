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
      onSuccess: () => showSuccessToast("並び替えに成功しました✅"),
    });
    toggleSortMode();
  };

  const [isOpen, setOpen] = useState(false);
  const defaultImcompletedTodoType: ImcompletedTodoType = {
    id: 1,
    name: "default",
    created_at: "",
    imcompleted_at: "",
    updateDetailStatus: "",
    updateTodoStatus: "",
  };
  const [selectedTodo, setSelectedTodo] = useState<ImcompletedTodoType>(
    defaultImcompletedTodoType
  );
  const toggleModal = (target: ImcompletedTodoType) => {
    setSelectedTodo(target);
    setOpen((prev) => !prev);
  };

  return {
    isSortMode,
    toggleSortMode,
    onClickSaveSorted,
    isPendingForSortedTodo,
    isOpen,
    setOpen,
    selectedTodo,
    toggleModal,
  };
};

export default UseImcompletedTodosViewModel;
