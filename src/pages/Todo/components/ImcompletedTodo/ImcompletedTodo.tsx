import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import styles from "./ImcompletedTodo.module.css";
import IconButton from "../../../../components/IconButton";
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import TextInput from "../../../../components/TextInput";
import { isMobile } from "react-device-detect";
import Button from "../../../../components/Button";
import UseImcompletedTodoViewModel from "./useImcompletedTodoViewModel";

type Props = {
  target: ImcompletedTodoType;
  completeTodo: (id: number) => void;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  deleteTodo: (id: number) => void;
  isError?: boolean;
};

const ImcompletedTodo = ({
  target,
  completeTodo,
  updateTodoDetail,
  deleteTodo,
  isError = false,
}: Props) => {
  const {
    inputedTodoName,
    editInputError,
    isDisabledButton,
    isEditMode,
    onChangeInput,
    editTodoOnKeyDown,
    editTodoOnBlur,
    onChangeEditMode,
  } = UseImcompletedTodoViewModel({ target, updateTodoDetail });

  return (
    <li className={styles.li}>
      <div className={styles.todo_name_wrapp}>
        <IconButton
          onClick={() => onChangeEditMode()}
          children={<CiEdit size={25} />}
        />
        {isEditMode ? (
          <TextInput
            placeholder={target.name}
            name="edit_modal"
            value={inputedTodoName}
            onChange={onChangeInput}
            onKeyDown={(e) => editTodoOnKeyDown(e, target)}
            onBlur={(e) => editTodoOnBlur(e, target)}
            errorMessage={editInputError}
            style={{
              width: isMobile ? "200px" : "300px",
            }}
            autoFocus={true}
          />
        ) : (
          <p className={styles.todo_name} data-is-error={isError}>
            {target.name}
          </p>
        )}
      </div>
      <div className={styles.buttons_wrap}>
        {/* 完了ボタンについて */}
        {isMobile ? (
          <IconButton
            onClick={() => completeTodo(target.id)}
            disabled={isDisabledButton || isError}
            children={<CiCircleCheck size={30} />}
          />
        ) : (
          <Button
            disabled={isDisabledButton || isError}
            onClick={() => completeTodo(target.id)}
            children="完了"
          />
        )}
        {/* 削除ボタンについて */}
        {isMobile ? (
          <IconButton
            onClick={() => deleteTodo(target.id)}
            disabled={isDisabledButton || isError}
            children={<CiTrash size={30} />}
          />
        ) : (
          <Button
            disabled={isDisabledButton || isError}
            onClick={() => deleteTodo(target.id)}
            children="削除"
          />
        )}
      </div>
    </li>
  );
};

export default ImcompletedTodo;
