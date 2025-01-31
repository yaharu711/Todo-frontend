import { RxHamburgerMenu } from "react-icons/rx";
import { ImcompletedTodoType } from "../../types";
import styles from "./SortableImcompletedTodo.module.css";
import UseSortableImcompletedTodoViewModel from "./useSortableImcompletedTodoViewModel";

const SortableImcompletedTodo = ({
  target,
}: {
  target: ImcompletedTodoType;
}) => {
  const { sortableProps, sortableTodoStyle } =
    UseSortableImcompletedTodoViewModel(target);
  return (
    <li
      ref={sortableProps.setNodeRef}
      className={styles.li}
      // 以下は並び替え時に必要な情報
      style={sortableTodoStyle}
      {...sortableProps.attributes}
    >
      {/* ImcompletedTodoと合わせた方よさそう。何も表示しないdivを入れて表示がほとんど一緒にする＞todo_name_wrappクラスをここでもつける */}
      <p className={styles.todo_name}>{target.name}</p>
      {/* Draggubleなボタンについて */}
      <RxHamburgerMenu
        size={35}
        color="rgba(255, 255, 255, 0.9)"
        {...sortableProps.listeners}
      />
    </li>
  );
};

export default SortableImcompletedTodo;
