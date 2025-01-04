import { isMobile } from "react-device-detect";
import { CompletedTodoType } from "../types";
import styles from "./CompletedTodo.module.css";
import IconButton from "../../../components/IconButton";
import { PiKeyReturnLight } from "react-icons/pi";
import Button from "../../../components/Button";

type Props = {
  target: CompletedTodoType;
  imcompleteTodo: (id: number) => void;
};

const CompletedTodo = ({ target, imcompleteTodo }: Props) => {
  return (
    <li className={styles.li}>
      <p className={styles.todo_name}>{target.name}</p>
      <div className={styles.buttons_wrap}>
        {isMobile ? (
          <IconButton
            onClick={() => imcompleteTodo(target.id)}
            children={<PiKeyReturnLight size={30} />}
          />
        ) : (
          <Button onClick={() => imcompleteTodo(target.id)} children="完了" />
        )}
      </div>
    </li>
  );
};

export default CompletedTodo;
