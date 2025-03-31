import IconButton from "../../../../components/IconButton";
import { CiCircleCheck, CiEdit, CiTrash } from "react-icons/ci";
import styles from "./ImcompletedTodoForPending.module.css";

const ImcompletedTodoForPending = ({
  todoName,
  isPendingForCompleteTodo = false,
  isPendingForImcompleteTodo = false,
}: {
  todoName: string;
  isPendingForCompleteTodo?: boolean;
  isPendingForImcompleteTodo?: boolean;
}) => {
  return (
    <li
      className={styles.li}
      data-is-pending-for-complete-todo={isPendingForCompleteTodo}
      data-is-pending-for-imcomplete-todo={isPendingForImcompleteTodo}
    >
      <IconButton
        disabled={true}
        onClick={() => null}
        children={<CiEdit size={25} color="rgba(255, 255, 255, 0.9)" />}
      />
      <div className={styles.todo_name_wrapp}>
        <p className={styles.todo_name}>{todoName}</p>
      </div>
      <div className={styles.buttons_wrap}>
        {/* 完了ボタンについて */}
        <IconButton
          disabled={true}
          onClick={() => null}
          children={
            <CiCircleCheck size={30} color="rgba(255, 255, 255, 0.9)" />
          }
        />
        {/* 削除ボタンについて */}
        <IconButton
          onClick={() => null}
          disabled={true}
          children={<CiTrash size={30} color="rgba(255, 255, 255, 0.9)" />}
        />
      </div>
    </li>
  );
};

export default ImcompletedTodoForPending;
