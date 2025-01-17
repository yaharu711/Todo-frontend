import Button from "../../../../components/Button";
import IconButton from "../../../../components/IconButton";
import { isMobile } from "react-device-detect";
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
      <div className={styles.todo_name_wrapp}>
        <IconButton
          disabled={true}
          onClick={() => null}
          children={<CiEdit size={25} />}
        />
        <p className={styles.todo_name}>{todoName}</p>
      </div>
      <div className={styles.buttons_wrap}>
        {/* 完了ボタンについて */}
        {isMobile ? (
          <IconButton
            disabled={true}
            onClick={() => null}
            children={<CiCircleCheck size={30} />}
          />
        ) : (
          <Button disabled={true} onClick={() => null} children="完了" />
        )}
        {/* 削除ボタンについて */}
        {isMobile ? (
          <IconButton
            onClick={() => null}
            disabled={true}
            children={<CiTrash size={30} />}
          />
        ) : (
          <Button disabled={true} onClick={() => null} children="削除" />
        )}
      </div>
    </li>
  );
};

export default ImcompletedTodoForPending;
