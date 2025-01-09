import { useState } from "react";
import { ImcompletedTodoType } from "../../types";
import { UpdateTodosRequest } from "../../../../api/Todo/types";

export type Props = {
  target: ImcompletedTodoType;
  updateTodoDetail: (props: UpdateTodosRequest) => void;
};
const UseImcompletedTodoViewModel = ({ target, updateTodoDetail }: Props) => {
  const [inputedTodoName, setInputedTodoName] = useState<string>(target.name);
  const [editInputError, setEditInputError] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const onChangeEditMode = () => {
    toggleEditMode();
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
      // 全角・半角のスペースの両方に対応できている
      setEditInputError("空白のみは許可されていません");
      return;
    }

    updateTodoDetail({
      id: target.id,
      name: inputedTodoName,
    });
    onChangeEditMode();
    setInputedTodoName("");
    setIsDisabledButton(false);
  };

  const editTodoOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    target: ImcompletedTodoType
  ): void => {
    if (e.key !== "Enter") return;
    editTodo(target);
    e.preventDefault();
  };

  const editTodoOnBlur = (target: ImcompletedTodoType): void => {
    editTodo(target);
  };

  return {
    inputedTodoName,
    editInputError,
    isDisabledButton,
    isEditMode,
    onChangeEditMode,
    onChangeInput,
    editTodoOnKeyDown,
    editTodoOnBlur,
  };
};

export default UseImcompletedTodoViewModel;
