import React, { useState } from "react";
import styles from "./TodoInputForm.module.css";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { isMobile } from "react-device-detect";
import { CreateTodoParams } from "../..";

type TodoInputFormProps = {
  submit: (params: CreateTodoParams) => void;
};

const TodoInputForm: React.FC<TodoInputFormProps> = ({ submit }) => {
  const [inputedTodoName, setInputedTodoName] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");

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
    submit({ name: inputedTodoName, setInputError });
    setInputedTodoName("");
  };
  const createTodoOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key !== "Enter") return;
    createTodo();
    e.preventDefault();
  };
  return (
    <div className={styles.wrap}>
      <TextInput
        placeholder="TODO名"
        name="todo_name"
        value={inputedTodoName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputedTodoName(e.target.value);
          setInputError("");
        }}
        onKeyDown={(e) => createTodoOnKeyDown(e)}
        errorMessage={inputError}
        style={{
          width: isMobile ? "200px" : "300px",
        }}
        autoFocus={true}
      />
      <Button disabled={inputedTodoName === ""} onClick={createTodo}>
        作成
      </Button>
    </div>
  );
};

export default TodoInputForm;
