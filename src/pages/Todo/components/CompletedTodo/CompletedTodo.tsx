import { isMobile } from "react-device-detect";
import { CompletedTodoType, UpdateTodoParams } from "../../types";
import styles from "./CompletedTodo.module.css";
import IconButton from "../../../../components/IconButton";
import { PiKeyReturnLight } from "react-icons/pi";
import Button from "../../../../components/Button";

type Props = {
  target: CompletedTodoType;
  updateTodo: ({ params, successMessage }: UpdateTodoParams) => void;
  isPendingForImcompleteTodo: boolean;
  isPendingForCompleteTodo: boolean;
};

const CompletedTodo = ({
  target,
  updateTodo,
  isPendingForImcompleteTodo,
  isPendingForCompleteTodo,
}: Props) => {
  return (
    <li
      className={styles.li}
      data-is-pending-for-imcomplete-todo={isPendingForImcompleteTodo}
      data-is-pending-for-complete-todo={isPendingForCompleteTodo}
    >
      <p className={styles.todo_name}>{target.name}</p>
      <div className={styles.buttons_wrap}>
        {isMobile ? (
          <IconButton
            onClick={() =>
              updateTodo({
                params: {
                  id: target.id,
                  name: target.name,
                  is_completed: false,
                },
                successMessage: "TODOを未完了にしました✅",
              })
            }
            children={
              <PiKeyReturnLight size={30} color="rgba(255, 255, 255, 0.9)" />
            }
            disabled={isPendingForImcompleteTodo || isPendingForCompleteTodo}
          />
        ) : (
          <Button
            onClick={() =>
              updateTodo({
                params: {
                  id: target.id,
                  name: target.name,
                  is_completed: false,
                },
                successMessage: "TODOを未完了ににしました✅",
              })
            }
            children="完了"
            disabled={isPendingForImcompleteTodo || isPendingForCompleteTodo}
          />
        )}
      </div>
    </li>
  );
};

export default CompletedTodo;
