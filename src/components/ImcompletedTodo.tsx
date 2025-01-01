import React, { useState } from "react";
import { ImcompletedTodoType } from "../pages/Todo";
import styles from "./ImcompletedTodo.module.css";
import IconButton from "./IconButton";
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import TextInput from "./TextInput";
import { isMobile } from "react-device-detect";
import Button from "./Button";

type Props = {
  target: ImcompletedTodoType;
  todos: ImcompletedTodoType[];
  setTodos: React.Dispatch<React.SetStateAction<ImcompletedTodoType[]>>;
  completeTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

const ImcompletedTodo = ({
  target,
  todos,
  setTodos,
  completeTodo,
  deleteTodo,
}: Props) => {
  // 以下全て編集モードについての処理
  const [inputedTodoName, setInputedTodoName] = useState<string>("");
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
    const todoNames = todos.map((todo) => todo.name);
    if (
      target.name !== inputedTodoName &&
      todoNames.includes(inputedTodoName)
    ) {
      setEditInputError("既に同じTODOがあります");
      return;
    }

    const updatedTodo: ImcompletedTodoType = {
      ...target,
      name: inputedTodoName === "" ? target.name : inputedTodoName,
      isEditMode: false,
    };
    setTodos((prev) =>
      prev.map((todo) => (todo.name === target.name ? updatedTodo : todo))
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
  const editTodoOnBlur = (target: ImcompletedTodoType): void =>
    editTodo(target);

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
