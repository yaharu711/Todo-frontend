import { CompletedTodoType } from "../../../Todo/types";
import styles from "./CompletedTodo.module.css";
import IconButton from "../../../../components/IconButton";
import { PiKeyReturnLight } from "react-icons/pi";
import { ImcompleteTodoParams } from "../../CompletedTodoViewModel";

type Props = {
  target: CompletedTodoType;
  imcompleteTodo: ({ id, successMessage }: ImcompleteTodoParams) => void;
  isPendingForImcompleteTodo: boolean;
};

const CompletedTodo = ({
  target,
  imcompleteTodo,
  isPendingForImcompleteTodo,
}: Props) => {
  return (
    <li
      className={styles.li}
      data-is-pending-for-imcomplete-todo={isPendingForImcompleteTodo}
    >
      <p className={styles.todo_name}>{target.name}</p>
      <div className={styles.buttons_wrap}>
        <IconButton
          onClick={() =>
            imcompleteTodo({
              id: target.id,
              successMessage: "未完了にしました✅",
            })
          }
          children={
            <PiKeyReturnLight
              size={30}
              style={{ color: "var(--color-icon)" }}
            />
          }
          disabled={isPendingForImcompleteTodo}
        />
      </div>
    </li>
  );
};

export default CompletedTodo;
