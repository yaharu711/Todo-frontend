import { ImcompletedTodoType, UpdateTodoDetailParams } from "../../types";
import styles from "./ImcompletedTodo.module.css";
import IconButton from "../../../../components/IconButton/IconButton";
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import AdditionalInfo from "./components/AdditionalInfo/AdditionalInfo";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Props = {
  target: ImcompletedTodoType;
  updateTodoDetail: (props: UpdateTodoDetailParams) => void;
  deleteTodo: (id: number) => void;
  isError?: boolean;
  toggleModal: (target: ImcompletedTodoType) => void;
  completeTodo: (todoId: number) => void;
  displayAnimationTodoIds: number[];
};

const ImcompletedTodo = ({
  target,
  deleteTodo,
  isError = false,
  toggleModal,
  completeTodo,
  displayAnimationTodoIds,
}: Props) => {
  const hasAdditionalInfo = target.memo !== "" || target.notificate_at !== null;

  return (
    <li className={styles.li}>
      <div className={styles.todo_left}>
        <IconButton
          onClick={() => toggleModal(target)}
          children={<CiEdit size={25} style={{ color: "var(--color-icon)" }} />}
        />
        <div
          className={styles.todo_name_wrapp}
          data-has-additional-info={hasAdditionalInfo}
        >
          <p
            className={styles.todo_name}
            data-is-error={isError}
            onClick={() => toggleModal(target)}
          >
            {target.name}
          </p>
          {hasAdditionalInfo && (
            <AdditionalInfo target={target} toggleModal={toggleModal} />
          )}
        </div>
      </div>
      <div className={styles.buttons_wrap}>
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
            disabled={isError}
            children={
              <CiCircleCheck size={29} style={{ color: "var(--color-icon)" }} />
            }
          />
        )}
        {/* 削除ボタンについて */}
        <IconButton
          onClick={() => deleteTodo(target.id)}
          disabled={isError}
          children={
            <CiTrash size={29} style={{ color: "var(--color-icon)" }} />
          }
        />
      </div>
    </li>
  );
};

export default ImcompletedTodo;
