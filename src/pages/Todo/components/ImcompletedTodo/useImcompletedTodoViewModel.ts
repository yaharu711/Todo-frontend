import { useState } from "react";
import {
  ImcompletedTodoType,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "../../types";

export type Props = {
  target: ImcompletedTodoType;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  updateTodo: ({ params, successMessage }: UpdateTodoParams) => void;
};
const UseImcompletedTodoViewModel = ({
  target,
  updateTodoDetail,
  updateTodo,
}: Props) => {
  const [inputedTodoName, setInputedTodoName] = useState<string>(target.name);
  const [editInputError, setEditInputError] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const onChangeEditMode = () => {
    // 編集モードでエラーがあるのにボタンを押されても編集モードを終わらないようにする
    if (isEditMode && editInputError !== "") return;
    setIsEditMode((prev) => !prev);
    setIsDisabledButton((prev) => !prev);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedTodoName(e.target.value);
    setEditInputError("");
  };

  const editTodo = (target: ImcompletedTodoType) => {
    // 変化なく何も入力していない場合は編集していなかったことにする
    if (inputedTodoName === target.name || inputedTodoName === "") {
      onChangeEditMode();
      setInputedTodoName(target.name);
      return;
    }
    if (inputedTodoName.trim() === "") {
      // 編集モードは終わらないまま編集してもらう
      setEditInputError("空白のみは許可されていません");
      return;
    }

    updateTodoDetail({
      request: {
        id: target.id,
        name: inputedTodoName,
        notificate_at: null,
      },
      setInputError: setEditInputError,
    });
    onChangeEditMode();
    setInputedTodoName("");
  };

  const editTodoOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    target: ImcompletedTodoType
  ): void => {
    if (e.key !== "Enter") return;
    editTodo(target);
    e.preventDefault();
  };

  const editTodoOnBlur = (
    e: React.FocusEvent,
    target: ImcompletedTodoType
  ): void => {
    // アイコンボタンを再度クリックした時にonChangeEditModeと競合しないようにする
    if (e.relatedTarget && e.relatedTarget.tagName === "BUTTON") {
      return;
    }
    editTodo(target);
  };

  const completeTodo = () => {
    updateTodo({
      params: {
        id: target.id,
        name: target.name,
        notificate_at: null, // todoが完了したら通知は不要なはずなので削除する
        is_completed: true,
      },
      successMessage: "完了にしました✅",
    });
  };

  const hasAdditionalInfo = target.memo !== "" || target.notificate_at !== null;
  return {
    inputedTodoName,
    editInputError,
    isDisabledButton,
    isEditMode,
    onChangeEditMode,
    onChangeInput,
    editTodoOnKeyDown,
    editTodoOnBlur,
    completeTodo,
    hasAdditionalInfo,
  };
};

export default UseImcompletedTodoViewModel;
