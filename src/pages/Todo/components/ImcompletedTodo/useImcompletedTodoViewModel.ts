import { useState } from "react";
import { ImcompletedTodoWithEditMode } from "../../types";
import { UpdateTodosRequest } from "../../../../api/Todo/types";

export type Props = {
  target: ImcompletedTodoWithEditMode;
  updateTodoDetail: (props: UpdateTodosRequest) => void;
  toggleEditMode: (target: ImcompletedTodoWithEditMode) => void;
};
const UseImcompletedTodoViewModel = ({
  target,
  updateTodoDetail,
  toggleEditMode,
}: Props) => {
  const [inputedTodoName, setInputedTodoName] = useState<string>(target.name);
  const [editInputError, setEditInputError] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

  const onChangeEditMode = (target: ImcompletedTodoWithEditMode) => {
    toggleEditMode(target);
    setIsDisabledButton((prev) => !prev);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedTodoName(e.target.value);
    setEditInputError("");
  };
  const editTodo = (target: ImcompletedTodoWithEditMode) => {
    // 変化なく何も入力していない場合は編集していなかったことにする
    if (inputedTodoName === target.name || inputedTodoName === "") {
      onChangeEditMode(target);
      setInputedTodoName(target.name);
      return;
    }
    if (inputedTodoName.trim() === "") {
      // 全角・半角のスペースの両方に対応できている
      setEditInputError("空白のみは許可されていません");
      return;
    }

    updateTodoDetail({
      id: target.id,
      name: inputedTodoName,
    });
    onChangeEditMode(target);
    setInputedTodoName("");
    setIsDisabledButton(false);
  };
  const editTodoOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    target: ImcompletedTodoWithEditMode
  ): void => {
    if (e.key !== "Enter") return;
    editTodo(target);
    e.preventDefault();
  };
  const editTodoOnBlur = (target: ImcompletedTodoWithEditMode): void => {
    editTodo(target);
  };

  return {
    inputedTodoName,
    editInputError,
    isDisabledButton,
    onChangeEditMode,
    onChangeInput,
    editTodoOnKeyDown,
    editTodoOnBlur,
  };
};

export default UseImcompletedTodoViewModel;
