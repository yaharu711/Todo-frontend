import React from "react";
import styles from "./TodoInputForm.module.css";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { isMobile } from "react-device-detect";
import { CreateTodoParams } from "../../types";
import UseTodoInputFormViewModel from "./useTodoInputFormViewModel";

type TodoInputFormProps = {
  isPendingForCreateTodo: boolean;
  submit: (params: CreateTodoParams) => void;
};

const TodoInputForm: React.FC<TodoInputFormProps> = ({
  isPendingForCreateTodo,
  submit,
}) => {
  const {
    inputedTodoName,
    inputError,
    onChangeInput,
    createTodoOnKeyDown,
    createTodo,
  } = UseTodoInputFormViewModel({ submit });

  return (
    <div className={styles.wrap}>
      <TextInput
        placeholder="TODO名"
        name="todo_name"
        value={inputedTodoName}
        onChange={onChangeInput}
        onKeyDown={(e) => createTodoOnKeyDown(e)}
        errorMessage={inputError}
        style={{
          width: isMobile ? "240px" : "300px",
          height: "40px",
        }}
        autoFocus={false}
      />
      <Button
        disabled={inputedTodoName === "" || isPendingForCreateTodo}
        onClick={createTodo}
      >
        作成
      </Button>
    </div>
  );
};

export default TodoInputForm;
