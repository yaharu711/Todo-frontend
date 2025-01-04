import React from "react";
import styles from "./TodoInputForm.module.css";
import Button from "../../../../components/Button";
import TextInput from "../../../../components/TextInput";
import { isMobile } from "react-device-detect";
import { CreateTodoParams } from "../../types";
import UseTodoInputFormViewModel from "./useTodoInputFormViewModel";

type TodoInputFormProps = {
  submit: (params: CreateTodoParams) => void;
};

const TodoInputForm: React.FC<TodoInputFormProps> = ({ submit }) => {
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
