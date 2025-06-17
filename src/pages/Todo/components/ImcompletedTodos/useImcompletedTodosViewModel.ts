import { useEffect, useState } from "react";
import { ImcompletedTodoType } from "../../types";
import {
  useCompleteTodo,
  useSortTodosMutation,
} from "../../../../api/Todo/hooks";
import { showSuccessToast } from "../../../../util/CustomToast";
import { useLocation } from "react-router-dom";

const defaultSelectedImcompletedTodoType: ImcompletedTodoType = {
  id: 1,
  name: "default",
  memo: "",
  notificate_at: null,
  created_at: "",
  imcompleted_at: "",
  updateDetailStatus: "",
  updateTodoStatus: "",
};

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
  const location = useLocation();
  const [selectedTodo, setSelectedTodo] = useState<ImcompletedTodoType>(
    defaultSelectedImcompletedTodoType
  );
  const toggleModal = (target: ImcompletedTodoType) => {
    setSelectedTodo(target);
    setOpen((prev) => !prev);
  };
  // Todoのリマインダー通知を開くとTodoの詳細を表示するため、URLにTodoのIDを持たせている
  useEffect(() => {
    const hash = location.hash; // 例: "#todo_id=1"
    const match = hash.match(/todo_id=(\d+)/);
    const todoId = match ? Number(match[1]) : null;

    if (todoId) {
      const target = imcompletedTodos.find((todo) => todo.id === todoId);
      if (target) {
        setSelectedTodo(target);
        setOpen(true);
      }
    }
  }, []);

  // 完了のアニメーションについて
  const [displayAnimationTodoIds, setDisplayAnimationTodoIds] = useState<
    number[]
  >([]);
  const handleDisplayAnimationTodoIds = (id: number) => {
    setDisplayAnimationTodoIds((prev) => [...prev, id]);
  };
  const initDisplayAnimationTodoIds = () => {
    setDisplayAnimationTodoIds([]);
  };

  const { mutate: completeTodoMutate } = useCompleteTodo();
  const completeTodo = (todoId: number) => {
    handleDisplayAnimationTodoIds(todoId);
    setTimeout(() => {
      initDisplayAnimationTodoIds();
    }, 2000); // アニメーションのために1秒後にIDをnullに戻す
    setTimeout(() => {
      completeTodoMutate(todoId, {
        onSuccess: () => {
          showSuccessToast("完了にしました✅");
        },
      });
    }, 1500);
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
    completeTodo,
    displayAnimationTodoIds,
  };
};

export default UseImcompletedTodosViewModel;
