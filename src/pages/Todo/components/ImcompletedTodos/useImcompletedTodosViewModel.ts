import { useState } from "react";
import { ImcompletedTodoType, ImcompletedTodoWithEditMode } from "../../types";

const UseImcompletedTodosViewModel = (
  imcompletedTodos: ImcompletedTodoType[]
) => {
  const imcompletedTodosWithEditModeInitial = imcompletedTodos.map(
    (imcompletedTodo) => {
      return { ...imcompletedTodo, isEditMode: false };
    }
  );
  const [imcompletedTodosWithEditMode, setImcompletedTodosWithEditMode] =
    useState<ImcompletedTodoWithEditMode[]>(
      imcompletedTodosWithEditModeInitial
    );
  const toggleEditMode = (target: ImcompletedTodoWithEditMode) =>
    setImcompletedTodosWithEditMode((prev) =>
      prev.map((todo) => {
        if (todo.id !== target.id) return todo;
        return { ...todo, isEditMode: !todo.isEditMode };
      })
    );
  return {
    imcompletedTodosWithEditMode,
    toggleEditMode,
  };
};

export default UseImcompletedTodosViewModel;
