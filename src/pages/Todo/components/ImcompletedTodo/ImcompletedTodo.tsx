import {
  ImcompletedTodoType,
  UpdateTodoDetailParams,
  UpdateTodoParams,
} from "../../types";
import styles from "./ImcompletedTodo.module.css";
import IconButton from "../../../../components/IconButton";
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import TextInput from "../../../../components/TextInput";
import { isMobile } from "react-device-detect";
import Button from "../../../../components/Button";
import UseImcompletedTodoViewModel from "./useImcompletedTodoViewModel";
import { MdOutlineStickyNote2 } from "react-icons/md";

type Props = {
  target: ImcompletedTodoType;
  updateTodo: ({ params, successMessage }: UpdateTodoParams) => void;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  deleteTodo: (id: number) => void;
  isError?: boolean;
  toggleModal: (target: ImcompletedTodoType) => void;
};

const ImcompletedTodo = ({
  target,
  updateTodo,
  updateTodoDetail,
  deleteTodo,
  isError = false,
  toggleModal,
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
    hasAdditionalInfo,
  } = UseImcompletedTodoViewModel({ target, updateTodoDetail });

  return (
    <li className={styles.li}>
      <IconButton
        onClick={() => onChangeEditMode()}
        children={<CiEdit size={25} style={{ color: "var(--color-icon)" }} />}
      />
      <div
        className={styles.todo_name_wrapp}
        data-has-additional-info={hasAdditionalInfo}
      >
        {/* TODO: 編集モードの時スタイルが崩れるから、どうにかする */}
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
              width: isMobile ? "170px" : "300px",
              height: isMobile ? "35px" : "auto",
            }}
            autoFocus={true}
          />
        ) : (
          <p
            className={styles.todo_name}
            data-is-error={isError}
            onClick={() => toggleModal(target)}
          >
            {target.name}
          </p>
        )}
        {hasAdditionalInfo && (
          <div className={styles.additional_info_wrapper}>
            <MdOutlineStickyNote2
              onClick={() => toggleModal(target)}
              size={15}
            />
            <span className={styles.memo} onClick={() => toggleModal(target)}>
              メモ
            </span>
          </div>
        )}
      </div>
      <div className={styles.buttons_wrap} data-is-edit-mode={isEditMode}>
        {/* 完了ボタンについて */}
        {isMobile ? (
          <IconButton
            onClick={() =>
              updateTodo({
                params: {
                  id: target.id,
                  name: target.name,
                  notificate_at: null,
                  is_completed: true,
                },
                successMessage: "完了にしました✅",
              })
            }
            disabled={isDisabledButton || isError}
            children={
              <CiCircleCheck size={30} style={{ color: "var(--color-icon)" }} />
            }
          />
        ) : (
          <Button
            disabled={isDisabledButton || isError}
            onClick={() =>
              updateTodo({
                params: {
                  id: target.id,
                  name: target.name,
                  notificate_at: null,
                  is_completed: true,
                },
                successMessage: "完了にしました✅",
              })
            }
            children="完了"
          />
        )}
        {/* 削除ボタンについて */}
        {isMobile ? (
          <IconButton
            onClick={() => deleteTodo(target.id)}
            disabled={isDisabledButton || isError}
            children={
              <CiTrash size={30} style={{ color: "var(--color-icon)" }} />
            }
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
