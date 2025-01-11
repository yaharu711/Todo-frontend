import React, { useState } from "react";
import { CreateTodoParams } from "../../types";

export type Props = {
  submit: (params: CreateTodoParams) => void;
};
const UseTodoInputFormViewModel = ({ submit }: Props) => {
  const [inputedTodoName, setInputedTodoName] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputedTodoName(e.target.value);
    setInputError("");
  };

  const createTodo = (): void => {
    if (inputedTodoName === "") {
      setInputError("入力は必須です");
      return;
    }
    // 全角・半角のスペースの両方に対応できている
    if (inputedTodoName.trim() === "") {
      setInputError("空白のみは許可されていません");
      return;
    }
    submit({ request: { name: inputedTodoName }, setInputError });
    setInputedTodoName("");
  };

  const createTodoOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key !== "Enter") return;
    createTodo();
    e.preventDefault();
  };

  return {
    inputedTodoName,
    inputError,
    onChangeInput,
    createTodoOnKeyDown,
    createTodo,
  };
};

export default UseTodoInputFormViewModel;
