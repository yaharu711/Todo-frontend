import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import styles from "./ImcompletedTodo.module.css";
import IconButton from "../../../../components/IconButton/IconButton";
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import TextInput from "../../../../components/TextInput/TextInput";
import { isMobile } from "react-device-detect";
import UseImcompletedTodoViewModel from "./useImcompletedTodoViewModel";
import AdditionalInfo from "./components/AdditionalInfo/AdditionalInfo";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Props = {
  target: ImcompletedTodoType;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  deleteTodo: (id: number) => void;
  isError?: boolean;
  toggleModal: (
    target: ImcompletedTodoType,
    options?: { focusName?: boolean }
  ) => void;
  completeTodo: (todoId: number) => void;
  displayAnimationTodoIds: number[];
};

const ImcompletedTodo = ({
  target,
  updateTodoDetail,
  deleteTodo,
  isError = false,
  toggleModal,
  completeTodo,
  displayAnimationTodoIds,
}: Props) => {
  const {
    inputedTodoName,
    editInputError,
    isDisabledButton,
    isEditMode,
    onChangeInput,
    editTodoOnKeyDown,
    editTodoOnBlur,
    hasAdditionalInfo,
  } = UseImcompletedTodoViewModel({ target, updateTodoDetail });

  return (
    <li className={styles.li}>
      <div className={styles.todo_left}>
        <IconButton
          onClick={() => toggleModal(target, { focusName: true })}
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
            <AdditionalInfo target={target} toggleModal={toggleModal} />
          )}
        </div>
      </div>
      <div className={styles.buttons_wrap} data-is-edit-mode={isEditMode}>
        {/* 完了ボタンについて */}
        {displayAnimationTodoIds.includes(target.id) ? (
          <div>
            <DotLottieReact
              src="/animations/mc1oedqm.lottie"
              autoplay={true}
              loop={false}
              style={{ width: "40px", height: "40px" }}
            />
          </div>
        ) : (
          <IconButton
            onClick={() => completeTodo(target.id)}
            disabled={isDisabledButton || isError}
            children={
              <CiCircleCheck size={30} style={{ color: "var(--color-icon)" }} />
            }
          />
        )}
        {/* 削除ボタンについて */}
        <IconButton
          onClick={() => deleteTodo(target.id)}
          disabled={isDisabledButton || isError}
          children={
            <CiTrash size={30} style={{ color: "var(--color-icon)" }} />
          }
        />
      </div>
    </li>
  );
};

export default ImcompletedTodo;
