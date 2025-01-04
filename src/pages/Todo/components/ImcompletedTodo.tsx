import React, { useState } from "react";
import { ImcompletedTodoType } from "..";
import styles from "./ImcompletedTodo.module.css";
import IconButton from "../../../components/IconButton";
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import TextInput from "../../../components/TextInput";
import { isMobile } from "react-device-detect";
import Button from "../../../components/Button";
import { UpdateTodosRequest } from "../../../api/Todo/types";

type Props = {
  target: ImcompletedTodoType;
  setTodos: React.Dispatch<React.SetStateAction<ImcompletedTodoType[]>>;
  completeTodo: (id: number) => void;
  updateTodoDetail: (props: UpdateTodosRequest) => void;
  deleteTodo: (id: number) => void;
};

const ImcompletedTodo = ({
  target,
  setTodos,
  completeTodo,
  updateTodoDetail,
  deleteTodo,
}: Props) => {
  // 以下全て編集モードについての処理
  const [inputedTodoName, setInputedTodoName] = useState<string>(target.name);
  const [editInputError, setEditInputError] = useState<string>("");
  const [isDisabledButton, setIsDisabledButton] = useState<boolean>(false);

  const toggleEditMode = (target: ImcompletedTodoType) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== target.id) return todo;
        return { ...todo, isEditMode: !todo.isEditMode };
      })
    );
    setIsDisabledButton((prev) => !prev);
  };
  const editTodo = (target: ImcompletedTodoType) => {
    // 変化なく何も入力していない場合は編集していなかったことにする
    if (inputedTodoName === target.name || inputedTodoName === "") {
      toggleEditMode(target);
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
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === target.id ? { ...todo, isEditMode: false } : todo
      )
    );
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

  return (
    <li className={styles.li}>
      <div className={styles.todo_name_wrapp}>
        <IconButton
          onClick={() => toggleEditMode(target)}
          children={<CiEdit size={25} />}
        />
        {target.isEditMode ? (
          <TextInput
            placeholder={target.name}
            name="edit_modal"
            value={inputedTodoName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputedTodoName(e.target.value);
              setEditInputError("");
            }}
            onKeyDown={(e) => editTodoOnKeyDown(e, target)}
            onBlur={() => editTodoOnBlur(target)}
            errorMessage={editInputError}
            style={{
              width: isMobile ? "200px" : "300px",
            }}
            autoFocus={true}
          />
        ) : (
          <p className={styles.todo_name}>{target.name}</p>
        )}
      </div>
      <div className={styles.buttons_wrap}>
        {/* 完了ボタンについて */}
        {isMobile ? (
          <IconButton
            onClick={() => completeTodo(target.id)}
            disabled={isDisabledButton}
            children={<CiCircleCheck size={30} />}
          />
        ) : (
          <Button
            disabled={isDisabledButton}
            onClick={() => completeTodo(target.id)}
            children="完了"
          />
        )}
        {/* 削除ボタンについて */}
        {isMobile ? (
          <IconButton
            onClick={() => deleteTodo(target.id)}
            disabled={isDisabledButton}
            children={<CiTrash size={30} />}
          />
        ) : (
          <Button
            disabled={isDisabledButton}
            onClick={() => deleteTodo(target.id)}
            children="削除"
          />
        )}
      </div>
    </li>
  );
};

export default ImcompletedTodo;
